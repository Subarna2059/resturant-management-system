const z = require("zod");
const path = require("path")
const { Menu, File, Category } = require("../model/schema");
const { log } = require("console");
const zodSchema = z.object({
    title: z.string().trim().min(3, { message: "Title must be atleast 3 character" }),
    description: z.string().trim().min(5, { message: "Title must be atleast 5 character" }),
    category: z.string().trim(),
    price: z.number(),
})
const zodFileSchema = z.object({
    originalName: z.string(),
    mimeType: z.string(),
    size: z.string(),
    path: z.string(),
})
const createMenu = async (req, res) => {
    let { title, description, category, price} = req.body;
    console.log(req.file);
    
    title = title.trim().toLowerCase()
    description = description.trim().toLowerCase()
    category = category.trim().toLowerCase()
    price = Number(price)
    const { originalname, mimetype, size, path } = req.file
    const validate = zodSchema.safeParse({ title: title, description: description, category: category, price: price,})
    const validateFile = zodFileSchema.safeParse({ originalName: originalname, mimeType: mimetype, size: size, path: path })
    try {
        if (validate.success && validateFile) {
            const checkTitle = await Menu.find({ title: title })
            if (checkTitle.length > 0) {
                return res.status(409).json({
                    message: "Title already exist"
                })
            } else {
                const findCategory = await Category.findOne({title:category})
                if(findCategory){
                    const insertMenu = await new Menu({
                        title,
                        description,
                        category,
                        price,
                        categoryId:findCategory._id,
                    })
                    const save = await insertMenu.save()
                    const insertFile = await new File({
                        belongsTo: save.title,
                        belongsToId:save._id,
                        originalName: originalname,
                        mimeType: mimetype,
                        size: size,
                        path: path,
    
                    })
                    const saveFile = await insertFile.save()
                    if (save && saveFile) {
                        res.status(200).json({
                            message: "Data insert successfull",
                            data: save,
                            file: saveFile
                        })
                    }
                } else {
                    res.status(404).json({
                        message:"category not found"
                    })
                }
            }
        } else {
            res.status(403).json({
                message: validate || validateFile
            })
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const updateMenu = async (req, res) => {
    let { title, description, category, price } = req.body;
    title = title.trim().toLowerCase()
    description = description.trim().toLowerCase()
    category = category.trim().toLowerCase()
    price = Number(price)
    const { id } = req.params
    const file = req.file
    if(file) {
        const { originalname, mimetype, size, path } = req.file
    }
    const validate = zodSchema.safeParse({ title: title, description: description, category: category, price: price })
    try {
        if (validate.success) {
            const findTitle = await Menu.find({ title: title })
            if (findTitle.length > 0) {
                res.status(409).json({
                    message: "Title already exist"
                })
            } else {
                const findAndUpdate = await Menu.findByIdAndUpdate(
                    { _id: id },
                    { title, description, category, price },
                    { new: true });
                if (file) {
                    const findFileAndUpdate = await File.updateOne({ belongsToId: id }, {
                        originalName: originalname,
                        mimeType: mimetype,
                        size: size,
                        belongsTo: findAndUpdate.title
                    })
                    if (findAndUpdate || findFileAndUpdate) {
                        res.status(200).json({
                            message: "Data update successful",
                            data: findAndUpdate,
                            file :findFileAndUpdate||null,
                        })
                    } else {
                        res.status(500).json({
                            message: "Something went wrong"
                        })
                    }
                } else {
                    res.status(200).json({
                        message: "Data update successful",
                        data: findAndUpdate
                    })
                }
            }
        } else {
            res.status(403).json({
                message: validate.error.issues[0].message
            })
        }
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

const getMenu = async (req, res) => {
    try {
        const data = await Menu.find();
        const fileData = await File.find();
        if (data.length > 0) {
            res.status(200).json({
                message: "Data fetched successfully",
                data: data,
                file:fileData
            }).download(path.resolve(fileData[0].path), file[0].originalName)
        } else {
            res.status(400).json({
                message: "No record found"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

const getMenuAccordingToCategory = async (req, res) => {
    const {id} = req.params
    try {
        const findCategory = await Category.find({_id:id}) 
        if(findCategory) {
            const findMenu = await Menu.find({categoryId:id})
            if(findMenu.length > 0) {
                const file = await File.find({belongsToId:findMenu[0]._id})
                res.status(200).json({
                    data:findMenu,
                    file:file,
                })
                .download(path.resolve(file[0].path), file[0].originalName)
            } else {
                res.status(200).json({
                    message:"No data found"
                })
            }
        } else {
            res.status(404).json({
                message:"Catrgory not found"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

const deleteMenu = async(req,res) => {
    const {id} = req.params
    try {
        const deleteData = await Menu.deleteOne({_id:id});
        const deleteFile = await File.deleteOne({belongsToId:id});
        if(deleteData.deletedCount > 0 && deleteFile.deletedCount > 0) {
            res.status(200).json({
                mesage:'Data deleted successfully'
            })
        } else {
            res.status(409).json({
                message:"Data not deleted"
            })
        }
    } catch(e) {
        res.status(500).json({
            message:e.message
        })
    }
}
const getIndividualMenu = async(req,res) => {
    const {id} = req.params
    try{
        const data = await Menu.findOne({_id:id})
        const file = await File.findOne({belongsToId:id})
        if(data) {
            res.status(200).json({
                message:"Data fetched successfully",
                data:data,
                file:file
            })
        } else {
            res.status(404).json({
                message:"No data found"
            })
        }
    } catch(e) {
        res.status(500).json({
            message:e.message
        })
    }
}
module.exports = { createMenu, updateMenu, getMenu, getMenuAccordingToCategory, deleteMenu,getIndividualMenu }