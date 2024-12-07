
import passport from 'passport'
import { validationResult } from 'express-validator'
import UsersDBService from '../models/user/UsersDBService.mjs'
class AuthController {

    static login(req, res, next) {

        const errors = validationResult(req)
        const { email } = req.body
   
        if (!errors.isEmpty()) {
            return res.status(400).render("auth/login", {
                formData: { email },
                errors: errors.array(),
            })
        }
        passport.authenticate("local", (err, user, info) => {
            if (err) return next(err)
            if (!user)
                return res.status(400).render("auth/login", {
                    formData: { email },
                    errors: [{ path: "email-password", msg: info.message }],
                })
            req.login(user, (err) => {
                if (err) return next(err)
                res.redirect("/cars")
            })
        })(req, res, next)
    }

    static async signup(req, res, next) {
        const data = req.body
      
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).render("auth/signup", {
                formData: data,
                errors: errors.array(),
            })
        }
        try {
            const user = await UsersDBService.create(data)
            req.login(user, (err) => {
                if (err) return next(err)
                res.redirect("/")
            })
        } catch (error) {
            return res.status(400).render("auth/signup", {
                formData: data,
                errors: [{ msg: error.message }],
            })
        }
    }


    static logout(req, res) {
        req.logout()
        res.json({ message: 'Logged out successfully' })
    }
}

export default AuthController
