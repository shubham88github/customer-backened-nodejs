const express = require('express')
const router = express.Router()

//const mysql = require('mysql2')
const jwt= require('jsonwebtoken')
const cryptojs= require('crypto-js')
const db= require('../db')
const { changeUser } = require('../db')

const mailer= require('../mailer')
const util=require('../utils')
//const { route } = require('./note')
const { request, response } = require('express')


// v_company_name 
//  v_model        
//  v_reg_No       






    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////// GET VEHICLE //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


/**
 * @swagger
 *
 * /vehicle/:
 *   get:
 *     description: For getting vehicle
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successful message
 */
router.get('/',(request,response) =>{

    // const {u_id}= request.params
    // console.log(`id=${u_id}`)
     const token=request.headers['token']
     //console.log(token)
     try{
    // console.log(token)
           
     const data=jwt.verify(token,'12344ksdfflkmklmf')
    // console.log(data)
     const userId=data['id']
     //console.log(userId)
     const statement=`select *  from vehicle where u_id=${userId}`
     
     db.query(statement,(error,users)=>{
     
     if(users.length>0 )
     {      const user=users;
          response.send(util.sendResult(error,user))
     }
     else{
     
         response.send(util.sendError(`there is no vehicle with this id`))
     }
     
     })
     }  catch( ex){
           response.status=401
          response.send("you are not authorize to do it")
     
     }
     
     })


         /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////// UPdate Vehicle //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

     router.put('/create/:v_id',(request,response) => {
        const {v_id}= request.params
        const token=request.headers['token']
        
              
        const data=jwt.verify(token,'12344ksdfflkmklmf')
        const userId=data['id']
        const{ v_company_name, v_model, v_reg_No }=request.body
        
        const statement= `update vehicle set 
        v_company_name='${v_company_name}',
        v_model='${v_model}',
        v_reg_No='${v_reg_No}',
          u_id='${userId}'  
         where  v_id='${v_id}'`
                            
        db.query(statement,(error,result)=>{
        
        response.send(util.sendResult(error,result))
        
        
        })
        
        
        })


     /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////// ADD Vehicle //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 *
 * /vehicle/add:
 *   post:
 *     description: For creating offer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: v_company_name
 *         description: vehicle company name
 *         in: formData
 *         required: true
 *         type: string
 * 
 *       - name: v_model
 *         description: vehicle model name
 *         in: formData
 *         required: true
 *         type: string
 * 
 *       - name: v_reg_no
 *         description: vehicle registration number
 *         in: formData
 *         required: true
 *         type: string
 *      
 *     responses:
 *       200:
 *         description: successful message
 */
        router.post('/add', (request, response) => {
            const token=request.headers['token']
        
              
        const data=jwt.verify(token,'12344ksdfflkmklmf')
        const userId=data['id']
        console.log(userId)
            const { v_company_name, v_model, v_reg_No} = request.body
          
          //  const encryptedPassword = cryptojs.MD5(u_password)
            const statement = `insert into vehicle ( v_company_name, v_model, v_reg_No,u_id) 
                values ('${v_company_name}', '${v_model}', '${v_reg_No}','${userId}' )`
          
            db.query(statement, (error, dbResult) => {
              const result = {}
              if (error) {
                // error occurred
              //   console.log(`error: ${error}`)
              //   result['status'] = 'error'
              //   result['error'] = error
                response.send(util.sendError(error))
          
              } else {
                    

                response.send(util.sendSuccess(dbResult))

                // const subject = `'welcome to Bikeclinic'`
                // const body = `
                // <h1>Welcome to Bikeclinic ${u_first_name}</h1>
                // <h2>this is a welcome mesage from shubham</h2>
                // `
                // mailer.sendEmail(u_email, subject, body, (emailError, info) => {
          
                //   // // no error: everything looks Okay
                //   // console.log(`result: `, result)
                //   // result['status'] = 'success'
                //   // result['data'] = dbResult
                //   response.send(util.sendSuccess(dbResult))
                // })
              }
          
            })
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
 * /vehicle/details:
 *   get:
 *     description: For getting vehicle details 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successful message
 */

    router.get('/details/:id', (request, response) => {
      const token=request.headers['token']
        
              
        const data=jwt.verify(token,'12344ksdfflkmklmf')
        const userId=data['id']
      const {id} = request.params
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
              v_reg_No: tmpVehicle['v_reg_No'],
              
              
    
             
            }
            vehicles.push(vehicle)
          }
          response.send(util.sendSuccess(vehicles ))
        } 
    
      })
    })

   // v_company_name, v_model, v_reg_No
     
     module.exports = router
