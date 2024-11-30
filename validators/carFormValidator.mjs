class CarFormValidator {
    static schemaCarValidator = {
        title: {
            notEmpty: {
                errorMessage: 'Заповніть поле інформацією',
            },
            isLength: {
                options: { min: 3 },
                errorMessage: 'Поле має містити принаймні 3 символи',
            },
            trim: true,
            escape: true,
        },
        year: {
            notEmpty: {
                errorMessage: 'Заповніть поле "Рік випуску"',
            },
            isInt: {
                options: { min: 1886, max: new Date().getFullYear() },
                errorMessage: 'Введіть коректний рік випуску',
            },
            trim: true,
            escape: true,
        },

        price: {
            notEmpty: {
                errorMessage: 'Заповніть поле "Ціна автомобіля"',
            },
            isFloat: {
                options: { min: 0 },
                errorMessage: 'Ціна повинна бути числом і не менше 0',
            },
            toFloat: true,
            escape: true,
        },
        carImg: {
            custom: {
                options: (value, { req }) => {
                    if (!req.file) {
                        throw new Error('Будь ласка, завантажте зображення автомобіля');
                    }
                    const allowedMimeTypes = ['image/jpeg', 'image/png'];
                    if (!allowedMimeTypes.includes(req.file.mimetype)) {
                        throw new Error('Файл має бути зображенням у форматі JPEG або PNG');
                    }
                    return true;
                }
            }
        }
    };
    static schemaEditCarValidator = {
        title: {
            optional: { options: { nullable: true, checkFalsy: true } },
            isLength: {
                options: { min: 3 },
                errorMessage: 'Поле має містити принаймні 3 символи',
            },
            trim: true,
            escape: true,
        },
        year: {
            optional: { options: { nullable: true, checkFalsy: true } },
            isInt: {
                options: { min: 1886, max: new Date().getFullYear() },
                errorMessage: 'Введіть коректний рік випуску',
            },
            escape: true,
        },
        price: {
            optional: { options: { nullable: true, checkFalsy: true } },
            isFloat: {
                options: { min: 0 },
                errorMessage: 'Ціна повинна бути числом і не менше 0',
            },
            toFloat: true,
            escape: true,
        },
        carImg: {
            optional: { options: { nullable: true, checkFalsy: true } },
            custom: {
                options: (value, { req }) => {
                    const allowedMimeTypes = ['image/jpeg', 'image/png'];
                    if (!allowedMimeTypes.includes(req.file.mimetype)) {
                        throw new Error('Файл має бути зображенням у форматі JPEG або PNG');
                    }
                    return true;
                }
            }
        }
    };
}

export default CarFormValidator;
