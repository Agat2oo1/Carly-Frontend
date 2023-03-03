import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface SelectFieldProps {
  label: string,
  value: string,
  setValue?: (value: string) => void,
  itemList: { id: number, name: string }[],
  disabled: boolean,
  loading?: boolean
}

export const SelectField = (props: SelectFieldProps) => {
    return(
        <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.value}
                label={props.label}
                disabled={props.disabled}
                onChange={(event: SelectChangeEvent)=>props.setValue!(event.target.value as string)}
            >
                {props.loading?<CircularProgress/>:props.itemList.map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}