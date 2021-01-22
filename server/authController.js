const User = require('./models/User');
const Role = require('./models/Role');
const Book = require('./models/Book');

const Comment = require('./models/Comment');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const {secret} = require('./config')

const generateAccessToken = (id, roles, username) => {
    const payload = {
        id,
        roles,
        username
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}




class authController {
    async registration(req, res){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json({message: 'Ошибка при регистрации', errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate){
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: 'Пользователь успешно зарегистрирован'})
        }
        catch(e){
            console.log(e);
            res.status(400).json({message: 'Registration error'})
        }
    }
    async login(req, res){
        try{
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user){
                return res.status(400).json({message: 'Пользователь не найден'})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword){
                return res.status(400).json({message: 'Неверный пароль'})
            }
            const token = generateAccessToken(user._id, user.roles, username)
            return res.json({token})
        }
        catch(e){
            console.log(e);
            res.status(400).json({message: 'Login error'})
        }
    }
    async getUserInfo(req, res){
        try{
            const user = await User.findOne({_id: req.user.id})
            await res.json(user);
        }
        catch(e){
            console.log(e);
        }
    }
    async addBook(req, res){
        try{
            const book = req.body.book
            const name = req.params.bookName
            const candidate = await Book.findOne({name: name})
            if (candidate){
                return res.json({message: 'Книга уже добавлена'})
            }
            const bdBook = new Book({name: name, value: book})
            await bdBook.save()
            return res.json({message: 'Книга добавлена'})
        }
        catch(e){
            res.status(400).json({message: 'Книга не найдена'})
        }
    }
    async addComment(req, res){
        try{
            const name = req.params.bookName
            const comment = new Comment({value: req.body.text, username: req.user.username})
            await comment.save()
            await Book.findOneAndUpdate({name: name}, {$addToSet: {comments: comment}})
            return res.json({message: 'Комментарий добавлен'})
        }
        catch(e){
            console.log(e);
            res.status(400).json({message: 'Невозможно создать комментарий'})
        }
    }
    async getBookInfo(req, res){
        try{
            const name = req.params.bookName
            const book = await Book.findOne({name: name})
            await res.json(book);
        }
        catch(e){
            console.log(e);
        }
    }
    async addBookToFavorite(req, res){
        try{
            const book = req.body.book
            await User.findOneAndUpdate({_id: req.user.id}, {$addToSet: {books: {value: book, name: book.volumeInfo.title}}})
            return res.json({message: 'Книга добавлена в избранное'})
        }
        catch(e){
            console.log(e);
            res.status(400).json({message: 'Невозможно добавить книгу в избранное'})
        }
    }
    async deleteFromFavoirte(req, res){
        try{
            const book = req.body.book
            await User.findOneAndUpdate({_id: req.user.id}, {$pull: {books: {value: book, name: book.volumeInfo.title}}})
            return res.json({message: 'Книга удалена из избранного'})
        }
        catch(e){
            console.log(e);
            res.status(400).json({message: 'Невозможно удалить книгу в избранное'})
        }
    }
}

module.exports = new authController()