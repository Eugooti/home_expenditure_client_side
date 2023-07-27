import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {Avatar, Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Image from "../../assets/team-11.jpg";
import {ThemeContext} from "../../assets/ThemeContext/Theme2.jsx";
import './Profile.css'
import {useContext, useState} from "react";
import EditProfile from "./EditProfile.jsx";
import ChangePassword from "./ChangePassword.jsx";
import {UserContext} from "../../assets/User Context/UserContext.jsx";

const Profile002 = () => {

    const [ProfileEdit,setProfileEdit]=useState(false);
    const [editPassword,setEditPassword]=useState(false);

    const User = useContext(UserContext);




    const userprofile={
        name1:"John",
        name2:"Smith",
        course:"Software Engineering",
        collage:"Kisii University",
        email:"Johnathan@gmail.com",
        phone:"+254 723242526",
        year:"One",
        facebook:"John Smith",
        twitter:"@JohnSmith",
        linkedin:"John Smith"

    }
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
                        <p>Loading...</p>

                    </div>
                )
            }

            return(
                <div style={{background:theme.bg,height:'100%'}}>
                    <Container className={'profile'} style={{paddingTop:'2%'}}>
                        <div className='row'>
                            <div  className='col-lg-4'>
                                <div style={{background:theme.uiElements,color:theme.text}}  className='card mb-4'>
                                    <div  className='centerAlign card-body text-center'>
                                        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                            <Avatar style={{height:80, width:80}} >
                                                <img style={{height:'100%',width:'100%'}} src={Image} alt='' />
                                            </Avatar>
                                        </div>
                                        <h5 className="my-3">{User.currentUser.fullName}</h5>
                                    </div>
                                </div>
                                <div style={{background:theme.uiElements,color:theme.text}} className='card mb-4 mb-lg-0'>
                                    <div  className='card-body p-3'>
                                        <h3>Social Media</h3>
                                        <hr/>
                                        <div className='row'>
                                            <div className='col-sm-3'>
                                                <p className='mb-0'>
                                                    <FacebookIcon style={{color: '#3b5998'}}/>
                                                </p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className=" mb-0">{userprofile.facebook}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className='row'>
                                            <div className='col-sm-3'>
                                                <p className='mb-0'>
                                                    <TwitterIcon style={{color: '#55acee'}}/></p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className=" mb-0">{userprofile.twitter}</p>
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
                                                <p className=" mb-0">{userprofile.linkedin}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                    </div>
                                </div>
                            </div>



                            <div className='col-lg-8'>
                                <div style={{background:theme.uiElements,color:theme.text}}  className='card mb-4 p-3'>
                                    <h3 >Account details</h3>
                                    <hr style={{paddingBottom:35}}/>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-sm-3'>
                                                <p className='mb-0'>
                                                    Email Address
                                                </p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className=" mb-0">{User.currentUser.emailAddress}</p>
                                            </div>
                                        </div>
                                        <hr style={{paddingBottom:20}}/>
                                        <div className='row'>
                                            <div className='col-sm-3'>
                                                <p className='mb-0'>
                                                    Phone Number
                                                </p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className=" mb-0">{User.currentUser.phoneNumber}</p>
                                            </div>
                                        </div>
                                        <hr style={{paddingBottom:20}}/>
                                        <div className='row'>
                                            <div className='col-sm-3'>
                                                <p className='mb-0'>
                                                    Location
                                                </p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className=" mb-0">{User.currentUser.location}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className={"button"} style={{paddingTop:40}}>
                                            <Button style={{background:theme.button,color:'white',borderRadius:15,width:200}} onClick={openEditPassword}  variant={'contained'}>Change Password</Button>
                                            <Button style={{background:theme.button,color:'white',borderRadius:15,width:200}} onClick={openEditProfile} variant={'contained'}>Edit Profile</Button>

                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </Container>
                    <EditProfile handleClose={closeEditProfile} open={ProfileEdit}/>
                    <ChangePassword open={editPassword} handleClose={closeEditPassword}/>

                </div>
            )
        }}

        </ThemeContext.Consumer>

    )

}
export default Profile002
