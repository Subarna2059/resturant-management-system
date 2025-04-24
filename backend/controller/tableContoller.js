const { Table } = require("../model/schema")

const createTable = async(req, res) =>
{
    const{title} = req.body
    const trimmedName = title.trim().toLowerCase()
    try{
        if(title.length > 0) {
            const findTable = await Table.findOne({title:title})
            if(!findTable) {
                const insertTable = await new Table({
                    title:trimmedName,
                    billCleared:true,
                    tableOccupied:false,
                })
                const save = await insertTable.save()
                return res.status(200).json({
                    message:"Data inserted successfully",
                    data:save
                })
            } else {
                return res.status(409).json({
                    message:"Table name already exist "
                })
            }
        } else {
            res.status(404).json({
                message:"Table name must be provided"
            })
        }
    } catch(e) {
        res.status(500).json({
            message:e.message
        })
    }
}

module.exports = {createTable}