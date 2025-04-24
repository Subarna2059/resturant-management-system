const mongoose = require("mongoose")

const menuSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    category:{type:String, required:true},
    price:{type:Number, required:true},
    categoryId:{type:String, required:true},
    category:{type:String, required:true},
})
const Menu = mongoose.model("Menu", menuSchema)

const fileSchema = new mongoose.Schema({
    belongsTo:{type:String, required:true},
    belongsToId:{type:String, required:true},
    path:{type:String, required:true},
    originalName:{type:String, required:true},
    mimeType:{type:String, required:true},
    size:{type:String, required:true},
})
const File = mongoose.model("File", fileSchema)
const categorySchema = new mongoose.Schema({
    title:{type:String, required:true},
})
const Category = new mongoose.model("Category", categorySchema)
const orderSchema = new mongoose.Schema({
    orderName:{type:String, required:true},
    price:{type:Number, required:true},
    table:{type:String, required:true},
    quantity:{type:Number, required:true},
    category:{type:String, required:true},
})
const Order = new mongoose.model("Order", orderSchema)
const tableSchema = new mongoose.Schema({
    title:{type:String, required:true},
    billCleared:{type:Boolean, required:true},
    tableOccupied:{type:Boolean, required:true}
})
const Table = new mongoose.model("Table", tableSchema)

const stockSchema = new mongoose.Schema({
    title:{type:String, required:true},
    quantity:{type:Number, required:true},
    category:{type:String, required:true},
})
const Stock = new mongoose.model("Stock", stockSchema)

const userSchema = new mongoose.Schema({
    userName:{type: String, required:true},
    password:{type:String, required:true},
    number:{type:Number, required:true},
    email:{type:String, required:true},
    role:{type:String, require:true},
})
const User = new mongoose.model("User", userSchema)
module.exports = {Menu, File, Category, Order, Table, Stock, User}
