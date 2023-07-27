import {ThemeContext} from "../../assets/ThemeContext/Theme2.jsx";
import TextField from "../../Components/InputGlobals/InputGlobal.jsx";
import {Form, Formik} from "formik";
import {Button, Grid, IconButton, InputAdornment, MenuItem, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from "@mui/icons-material/Key";
import * as Yup from "yup";
import  {useState} from "react";
import Heading from "../../Components/Heading/Heading.jsx";
import SignUpModal from "./SignUpModal.jsx";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import {setLocalStorage} from "../../Utils/localStorage.jsx";




const Login = () => {
    const InitialValues=({
        initialValues:{
            UserName:"",
            Password:"",
        }
    })

    const FormValidation=Yup.object().shape({
        UserName:Yup.string().required("Required"),
        Password:Yup.string().required("Required")
    })

    const handleSubmit = async (Values) => {
        const emailAddress = Values.UserName;
        const password = Values.Password;
        console.log(emailAddress + " " + password);

        try {
            const response = await axios.post("http://localhost:5000/api/login", { emailAddress, password });

            if (response.data.message === "Login successful") {
                setLocalStorage("User", response.data.user); // Log user information

                setLocalStorage('authToken', response.data.authToken)
                window.location.href = '/'
            }
        } catch (error) {
            console.log("errors", error)
        }
    }

    const [register,setRegister]=useState(false);
    const [showPassword,setShowPassword]=useState(false);



    return(
      <ThemeContext.Consumer>{(context)=>{
          const {lightTheme,light,dark}=context;
          const theme=!lightTheme?light:dark;
          const OpenRegister = () => {
            setRegister(true)
          }
          const CloseRegister = () => {
              setRegister(false);
          }

          const ShowHandler=()=>{
              setShowPassword(!showPassword);
          }
          return(
              <div style={{ height:'100%',background:theme.bg,display:"flex",justifyContent:"center",alignItems:"center",color:theme.text}}>
                  <div className={'card'} style={{display:"flex",flexDirection:"column",alignItems:"center",width:400,height:'auto',background:theme.uiElements,position: 'absolute'}}>
                      <Heading title={"Welcome Back!"} subtitle={"Sign in"}/>
                      <Formik  initialValues={{...InitialValues}} onSubmit={handleSubmit} validationSchema={FormValidation}>
                          <Form style={{width:'80%',paddingBottom:'15%'}}>
                              <Grid container={true} spacing={4} >
                                  <Grid item xs={12}>
                                      <TextField
                                          name={"UserName"}
                                          label={"User name"}
                                          placeholder={'test@test.com'}
                                          value={InitialValues.UserName}
                                          type={"email"}
                                          InputProps={{
                                              startAdornment: (
                                                  <InputAdornment position={"start"}><PersonIcon style={{color:theme.text}}/> </InputAdornment>
                                              )
                                          }}
                                      />
                                  </Grid>
                                  <Grid item xs={12}>
                                      <TextField
                                          name={"Password"}
                                          label={"Password"}
                                          placeholder={'Enter Password'}
                                          value={InitialValues.Password}
                                          type={showPassword?'text':'password'}
                                          InputProps={{
                                              startAdornment: (
                                                  <InputAdornment position={"start"}><KeyIcon style={{color:theme.text}}/> </InputAdornment>
                                              ),
                                              endAdornment:(
                                                  <InputAdornment position={"end"}>
                                                      <IconButton aria-label={'password'} onClick={ShowHandler} edge={"end"}>
                                                          {showPassword?<VisibilityOffIcon style={{color:theme.text}}/>:<VisibilityIcon style={{color:theme.text}}/>}
                                                      </IconButton>
                                                  </InputAdornment>
                                              )
                                          }}
                                      />
                                  </Grid>
                                  <Grid  item xs={12}>
                                      <div className={'centerAlign'} style={{gap:10}}>
                                          <Button style={{background:theme.button,color:'white',borderRadius:15,width:300}} fullwidth type={'submit'}>Sign in</Button>
                                          <Button style={{background:theme.uiElements,color:'white',borderRadius:15,width:300}}
                                                  onClick={OpenRegister} variant={'outlined'}
                                          >
                                              Dont have account? sign up
                                          </Button>
                                      </div>

                                  </Grid>
                                  <Grid item xs={12}>

                                  </Grid>
                              </Grid>
                          </Form>
                      </Formik>
                  </div>
                  <SignUpModal handleClose={CloseRegister} open={register}/>
              </div>
          )
      }}

      </ThemeContext.Consumer>
  )
}
export default Login
