import { Router } from 'express'
const router = Router()
import carsRouter from './cars.mjs'
import userRouter from './users.mjs'
import authRoutes from './authRoutes.mjs'
import mainRoutes from './main.mjs'
import apiRoutes from './apiRoutes.mjs'
//---- обробка шляху '/'
router.use('/', mainRoutes)
router.use('/api', apiRoutes)
router.use('/auth', authRoutes)
router.use('/cars', carsRouter)
router.use('/users', userRouter)

export default router
