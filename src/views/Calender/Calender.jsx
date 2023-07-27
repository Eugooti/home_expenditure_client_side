import {ThemeContext} from "../../assets/ThemeContext/Theme2.jsx";
import {Calendar,dateFnsLocalizer} from "react-big-calendar";
import {parse,format,getDay,startOfWeek} from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css"


import date_fns from "date-fns/locale/en-US";
import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import EventModal from "./EventModal.jsx";
import {setLocalStorage} from "../../Utils/localStorage.jsx";
import DateModal from "./DateModal.jsx";

const locales={
    "en-US": date_fns
}
const localizer=dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const CalenderScheduler = () => {

    const [AddEvent,SetEvent]=useState(false)


    const [events, setEvents] = useState([]);


    useEffect(() => {
        const fetchEvents = async () => {
          try {
              const response=await fetch('http://localhost:5000/api/events');
              const data=await response.json();

              setEvents(data)
          }catch (e) {
              console.log("Failed to fetch events",e)
          }
        }
        fetchEvents();
    }, []);
    // Function to handle event click


    const [DateModalOpen, setDateModal] = useState(false);
    const handleEventClick = (event) => {
        // Do something when an event is clicked
        setLocalStorage('Event', event);
        // alert(`You clicked on "${event.title}". Description: ${event.description}`);
        // console.log(event);
        setDateModal(true);
    };

    const CloseDateModal = () => {
      setDateModal(false);
    }
    return(
        <ThemeContext.Consumer>{context=>{
            const { lightTheme, light, dark } = context;
            const theme = !lightTheme ? light : dark;

            const Open = () => {
              SetEvent(true)
            }
            const Close = () => {
                SetEvent(false)
            }
            return(
                <div  style={{background:theme.bg,height:'100%',color:theme.text,fontSize:18}}>
                    <div className={"container"} style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <h1>Calender</h1>
                        <Button style={{background:theme.button,color:'white',borderRadius:15,width:150}} onClick={Open} variant={'contained'}>Add Event</Button>
                    </div>
                    <div style={{width:'100%',display:"flex",alignItems:"start",justifyContent:"center"}}>
                        <Calendar localizer={localizer} events={events}
                                  startAccessor={"start"} endAccessor={"end"}
                                  style={{height:600,width:'90%'}}
                                  onSelectEvent={handleEventClick} // Attach the onClick event handler
                        />
                    </div>
                    <EventModal open={AddEvent} handleClose={Close}/>
                    <DateModal open={DateModalOpen} handleClose={CloseDateModal}/>
                </div>
            )
        }}

        </ThemeContext.Consumer>
    )

}
export default CalenderScheduler;
