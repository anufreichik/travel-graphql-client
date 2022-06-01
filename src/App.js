import Login from "./pages/login";
import Register from "./pages/register";
import {
    Routes,
    Route,
} from "react-router-dom";
import LoginLayout from "./layout/LoginLayout";
import Home from "./pages/home";
import AuthRoute from "./components/AuthRoute";
import UserAccount from "./pages/useraccount";
import ThemeConfig from "./theme";
import ManageUserDestinations from "./components/ManageUserDestinations";
import DestinationWrapper from "./components/destination/DestinationWrapper";
import NotFound from "./components/NotFound";

const App=()=> {
    return (
        <ThemeConfig>
            <Routes>
                <Route path="/" element={<LoginLayout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/useraccount" element={<AuthRoute ><UserAccount/></AuthRoute>}/>
                    <Route path="/mydestinations" element={<AuthRoute ><ManageUserDestinations/></AuthRoute>}/>
                    <Route path="/destination/:destinationId" element={<AuthRoute ><DestinationWrapper/></AuthRoute>}/>
                    <Route path="*" element={<NotFound />} />
                </Route>

            </Routes>
        </ThemeConfig>
    );
}

export default App;
