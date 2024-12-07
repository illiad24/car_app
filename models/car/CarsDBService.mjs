import Car from './Car.mjs'
import MongooseCRUDManager from '../MongooseCRUDManager.mjs'
class CarsDBService extends MongooseCRUDManager {
    /**
 * Конфігурація полів для фільтрації та пошуку (які будемо опрацьовувати).
 */
    static fieldsConfigurations = [
        {
            fieldName: 'title',
            filterCategory: 'search',
        },
        {
            fieldName: 'price',
            filterCategory: 'range',
        },

        {
            fieldName: 'dealer',
            filterCategory: 'list',
        },
    ]

    /**
     * Отримує список продуктів з урахуванням запиту користувача.
     *
     * @param {Object} reqQuery - Об'єкт з параметрами запиту, включаючи фільтри, сортування та пагінацію.
     * @returns {Promise<Product[]>} - Promise, який вирішується масивом знайдених продуктів.
     */
    async getList(reqQuery) {
        try {
            const res = await this.findManyWithSearchOptions(
                reqQuery,
                CarsDBService.fieldsConfigurations,
                [],
                ['dealer']
            )
            return res
        } catch (error) {
            return []
        }
    }
}
export default new CarsDBService(Car)