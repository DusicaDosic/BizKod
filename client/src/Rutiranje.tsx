import { Routes, Route, Navigate } from "react-router"
import StranicaLogovanje from "./pages/StranicaLogovanje/StranicaLogovanje"

const Routing = () => {


    return (
        <Routes>
            <Route path="/" element={<Navigate to="stranicaLogovanje" replace={true} />} />
            <Route path="stranicaLogovanje" element={<StranicaLogovanje />} />
        </Routes >
    )
}

export default Routing;