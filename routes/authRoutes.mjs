import express from 'express'
import passport from 'passport'

const router = express.Router()

// Маршрут для відображення форми логіну
router.get('/login', (req, res) => {
    res.render('login', { messages: null })
})

// Маршрут для обробки логіну
router.post(
    '/login',
    (req, res, next) => {
        next()
    },
    passport.authenticate('local', {
        successRedirect: '/cars',
        // failureRedirect: '/',
        failureFlash: true,
    }),
    function (req, res) {
        console.log('redirect')
        res.redirect('/')
    }
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
