import CarsController from '../controllers/carsController.mjs'
import CarFormValidator from '../validators/carFormValidator.mjs'
import { ensureAuthenticated, ensureAdmin } from '../middleware/auth.mjs'
import { Router } from 'express'
const router = Router()
import { checkSchema } from "express-validator";
import upload from '../middleware/UploadManager.mjs'



//---- обробка шляху '/'
router.get('/', CarsController.showCars)
router.get('/create', CarsController.createCar)
router.post('/create', ensureAuthenticated, ensureAdmin, upload.single('carImg'), checkSchema(CarFormValidator.schemaCarValidator), CarsController.addCar)

router.get('/edit/:id', CarsController.createCar)
router.post('/edit/:id', ensureAuthenticated, ensureAdmin, upload.single('carImg'), checkSchema(CarFormValidator.schemaEditCarValidator), CarsController.updateCar)


router.get('/:id', CarsController.showCarDetails)
router.delete('/', ensureAuthenticated, ensureAdmin, CarsController.deleteCar)

export default router
