import { Formik, Form, Field } from "formik";
import { TextField, Button, Grid, MenuItem, Modal, Box } from "@mui/material";
import Heading from "../../../Components/Heading/Heading.jsx";
import { useEffect, useState } from "react";
import { getFromLocalStorage, removeItem } from "../../../Utils/localStorage.jsx";
import * as Yup from "yup";
import axios from "axios";
import { ThemeContext } from "../../../assets/ThemeContext/Theme2.jsx";

// eslint-disable-next-line react/prop-types
const UpdateExpenditure = ({ open, handleClose }) => {
    const OneExpenditure = getFromLocalStorage("Row");

    const initialValues = {
        Expenditure: OneExpenditure && OneExpenditure.name ? OneExpenditure.name : "",
        Category: OneExpenditure && OneExpenditure.category ? OneExpenditure.category : "",
        cost: OneExpenditure && OneExpenditure.cost ? OneExpenditure.cost : "",
    };

    const validationSchema = Yup.object().shape({
        Expenditure: Yup.string().required("Required"),
        cost: Yup.string().required("Required"),
    });

    const handleSubmit = async (values) => {
        const id2=OneExpenditure.id
        const name=values.Expenditure;
        const category=values.Category
        const cost=values.cost;
        try {
            const response = await axios.put(`http://localhost:5000/api/expenditures/${id2}`, {
                name,
                category,
                cost
            });

            if (response.status !== 200) {
                throw new Error("Failed to update expenditure");
            }

            console.log("Update successful");
            handleClose()
            // Perform any additional actions after successful update

        } catch (error) {
            console.log("Error:", error);
            // Handle the error appropriately
        }
    };

    const deleteExpenditure = async () => {
        const id = OneExpenditure.id;
        console.log(id);

        try {
            const response = await axios.delete(`http://localhost:5000/api/expenditures/${id}`);

            if (response.status !== 200) {
                throw new Error("Failed to delete expenditure");
            }

            console.log("Deletion successful");
            handleClose();
            removeItem("Row");
            // Perform any additional actions after successful deletion
        } catch (error) {
            console.log("Error:", error);
            // Handle the error appropriately
        }
    };

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/categories");
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <ThemeContext.Consumer>
            {(context) => {
                const { lightTheme, light, dark } = context;
                const theme = !lightTheme ? light : dark;

                const style = {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "35%",
                    bgcolor: theme.bg,
                    boxShadow: 24,
                    borderRadius: 6,
                    p: 4,
                    color: theme.text,
                };

                return (
                    <Modal
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        open={open}
                    >
                        <Box sx={style}>
                            <Heading title="Manage Expenditure" subtitle="Update or Delete Expenditure" />
                            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Field name="Expenditure">
                                                {({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        label="Expenditure Name"
                                                        placeholder="Tour"
                                                    />
                                                )}
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field name="Category">
                                                {({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        select
                                                        variant="outlined"
                                                        fullWidth
                                                        label="Category"
                                                        placeholder="Leisure"
                                                    >
                                                        {categories.map((item, index) => (
                                                            <MenuItem key={index} value={item.name}>
                                                                {item.name}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                )}
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field name="cost">
                                                {({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        label="Cost"
                                                        placeholder="1000"
                                                    />
                                                )}
                                            </Field>
                                        </Grid>
                                        <Grid style={{display:'flex',flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingLeft:35,paddingRight:30}} item xs={12}>
                                            <Button style={{background:theme.button,color:'white',borderRadius:15,width:200}}variant={"contained"} type="submit">Update</Button>
                                            <Button style={{background:theme.button,color:'white',borderRadius:15,width:200}} variant={"contained"}  onClick={deleteExpenditure}>Delete</Button>
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

export default UpdateExpenditure;
