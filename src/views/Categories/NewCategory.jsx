import {ThemeContext} from "../../assets/ThemeContext/Theme2.jsx";
import {Box, Button, Grid, Modal} from "@mui/material";
import {Form, Formik} from "formik";
import * as Yup from 'yup'
import TextField from "../../Components/InputGlobals/InputGlobal.jsx";
import Heading from "../../Components/Heading/Heading.jsx";
import PropTypes from "prop-types";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const NewCategory = ({open,handleClose}) => {

    const InitialValues=({
        initialValues:{
            CategoryName:"",
            Description:""
        }
    })
    const validationSchema=Yup.object().shape({
        CategoryName:Yup.string().required("Required"),
        Description:Yup.string().required("Required"),
    })

    const handleSubmit = async (values) => {
      console.log(values.CategoryName+" "+values.Description);
      const name=values.CategoryName;
      const description=values.Description;
        try {
            const response = await axios.post('http://localhost:5000/api/category', {name,description});

            if (response.status !== 201) {
                throw new Error('Failed to create category');
            }
            // Handle the created category object
            console.log('Created category:', response.data.category);
            handleClose();
            window.location.href='/'
        } catch (error) {
            // Handle the error
            console.error('Error creating category:', error);
        }
    }

  return(
      <ThemeContext.Consumer>{(context)=>{
          const { lightTheme, light, dark } = context;
          const theme = !lightTheme ? light : dark;
          const style = {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              height: 'auto',
              boxShadow: 24,
              borderRadius: 4,
              p: 4,
          };
          return(
              <div style={{ background: theme.bg }}>
              <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
              >
                  <Box sx={style} style={{display:"flex",flexDirection:"column",alignItems:"center",background:theme.bg,color:theme.text}}>
                      <Heading title={'Manage Categories'} subtitle={'Add category'}/>
                      <Formik initialValues={{...InitialValues}} onSubmit={handleSubmit} validationSchema={validationSchema}>
                          <Form>
                              <Grid container={true} spacing={2}>
                                  <Grid item xs={12}>
                                      <TextField
                                          name={'CategoryName'}
                                          label={'Category Name'}
                                          placeholder={'Food'}
                                          value={InitialValues.CategoryName}
                                      />
                                  </Grid>
                                  <Grid item xs={12}>
                                      <TextField
                                          name={'Description'}
                                          label={'Description'}
                                          placeholder={'Enter Description'}
                                          value={InitialValues.Description}
                                          multiline={true}
                                      />
                                  </Grid>
                                  <Grid item xs={12} style={{display:"flex",justifyContent:"end",alignItems:"center"}}>
                                      <Button type={'submit'} style={{background:theme.button,color:'white',borderRadius:15,width:200}} variant={'contained'}>Save </Button>
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
NewCategory.prototype={
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}
export default NewCategory;