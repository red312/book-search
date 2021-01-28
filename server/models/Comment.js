const {Schema, model} = require('mongoose')

const Comment = new Schema({
    value: {type: String, required: true},
    username: {type: String, required: true}
})

module.exports =  model('Comment', Comment)