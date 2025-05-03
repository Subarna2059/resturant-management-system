import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Order from "./Order";
import Menu from "./Menu";
import { Staff } from "./Staff";
import Stock from "./Stock";
import TableOrder from "./TableOrder";
import Login from "./Login";
import RequireAuth from "./RequireAuth";
import Register from "./Register";

export default function MainRouter () {
    return(
        <>
        <Routes>
            <Route path="/" element={<RequireAuth><Dashboard/></RequireAuth>} />
            <Route path="/order" element={<RequireAuth><Order /></RequireAuth>} />
            <Route path="/menu" element={<Menu />}/>
            <Route path="/staff" element={<RequireAuth><Staff /></RequireAuth>} />
            <Route path="/stock" element={<RequireAuth><Stock /></RequireAuth>} />
            <Route path="/table/:id" element={<RequireAuth><TableOrder /></RequireAuth>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
        </>
    )
}