require('dotenv').config();
require('express-async-errors');
var cors = require('cors');

const express = require('express');
const app = express();

const not_found = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


// routers import
const login_router = require('./routes/login_routes')
const user_router = require('./routes/user_routes')
const customer_router = require('./routes/customer_routes')
const countries_router = require('./routes/countries_routes')
const airlines_router = require('./routes/airlines_routes')
const flights_router = require('./routes/flight_routes')
const tickets_router = require('./routes/tickets_routes')

// db import
const ConnectDB = require('./db/connect')

// middleware
app.use(express.static('./uploads'))
app.use(express.json());
app.use(cors());


// routes
app.use('/api/login', login_router);
app.use('/api/users', user_router);
app.use('/api/customers', customer_router);
app.use('/api/countries', countries_router);
app.use('/api/airlines', airlines_router);
app.use('/api/flights', flights_router);
app.use('/api/tickets', tickets_router);


app.use(not_found);
app.use(errorHandlerMiddleware);

const port =  4000;

const start = async () => {
  try {
    await ConnectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port localhost:${port}...`)
    );
  } catch (error) {
    console.log('Error')
    console.log(error);
  }
};

start();
