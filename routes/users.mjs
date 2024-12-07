import express from 'express'
import UserController from '../controllers/userController.mjs'
import UserValidator from '../validators/userValidator.mjs'
import { checkSchema } from 'express-validator'
// import UploadManager from '../utils/UploadManager.mjs'
import { ensureAuthenticated, ensureSuperAdmin } from '../middleware/auth.mjs'

const router = express.Router()

router.get('/', ensureAuthenticated, ensureSuperAdmin, UserController.usersList)

router.get('/register/:id?', ensureAuthenticated, ensureSuperAdmin, UserController.registerForm)

router.post(
    '/register/:id?',
    ensureAuthenticated, ensureSuperAdmin,
    checkSchema(UserValidator.userSchema),
    UserController.registerUser
)

router.delete('/', UserController.deleteUser)

export default router