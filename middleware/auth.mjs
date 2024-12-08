export function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

export function ensureAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.type.title === 'admin' || req.user.type.title === 'superAdmin') {
        return next()
    }
    res.redirect('/')
}
export function ensureSuperAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

// && req.user.type.title === 'superAdmin'