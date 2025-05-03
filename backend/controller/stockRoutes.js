const { Category, Stock } = require("../model/schema")

const createStock = async (req, res) => {
    let { title, quantity, category } = req.body
    title = title.trim().toLowerCase()
    category = category.trim().toLowerCase()
    try {
        if (title && quantity && category) {
            const findCategory = await Category.findOne({ title: category })
            if (findCategory) {
                const titleFind = await Stock.findOne({ title: title })
                if (!titleFind) {
                    const insertStock = await new Stock({
                        title:title,
                        quantity:quantity,
                        category:category
                    })
                    const save = await insertStock.save();
                    if(save) {
                        res.status(200).json({
                            message:"Data insert successfull",
                            data:save,
                        })
                    }
                } else {
                    res.status(409).json({
                        message: "Title already exist"
                    })
                }
            } else {
                res.status(404).json({
                    message: "Category not found"
                })
            }
        } else {
            res.status(409).json({
                message: "Invalid input"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

const getStock = async(req,res) =>{
    try {
        const getStock = await Stock.find();
        if(getStock.length > 0) {
            res.status(200).json({
                message:"Data feteched successfully",
                data: getStock
            })
        } else{
            res.sta
        }
    } catch (e) {
        res.status(500).json({
            message:e.message
        })
    }
}
const deleteStock = async (req, res ) => {
    const {id} = req.params
    try{
        const deleteData = await Stock.findByIdAndDelete({_id:id})
        if(deleteData) {
            res.status(200).json({
                message:"Data delete successfully"
            })
        } else {
            res.status(500).json({
                message:"Something went wrong"
            })
        }
    } catch(e) {
        res.status(500).json({
            message:e.message
        })
    }
}
const getindividualStock = async(req,res) => {
    const {id} = req.params
    try{
        const findStock = await Stock.findOne({_id:id})
        if(findStock) {
            res.status(200).json({
                message:"Data fetched successsfully",
                data:findStock
            })
        } else {
            res.status(409).json({
                message:"No record found"
            })
        }
    } catch (e) {
        res.status(500).json({
            message:e.message
        })
    }
}
const editStock = async(req,res) => {
    let {title, quantity, category} = req.body
    const {id} = req.params
    title = title.trim().toLowerCase()
    category = category.trim().toLowerCase()
    try{
        if(title && quantity && category && id) {
            const update = await Stock.findByIdAndUpdate({_id:id},{title:title, category:category, quantity:quantity},{new:true})
            if(update) {
                res.status(200).json({
                    message:"Data updated successfull",
                    data:update
                })
            } else {
                res.status(500).json({
                    message:"Something went wrong"
                })
            }
        } else {
            res.status(409).json({
                message:"invalid input"
            })
        }
    } catch (e) {
        res.status(500).json({
            message:"Something went wrong"
        })
    }
}
module.exports = { createStock, getStock,deleteStock,getindividualStock, editStock }