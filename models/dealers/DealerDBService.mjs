import Dealer from './Dealer.mjs'


import MongooseCRUDManager from '../MongooseCRUDManager.mjs'

class DealerDBService extends MongooseCRUDManager {
    static async getList() {
        try {
            const res = await Type.find()
            return res
        } catch (error) {
            return []
        }
    }
}

export default new DealerDBService(Dealer)
