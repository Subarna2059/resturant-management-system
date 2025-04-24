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

module.exports = { createStock }