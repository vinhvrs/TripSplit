import express from 'express';
import passport from 'passport';
import { authController } from '../controllers/auth.controller.js';
import { userController } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const Router = express.Router()

Router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
Router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  authController.googleCallback
);

Router.get('/facebook', passport.authenticate('facebook'));
Router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
  authController.facebookCallback
);


Router.post('/register', userController.register)
Router.post('/login', userController.login)
Router.get('/me', verifyToken, userController.getCurrentUser)
Router.get('/logout', authController.logout)

export const authRouter = Router;