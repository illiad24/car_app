export function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log(1)
        return next()
    }
    res.redirect('/')
}

export function ensureAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.type.title === 'admin') {
        return next()
    }
    res.redirect('/')
}
export function ensureSuperAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.type.title === 'superAdmin') {
        console.log(100)
        return next()
    }
    res.redirect('/')
}
