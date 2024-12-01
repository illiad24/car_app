import express from 'express'
import passport from 'passport'
import AuthValidator from '../validators/authValidator.mjs'
import { checkSchema } from 'express-validator'
import AuthController from '../controllers/authController.mjs'
const router = express.Router()

// Маршрут для відображення форми логіну
router.get('/login', (req, res) => {
    res.render('auth/login', { errors: null, formData: null })
})
router.get('/signup', (req, res) => {
    res.render('auth/signup', { errors: null, formData: null })
})

// Маршрут для обробки логіну
router.post(
    '/login',
    checkSchema(AuthValidator.loginSchema),
    AuthController.login
)
// Маршрут для обробки логіну
router.post(
    '/signup',
    checkSchema(AuthValidator.signupSchema),
    AuthController.signup
)

// Маршрут для виходу з системи
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.redirect('/')
    })
})

export default router
