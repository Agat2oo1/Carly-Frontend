import Head from 'next/head'
import PageLayout from '../../components/PageLayout'
import {useRouter} from "next/router";
import {Box, Grid, Hidden, LinearProgress} from "@mui/material";
import FormGrid from "../../components/FormGrid";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import {useEffect, useState} from "react";
import {carData} from "../../models/carData";
import CircularProgress from '@mui/material/CircularProgress';
import {useJwtToken} from "../../functions/useJwtToken";
import {ImageUploader as PhotosInput} from "../../components/ImageUploader";
import {CarlyDataGrid} from "../../components/CarlyDataGrid";
import {GridColDef} from "@mui/x-data-grid";
import CustomizedDialogs from "../../components/reservations/popUp";
import { GridSortModel } from "@mui/x-data-grid-pro";

export default function CarWithId() {
    const router = useRouter()
    const { id } = router.query
    const [loadingPage, setLoadingPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [carData,setCarData] = useState<carData>({
        brandId: '',
        name: '',
        productionYear: '',
        carTypeId: '',
        fuelTypeId: '',
        isGearboxAutomatic: '',
        numberOfDoors: '',
        numberOfSeats: '',
        trunkCapacity: '',
        horsePower: '',
        avgFuelConsumption: '',
        mileage: '',
        equipment: [],
        dayPrice: '',
        color: ''
    })
    const [images, setImages] = useState<number[]>([]);
    const [modelId, setModelId] = useState<number>();

    const [reservations, setReservations] = useState([]);
    const [reservationsSize, setReservationsSize] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState<number>(3);
    const [queryOptions, setQueryOptions] = useState<GridSortModel>([]);


    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "brand", headerName: "Brand", flex: 1, valueGetter: (params: any) => {
                return params.row.car.model.brand.name;
            }
        },
        {
            field: "model", headerName: "Model", flex: 1, valueGetter: (params: any) => {
                return params.row.car.model.name;
            }
        },
        {
            field: "carType", headerName: "Car Type", flex: 1, valueGetter: (params: any) => {
                return params.row.car.model.carType.name;
            }
        },
        {
            field: "beginDate", headerName: "Begin date", flex: 1, valueGetter: (params: any) => {
                return params.row.endDate[2] + '-' + params.row.endDate[1] + '-' + params.row.endDate[0];
            }
        },
        {
            field: "endDate", headerName: "End date", flex: 1, valueGetter: (params: any) => {
                return params.row.endDate[2] + '-' + params.row.endDate[1] + '-' + params.row.endDate[0];
            }
        },
        {
            field: "beginPlace", headerName: "Begin Place", flex: 1, valueGetter: (params: any) => {
                return params.row.beginPlace;
            }
        },
        {
            field: "endPlace", headerName: "End Place", flex: 1, valueGetter: (params: any) => {
                return params.row.endPlace;
            }
        },
        {
            field: "click",
            headerName: "Details",
            width: 90,
            sortable: false,
            renderCell: (params) => {
                return <CustomizedDialogs data={params.row} />;
            }
        },
    ]
    const getCarDetails = () => {
        setLoadingPage(true)
        fetch(`https://carlybackend.azurewebsites.net/cars/` + id)
            .then(res => res.json())
            .then((json) => {
                setModelId(json.model.id)
                setImages(json.photos)
                setCarData({
                    brandId: json.model.brand.id,
                    name: json.model.name,
                    productionYear: json.model.productionYear,
                    carTypeId: json.model.carType.id,
                    fuelTypeId: json.model.fuelType.id,
                    isGearboxAutomatic: json.model.isGearboxAutomatic ? '1' : '0',
                    numberOfDoors: json.model.numberOfDoors,
                    numberOfSeats: json.model.numberOfSeats,
                    trunkCapacity: json.model.trunkCapacity,
                    horsePower: json.model.horsePower,
                    avgFuelConsumption: json.model.avgFuelConsumption,
                    mileage: json.mileage,
                    equipment: json.equipment.map((e: any) => e.id), //Todo
                    dayPrice: json.dayPrice,
                    color: json.color
                })
            })
            .finally(()=>setLoadingPage(false))
            .catch(res => console.log(res))
    }
    const Save = (mileage: number, equipment: number[], dayPrice: number, color: string) =>
    {
        setLoading(true)
        let json = {
            modelId: modelId,
            mileage: mileage,
            equipment: equipment,
            dayPrice: dayPrice,
            color: color,
            photos: images
        }

        fetch(`https://carlybackend.azurewebsites.net/cars/put/`+ id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(json)
        })
            .then(response => {
                if (response.status === 401)
                    throw 'Random error' // workaround
                return response.json()
            })
            .then(() => setLoading(false))
            .catch(response => console.log(response))

    }
    const fetchReservations = (page: number, size: number, sortModel: GridSortModel) => {
        setIsLoading(true);
        let sortBy: string = sortModel && sortModel.length > 0 ? '&sortBy=' + sortModel[0].field.toUpperCase() : '';
        // TODO ten bład
        let sortDirection: string = sortModel.length > 0 ? '&sortDirection=' + sortModel[0].sort!.toUpperCase() : '';
        fetch('https://carlybackend.azurewebsites.net/reservations/?' +
            'carId=' + id +
            '&size=' + size +
            '&page=' + (page + 1)
            + sortBy + sortDirection
        )
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setReservationsSize(json.totalRecords);
                setReservations(json.reservations);
            })
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    }

    useEffect(()=>{
        getCarDetails()
        fetchReservations(pageNumber, pageSize, queryOptions)
    },[])
  return (
    <>
      <Head>
        <title>Carly</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/ColoredLogo.svg" />
      </Head>
      <main>
        <PageLayout>
            {loadingPage ? <LinearProgress/>  :
                <Box>
                    <Grid container alignItems="center" justifyContent="center" rowSpacing={3}
                        sx={{padding:' 10px'}}>
                        <Grid item xs={11} md={8}>
                            <FormGrid type={1} carData={carData} SaveChanges={Save} isLoading={loading}/>
                        </Grid>
                        <Hidden mdDown={true}>
                            <Grid item md={3}>
                            <DirectionsCarOutlinedIcon color="primary" style={{width:'92%',height:'100%'}}/>
                            </Grid>
                        </Hidden>
                        <Grid item xs={11}>
                            <PhotosInput images={images} setImages={setImages}/>
                        </Grid>
                        <Grid item xs={11}>
                            <CarlyDataGrid
                                rowHeight={40}
                                rowCount={reservationsSize}
                                pageNumber={0}
                                setPageNumber={setPageNumber}
                                pageSize={pageSize}
                                setPageSize={setPageSize}
                                isLoading={isLoading}
                                data={reservations}
                                fetchData={fetchReservations}
                                columns={columns} />
                        </Grid>
                    </Grid>
                </Box>
            }
        </PageLayout>
      </main>
    </>
  )
}
