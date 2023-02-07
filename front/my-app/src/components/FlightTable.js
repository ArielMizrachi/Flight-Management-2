import React, {  useEffect } from 'react'

// material ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {styled} from '@mui/system';

// redux
import {useDispatch,useSelector} from "react-redux";
import {DeleteFlightAsync, GetOneFlightAsync} from '../redux/Flights/FlightSlice'
import {AddTicketAsync, ErrorUser, TicketErrorCalibration} from '../redux/Tickets/TicketSlice'
import {CheckCustomerAsync, MyCustomer} from '../redux/Customer/CustomersSlice'
import {SelectToken, SelectSuper} from '../redux/Login/LoginSlice'


import {LogOut} from '../redux/Login/LoginSlice'

// router
import { useNavigate } from "react-router-dom";



export default function FlightTable({all_flights}) {



  const dispatch = useDispatch();
  let navigate = useNavigate();
  const error_chk =useSelector(ErrorUser)
  const is_super = useSelector(SelectSuper)
  
  // preperations for checking the customer
  const token =useSelector(SelectToken)
  const customer =useSelector(MyCustomer)

  // custom table head color
  const TableCellHead = styled(TableCell)({
      color:'white'
  })

  // checking for customers
  useEffect(() => {
  dispatch(TicketErrorCalibration())
  if (token){  
    dispatch(CheckCustomerAsync())
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 //   check if the flight was cought correctly
 useEffect(() => {
  if (error_chk === 'good'){
      dispatch(TicketErrorCalibration())
      navigate("/" ,{state:{msg: `The Flight from was bought successfully` }})
  } 
  // in case of 401 
  if (error_chk === 'Please login again'){
      dispatch(TicketErrorCalibration())
      dispatch(LogOut())
      navigate("/Login/401")
  } 
  // eslint-disable-next-line react-hooks/exhaustive-deps     
}, [error_chk]);

  return (
    <div>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,
                   border: 2 }} 
                   aria-label="simple table"  
                   size="small" >

        <TableHead sx={{ border: 2 ,  
                         bgcolor: '#34568B',
                      }} >
                          
          {/* table headers */}
          <TableRow>
            <TableCellHead align='left'>flight id</TableCellHead>
            <TableCellHead align='left'>company id</TableCellHead>
            <TableCellHead align='left'>origin country id</TableCellHead>
            <TableCellHead align='left'>destination country id</TableCellHead>
            <TableCellHead align='left'>departure time</TableCellHead>
            <TableCellHead align='left'>landing time</TableCellHead>
            <TableCellHead align='left'>ticets remaining</TableCellHead>
            {customer&&<TableCell></TableCell>}
            {is_super && <TableCell></TableCell>}
            {is_super && <TableCell></TableCell>}
          </TableRow>
        </TableHead>

        {/* table contents */}
        <TableBody>
          {all_flights.map((flight, ind) => (
            <TableRow key={ind} 
                      sx={{ border: 1.5,
                          background: ind%2 ===0 ? '#d9eefa' : ''
                          }}>
              <TableCell component="th" scope="row">{flight.id}</TableCell>
              <TableCell align='left'>{flight.airline_company}</TableCell>
              <TableCell align='left'>{flight.origin_country}</TableCell>
              <TableCell align='left'>{flight.destenation_country}</TableCell>
              <TableCell align='left'>{flight.departure_time}</TableCell>
              <TableCell align='left'>{flight.landing_time}</TableCell>
              <TableCell align='left'>{flight.remaining_ticets}</TableCell>

              {/* buying a ticket  if is a customer*/}
              {customer&&
              <TableCell align='left'>
              <Button align='left'
                      variant="contained"
                      sx={{color:'white', background:'#5B5EA6'}}
                      onClick={()=>{dispatch(AddTicketAsync(({
                                              "flights_id": flight.id,
                                              })))}}>
                        purchase
              </Button>
              
              </TableCell>
             }    

              {/* updating a flight */}
              {is_super &&
              <TableCell align='left'>
              <Button align='left'
                      variant="contained"
                      sx={{color:'white', background:'#5B5EA6'}}
                      onClick={()=>{dispatch(GetOneFlightAsync(flight.id));
                                    setTimeout(() => navigate(`/UpdateFlight`), 250)}}>
                        update
              </Button>              
              </TableCell>
              }
              {/* deleting a flight */}
              {is_super &&
              <TableCell align='left'>
              <IconButton align='left'
                      variant="contained" 
                      color='error' 
                      onClick={()=>dispatch(DeleteFlightAsync(flight.id))}>
                        <DeleteIcon />
              </IconButton>
              </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  </div>
  )}
