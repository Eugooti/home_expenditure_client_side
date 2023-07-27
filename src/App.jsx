import './App.css'
import ThemeContextProvider from "./assets/ThemeContext/Theme2.jsx";
import UpBar from "./Components/UpBar/UpBar.jsx";
import DashboardHome from "./views/Dashboard/Dashboard.jsx";
import Login from "./views/Auth/Login.jsx";
import { Route, Routes} from "react-router-dom";
import Profile002 from "./views/Profile/Profile002.jsx";
import SideNav from "./Components/SideBar/SideNav.jsx";
import ExpenditureList from "./views/Expenditures/ExpenditureList.jsx";
import {useEffect, useState} from "react";
import {getFromLocalStorage} from "./Utils/localStorage.jsx";
import CalenderScheduler from "./views/Calender/Calender.jsx";
import Profile from "./views/Profile/Profile.jsx";
// import "react-loader-spinner/dist/loader/css/react-loader-loader.css";




function App() {

    const [User,SetUser]=useState({});

    useEffect(()=>{
        SetUser(getFromLocalStorage("authToken"))
    },[])


    return (
    <ThemeContextProvider>
        {User===null?<Login/>:
        <div className={'app'}>
            <SideNav/>
            <main className="content">
                <UpBar/>

                    <Routes>
                        <Route exact path={'/'} element={<DashboardHome/>}/>
                        <Route exact path={'profile'} element={<Profile/>}/>
                        <Route exact path={'/expenditures'} element={<ExpenditureList/>}/>
                        <Route exact path={"/calender"} element={<CalenderScheduler/>}/>
                    </Routes>

            </main>
        </div>}


    </ThemeContextProvider>
  )
}

export default App
