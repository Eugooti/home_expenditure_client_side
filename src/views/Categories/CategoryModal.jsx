import {ThemeContext} from "../../assets/ThemeContext/Theme2.jsx";
import {Box, IconButton, Modal} from "@mui/material";
import PropTypes from "prop-types";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";

// eslint-disable-next-line react/prop-types
const CategoryModal = ({open,handleClose,category,description,id}) => {

    const deleteCategory = async () => {

        const Id=id;

        try {
            const response = await axios.delete(`http://localhost:5000/api/categories/${Id}`);
            const feedback=response.data;
            if (response.status !== 200) {
                throw new Error("Failed to delete category");
                console.log(feedback)
            }

            handleClose();
            // window.location.href='/'
            console.log(feedback);
            // Perform any additional actions after successful deletion
        } catch (error) {
            console.log("Error:", error);
            // Handle the error appropriately
        }
    };


    return(
        <ThemeContext.Consumer>{(context)=>{
            const { lightTheme, light, dark } = context;
            const theme = !lightTheme ? light : dark;

            const Style = {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '18%',
                bgcolor: theme.uiElements,
                boxShadow: 24,
                borderRadius:6,
                p: 4,
            };

            return(
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={Style}>
                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",color:theme.text,width:'100%'}}>
                            <h2>{category}</h2>
                            <label style={{textAlign:"center"}}>{description}</label>
                            <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:'100%'}}>
                                <IconButton onClick={deleteCategory}><DeleteOutlineIcon style={{color:'red'}}/></IconButton>
                                <IconButton onClick={handleClose}><EditIcon/></IconButton>
                            </div>
                        </div>
                    </Box>
                </Modal>
            )
        }}

        </ThemeContext.Consumer>
    )

}
CategoryModal.prototype={
    open:PropTypes.bool.isRequired,
    handleClose:PropTypes.func.isRequired,
    category:PropTypes.any.isRequired,
    description:PropTypes.any.isRequired,
}
export default CategoryModal;
