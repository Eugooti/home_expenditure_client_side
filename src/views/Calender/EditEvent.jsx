import {ThemeContext} from "../../assets/ThemeContext/Theme2.jsx";
import {Box, Button, Grid, Modal, TextField} from "@mui/material";
import Heading from "../../Components/Heading/Heading.jsx";
import {getFromLocalStorage} from "../../Utils/localStorage.jsx";
import * as Yup from "yup";
import {Formik, Form, Field} from "formik";
import DatePickerWrapper from '../../Utils/DatePickerConfig.jsx';
import axios from "axios";


// eslint-disable-next-line react/prop-types
const EditEvent = ({ open, handleClose }) => {

    const Event=getFromLocalStorage("Event")


    const InitialValues={
        title:Event&&Event.title?Event.title:"",
        description: Event&&Event.description?Event.description:"",
        Start: Event&&Event.Start?Event.Start:"",
        End: Event&&Event.End?Event.End:"",
    }

    const ValidationSchema=Yup.object().shape({
        title: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        Start: Yup.string().required("Required"),
        End: Yup.string().required("Required"),
    })

    const handleSubmit = async (values) => {
        const id=Event.id;
        const title=values.title;
        const description=values.description;
        const start=values.Start;
        const end=values.End;

        // console.log(title+" "+description+" "+start+" "+end+" "+id);

        try {

            const response=await axios.put(`http://localhost:5000/api/events/${id}`,{
                title:title,
                description:description,
                start:start,
                end:end,
            })

            if (response.status !== 200) {
                throw new Error("Failed to update event");
            }

            console.log("Update successful");
            handleClose()

        }catch (e) {
            console.log(e)
        }

    }

    return(
        <ThemeContext.Consumer>{(context)=>{
            const {lightTheme,light,dark}=context;
            const theme=!lightTheme?light:dark;

            const style = {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 470,
                height: 'auto',
                boxShadow: 24,
                borderRadius: 4,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                background: theme.bg,
                color: theme.text,
            };

            return(
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Heading title={'Manage Events'} subtitle={'Update Event'} />

                        <Formik initialValues={InitialValues} validationSchema={ValidationSchema} onSubmit={handleSubmit}>
                            <Form style={{width:'95%',paddingBottom:'5%'}}>
                                <Grid  container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field name={"title"}>
                                            {({field})=>(
                                                <TextField
                                                    {...field}
                                                    variant={"outlined"}
                                                    fullWidth
                                                    helperText={"Required"}
                                                    label="Title"
                                                    placeholder='Enter title'
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name={"description"}>
                                            {({field})=>(
                                                <TextField
                                                    {...field}
                                                    variant={"outlined"}
                                                    fullWidth
                                                    helperText={"Required"}
                                                    multiline={true}
                                                    label="Description"
                                                    placeholder='Enter description'
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid className={'centerAlign'} item xs={12}>
                                        <Field name={"Start"}>
                                            {({field})=>(
                                                <DatePickerWrapper
                                                    {...field}
                                                    variant={"outlined"}
                                                    fullWidth
                                                    label="Start Date"
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid className={'centerAlign'} item xs={12}>
                                        <Field name={"End"}>
                                            {({field})=>(
                                                <DatePickerWrapper
                                                    {...field}
                                                    variant={"outlined"}
                                                    fullWidth
                                                    label="End Date"
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid className={'centerAlign'} item xs={12}>
                                        <Button style={{background:theme.button,color:'white',borderRadius:15,width:200}} variant={'contained'} type={'submit'}>Save Changes</Button>
                                    </Grid>

                                </Grid>
                            </Form>
                        </Formik>

                    </Box>

                </Modal>
            )
        }}

        </ThemeContext.Consumer>
    )

}
export default EditEvent;
