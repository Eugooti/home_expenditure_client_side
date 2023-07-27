import {ThemeContext} from "../../assets/ThemeContext/Theme2.jsx";
import Image from "../../assets/team-11.jpg";
import {Avatar, Button} from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {useContext, useState} from "react";
import Images from '../../assets/team-11.jpg'
import EditProfile from "./EditProfile.jsx";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {UserContext} from "../../assets/User Context/UserContext.jsx";
import ChangePassword from "./ChangePassword.jsx";
import {Audio} from "react-loader-spinner";

const Profile = () => {
    const [ProfileEdit,setProfileEdit]=useState(false);
    const [editPassword,setEditPassword]=useState(false);

    const User = useContext(UserContext);




    return(

        <ThemeContext.Consumer>{(context)=>{
            const {lightTheme,light,dark}=context;
            const theme=!lightTheme?light:dark;

            const openEditProfile = () => {
                setProfileEdit(true)
            }
            const closeEditProfile = () => {
                setProfileEdit(false);
            }

            const openEditPassword = () => {
                setEditPassword(true)
            }

            const closeEditPassword = () => {
                setEditPassword(false)
            }


            if (!User?.currentUser) {
                return(
                    <div className={"centerAlign"} style={{background:theme.bg,height:'100%',width:'100%',color:theme.text}}>
                        {/*<p>Loading...</p>*/}

                        <Audio height={100} width={100}/>
                    </div>
                )
            }


            return(
                <div style={{background:theme.bg,height:'90%',display:"flex",alignItems:"start",justifyContent:"start",width:'100%'}}>
                    <div style={{padding:'3%',height:'100%',paddingLeft:'2%',width:'90%',display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                        <div style={{width:'40%',paddingRight:'3%',display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                            <div style={{height:'100%',width:'100%'}}>
                                <div className={'card centerAlign'} style={{height:"40%",width:'100%',color:theme.text,background:theme.uiElements}}>
                                    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                        <Avatar style={{height:100, width:100}} >
                                            <img style={{height:'100%',width:'100%'}} src={Image} alt='' />
                                        </Avatar>
                                    </div>
                                    <h4 className="my-3">{User.currentUser.fullName}</h4>                                </div>
                                <div className={'card'} style={{marginTop:'7%',height:"50%",width:'100%',color:theme.text,background:theme.uiElements}}>
                                   <div style={{padding:'5%'}}>
                                       <h2>Social Media</h2>
                                       <hr/>
                                       <div className='row'>
                                           <div className='col-sm-3'>
                                               <p className='mb-0'>
                                                   <FacebookIcon style={{color: '#3b5998'}}/>
                                               </p>
                                           </div>
                                           <div className="col-sm-9">
                                               <p className=" mb-0">{User.currentUser.facebook}</p>
                                           </div>
                                       </div>
                                       <hr/>

                                       <div className='row'>
                                           <div className='col-sm-3'>
                                               <p className='mb-0'>
                                                   <TwitterIcon style={{color: '#55acee'}}/></p>
                                           </div>
                                           <div className="col-sm-9">
                                               <p className=" mb-0">{User.currentUser.twitter}</p>
                                           </div>
                                       </div>
                                       <hr/>
                                       <div className='row'>
                                           <div className='col-sm-3'>
                                               <p className='mb-0'>
                                                   <LinkedInIcon style={{color: '#3b5998'}}/>

                                               </p>
                                           </div>
                                           <div className="col-sm-9">
                                               <p className=" mb-0">{User.currentUser.linkedIn}</p>
                                           </div>
                                       </div>
                                       <hr/>
                                   </div>

                                </div>
                                </div>
                            </div>
                        <div style={{width:'60%',}}>
                            <div style={{background:theme.bg,height:'95%',width:'100%',borderRadius:20}}>
                                <div className={'card'} style={{color:theme.text,background:theme.uiElements,margin:'3%',height:'95%'}}>
                                    <div style={{padding:'5%'}}>
                                        <h3>Social Media</h3>
                                        <hr style={{paddingBottom:35}}/>
                                        <div style={{display:"flex",justifyContent:"space-between"}}>
                                            <div className='col-sm-3'>
                                                <p className='mb-0'>
                                                    <MailIcon/> Email Address
                                                </p>
                                            </div>
                                            <div className="col-sm-7">
                                                <p className=" mb-0">{User.currentUser.emailAddress}</p>
                                            </div>
                                        </div>
                                        <hr style={{paddingBottom:25}}/>
                                        <div style={{display:"flex",justifyContent:"space-between"}}>
                                            <div className='col-sm-3'>
                                                <p className='mb-0'>
                                                    <PhoneIcon/> Phone Number
                                                </p>
                                            </div>
                                            <div className="col-sm-7">
                                                <p className=" mb-0">{User.currentUser.phoneNumber}</p>
                                            </div>
                                        </div>
                                        <hr style={{paddingBottom:25}}/>
                                        <div style={{display:"flex",justifyContent:"space-between"}}>
                                            <div className='col-sm-3'>
                                                <p className='mb-0'>
                                                    <LocationOnIcon/> Location
                                                </p>
                                            </div>
                                            <div className="col-sm-7">
                                                <p className=" mb-0">{User.currentUser.location}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className={"button"} style={{paddingTop:'15%'}}>
                                            <Button style={{background:theme.button,color:'white',borderRadius:15,width:200}} onClick={openEditPassword}  variant={'contained'}>Change Password</Button>
                                            <Button style={{background:theme.button,color:'white',borderRadius:15,width:200}} onClick={openEditProfile} variant={'contained'}>Edit Profile</Button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <EditProfile handleClose={closeEditProfile} open={ProfileEdit}/>
                    <ChangePassword open={editPassword} handleClose={closeEditPassword}/>

                </div>
            )
        }}

        </ThemeContext.Consumer>
    )
}
export default Profile;
