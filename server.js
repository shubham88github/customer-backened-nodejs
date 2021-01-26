const express =require ('express')
const app =express()
const bodyParser=require('body-parser')
const cors=require('cors')
app.use(cors('*'))
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next();
// });
// list of routers
const routerUser = require('./routes/user')
const routerVehicle = require('./routes/vehicle')
//const routerOffer=require('./routes/offer')

//const app = express()

app.use(bodyParser.json())

// add the routers
app.use('/user', routerUser)
app.use('/vehicle', routerVehicle)
//app.use('/offer', routerOffer)


app.listen(4000, '0.0.0.0', () => {
  console.log('server started on port 4000')
})

