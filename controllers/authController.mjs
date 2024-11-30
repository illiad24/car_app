
import passport from 'passport'

class AuthController {
    static login(req, res, next) {
        console.log(req.body)
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err)
            if (!user) return res.status(400).json({ message: info.message })
            req.logIn(user, (err) => {
                if (err) return next(err)
                console.log(user)
                res.json(user)
            })
        })(req, res, next)
    }

    static logout(req, res) {
        req.logout()
        res.json({ message: 'Logged out successfully' })
    }
}

export default AuthController
