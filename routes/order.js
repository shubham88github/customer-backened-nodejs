const express = require('express')
const router = express.Router()

//const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const cryptojs = require('crypto-js')
const db = require('../db')
const { changeUser } = require('../db')

const mailer = require('../mailer')
const util = require('../utils')
//const { route } = require('./note')
const { request, response } = require('express')


// v_company_name 
//  v_model        
//  v_reg_no       






/////////////////////////////////////////////////////////////////////////////
/////////////////////////////// GET VEHICLE //////////////////////////////
////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 *
 * /order/:
 *   get:
 *     description: For getting orders
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successful message
 */

router.get('/', (request, response) => {

  // const {u_id}= request.params
  // console.log(`id=${u_id}`)
  const token = request.headers['token']
  //console.log(token)
  try {
    // console.log(token)

    const data = jwt.verify(token, '12344ksdfflkmklmf')
    // console.log(data)
    const userId = data['id']
    //console.log(userId)
    const statement = `select *  from shop`

    db.query(statement, (error, shops) => {

      if (shops.length > 0) {
        const shop = shops;
        response.send(util.sendResult(error, shop))
      }
      else {

        response.send(util.sendError(`there is no shop with this id`))
      }

    })
  } catch (ex) {
    response.status = 401
    response.send("you are not authorize to do it")

  }

})

/**
 * @swagger
 *
 * /order/details:
 *   get:
 *     description: For getting orders details
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successful message
 */
router.get('/details/:id', (request, response) => {

  const {id}= request.params
  // console.log(`id=${u_id}`)
  const token = request.headers['token']
  //console.log(token)
  try {
    // console.log(token)

    const data = jwt.verify(token, '12344ksdfflkmklmf')
    // console.log(data)
    const userId = data['id']
    //console.log(userId)
    const statement = `select *  from shop where ven_id='${id}'`

    db.query(statement, (error, shops) => {

      if (shops.length > 0) {
        const shop = shops;
        response.send(util.sendResult(error, shop))
      }
      else {

        response.send(util.sendError(`there is no shop with this id`))
      }

    })
  } catch (ex) {
    response.status = 401
    response.send("you are not authorize to do it")

  }

})

/**
 * @swagger
 *
 * /order/shop-details:
 *   get:
 *     description: For getting shops details
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successful message
 */
router.get('/shop-details/:id',(request,response) =>{

  const {id}= request.params


  try{
 
 
  const statement=`select ven_id, ven_first_name,ven_mobile,ven_shop_name, ven_last_name from vendor where ven_id=${id}`
  // console.log(ven_id)
  // console.log("hello")
  db.query(statement,(error,users)=>{
  
  if(users.length>0 )
  {      const user=users[0];
 
       response.send(util.sendResult(error,user))
  }
  else{
  
      response.send(util.sendResult(`there is no user with this id`))
  }
  
  })
  }  catch( ex){
        response.status=401
       response.send("you are not authorize to do it")
  
  }
  
  })

  
/**
 * @swagger
 *
 * /order/services:
 *   get:
 *     description: For getting services
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successful message
 */
router.get('/services/:id', (request, response) => {

  const {id}= request.params
  // console.log(`id=${u_id}`)
  const token = request.headers['token']
  //console.log(token)
  try {
    // console.log(token)

    const data = jwt.verify(token, '12344ksdfflkmklmf')
    // console.log(data)
    const userId = data['id']
    //console.log(userId)
    const statement = `select *  from service where ven_id='${id}'`

    db.query(statement, (error, shops) => {

      if (shops.length > 0) {
        const shop = shops;
        response.send(util.sendResult(error, shop))
      }
      else {

        response.send(util.sendError(`there is no shop with this id`))
      }

    })
  } catch (ex) {
    response.status = 401
    response.send("you are not authorize to do it")

  }

})



/////////////////////////////////////////////////////////////////////////////
/////////////////////////////// UPdate Vehicle //////////////////////////////
////////////////////////////////////////////////////////////////////////////

router.put('/create/:v_id', (request, response) => {
  const { v_id } = request.params
  const token = request.headers['token']


  const data = jwt.verify(token, '12344ksdfflkmklmf')
  const userId = data['id']
  const { v_company_name, v_model, v_reg_no } = request.body

  const statement = `update vehicle set 
        v_company_name='${v_company_name}',
        v_model='${v_model}',
        v_reg_no='${v_reg_no}',
          u_id='${userId}'  
         where  v_id='${v_id}'`

  db.query(statement, (error, result) => {

    response.send(util.sendResult(error, result))


  })


})


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////// ADD Vehicle //////////////////////////////
////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 *
 * /order/add:
 *   post:
 *     description: For creating offer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: v_id
 *         description: vehicle ID
 *         in: formData
 *         required: true
 *         type: string
 * 
 *       - name: ven_id
 *         description: vendor ID
 *         in: formData
 *         required: true
 *         type: string
 * 
 *     responses:
 *       200:
 *         description: successful message
 */
router.post('/add', (request, response) => {
  const token = request.headers['token']


  const data = jwt.verify(token, '12344ksdfflkmklmf')
  const userId = data['id']
  console.log(userId)
  const { v_id, ven_id } = request.body





const query=`select v_reg_No from vehicle where v_id='${v_id}'`
db.query(query, (error, dbResult) =>{
  const result = {}
 
  console.log(dbResult[0]['v_reg_No'])
  var o_vehicle_reg_no=dbResult[0]['v_reg_No']
  console.log(o_vehicle_reg_no)

  var date= new Date().toISOString().slice(0, 10);

var today = new Date();
var o_start_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
 
  const statement = `insert into orders( o_date, o_start_time, o_vehicle_reg_no,u_id,v_id,ven_id) 
                values ('${date}', '${o_start_time}', '${o_vehicle_reg_no}','${userId}','${v_id}','${ven_id}' );`

  db.query(statement, (error, dbResult) => {
    const result = {}
    if (error) {
      // error occurred
      
      response.send(util.sendError(error))

    } else {


      response.send(util.sendSuccess(dbResult))

    
    }

  })
})
let o_vehicle_reg_no=""


// console.log(date)
// console.log(`no =`+o_vehicle_reg_no)


})



/////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Delete Vehicle //////////////////////////////
////////////////////////////////////////////////////////////////////////////


router.delete('/delete/:id', (request, response) => {
  const { id } = request.params
  const statement = `delete from vehicle where v_id = ${id}`
  db.query(statement, (error, data) => {
    response.send(util.sendResult(error, data))
  })
})


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////// get Vehicleby id //////////////////////////////
////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 *
 * /order/details:
 *   get:
 *     description: For getting shops details
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successful message
 */

router.get('/details/:id', (request, response) => {
  const token = request.headers['token']


  const data = jwt.verify(token, '12344ksdfflkmklmf')
  const userId = data['id']
  const { id } = request.params
  const statement = `select *  from vehicle where v_id='${id}' and u_id='${userId}' `

  db.query(statement, (error, data) => {
    if (error) {
      response.send(util.sendError(error))
    } else {
      // empty products collection
      const vehicles = []

      // iterate over the collection and modify the structure
      for (let index = 0; index < data.length; index++) {
        const tmpVehicle = data[index];
        const vehicle = {
          v_id: tmpVehicle['v_id'],
          v_company_name: tmpVehicle['v_company_name'],
          v_model: tmpVehicle['v_model'],
          v_reg_no: tmpVehicle['v_reg_no'],




        }
        vehicles.push(vehicle)
      }
      response.send(util.sendSuccess(vehicles))
    }

  })
})

// v_company_name, v_model, v_reg_no

module.exports = router
