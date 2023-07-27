import {ThemeContext} from "../../assets/ThemeContext/Theme2.jsx";
import {IconButton} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';


const ToggleBtn = () => {
  return(
      <ThemeContext.Consumer>{(context)=>{
          const {lightTheme,light,dark,toggleTheme}=context;
          const theme=!lightTheme?light:dark;
          return(
              <IconButton onClick={toggleTheme} style={{background:theme.uiElements,color:theme.text}}>{lightTheme?<LightModeIcon/>:<DarkModeIcon/>}</IconButton>
          )
      }}

      </ThemeContext.Consumer>
  )
}
export default ToggleBtn;