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
            console.log(dataObj);

            if (req.params.id) {
                // Отримуємо користувача з бази даних для перевірки старого пароля
                const user = await UsersDBService.getById(req.params.id);

                // Перевірка наявності старого пароля (passwordNew)
                if (dataObj.passwordNew && dataObj.passwordNew !== '') {
                    const match = await bcrypt.compare(dataObj.passwordNew, user.password);
                    if (!match) {
                        if (req.params.id) data.id = req.params.id
                        // Якщо старий пароль неправильний
                        return res.status(400).render('register', {
                            errors: [{ msg: 'Old password is incorrect.' }],
                            data: dataObj,
                            types,
                            user: req.user,
                        });
                    }

                    // Якщо старий пароль правильний, перевіряємо новий пароль (password)
                    if (dataObj.password && dataObj.password !== '') {
                        // Хешуємо новий пароль перед збереженням
                        const salt = await bcrypt.genSalt(10);
                        dataObj.password = await bcrypt.hash(dataObj.password, salt);
                    } else {
                        // Якщо нового пароля немає, залишаємо старий
                        delete dataObj.password;
                    }

                    // Видаляємо поле passwordNew після обробки
                    delete dataObj.passwordNew;
                } else {
                    // Якщо старий пароль не надано, новий пароль не змінюється
                    delete dataObj.password;
                }

                if (req.params.id) {
                    // Оновлюємо дані про користувача в базі даних
                    await UsersDBService.update(req.params.id, dataObj);
                } else {
                    // Додаємо користувача в базу даних
                    await UsersDBService.create(dataObj);
                }

                res.redirect('/users');
            }
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
