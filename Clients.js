const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    picture:String,
    position:String

})

mongoose.model("clients",ClientSchema)