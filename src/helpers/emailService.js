const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth:{
        user: 'samayatest@outlook.com',
        pass: '123456789abcd'
    }
})


const sendMail = (email, item , username)=>{
    const options = {
        from: 'samayatest@outlook.com',
        to: email,
        subject: 'message approved',
        html: `<!doctype html>
        <html ⚡4email>
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head> 
        <body>
        <h1> miscellanous store </h1>
        <h4 style="color: black;"> We would like to inform you mr ${username} that. 
        your request has been approved you can come to recive your requested item <h3>'${item}'</h3> </h4>
        </body>
        </html>`
    }

    transporter.sendMail(options, (err,info)=>{
    if(err){
        console.log(err)
        return
    }
    console.log("sent" + info.response)
})
}

//fx declaration
sendMail('moandosama1163@gmail.com','blackbord', 'Mohamed osama')

exports = {sendMail}