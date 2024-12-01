import express from 'express'
import UserController from '../controllers/userController.mjs'
import UserValidator from '../validators/userValidator.mjs'
import { checkSchema } from 'express-validator'
// import UploadManager from '../utils/UploadManager.mjs'
import { ensureAuthenticated, ensureSuperAdmin } from '../middleware/auth.mjs'

const router = express.Router()

router.get('/', UserController.usersList)

router.get('/register/:id?', UserController.registerForm)

router.post(
    '/register/:id?',

    checkSchema(UserValidator.userSchema),
    UserController.registerUser
)

router.delete('/', UserController.deleteUser)

export default router