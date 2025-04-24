const menuRoutes = require("./route/menuRoutes")
const categoryRoutes = require("./route/categoryRoutes")
const orderRoutes = require("./route/orderRoutes")
const tableRoutes = require("./route/tableRoutes")
const stockRoute = require("./route/stockRoute")
const authRoutes = require("./route/authRoutes")
const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
app.use(cors({
    origin:"*"
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT = 8080;
dbConnect()

app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/table", tableRoutes);
app.use("/api/v1/stock", stockRoute)
app.use("/api/v1/auth", authRoutes)



app.listen(PORT,()=>{
    console.log("Server is up");
})