import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Order from "./Order";
import Menu from "./Menu";
import { Staff } from "./Staff";
import Stock from "./Stock";
import TableOrder from "./TableOrder";

export default function MainRouter () {
    return(
        <>
        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/order" element={<Order />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/table/:id" element={<TableOrder />} />

        </Routes>
        </>
    )
}