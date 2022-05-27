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
import AddDestinationForm from "./components/destination/AddDestinationForm";
import NewDestinationFormWrapper from "./components/destination/NewDestinationFormWrapper";

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
                    <Route path="/newdestination" element={<AuthRoute ><NewDestinationFormWrapper/></AuthRoute>}/>
                </Route>

            </Routes>
        </ThemeConfig>
    );
}

export default App;
