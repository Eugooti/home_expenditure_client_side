import { Box, Button, Grid, Modal } from '@mui/material';
import Heading from '../../Components/Heading/Heading.jsx';
import { Form, Formik } from 'formik';
import TextField from '../../Components/InputGlobals/InputGlobal.jsx';
import DatePickerWrapper from '../../Utils/DatePickerConfig.jsx';
import { ThemeContext } from '../../assets/ThemeContext/Theme2.jsx';
import * as Yup from "yup";
import {getFromLocalStorage} from "../../Utils/localStorage.jsx";
import axios from "axios";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const EventModal = ({ open, handleClose }) => {

    const ValidationSchema=Yup.object().shape({
        title: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        Start: Yup.string().required("Required"),
        End: Yup.string().required("Required"),
    })

    const initialValues = {
        title: '',
        description: '',
        Start: "",
        End: "",
    };

    const [loading, setLoading] = useState(false); // Add this state for loading indication

    const HandleClick = async (values) => {
        setLoading(true); // Set loading state to true before making the API call
        const CreatedBy = getFromLocalStorage('User');
        const title = values.title;
        const description = values.description;
        const start = values.Start;
        const end = values.End;
        const createdBy = CreatedBy.emailAddress;

        try {
            const response = await axios.post('http://localhost:5000/api/event', {
                title,
                description,
                start,
                end,
                createdBy:createdBy,
            });

            if (response.status === 201) {
                console.log('Created event:', response.data);
                handleClose();
            } else {
                throw new Error('Failed to create event');
            }
        } catch (e) {
            console.log('Error Adding Event', e);
            // Show error message to the user here, you can use a toast or an alert for simplicity
        } finally {
            setLoading(false); // Set loading state to false after API call (success or failure)
        }
        console.log('Values', values);
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
                    width: 400,
                    height: 'auto',
                    boxShadow: 24,
                    borderRadius: 4,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    background: theme.bg,
                    color: theme.text,
                };

                return (
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Heading title={'Manage Events'} subtitle={'Add Event'} />

                            <Formik initialValues={initialValues} validationSchema={ValidationSchema} onSubmit={HandleClick}>
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="title"
                                                label="Title"
                                                placeholder="School"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="description"
                                                label="Description"
                                                placeholder="Write Here"
                                                multiline
                                            />
                                        </Grid>
                                        <Grid className={"centerAlign"} item xs={6} sm={12}>
                                            <DatePickerWrapper label="Start" name="Start" />
                                        </Grid>
                                        <Grid className={"centerAlign"} item xs={12} sm={12}>
                                            <DatePickerWrapper  label="End" name="End" />
                                        </Grid>
                                        <Grid className={'centerAlign'} xs={12} item>
                                            <Button style={{background:theme.button,color:'white',borderRadius:15,width:200}} type="submit">Save</Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            </Formik>
                        </Box>
                    </Modal>
                );
            }}
        </ThemeContext.Consumer>
    );
};

export default EventModal;
