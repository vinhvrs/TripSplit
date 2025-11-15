import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import GroupModel from '~/models/group.model'
import UserModel from '~/models/user.model'
import ExpenseModel from '~/models/expense.model'
import SplitModel from '~/models/split.model'

import { groupService } from './group.service'
import { userService } from './user.service'
import { expenseService } from './expense.service'
import { splitService } from './split.service'

export const calculationService = {
  async calculateUserBalances(groupId) {
    try {
      const group = await groupService.getGroupById(groupId)
      const users = group.user_ids

      // Expenses already populated in groupService
      const expenses = group.expenses_ids

      // Init balances = 0 for each user
      const userBalances = {}
      users.forEach(user => {
        userBalances[user._id.toString()] = 0
      })

      // Calculate each expense
      expenses.forEach(expense => {
        const amount = expense.amount

        const paidBy = expense.paid_by.map(user => user._id.toString())
        const paidFor = expense.paid_for.map(user => user._id.toString())

        // If paid_by or paid_for is empty, skip to avoid crash
        if (paidBy.length === 0 || paidFor.length === 0) return

        const splitAmount = amount / paidFor.length

        // Lists of people who need to pay
        paidBy.forEach(userId => {
          if (userBalances[userId] !== undefined) {
            userBalances[userId] += amount / paidBy.length
          }
        })

        // Lists of people who need to receive payment
        paidFor.forEach(userId => {
          if (userBalances[userId] !== undefined) { // only calculate if user belongs to the group
            userBalances[userId] -= splitAmount
          }
        })
      })

      const balances = users.map(user => ({
        user_id: user._id,
        name: user.name,
        email: user.email,
        balance: userBalances[user._id.toString()]
      }))

      return balances
    } catch (error) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error calculating user balances')
    }
  },

  async splitTransactions(groupId) {
    try {
      const balances = await this.calculateUserBalances(groupId)

      // map userId -> user info
      const userMap = {}
      balances.forEach(u => {
        userMap[u.user_id.toString()] = {
          id: u.user_id,
          name: u.name,
          email: u.email
        }
      })

      // Divide debtors and creditors
      let debtors = []
      let creditors = []

      balances.forEach(b => {
        if (b.balance < -1e-6) {
          debtors.push({ ...b, balance: Math.abs(b.balance) })
        }
        if (b.balance > 1e-6) {
          creditors.push({ ...b })
        }
      })

      creditors.sort((a, b) => b.balance - a.balance)
      debtors.sort((a, b) => b.balance - a.balance)

      const results = []
      let i = 0
      let j = 0

      while (i < debtors.length && j < creditors.length) {
        const debtor = debtors[i]
        const creditor = creditors[j]

        const amount = Math.min(debtor.balance, creditor.balance)

        results.push({
          from: userMap[debtor.user_id.toString()],
          to: userMap[creditor.user_id.toString()],
          amount
        })

        debtor.balance -= amount
        creditor.balance -= amount

        if (debtor.balance <= 1e-6) i++
        if (creditor.balance <= 1e-6) j++
      }

      return results
    } catch (error) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error calculating split transactions')
    }
  },

  async saveSettlementToSplits(groupId) {
    try {
      const settlements = await this.splitTransactions(groupId)
      const group = await groupService.getGroupById(groupId)
      const users = group.user_ids

      // remove old splits
      // await SplitModel.deleteMany({ group_id: groupId })

      // initialize map for splits table, each user has empty pay_to and get_pay_by
      const map = {}
      users.forEach(u => {
        map[u._id.toString()] = {
          group_id: groupId,
          user_id: u._id,
          pay_to: [],
          get_pay_by: []
        }
      })

      settlements.forEach(s => {
        const fromId = s.from.id.toString()
        const toId = s.to.id.toString()

        // Lists of people who need to pay
        map[fromId].pay_to.push({
          user_id: toId,
          amount: Number(s.amount.toFixed(2))
        })

        // Lists of people who need to receive payment
        map[toId].get_pay_by.push({
          user_id: fromId,
          amount: Number(s.amount.toFixed(2))
        })
      })

      // Save to splits table
      const result = await SplitModel.insertMany(Object.values(map))

      return result
    } catch (error) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error saving settlement to splits')
    }
  }
}
