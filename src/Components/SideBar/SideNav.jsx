import {ThemeContext} from "../../assets/ThemeContext/Theme2.jsx";
import {Sidebar, Menu, MenuItem,useProSidebar } from "react-pro-sidebar";
import {Avatar, IconButton} from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {Link} from 'react-router-dom'
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import {useState} from "react";
import NewExpenditure from "../../views/Expenditures/NewExpenditure.jsx";
import './SideNav.css'

const SideNav = () => {
    const [expenditureCard,setExpenditureCard]=useState(false);
    const { collapseSidebar } = useProSidebar();
    return(
    <ThemeContext.Consumer>{(context)=>{
        const {lightTheme,light,dark}=context;
        const theme=!lightTheme?light:dark;

        const OpenExpenditureCard = () => {
            setExpenditureCard(true)
        }
        const CloseExpenditureCard = () => {
            setExpenditureCard(false);
        }

        return(
            <div style={{display:"flex",height:'100vh',background:theme.bg}}>
                <Sidebar style={{background:theme.bg}}>

                    <Menu style={{background:theme.bg,color:theme.text,height:'100%'}}>

                        <div style={{width:'100%',display:"flex",justifyContent:"end",paddingTop:20}}>
                            <IconButton onClick={() => {collapseSidebar();}}><ClearAllIcon style={{color:theme.text}}/></IconButton>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                            <Avatar style={{height:60,width:60}}>E</Avatar>
                        </div>
                        <hr/>
                        <MenuItem className={"item"} component={<Link to={'/'}/>}  icon={<DashboardIcon/>}>Dashboard</MenuItem>
                        <MenuItem className={"item"} component={<Link to={'/'}/>}  icon={<AnalyticsIcon/>}>Analytics</MenuItem>
                        <hr/>

                        <MenuItem className={"item"} component={<Link to={'/expenditures'}/>} icon={<FormatListBulletedIcon/>}>Expenditures</MenuItem>
                        <MenuItem className={"item"} onClick={OpenExpenditureCard} icon={<AddShoppingCartIcon/>}>New Expenditure</MenuItem>
                        <hr/>
                        <MenuItem className={"item"} component={<Link to={"/calender"}/>} icon={<CalendarMonthIcon/>}>Calender</MenuItem>
                        <MenuItem className={"item"} component={<Link to={'/profile'}/>} icon={<SettingsIcon />}>Settings</MenuItem>
                    </Menu>
                </Sidebar>
                <NewExpenditure open={expenditureCard} handleClose={CloseExpenditureCard}/>
            </div>
        )
    }}

    </ThemeContext.Consumer>
    )
}
export default SideNav;