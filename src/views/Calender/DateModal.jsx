import {ThemeContext} from "../../assets/ThemeContext/Theme2.jsx";
import {Button, Modal, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Heading from "../../Components/Heading/Heading.jsx";
import {getFromLocalStorage} from "../../Utils/localStorage.jsx";
import {useState} from "react";
import EditEvent from "./EditEvent.jsx";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const DateModal = ({open,handleClose}) => {

    const [AddEvent,SetEvent]=useState(false)

    const event=getFromLocalStorage("Event")

    const OpenEventEdit = () => {
      SetEvent(true)
    }

    const CloseEventEdit = () => {
      SetEvent(false);
    }

    const deleteEvent = async () => {
      const id=event.id;
      try {
          const response=await axios.delete(`http://localhost:5000/api/events/${id}`);

          if (response.status!==200){
              throw new Error("Failed to delete expenditure");
          }

          console.log("Event deleted successfully")

          handleClose()


      }catch (e) {
          console.log("Error:",e)
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
                      <Heading title={event && event.title?event.title:""} subtitle={event && event.description?event.description:""}/>
                      <div style={{display:"flex",justifyContent:"space-around"}}>
                          <Typography variant="subtitle1" gutterBottom component="div">
                              {event && event.start?"Start: "+event.start:""}
                          </Typography>
                          <Typography variant="subtitle1" gutterBottom component="div">
                              {event && event.end?"End: "+event.end:""}
                          </Typography>

                      </div>
                      <div style={{display:"flex",justifyContent:"space-around"}}>
                          <Button style={{background:theme.button,color:'white',borderRadius:15,width:120}} onClick={OpenEventEdit}>Edit</Button>
                          <Button style={{background:theme.button,color:'white',borderRadius:15,width:120}} onClick={deleteEvent}>Delete</Button>
                      </div>
                      <EditEvent open={AddEvent} handleClose={CloseEventEdit}/>
                  </Box>

              </Modal>
          )
      }}

      </ThemeContext.Consumer>
  )
}
export default DateModal;
