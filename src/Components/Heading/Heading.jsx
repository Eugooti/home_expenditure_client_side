import "./Heading.css"
import {ThemeContext} from "../../assets/ThemeContext/Theme2.jsx";

// eslint-disable-next-line react/prop-types
const Heading = ({ title, subtitle }) => {
   return(
       <ThemeContext.Consumer>{(context)=>{
           const {lightTheme,light,dark}=context;
           const theme=!lightTheme?light:dark;
           return(
               <div className='heading'>
                   <h1 style={{color:theme.text}}>{title}</h1>
                   <p style={{color:theme.text}}>{subtitle}</p>
               </div>
           )
       }}

       </ThemeContext.Consumer>
   )
}

export default Heading;
