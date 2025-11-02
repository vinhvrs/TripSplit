import jwt from 'jsonwebtoken'
import authService from '~/services/auth.service'

export const authController = {
  login: (req, res) => {
    if (req.body && req.body.token) {
      try {
        const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET)
        if (decoded && String(decoded.id) === String(req.user._id)) {
          return res.status(200).json({ token: req.body.token })
        }
      } catch (err) {
        // invalid or expired token -> create a new one
        const token = jwt.sign({ id: req.user._id, name: req.user.name }, process.env.JWT_SECRET, {
          expiresIn: '1d'
        })
        return res.status(200).json({ token })
      }
    }
    // create JWT
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    res.status(200).json({ token })
  },

  googleCallback: async (req, res) => {
    await authService.googleLogin(req.user.email, req.user)
      .then(user => {
        // create JWT
        const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
          expiresIn: '1d'
        })
        return res.redirect('/profile?token=' + token)
      })
      .catch(err => {
        console.error('Error creating/updating user:', err)
        res.redirect('/login')
      })
  },

  facebookCallback: async (req, res) => {
    await authService.facebookLogin(req.user.email, req.user)
      .then(user => {
        // create JWT
        const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
          expiresIn: '1d'
        })
        return res.redirect('/profile?token=' + token)
      })
      .catch(err => {
        console.error('Error creating/updating user:', err)
        res.redirect('/login')
      })
  },

  logout: (req, res) => {
    req.logout(() => {
      res.redirect('/login')
    })
    res.redirect('/')
  }
}

export default authController
