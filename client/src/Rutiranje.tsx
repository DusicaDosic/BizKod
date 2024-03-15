import { Routes, Route, Navigate } from "react-router"
import StranicaRegistracija from "./pages/StranicaRegistracija/StranicaRegistracija"
import StranicaPrijava from "./pages/StranicaPrijava/StranicaPrijava"

const Routing = () => {


    return (
        <Routes>
            <Route path="/" element={<Navigate to="stranicaRegistracija" replace={true} />} />
            <Route path="stranicaRegistracija" element={<StranicaRegistracija />} />
            <Route path="stranicaPrijava" element={<StranicaPrijava />} />
        </Routes >
    )
}

export default Routing;