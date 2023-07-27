import {useField} from "formik";
import TextField from "@mui/material/TextField";
const TextFieldWrapper=({
                            // eslint-disable-next-line react/prop-types
    name,
    ...otherProps
})=>{
    const [field,meta]=useField(name);

    const cofigTextField={
        ...field,
        ...otherProps,
        fullWidth:true,
        variant:'outlined'
    };

    if (meta&& meta.touched && meta.error){
        cofigTextField.error=true;
        cofigTextField.helperText=meta.error;
    }
    return(
        <TextField {...cofigTextField}/>
    )
}
export default TextFieldWrapper;