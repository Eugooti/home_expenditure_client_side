import {useContext} from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from "../../assets/ThemeContext/Theme2.jsx";
import {Box, Grid, InputAdornment, Modal,Button,TextField} from "@mui/material";
import Heading from "../../Components/Heading/Heading.jsx";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import PersonIcon from "@mui/icons-material/Person.js";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {UserContext} from "../../assets/User Context/UserContext.jsx";
import axios from "axios";


const EditProfile = ({ open, handleClose }) => {

    const User = useContext(UserContext);

    const value=User.currentUser;

    const InitialValues={
            FullName:value && value.fullName?value.fullName:"",
            UserName:value && value.emailAddress?value.emailAddress:"",
            Phone:value && value.phoneNumber?value.phoneNumber:"",
            Location:value && value.location?value.location:"",
            facebook:value && value.facebook?value.facebook:"",
            twitter:value && value.twitter?value.twitter:"",
            linkedin: value && value.linkedIn?value.linkedIn:"",

    }

    const FormValidation=Yup.object().shape({
        UserName:Yup.string().required("Required"),
        Phone: Yup.string().required('Required').matches(/^(?:\+254|0)[1-9]\d{8}$/,"Enter a valid phone number"),
        Location:Yup.string().required("Required"),
        FullName:Yup.string().required("Required"),
        facebook:Yup.string().required("Required"),
        twitter:Yup.string().required("Required"),
        linkedin:Yup.string().required("Required"),


    })

    const handleSubmit = async (Values) => {
        const id=value.id;
        const fullName=Values.FullName;
        const emailAddress=Values.UserName;
        const phoneNumber=Values.Phone;
        const location=Values.Location;
        const facebook=Values.facebook;
        const twitter=Values.twitter;
        const linkedIn=Values.linkedin;


        try {
            const response=await axios.put(`http://localhost:5000/api/user/${id}`,{
                fullName,
                emailAddress,
                phoneNumber,
                location,
                facebook,
                twitter,
                linkedIn
            });


            if (response.status !== 200) {
                throw new Error("Failed to update user");
            }

            console.log("Update successful");
            handleClose()
            window.location.href='/profile'


        }catch (e) {
            console.log("Error",e)
        }

    };




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
                    width: 450,
                    height: 'auto',
                    boxShadow: 24,
                    borderRadius: 4,
                    p: 4,
                };


                return (
                    <div style={{ background: theme.bg }}>
                        <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                        >
                            <Box className={'centerAlign'} style={{background:theme.uiElements,color:theme.text}} sx={style}>
                                <Heading title={"Manage Account"} subtitle={"Edit Profile"} />
                                <Formik
                                    initialValues={{...InitialValues}}
                                    onSubmit={handleSubmit} validationSchema={FormValidation}>
                                    <Form style={{width:'95%',paddingBottom:'5%'}}>
                                        <Grid container={true} spacing={2} >
                                            <Grid item xs={12}>

                                                <Field name="FullName">
                                                    {({field})=>(
                                                        <TextField
                                                            {...field}
                                                            variant={"outlined"}
                                                            fullWidth
                                                            label="Full Name"
                                                            placeholder='Jane Doe'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position={"start"}><PersonIcon style={{color:theme.text}}/> </InputAdornment>
                                                                )
                                                            }}
                                                        />
                                                    )}
                                                </Field>

                                            </Grid>
                                            <Grid item xs={12}>

                                                <Field name="UserName">
                                                    {({field})=>(
                                                        <TextField
                                                            {...field}
                                                            variant={"outlined"}
                                                            fullWidth
                                                            label="Full Name"
                                                            placeholder='Jane Doe'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position={"start"}><MailIcon style={{color:theme.text}}/> </InputAdornment>
                                                                )
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </Grid>
                                            <Grid item xs={6}>

                                                <Field name="Phone">
                                                    {({field})=>(
                                                        <TextField
                                                            {...field}
                                                            variant={"outlined"}
                                                            fullWidth
                                                            label="Full Name"
                                                            placeholder='Jane Doe'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position={"start"}><PhoneIcon style={{color:theme.text}}/> </InputAdornment>
                                                                )
                                                            }}
                                                        />
                                                    )}
                                                </Field>

                                            </Grid>
                                            <Grid item xs={6}>

                                                <Field name="Location">
                                                    {({field})=>(
                                                        <TextField
                                                            {...field}
                                                            variant={"outlined"}
                                                            fullWidth
                                                            label="Full Name"
                                                            placeholder='Jane Doe'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position={"start"}><LocationOnIcon style={{color:theme.text}}/> </InputAdornment>
                                                                )
                                                            }}
                                                        />
                                                    )}
                                                </Field>

                                            </Grid>
                                            <Grid item xs={6}>

                                                <Field name="facebook">
                                                    {({field})=>(
                                                        <TextField
                                                            {...field}
                                                            variant={"outlined"}
                                                            fullWidth
                                                            label="Full Name"
                                                            placeholder='Jane Doe'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position={"start"}><FacebookIcon style={{color:theme.text}}/> </InputAdornment>
                                                                )
                                                            }}
                                                        />
                                                    )}
                                                </Field>

                                            </Grid>
                                            <Grid item xs={6}>

                                                <Field name="twitter">
                                                    {({field})=>(
                                                        <TextField
                                                            {...field}
                                                            variant={"outlined"}
                                                            fullWidth
                                                            label="Full Name"
                                                            placeholder='Jane Doe'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position={"start"}><TwitterIcon style={{color:theme.text}}/> </InputAdornment>
                                                                )
                                                            }}
                                                        />
                                                    )}
                                                </Field>

                                            </Grid>
                                            <Grid item xs={12}>

                                                <Field name="linkedin">
                                                    {({field})=>(
                                                        <TextField
                                                            {...field}
                                                            variant={"outlined"}
                                                            fullWidth
                                                            label="Full Name"
                                                            placeholder='Jane Doe'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position={"start"}><LinkedInIcon style={{color:theme.text}}/> </InputAdornment>
                                                                )
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </Grid>



                                            <Grid item xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                                <Button style={{background:theme.button,color:'white',borderRadius:15,width:200}} variant={'contained'} type={'submit'}>Save Changes</Button>
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

EditProfile.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default EditProfile;
