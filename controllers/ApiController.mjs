
import CarsDBService from '../models/car/CarsDBService.mjs'

class ApiController {
    static async getFilterCarDtaa(req, res) {
        try {
            const dataList = await CarsDBService.getList(req.query)

            const user = req.user || null; // Передаємо `user`, якщо він є

            res.json({ documents: dataList, user });
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}
export default ApiController