const { Category, Menu } = require("../model/schema")

const createCategory = async(req,res) =>{
    let {title} = req.body
    title = title.trim().toLowerCase()
    try {
        if(title) {
            const findTitle = await Category.findOne({title:title})
            if(!findTitle) {
                const insertCategory = await new Category ({
                    title,
                })
                const save = await insertCategory.save()
                if(save) {
                    res.status(200).json({
                        message:"Data insert successful",
                        data:save
                    })
                }
            } else {
                res.status(409).json({
                    message:"Title already exist"
                })
            }
        } else {
            res.status(409).json({
                message:"Title is required"
            })
        }
    } catch (e) {
        res.status(500).json({
            message:e.message
        })
    }
}

const allCategory = async(req,res) =>{
    try {
        const allCategory = await Category.find();
        if(allCategory.length>0) {
            res.status(200).json({
                data:allCategory
            })
        } else {
            res.status(404).json({
                messgae:"No data found"
            })
        }
    } catch(e) {
        res.status(500).json({
            message:e.message
        })
    }
}

const deleteCategory = async(req,res) =>{
    const {id} = req.params
    try{
        const findCategory = await Category.findByIdAndDelete({_id:id})
        if(findCategory) {
            const deleteMenu = await Menu.deleteMany({categoryId:id})
            if(deleteMenu) {
                res.status(200).json({
                    message:"Data deleted successfully"
                })
            }
        }else {
            res.status(404).json({
                message:"No data found"
            })
        }
    }catch (e) {
        res.status(500).json({
            message:e.message
        })
    }
}

module.exports = {createCategory, allCategory, deleteCategory}