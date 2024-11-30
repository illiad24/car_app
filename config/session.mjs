import session from 'express-session'
const sessionConfig = session({
    secret: 'ss',
    resave: false,
    saveUninitialized: false,
})

export default sessionConfig
