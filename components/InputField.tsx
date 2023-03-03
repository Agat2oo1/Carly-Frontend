import {TextField} from "@mui/material";
import * as React from "react";

interface InputFieldProps{
    label:string
    value: string,
    setValue:  (value: string) => void,
    disabled: boolean
}
export const InputField = (props:InputFieldProps) => {
    return(
    <TextField fullWidth
               required
               type="number"
               label= {props.label}
               disabled={props.disabled}
               value={props.value}
               onChange={(event) => props.setValue(event.target.value)}
    />
    )
}
export default InputField