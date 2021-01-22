const {Schema, model} = require('mongoose')

const Book = new Schema({
    name: {type: String, unique: true,required: true},
    value: {type: Object, unique: true},
    comments: [{type: Object, ref: 'Comment'}]
})

module.exports =  model('Book', Book)