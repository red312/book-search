const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post('/registration', [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 символов').isLength({min: 4, max: 10})
], controller.registration)
router.post('/login', controller.login)
router.get('/user', authMiddleware, controller.getUserInfo)
router.post('/:bookName', authMiddleware, controller.addBook)
router.post('/:bookName/comment', authMiddleware, controller.addComment)
router.get('/:bookName', authMiddleware, controller.getBookInfo)

module.exports = router