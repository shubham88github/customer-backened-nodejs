function function1(){

    const cryptojs= require('crypto-js')
    
    const password=`test`
    console.log(`encrypted password ::${cryptojs.SHA1(password)}`)
    console.log(`encrypted password ::${cryptojs.SHA256(password)}`)
    console.log(`encrypted password ::${cryptojs.SHA512(password)}`)
    console.log(`encrypted password ::${cryptojs.MD5(password)}`)
    
    }
    //function1()
    
    
    
    
    function function2()
    {
       const nodemailer=require('nodemailer')
    
    
       //var nodemailer = require('nodemailer');
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'express123mean@gmail.com',
            pass: 'sunbeam123'
        }
    });
    
    const mailOptions = {
        from: 'express123mean@gmail.com', // sender address
        to: 'abhiwardha@gmail.com', // list of receivers
        subject: 'APP Mail', // Subject line
        text: 'this is a test mail from SHUBHAM.'// plain text body
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err)
        else
            console.log(info);
    })
    
    }
    
   // function2()
    
    
    // function function3(){
    
    // const jwt= require('jsonwebtoken')
    
    // const data={id:1}
    
    // const token=jwt.sign(data,'1232123231dfmgbkmkdbmkdbmdbmoj')
    
    // console.log(data)
    // console.log(token)
    
    // const serverdata=jwt.verify(token,'1232123231dfmgbkmkdbmkdbmdbmoj')
    // console.log(serverdata)
    
    //now cheak really after changes in id  i.e modify id
    // const modifiedtoken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjA4NDY1MzgxfQ.2i2pigHqd70OyXVamBnQeIqwuyKRZS0WRRF2mnH5ilQ'
    // const serverdata=jwt.verify(modifiedtoken,'1232123231dfmgbkmkdbmkdbmdbmoj')
    // console.log(serverdata)
   // }
    
   // function3()