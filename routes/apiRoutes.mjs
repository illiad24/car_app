import express from 'express'
import ApiController from '../controllers/ApiController.mjs'


const router = express.Router()

router.get('/cars', ApiController.getFilterCarDtaa)



export default router