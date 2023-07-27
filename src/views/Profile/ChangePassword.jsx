import {ThemeContext} from "../../assets/ThemeContext/Theme2.jsx";
import {Box, Button, Grid, IconButton, InputAdornment, Modal} from "@mui/material";
import Heading from "../../Components/Heading/Heading.jsx";
import * as Yup from "yup"
import {Form, Formik} from "formik";
import TextField from "../../Components/InputGlobals/InputGlobal.jsx";
import KeyIcon from "@mui/icons-material/Key";
import {useContext, useState} from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff.js";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import {UserContext} from "../../assets/User Context/UserContext.jsx";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const ChangePassword = ({open,handleClose}) => {

    const InitialValues=({
        initialValues:{
            oldPassword:"",
            NewPassword:"",
            ConfirmPassword:""
        }
    })

    const Validation=Yup.object().shape({
        oldPassword:Yup.string().required("Required Field"),
        NewPassword:Yup.string().required("Required Field"),
        ConfirmPassword:Yup.string().required("Required Field"),


    })
    const User = useContext(UserContext);
    const value=User.currentUser.id;


    const handleSubmit =async (values) => {
        const initialPassword=values.oldPassword;
        const newPassword=values.NewPassword;

        try {
            const response=await axios.put(`http://localhost:5000/api/password/${value}`,{
                initialPassword,
                newPassword
            })
            if (response.status!==200){
                throw new Error("Failed to update user")
            }
            console.log("Update successful");
            handleClose()

        }catch (e) {
            console.log(e)
        }

    }

    const [showOldPassword,setShowOldPassword]=useState(false);
    const [showNewPassword,setShowNewPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);


    return(
      <ThemeContext.Consumer>{consumer=>{
          const {lightTheme,light,dark}=consumer;
          const theme=!lightTheme?light:dark;

          const style = {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              height: 'auto',
              boxShadow: 24,
              borderRadius: 4,
              p: 4,
          };

          const ShowPassword={
              oldPass:()=>{setShowOldPassword(!showOldPassword)},
              newPassword:()=>{setShowNewPassword(!showNewPassword)},
              ConfirmPass:()=>{setShowConfirmPassword(!showConfirmPassword)}
          }

          return(
              <div style={{background:theme.bgColor}}>
                  <Modal open={open} onClose={handleClose}
                         aria-labelledby="modal-modal-title"
                         aria-describedby="modal-modal-description"
                         >
                      <Box className={'centerAlign'} style={{background:theme.uiElements,color:theme.text}} sx={style}>
                          <Heading title={"Manage Acounnt"} subtitle={"Change Password"}/>

                          <Formik initialValues={{...InitialValues}} onSubmit={handleSubmit} validationSchema={Validation}>
                              <Form>
                                  <Grid container spacing={2}>
                                      <Grid item xs={12}>
                                          <TextField
                                              name={"oldPassword"}
                                              label={"Old Password"}
                                              placeholder={'Enter Password'}
                                              style={{color:theme.text}}
                                              value={InitialValues.oldPassword}
                                              type={showOldPassword?'text':'password'}
                                              InputProps={{
                                                  startAdornment: (
                                                      <InputAdornment position={"start"}><KeyIcon style={{color:theme.text}}/> </InputAdornment>
                                                  ),
                                                  endAdornment:(
                                                      <InputAdornment position={"end"}>
                                                          <IconButton aria-label={'password'} onClick={ShowPassword.oldPass} edge={"end"}>
                                                              {showOldPassword?<VisibilityOffIcon style={{color:theme.text}}/>:<VisibilityIcon style={{color:theme.text}}/>}
                                                          </IconButton>
                                                      </InputAdornment>
                                                  )
                                              }}
                                          />
                                      </Grid>
                                      <Grid item xs={12}>
                                          <TextField
                                              name={"NewPassword"}
                                              label={"New Password"}
                                              placeholder={'Enter Password'}
                                              style={{color:theme.text}}
                                              value={InitialValues.NewPassword}
                                              type={showNewPassword?'text':'password'}
                                              InputProps={{
                                                  startAdornment: (
                                                      <InputAdornment position={"start"}><KeyIcon style={{color:theme.text}}/> </InputAdornment>
                                                  ),
                                                  endAdornment:(
                                                      <InputAdornment position={"end"}>
                                                          <IconButton aria-label={'password'} onClick={ShowPassword.newPassword} edge={"end"}>
                                                              {showNewPassword?<VisibilityOffIcon style={{color:theme.text}}/>:<VisibilityIcon style={{color:theme.text}}/>}
                                                          </IconButton>
                                                      </InputAdornment>
                                                  )
                                              }}
                                          />
                                      </Grid>
                                      <Grid item xs={12}>
                                          <TextField
                                              name={"ConfirmPassword"}
                                              label={"Confirm Password"}
                                              placeholder={'Enter Password'}
                                              style={{color:theme.text}}
                                              value={InitialValues.ConfirmPassword}
                                              type={showConfirmPassword?'text':'password'}
                                              InputProps={{
                                                  startAdornment: (
                                                      <InputAdornment position={"start"}><KeyIcon style={{color:theme.text}}/> </InputAdornment>
                                                  ),
                                                  endAdornment:(
                                                      <InputAdornment position={"end"}>
                                                          <IconButton aria-label={'password'} onClick={ShowPassword.ConfirmPass} edge={"end"}>
                                                              {showConfirmPassword?<VisibilityOffIcon style={{color:theme.text}}/>:<VisibilityIcon style={{color:theme.text}}/>}
                                                          </IconButton>
                                                      </InputAdornment>
                                                  )
                                              }}
                                          />
                                      </Grid>
                                      <Grid className={'centerAlign'} item xs={12}>
                                          <Button style={{background:theme.button,color:'white',borderRadius:15,width:200}} variant={'contained'} type={'submit'}>Save Changes</Button>
                                      </Grid>

                                  </Grid>
                              </Form>
                          </Formik>

                      </Box>
                  </Modal>
              </div>
          )

      }}

      </ThemeContext.Consumer>
  )
}
export default ChangePassword;
