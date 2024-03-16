import { Routes, Route, Navigate } from "react-router"
import All from "./pages/All/All"
import Favourite from "./pages/Favourite/Favourite"
import Random from "./pages/Random/Random"

const Routing = () => {


    return (
        <Routes>
            <Route path="/" element={<Navigate to="all" replace={true} />} />
            <Route path="all" element={<All />} />
            <Route path="random" element={<Random />} />
            <Route path="favourite" element={<Favourite />} />
        </Routes >
    )
}

export default Routing;
