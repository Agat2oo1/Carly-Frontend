import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";

interface reservationRowType {
    title: string;
}
//TODO maybe da się bez interface
export const ReservationDetailsSectionHeader = (props : reservationRowType) => {
    return(
        <Grid container >
            <Grid item xs={12}>
                <Typography sx={{fontSize: 'h6.fontSize'}}>{props.title}</Typography>
            </Grid>
        </Grid>
    )
}