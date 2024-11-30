import Car from './Car.mjs'
import MongooseCRUDManager from '../MongooseCRUDManager.mjs'
class CarsDBService extends MongooseCRUDManager {
    async getList(filters) {
        try {
            const res = await super.getList(filters, null, ['dealer'])
            return res
        } catch (error) {
            return []
        }
    }
}
export default new CarsDBService(Car)