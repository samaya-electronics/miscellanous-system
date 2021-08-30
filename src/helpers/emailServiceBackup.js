const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth:{
        user: 'samayatest@outlook.com',
        pass: '123456789abcd'
    }
})

transporter.use('compile',hbs({
    viewEngine: 'express-handlebars',
    viewPath: "./viwes/"
}))

const sendMail = (email, message)=>{
    const options = {
        from: 'samayatest@outlook.com',
        to: email,
        subject: 'rod 3al miscellanous store ya mghror',
        text: message,
        template: 'index'
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
sendMail('kareemkohel@gmail.com','al s3dawy by2olk t3ala yala khod al haga')
