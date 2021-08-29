const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth:{
        user: 'samayatest@outlook.com',
        pass: '123456789abcd'
    }
})


const options = {
    from: 'samayatest@outlook.com',
    to: 'kareemkohel@gmail.com',
    subject: 'rod 3al miscellanous store ya mghror',
    text: 'al s3dawy by2olk t3ala yala khod al haga'
}

const sendmails = (useremail, message)=>{
    const options = {
        from: 'samayatest@outlook.com',
        to: useremail,
        subject: 'rod 3al miscellanous store ya mghror',
        text: message
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
sendmails('kareemkohel@gmail.com','al s3dawy by2olk t3ala yala khod al haga')
