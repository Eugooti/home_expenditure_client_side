import {ThemeContext} from "../../assets/ThemeContext/Theme2.jsx";
import {Box, Button, Grid,  MenuItem, Modal} from "@mui/material";
import Heading from "../../Components/Heading/Heading.jsx";
import PropTypes from "prop-types";
import {Form, Formik} from "formik";
import TextField from "../../Components/InputGlobals/InputGlobal.jsx";
import * as Yup from 'yup'
import {useEffect, useState} from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const NewExpenditure = ({open,handleClose}) => {
    const [categories,setCategories]=useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/categories');
                const data = await response.json();
                // console.log(data.categories);
                setCategories(data.categories)
            } catch (error) {
                console.error('Failed to fetch expenditures:', error);
            }
        };

        fetchCategories();
    }, []);


    const InitialValues=({
        initialValues:{
            Expenditure:"",
            Category:"",
            cost:""
        }
    })

    const validationSchema=Yup.object().shape({
        Expenditure:Yup.string().required("Required"),
        cost:Yup.string().required("Required"),
    })

    const HandleSubmit = async (values) => {
        console.log(values)
      const name=values.Expenditure;
      const category=values.Category;
      const cost=values.cost;

      try {
          const response=await axios.post('http://localhost:5000/api/expenditures',{name,category,cost});

          if (response.status!==201){
              throw new Error('Failed to create expenditure')
          }

          console.log('Created expenditure:', response.data.expenditure)
          handleClose()

      }catch (error){
          console.log("Error Adding Category",error)
      }
    }



    return(
        <ThemeContext.Consumer>{(context)=>{
            const {lightTheme,light,dark}=context;
            const theme=!lightTheme?light:dark;

            const Style = {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '35%',
                bgcolor: theme.bg,
                boxShadow: 24,
                borderRadius:6,
                p: 4,
                color:theme.text,
            };

            return(
                <div>
                    <Modal
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        open={open}>
                        <Box sx={Style}>
                            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:'100%'}}>
                                <Heading title={"Manage Expenditures"} subtitle={"Add Expenditure"}/>

                                <Formik initialValues={{...InitialValues}} onSubmit={HandleSubmit} validationSchema={validationSchema}>
                                    <Form>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant={"outlined"}
                                                    fullWidth={true}
                                                    name={'Expenditure'}
                                                    label={'Expenditure Name'}
                                                    placeholder={'Tour'}
                                                    value={InitialValues.Expenditure}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    select={true}
                                                    fullWidth={true}
                                                    name={"Category"}
                                                    label={"Category"}
                                                    placeholder={"Leisure"}
                                                    value={InitialValues.Category}

                                                >
                                                    {categories.map((item,index)=>(
                                                        <MenuItem value={item.name} key={index}>
                                                            {item.name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant={"outlined"}
                                                    fullWidth={true}
                                                    name={'cost'}
                                                    label={'cost'}
                                                    placeholder={'1000'}
                                                    value={InitialValues.cost}
                                                />
                                            </Grid>
                                            <Grid item xs={12} style={{display:"flex",justifyContent:"end",alignItems:"center"}}>
                                                <Button type={'submit'} style={{background:theme.button,color:'white',borderRadius:15,width:200}} variant={'contained'} >Save</Button>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                </Formik>
                            </div>
                        </Box>
                    </Modal>
                </div>
            )
        }}

        </ThemeContext.Consumer>
    )

}

NewExpenditure.prototype={
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}
export default NewExpenditure;
