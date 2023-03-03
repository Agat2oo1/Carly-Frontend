import * as React from 'react';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useEffect, useState} from "react";
import {Box, Button, InputAdornment, OutlinedInput, TextField} from "@mui/material";
import {SelectModel} from "../models/selectModel";
import {carData} from "../models/carData";
import {InputField} from "./InputField";
import {SelectField} from "./SelectField";
import {ModelSelect} from "./ModelSelect";
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send';
import {useJwtToken} from "../functions/useJwtToken";

export interface FormGridProps {
    type: number,
    carData: carData,
    Save?: (brandId: number, modelName: string, productionYear: number,carTypeId: number, fuelTypeId: number,
            isGearboxAutomatic: boolean, numberOfDoors: number, numberOfSeats: number,
            trunkCapacity: number, horsePower: number, avgFuelConsumption:number,
            mileage: number, equipment: number[], dayPrice: number, color: string) => void
    SaveChanges?: (mileage: number, equipment: number[], dayPrice: number, color: string) => void
    isLoading: boolean,
}

export const FormGrid = (props:FormGridProps) => {
    const [type, setType] = useState(props.type)
    const [loading, setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [brands, setBrands] = useState<SelectModel[]>([]);
    const [models, setModels] = useState<SelectModel[]>([]);
    const [fuelTypes, setFuelTypes] = useState<SelectModel[]>([]);
    const [carTypes, setCarTypes] = useState<SelectModel[]>([]);
    const [equipmentPieces, setEquipmentPieces] = useState<SelectModel[]>([]);

    const [brand, setBrand] = useState(props.carData.brandId);
    const [model, setModel] = useState(props.carData.name);
    const [prodYear, setProdYear] = useState(props.carData.productionYear);
    const [fuelType, setFuelType] = useState(props.carData.fuelTypeId);
    const [carType, setCarType] = useState(props.carData.carTypeId);
    const [doorNr, setDoorNr] = useState(props.carData.numberOfDoors);
    const [seatNr, setSeatNr] = useState(props.carData.numberOfSeats);
    const [isAutomatic, setIsAutomatic] = useState(props.carData.isGearboxAutomatic);
    const [equipment, setEquipment] = useState<string[]>(props.carData.equipment);

    const [horsePower, setHorsePower] = useState(props.carData.horsePower);
    const [trunkCapacity, setTrunkCapacity] = useState(props.carData.trunkCapacity);
    const [fuelConsumption, setFuelConsumption] = useState(props.carData.avgFuelConsumption);
    const [mileage, setMileage] = useState(props.carData.mileage);
    const [color, setColor] = useState(props.carData.color);
    const [dayPrice, setDayPrice] = useState(props.carData.dayPrice);


    const getBrands = () => {
        setLoading(true)
        fetch(`https://carlybackend.azurewebsites.net/internal/brands`)
            .then((response) => {
                if (response.status === 401)
                    throw 'Random error' // workaround
                return response.json()
            })
            .then((json) => {
                setBrands(json);
                setLoading(false)
            })
            .catch((error) => console.error(error))
    }

    const getModels = (brandID: number) => {
        setLoading(true)
        fetch(`https://carlybackend.azurewebsites.net/internal/models/`+brandID)
            .then((response) => {
                if (response.status === 401)
                    throw 'Random error' // workaround
                return response.json()
            })
            .then((json) => {
                setModels(json)
                setLoading(false)
            })
            .catch((error) => console.error(error))
    }
    const getFuelTypes = () => {
        fetch(`https://carlybackend.azurewebsites.net/internal/fuelTypes`)
            .then((response) => {
                if (response.status === 401)
                    throw 'Random error' // workaround
                return response.json()
            })
            .then((json) => {
                setFuelTypes(json)
            })
            .catch((error) => console.error(error))
    }
    const getCarTypes = () => {
        fetch(`https://carlybackend.azurewebsites.net/internal/carTypes`)
            .then((response) => {
                if (response.status === 401)
                    throw 'Random error' // workaround
                return response.json()
            })
            .then((json) => {
                setCarTypes(json)
            })
            .catch((error) => console.error(error))
    }
    const getEquipment = () => {
        fetch(`https://carlybackend.azurewebsites.net/internal/equipmentPieces`)
            .then((response) => {
                if (response.status === 401)
                    throw 'Random error' // workaround
                return response.json()
            })
            .then((json) => {
                setEquipmentPieces(json)
            })
            .catch((error) => console.error(error))
    }

    const refreshCarDetails = () => {
        setError(false)
        setBrand(props.carData.brandId);
        setModel(props.carData.name);
        setProdYear(props.carData.productionYear);
        setFuelType(props.carData.fuelTypeId);
        setCarType(props.carData.carTypeId);
        setDoorNr(props.carData.numberOfDoors);
        setSeatNr(props.carData.numberOfSeats);
        setIsAutomatic(props.carData.isGearboxAutomatic);
        setEquipment(props.carData.equipment);
        setHorsePower(props.carData.horsePower);
        setTrunkCapacity(props.carData.trunkCapacity);
        setFuelConsumption(props.carData.avgFuelConsumption);
        setMileage(props.carData.mileage);
        setColor(props.carData.color);
        setDayPrice(props.carData.dayPrice);
        if(type==2)setType(1)
    }
    const handleChangeEquipment = (event: SelectChangeEvent<typeof equipment>) => {
        const {
            target: { value },
        } = event;
        setEquipment(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChangeBrand = (value:string) => {
        setBrand(value);
        getModels(Number(value));
    };

    const Save = () => {

        if(brand==''|| model=='' || carType =='' || fuelType =='' || isAutomatic == '' || doorNr == ''
            || seatNr == '' || trunkCapacity == '' || fuelConsumption == ''
            || horsePower == '' || mileage =='' || dayPrice == '' || color == '')
        {
            console.log('here')
            setError(true)
            return
        }
        setError(false)
        props.Save!(Number(brand),model,Number(prodYear),Number(carType),Number(fuelType),
            isAutomatic==='1'?true:false,Number(doorNr),Number(seatNr),Number(trunkCapacity),
            Number(horsePower),Number(fuelConsumption),Number(mileage),
            equipment.map((e)=>Number(e)) ,Number(dayPrice),color)
    }
    const SaveChanges = () => {
        props.SaveChanges!(Number(mileage),
            equipment.map((e)=>Number(e)) ,Number(dayPrice),color)
        setType(1)
    }

    useEffect(()=>{
        getBrands();
        getFuelTypes();
        getCarTypes();
        getEquipment();
    },[])

    return (
        <Box sx={{
            width: "95%",
            height: "auto",
            border: "5px solid #ECEBE4",
            //background: "#F7F6F3",
            borderRadius: 2,
            padding:'15px',
        }}>
        <Grid container spacing={3}>
            <Grid item xs={6} md={4}>
                <SelectField label={"Brand"} value={brand} setValue={handleChangeBrand}
                                               itemList={brands} disabled={type === 0?false:true} loading={loading}/>
            </Grid>
            <Grid item xs={6} md={4}>
                {

                    type == 0 &&   <ModelSelect label={"Model"} value={model} setValue={setModel}
                                   itemList={brand===''?["Choose brand"]:models.map((m)=>m.name)}
                                   loading ={loading} free={brand===''?false:true} disabled={false}/>
                }
                {
                    (type === 1 || type ===2) && <ModelSelect label={"Model"} value={model} setValue={setModel}
                                    itemList={models.map((m)=>m.name)} free={false} disabled={true}/>
                }
            </Grid>
            <Grid item xs={6} md={4}>
                {
                    type === 0 && <SelectField label={"Production Year"} value={prodYear} setValue={setProdYear}
                                  itemList={[{id:2015,name:"2015"},{id:2016,name:"2016"},{id:2017,name:"2017"},
                                            {id:2018,name:"2018"},{id:2019,name:"2019"},{id:2020,name:"2020"},
                                            {id:2021,name:"2021"},{id:2022,name:"2022"},{id:2023,name:"2023"}]}
                                               disabled={false}/>
                }
                {
                    (type === 1 || type ===2) &&  <SelectField label={"Production Year"} value={prodYear}
                                                itemList={[{id:Number(prodYear),name:prodYear}]} disabled={true}/>
                }
            </Grid>
            <Grid item xs={6} md={4}>
                <SelectField label={"Gearbox"} value={isAutomatic} setValue={setIsAutomatic}
                             itemList={[{id:1,name:"Automatic"},{id:0,name:"Manual"}]} disabled={ type === 0?false:true}/>
            </Grid>
            <Grid item xs={6} md={4}>
                <SelectField label={"Car type"} value={carType} setValue={setCarType} itemList={carTypes}
                             disabled={type === 0?false:true}/>
            </Grid>
            <Grid item xs={3} md={2}>
                <SelectField label={"Doors"} value={doorNr} setValue={setDoorNr}
                             itemList={[{id:1,name:"1"},{id:2,name:"2"},{id:3,name:"3"},{id:4,name:"4"},
                                 {id:5,name:"5"},{id:6,name:"6"},{id:7,name:"7"},{id:8,name:"8"},{id:9,name:"9"}]}
                             disabled={type === 0?false:true}/>
            </Grid>
            <Grid item xs={3} md={2}>
                <SelectField label={"Seats"} value={seatNr} setValue={setSeatNr}
                             itemList={[{id:1,name:"1"},{id:2,name:"2"},{id:3,name:"3"},
                                 {id:4,name:"4"}, {id:5,name:"5"},{id:6,name:"6"},{id:7,name:"7"},
                                 {id:8,name:"8"},{id:9,name:"9"}]} disabled={type === 0?false:true}/>
            </Grid>
            <Grid item xs={6} md={4}>
                <SelectField label={"Fuel type"} value={fuelType} setValue={setFuelType} itemList={fuelTypes}
                             disabled={type === 0?false:true}/>
            </Grid>
            <Grid item xs={6} md={4}>
                <InputField value={horsePower} setValue={setHorsePower} label={"Horsepower"}
                            disabled={type === 0?false:true}/>
            </Grid>
            <Grid item xs={6} md={4}>
                <InputField value={fuelConsumption} setValue={setFuelConsumption}
                            label={"Average fuel consumption"} disabled={type === 0?false:true}/>
            </Grid>
            <Grid item xs={6} md={4}>
                <InputField value={trunkCapacity} setValue={setTrunkCapacity}
                            label={"TrunkCapacity"} disabled={type === 0?false:true}/>
            </Grid>
            <Grid item xs={6} md={4}>
                <InputField value={mileage} setValue={setMileage} label={"Mileage"}
                            disabled={type === 1?true:false}/>
            </Grid>
            <Grid item xs={6} md={4}>
                <FormControl fullWidth>
                    <InputLabel id="demo-multiple-name-label">Equipment</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={equipment}
                        label="Equipment"
                        disabled={type === 1?true:false}
                        onChange={handleChangeEquipment}
                        input={<OutlinedInput label="Equipment" />}
                        //MenuProps={MenuProps}
                    >
                        {equipmentPieces.map((eq) => (
                            <MenuItem key={eq.id} value={eq.id}>{eq.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} md={4}>
                <TextField fullWidth
                    required
                    id="outlined-name"
                    label="Color"
                    disabled={type === 1?true:false}
                    value={color}
                    onChange={(event) => setColor(event.target.value)}
                />
            </Grid>
            <Grid item xs={6} md={4}>
                {/*<InputField value={dayPrice} setValue={setDayPrice}*/}
                {/*            label={"Price per day"} disabled={type === 1?true:false}/>*/}
                <FormControl fullWidth required>
                <InputLabel htmlFor="outlined-adornment-amount">Price per day</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    type="number"
                    endAdornment={<InputAdornment position="end">$</InputAdornment>}
                    disabled={type === 1?true:false}
                    value={dayPrice}
                    onChange={(e)=>setDayPrice(e.target.value)}
                    label="Price per day"
                />
                </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
                 <Button fullWidth variant="outlined" sx={{height: '100%'}} disabled = {type === 1?true:false}
                         onClick = {() => refreshCarDetails()}>Cancel</Button>
            </Grid>
            <Grid item xs={6} md={2}>
                {
                    type === 0 && <LoadingButton fullWidth sx={{height: '100%'}} color={error?"error":"secondary"} variant="contained"
                                                 loading={props.isLoading} onClick={Save} endIcon={<SendIcon />}
                                                 loadingPosition="end"><span>Save</span></LoadingButton>
                }
                {
                    type === 1 &&  <Button fullWidth sx={{height: '100%'}} color="secondary" variant="contained"
                                           onClick={()=>setType(2)}>Edit</Button>
                }
                {
                    type === 2 &&  <LoadingButton fullWidth sx={{height: '100%'}} color="secondary" variant="contained"
                                                  loading={props.isLoading} onClick={SaveChanges} endIcon={<SendIcon />}
                                                  loadingPosition="end"><span>Save</span></LoadingButton>
                }
            </Grid>
            {error &&
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                        <text>Fill required fields</text>
                    </Box>
                </Grid>
            }
        </Grid>
        </Box>
    )
}

export default FormGrid
