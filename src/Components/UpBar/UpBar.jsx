import {ThemeContext} from "../../assets/ThemeContext/Theme2.jsx";
import logo from "../../assets/EXpenditure.svg"
import {useContext, useState} from "react";
import {Avatar, Badge, IconButton, MenuItem, Typography} from "@mui/material"
import Tooltip from "@mui/material/Tooltip";
import Box from '@mui/material/Box';
import Menu from "@mui/material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import ToggleBtn from "../SideBar/ToggleBtn.jsx";
import Dp from "../../assets/team-11.jpg"
import {Container} from "react-bootstrap";
import {logout} from "../../views/Auth/Auth.js";
import {UserContext} from "../../assets/User Context/UserContext.jsx";


const UpBar = () => {

    const User = useContext(UserContext);

    const [anchorElNotification, setAnchorElNotification] = useState(null);
    const [AnchorElUser, setAnchorElUser] = useState(null);
    const settings = [
        {Title: User && User.currentUser.emailAddress?User.currentUser.emailAddress:""},
        {Title:"Logout",OnClick:logout},
    ];



    return(
        <ThemeContext.Consumer>{(context)=>{
            const {lightTheme,light,dark}=context;
            const theme=!lightTheme?light:dark;

            const handleOpenNotificationMenu = (event) => {
                setAnchorElNotification(event.currentTarget);
            };
            const handleCloseNotificationMenu = () => {
                setAnchorElNotification(null);
            };

            const handleOpenUserMenu = (event) => {
                setAnchorElUser(event.currentTarget);
            };

            const handleCloseUserMenu = () => {
                setAnchorElUser(null);
            };

            return(
                <div style={{color:theme.text,background:theme.bg,height:"10%",width:'100%'}}>
                  <Container style={{display:"flex",flexDirection:"row" ,justifyContent:"space-between",alignItems:"center"}}>
                   <div>
                       <img style={{width:200}} src={logo} alt={"logo"}/>

                   </div>
                    <div style={{width:"30%",display:"flex",justifyContent:"center",alignItems:"center",gap:'7%'}}>
                        <ToggleBtn/>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip  title="Open notification">
                                <IconButton onClick={handleOpenNotificationMenu} sx={{ p: 0 }}>
                                    <Badge badgeContent={3} color={'error'}><MailIcon style={{color:theme.text}}/></Badge>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElNotification}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElNotification)}
                                onClose={handleCloseNotificationMenu}
                            >
                                <MenuItem >Eugene</MenuItem>
                                <MenuItem >Eugene</MenuItem>
                                <MenuItem >Eugene</MenuItem>
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip  title="Open notification">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar src={Dp}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={AnchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(AnchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <div>
                                    {settings.map((setting,index) => (
                                        <MenuItem  key={index} onClick={handleCloseUserMenu}>
                                            <Typography onClick={setting.OnClick} textAlign="center">{setting.Title}</Typography>
                                        </MenuItem>
                                    ))}
                                </div>

                            </Menu>
                        </Box>
                    </div>
                  </Container>
                </div>
            )
        }}

        </ThemeContext.Consumer>
    )

}
export default UpBar;
