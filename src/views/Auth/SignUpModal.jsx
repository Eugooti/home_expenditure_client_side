import {useState} from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from "../../assets/ThemeContext/Theme2.jsx";
import {Box, Grid, IconButton, InputAdornment, Modal,} from "@mui/material";
import Heading from "../../Components/Heading/Heading.jsx";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as Yup from "yup";
import {Form, Formik} from "formik";
import TextField from "../../Components/InputGlobals/InputGlobal.jsx";
import PersonIcon from "@mui/icons-material/Person.js";
import KeyIcon from "@mui/icons-material/Key.js";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "../../Components/InputGlobals/Button.jsx";
import axios from "axios";

const SignUpModal = ({ open, handleClose }) => {
    const InitialValues=({
        initialValues:{
            FullName:"",
            UserName:"",
            Phone:"",
            Location:"",
            Password:"",
            confirmPassword:""
        }
    })

    const FormValidation=Yup.object().shape({
        UserName:Yup.string().required("Required"),
        Password:Yup.string().required("Required"),
        Phone: Yup.string().required('Required').matches(/^(?:\+254|0)[1-9]\d{8}$/,"Enter a valid phone number"),
        Location:Yup.string().required("Required"),
        FullName:Yup.string().required("Required"),
        confirmPassword: Yup.string().required('Required')
            .oneOf([Yup.ref('Password'), ""], 'Passwords must match'),
    })

    const handleSubmit = async (Values) => {
        // const { fullName, emailAddress, phoneNumber, location, password }
        const fullName=Values.FullName;
        const emailAddress=Values.UserName;
        const phoneNumber=Values.Phone;
        const location=Values.Location;
        const password=Values.Password;
        try {
            const response=await axios.post('http://localhost:5000/api/users',{fullName, emailAddress, phoneNumber, location, password});

            if (response.status!==201){
                throw new Error('Failed to create user');
            }
            console.log('Created category:', response.data.users);
            handleClose();
        }catch (error){
            console.error('Error creating user:', error)
        }
    }

    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);



    return (
        <ThemeContext.Consumer>
            {(context) => {
                const { lightTheme, light, dark } = context;
                const theme = !lightTheme ? light : dark;
                const style = {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '40%',
                    height: 'auto',
                    boxShadow: 24,
                    borderRadius: 4,
                    p: 4,
                };

                const ShowHandler=()=>{
                    setShowPassword(!showPassword);
                }
                const ShowConfirmHandler=()=>{
                    setShowConfirmPassword(!showConfirmPassword);
                }
                return (
                    <div style={{ background: theme.bg }}>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box style={{display:"flex",flexDirection:"column",alignItems:"center",background:theme.uiElements,color:theme.text}} sx={style}>
                                <Heading title={"Welcome"} subtitle={"Create Account"} />
                                <Formik  initialValues={{...InitialValues}} onSubmit={handleSubmit} validationSchema={FormValidation}>
                                    <Form style={{width:'95%',paddingBottom:'5%'}}>
                                        <Grid container={true} spacing={2} >
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    name={"FullName"}
                                                    label={"Full name"}
                                                    placeholder={'Enter Name'}
                                                    style={{color:theme.text}}
                                                    value={InitialValues.FullName}
                                                    type={"text"}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position={"start"}><PersonIcon style={{color:theme.text}}/> </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    name={"UserName"}
                                                    label={"Email Address"}
                                                    placeholder={'test@test.com'}
                                                    value={InitialValues.UserName}
                                                    type={"email"}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position={"start"}><MailIcon style={{color:theme.text}}/> </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    name={"Phone"}
                                                    label={"Phone Number"}
                                                    placeholder={'Enter Phone'}
                                                    value={InitialValues.Phone}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position={"start"}><PhoneIcon style={{color:theme.text}}/> </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    name={"Location"}
                                                    label={"Location"}
                                                    placeholder={'Enter Location'}
                                                    value={InitialValues.Location}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position={"start"}><LocationOnIcon style={{color:theme.text}}/> </InputAdornment>
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
                                            <Grid item xs={12}>
                                                <TextField
                                                    name={"confirmPassword"}
                                                    label={"confirm Password"}
                                                    placeholder={'Enter Password'}
                                                    value={InitialValues.confirmPassword}
                                                    type={showConfirmPassword?'text':'password'}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position={"start"}><KeyIcon style={{color:theme.text}}/> </InputAdornment>
                                                        ),
                                                        endAdornment:(
                                                            <InputAdornment position={"end"}>
                                                                <IconButton aria-label={'password'} onClick={ShowConfirmHandler} edge={"end"}>
                                                                    {showConfirmPassword?<VisibilityOffIcon style={{color:theme.text}}/>:<VisibilityIcon style={{color:theme.text}}/>}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Button style={{background:theme.button,color:'white',borderRadius:15}} fullwidth type={'submit'}>Register</Button>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                </Formik>

                            </Box>
                        </Modal>
                    </div>
                );
            }}
        </ThemeContext.Consumer>
    );
};

SignUpModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default SignUpModal;
