import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {useCallback, useState} from "react";

interface ModelSelectProps{
    label:string,
    value: string,
    setValue:  (value: string) => void,
    itemList: any [],
    disabled:boolean,
    free: boolean,
    loading?: boolean
}

export const ModelSelect = (props:ModelSelectProps) => {
    //const [options,setOptions] = useState(props.itemList)
    const onChange = useCallback(
        (e:any, newValue:any) => {
            props.setValue(newValue);
        },
        [props.setValue]
    );
    return (
        <Autocomplete
            value={props.value}
            onChange={onChange}
            options={props.itemList}
            disabled={props.disabled}
            freeSolo={props.free}
            clearOnBlur
            noOptionsText="Add model"
            loading={props.loading}
            renderInput={(params) => (
                    <TextField {...params} label={props.label} required/>
            )}
            // value={props.value}
            // options={options}
            // freeSolo
            // clearOnBlur
            // getOptionLabel={(option) =>
            //     typeof option === 'string' ? option : option.name
            // }
            // filterOptions={(x) => x}
            // includeInputInList
            // noOptionsText="Choose model"
            // renderInput={(params) => (
            //     <TextField {...params} label={props.label} />
            // )}
            // onChange={(event: any, newValue: string | null) => {
            //     setOptions(newValue ? [newValue, ...options] : options);
            //     if(newValue==null) props.setValue('');
            //     else props.setValue(newValue);
            // }}
            // onInputChange={(event, newInputValue) => {
            //     props.setValue(newInputValue);
            // }}
        />
    );
}
