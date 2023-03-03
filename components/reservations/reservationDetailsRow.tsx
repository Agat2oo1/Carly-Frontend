import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";

interface reservationRowType {
    label: string;
    value: string;
}
export const ReservationDetailsRow = (props : reservationRowType) => {
    return(
        <Grid container>
            <Grid item xs={4}>
                <Typography sx={{ fontWeight: 'bold'}}>{props.label}:</Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography>{props.value}</Typography>
            </Grid>
        </Grid>
    )
}