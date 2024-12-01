import UsersDBService from '../models/user/UsersDBService.mjs'
import TypesDBService from '../models/type/TypesDBService.mjs'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
class UserController {
    static async usersList(req, res) {
        try {
            const filters = {}
            for (const key in req.query) {
                if (req.query[key]) filters[key] = req.query[key]
            }

            const dataList = await UsersDBService.getList(filters)
            console.log(dataList)
            const hasType = dataList.some(user => user.type); // Перевіряємо, чи є хоча б один користувач з типом

            res.render('usersList', {
                users: dataList,
                hasType,
                user: req.user,
            })
        } catch (err) {
            res.redirect('/')
        }
    }

    static async registerForm(req, res) {
        try {
            const id = req.params.id
            let user = null
            if (id) {
                //отримати об"єкт за id
                user = await UsersDBService.getById(id)
            }
            const types = await TypesDBService.getList()

            //відредерити сторінку з формою
            res.render('register', {
                errors: [],
                data: user,
                types,
                user: req.user,
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    static async registerUser(req, res) {
        // Якщо валідація пройшла успішно, виконуємо логіку реєстрації
        const errors = validationResult(req);
        const data = req.body;

        const types = await TypesDBService.getList();

        if (!errors.isEmpty()) {
            if (req.params.id) data.id = req.params.id;
            return res.status(400).render('register', {
                errors: errors.array(),
                data,
                types,
                user: req.user,
            });
        }

        try {
            const dataObj = req.body;

            // Перевірка, чи надано новий пароль
            if (dataObj.password && dataObj.password !== '') {
                // Якщо пароль є, хешуємо його перед збереженням
                const salt = await bcrypt.genSalt(10);
                dataObj.password = await bcrypt.hash(dataObj.password, salt);
            } else {
                // Якщо пароль порожній, не змінюємо його
                delete dataObj.password;
            }

            // Перевірка наявності старого пароля
            if (dataObj.passwordNew && dataObj.passwordNew !== '') {
                // Тут можна додати перевірку старого пароля, наприклад:
                const user = await UsersDBService.getById(req.params.id); // Отримуємо користувача за id
                const match = await bcrypt.compare(dataObj.passwordNew, user.password);

                if (!match) {
                    if (req.params.id) data.id = req.params.id
                    return res.status(400).render('register', {
                        errors: [{ msg: 'Old password is incorrect.' }],
                        data,
                        types,
                        user: req.user,
                    });
                }

                // Якщо старий пароль вірний, хешуємо новий
                const salt = await bcrypt.genSalt(10);
                dataObj.password = await bcrypt.hash(dataObj.passwordNew, salt);
                delete dataObj.passwordNew; // Видаляємо поле старого пароля після обробки
            }

            if (req.params.id) {
                // Оновлюємо дані про користувача в базі даних
                await UsersDBService.update(req.params.id, dataObj);
            } else {
                // Додаємо користувача в базу даних
                await UsersDBService.create(dataObj);
            }

            res.redirect('/users');
        } catch (err) {
            res.status(500).render('register', {
                errors: [{ msg: err.message }],
                data,
                types,
                user: req.user,
            });
        }
    }


    static async deleteUser(req, res) {
        try {
            await UsersDBService.deleteById(req.body.id)
            res.json({ success: true })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to delete user' })
        }
    }
}

export default UserController
