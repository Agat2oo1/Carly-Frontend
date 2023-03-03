import Head from 'next/head'
import PageLayout from '../../components/PageLayout'
import {
  Box,
  Button,
  FormControl,
  Grid, Icon, IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Pagination,
  Typography
} from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";
import { DataGridPro, GridSortModel } from '@mui/x-data-grid-pro';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CarlyDataGrid } from "../../components/CarlyDataGrid";
import * as React from "react";
import Image from 'next/image';
import { GiCarSeat } from "react-icons/gi";
import { MdLocalGasStation } from "react-icons/md";
import { RiCarFill } from "react-icons/ri";
import { TbManualGearbox } from "react-icons/tb";
import { SlMagnifier } from "react-icons/sl";
import {router} from "next/client";
import { NoPhotography } from '@mui/icons-material';
import { useJwtToken } from '../../functions/useJwtToken';


export default function Cars() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState<number>(3);
  const [carSize, setCarSize] = useState<number>(0);
  const [queryOptions, setQueryOptions] = useState<GridSortModel>([]);

  // use this to get the token.
  const token = useJwtToken();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.3 },
    {
      field: "click",
      headerName: "Image",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        console.log(params.row.model.brand.name)
        console.log(params.row.photos)
        console.log(params.row.photos.lenght)
        console.log(params.row.photos[0])
        return params.row.photos.length > 0 ?
          <Box sx={{ height: '90%', width: '90%' }}>
            <Image
              alt={"Car image"} src={"https://carlybackend.azurewebsites.net/internal/images/" + params.row.photos[0]}
              width="100"
              height="100"
              style={{
                width: 'auto',
                height: '100%',
                borderRadius: 4
              }}
            />
          </Box>

          : <Box sx={{ height: '90%', width: '90%', borderRadius: 1, backgroundColor: '#ddd', alignItems: 'center', alignContent: 'center', justifyContent: 'center', display: 'flex' }}>
            <NoPhotography htmlColor='#999' />

          </Box>
      }

    },
    {
      field: "brand", headerName: "Brand", flex: 1, renderCell: (params: any) => {
        // return params.row.model.brand.name;
        return <> <Box sx={{ mt: 0.5 }}><img style={{ width: 32, height: 32, marginRight: 4 }}
          src={`https://img.icons8.com/color/512/${params.row.model.brand.name.toLowerCase().replace(" ", "-")}.png`} />
        </Box> {params.row.model.brand.name} </>
      }
    },
    {
      field: "carType", headerName: "Car Type", flex: 1, renderCell: (params: any) => {
        return <>
          <Box sx={{ mx: 0.5, mt: 0.5 }}><RiCarFill /></Box> {params.row.model.carType.name}
        </>
      }
    },
    {
      field: "isGearboxAutomatic", headerName: "Gearbox", flex: 1, renderCell: (params: any) => {
        return <>
          <Box sx={{ mx: 0.5, mt: 0.5 }}><TbManualGearbox /></Box> {params.row.model.isGearboxAutomatic ? "Manual" : "Automatic"}
        </>
      }
    },
    {
      field: "fuelType", headerName: "Fuel Type", flex: 1, renderCell: (params) => {
        return <>
          <Box sx={{ mx: 0.5, mt: 0.5 }}><MdLocalGasStation /></Box> {params.row.model.fuelType.name}
        </>
      }
    },
    {
      field: "numberOfSeats", headerName: "seats", flex: 0.5,
      renderCell: (params) => {
        return <>
          <Box sx={{ mx: 0.5, mt: 0.5 }}><GiCarSeat /></Box> {params.row.model.numberOfSeats}
        </>
      }
    },
    {
      field: "productionYear", headerName: "year", flex: 0.5, valueGetter: (params: any) => {
        return params.row.model.productionYear;
      }
    },
    {
      field: "view", headerName: "view", flex: 0.5, renderCell: (params) => {
        return <IconButton onClick={() => {
          let url = /cars/ + params.row.id
          if (!(router.route === url))
            router.push(url);
        }}><SlMagnifier /></IconButton>
      }
    },
  ]
  const fetchCars = (page: number, size: number, sortModel: GridSortModel) => {
    if (token === undefined) // Workaround
      return;

    let sortBy: string = sortModel.length > 0 ? '&sortBy=' + sortModel[0].field.toUpperCase() : '';
    let sortDirection: string = sortModel.length > 0 ? '&sortDirection=' + sortModel[0].sort!.toUpperCase() : '';
    setIsLoading(true);
    fetch('https://carlybackend.azurewebsites.net/cars?' +
      'size=' + size +
      '&page=' + (page + 1) +
      sortBy + sortDirection,
      {
        method: 'GET',
        headers: {
          //'Authorization': `Bearer ${token}`
        }
      }
    )
      .then((response) => {
        if (response.status === 401)
          throw 'Random error' // workaround
        return response.json()
      })
      .then((json) => {
        setCars(json.cars);
        setCarSize(json.totalRecords);
        setIsLoading(false) // Workaround
      })
      .catch((error) => console.error(error))
      // .finally(() => setIsLoading(false)); // Workaround
  }
  // const fetchBrands = () => {
  //     fetch('https://carlybackend.azurewebsites.net/internal/brands')
  //         .then((response) => response.json())
  //         .then((json) => {
  //             setBrands(json)
  //         })
  //         .catch((error) => console.error(error))
  // }
  useEffect(() => {
    // fetchBrands();
    fetchCars(pageNumber, pageSize, queryOptions);
  }, []);

  return (
    <>
      <Head>
        <title>Car List</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/ColoredLogo.svg" />
      </Head>
      <main>
        <PageLayout>
          <Grid container alignItems="center"
            justifyContent="center">
            <Grid item sx={{ my: 2, width: '95%' }}>
              <Typography sx={{ textAlign: 'left' }} variant="h5" gutterBottom>
                CARS LIST
              </Typography>
            </Grid>
            <CarlyDataGrid
              rowHeight={80}
              rowCount={carSize}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              pageSize={pageSize}
              setPageSize={setPageSize}
              isLoading={isLoading}
              data={cars}
              fetchData={fetchCars}
              columns={columns} />
          </Grid>
        </PageLayout>
      </main>
    </>
  )
}
