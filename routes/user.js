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

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Profile Register//////////////////////////////
////////////////////////////////////////////////////////////////////////////
// u_address    | varchar(100) | YES  |     | NULL    |                |
// | u_email      | varchar(60)  | YES  | UNI | NULL    |                |
// | u_first_name | varchar(30)  | YES  |     | NULL    |                |
// | u_last_name  | varchar(30)  | YES  |     | NULL    |                |
// | u_mobile     | varchar(11)  | YES  |     | NULL    |                |
// | u_password   | varchar(30)  | YES  |     | NULL    |                |
// +--------------+--------------+------+-----+---------+----------------+

/**
 * @swagger
 *
 * /user/register:
 *   post:
 *     description: For creating offer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: u_address
 *         description: user address
 *         in: formData
 *         required: true
 *         type: string
 * 
 *       - name: u_email
 *         description: user name
 *         in: formData
 *         required: true
 *         type: string
 * 
 *       - name: u_first_name
 *         description: user first name
 *         in: formData
 *         required: true
 *         type: string
 * 
 *       - name: u_last_name
 *         description: user last name
 *         in: formData
 *         required: true
 *         type: string
 * 
 *       - name: u_mobile
 *         description: user mobile number
 *         in: formData
 *         required: true
 *         type: string
 * 
 *       - name: u_password
 *         description: user password
 *         in: formData
 *         required: true
 *         type: string
 *      
 *     responses:
 *       200:
 *         description: successful message
 */
router.post('/register', (request, response) => {
    const { u_address, u_email, u_first_name, u_last_name, u_mobile ,u_password} = request.body
  
    const encryptedPassword = cryptojs.MD5(u_password)
    const statement = `insert into user ( u_address, u_email, u_first_name, u_last_name, u_mobile ,u_password) 
        values ('${u_address}', '${u_email}', '${u_first_name}', '${u_last_name}','${u_mobile}','${encryptedPassword}' )`
  
    db.query(statement, (error, dbResult) => {
      const result = {}
      if (error) {
        // error occurred
      //   console.log(`error: ${error}`)
      //   result['status'] = 'error'
      //   result['error'] = error
        response.send(util.sendError(error))
  
      } else {
  
        const subject = `'welcome to Bikeclinic'`
        const body = `
        <h1>Welcome to Bikeclinic ${u_first_name}</h1>
        <h2>this is a welcome mesage from shubham</h2>
        `
        mailer.sendEmail(u_email, subject, body, (emailError, info) => {
  
          // // no error: everything looks Okay
          // console.log(`result: `, result)
          // result['status'] = 'success'
          // result['data'] = dbResult
          response.send(util.sendSuccess(dbResult))
        })
      }
  
    })
  })


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////// LOGIN //////////////////////////////
////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 *
 * /user/login:
 *   post:
 *     description: For creating offer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: u_email
 *         description: user email
 *         in: formData
 *         required: true
 *         type: string
 * 
 *       - name: u_password
 *         description: user password
 *         in: formData
 *         required: true
 *         type: string
 * 
 *     responses:
 *       200:
 *         description: successful message
 */
router.post('/login',(request,response)=>{
 // const { email , password }= request.body
  const { u_email, u_password } = request.body
   console.log(`EMAIL::${u_email}`)
   console.log(`PASSWORD::${u_password}`)

   const encryptedPassword = cryptojs.MD5(u_password)
 const statement = `select * from user where u_email = '${u_email}' and u_password = '${encryptedPassword}'`
 db.query(statement, (error, users) =>  {

          if(error)
          {

              response.send({status :'error',error:error})
          }

          else{

              if(users.length ==0)
              {
                  response.send({status :'error',error:error})
                 // response.send(`user doesnot exit`)
              }
              else{
                 // response.send(`login Successfull`)
                 const user= users[0]
                 //console.log(user.u_id)                
                  const data ={id:user['u_id']}
                 // console.log(data)
                 const token=jwt.sign(data,'12344ksdfflkmklmf')
                 console.log(token)
                 response.send({status:'success',data:token})
              }
          }
      })
})



/////////////////////////////////////////////////////////////////////////////
/////////////////////////////// GET USER //////////////////////////////
////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 *
 * /user/profile:
 *   get:
 *     description: For getting user profile
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successful message
 */

router.get('/profile',(request,response) =>{

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
    const statement=`select u_id,u_address, u_email, u_first_name, u_last_name, u_mobile  from user where u_id=${userId}`
    
    db.query(statement,(error,users)=>{
    
    if(users.length>0 )
    {      const user=users[0];
         response.send(util.sendResult(error,user))
    }
    else{
    
        response.send(util.sendError(`there is no user with this id`))
    }
    
    })
    }  catch( ex){
          response.status=401
         response.send("you are not authorize to do it")
    
    }
    
    })
    
    
    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////// UPdate Profile //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    
    
    router.put('/profile/',(request,response) => {
    //const {id}= request.params
    const token=request.headers['token']
    
          
    const data=jwt.verify(token,'12344ksdfflkmklmf')
    const userId=data['id']
    const{ u_address, u_email, u_first_name, u_last_name, u_mobile  }=request.body
    
    const statement= `update user set 
                 u_address='${u_address}',
                 u_email='${u_email}',
                 u_first_name='${u_first_name}',
                 u_last_name='${u_last_name}',
                 u_email='${u_email}',
                 u_mobile='${u_mobile}'
                 where u_id=${userId}  `
                        
    db.query(statement,(error,result)=>{
    
    response.send(util.sendResult(error,result))
    
    
    })
    
    
    })
    
    
module.exports = router

//u_address, u_email, u_first_name, u_last_name, u_mobile