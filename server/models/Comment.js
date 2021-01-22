const {Schema, model} = require('mongoose')

const Comment = new Schema({
    value: {type: String},
    username: {type: String}
})

module.exports =  model('Comment', Comment)