import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {Box, Grid} from "@mui/material";
import {ReservationDetailsRow} from "./reservationDetailsRow";
import {ReservationDetailsSectionHeader} from "./reservationDetailsSectionHeader";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2, width:600, background: "#ECEBE4"}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

export default function CustomizedDialogs(props: any) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" sx={{color:"black", height:30}} onClick={handleClickOpen}>
                View
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
                    RESERVATION NO. {props.data.id} DETAILS
                </BootstrapDialogTitle>
                <Grid container>
                    <Grid item xs={6}>
                        <DialogContent dividers>
                            <ReservationDetailsSectionHeader title={"Pick up details"}/>
                            <ReservationDetailsRow label={"Location"} value={props.data.beginPlace}/>
                            <ReservationDetailsRow label={"Date"} value={props.data.beginDate[2] + '-' + props.data.beginDate[1] + '-' +props.data.beginDate[0]}/>
                        </DialogContent>
                    </Grid>
                    <Grid item xs={6}>
                        <DialogContent dividers>
                            <ReservationDetailsSectionHeader title={"Return details"}/>
                            <ReservationDetailsRow label={"Location"} value={props.data.endPlace}/>
                            <ReservationDetailsRow label={"Date"} value={props.data.endDate[2] + '-' + props.data.endDate[1] + '-' +props.data.endDate[0]}/>
                        </DialogContent>
                    </Grid>
                </Grid>
                {
                    props.data.customer === null ? undefined :
                        <DialogContent dividers>
                            <ReservationDetailsSectionHeader title={"Client details"}/>
                            <ReservationDetailsRow label={"Surname"} value={props.data.customer.surname}/>
                            <ReservationDetailsRow label={"Name"} value={props.data.customer.name}/>
                        </DialogContent>
                }
                <DialogContent dividers>
                    <ReservationDetailsSectionHeader title={"Car details"}/>
                    <ReservationDetailsRow label={"Brand"} value={props.data.car.model.brand.name}/>
                    <ReservationDetailsRow label={"Model"} value={props.data.car.model.name}/>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}
