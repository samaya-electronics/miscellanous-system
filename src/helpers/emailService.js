const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth:{
        user: 'samayatest@outlook.com',
        pass: '123456789abcd'
    }
})

const sendApprovingMail = (email, item , username)=>{
    const options = {
        from: 'samayatest@outlook.com',
        to: email,
        subject: 'Request approved',
        html: `<!doctype html>
        <html ⚡4email>
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head> 
        <body>
        <h1> miscellaneous store </h1>
        <h4 style="color: black;"> We would like to inform you mr ${username} that. 
        your request about item <h3>'${item}'</h3> has been approved you can come to receive it</h4>
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

const sendRejectionMail = (email, item , username)=>{
    const options = {
        from: 'samayatest@outlook.com',
        to: email,
        subject: 'Request rejected',
        html: `<!doctype html>
        <html ⚡4email>
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head> 
        <body>
        <h1> miscellaneous store </h1>
        <h4 style="color: black;"> We are sorry to inform you mr ${username} that. 
        your request about item <h3>'${item}'</h3> has been rejected  </h4>
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


const sendRequestingMailToLeader = (email, item , username)=>{
    const options = {
        from: 'samayatest@outlook.com',
        to: email,
        subject: `Informing you about ${username} request from Miscellaneous store `,
        html: `<!doctype html>
        <html ⚡4email>
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head> 
        <body>
        <h1> miscellaneous store </h1>
        <h4 style="color: black;"> We would like to inform you there is a request from ${username} 
        who is wants to get ${item.quantity} of <h3>'${item.name} the request is subject to your approval'</h3> waiting for your response </h4>
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



const sendRequestingMailToStore = (email, item , username)=>{
    const options = {
        from: 'samayatest@outlook.com',
        to: email,
        subject: `Informing you about ${username} request from Miscellaneous store `,
        html: `<!doctype html>
        <html ⚡4email>
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head> 
        <body>
        <h1> miscellaneous store </h1>
        <h4 style="color: black;"> We would like to inform you there is a request from ${username} 
        who wants to get ${item.quantity} of <h3>'${item.name}'</h3> waiting for your response </h4>
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



const sendThreshholdCautionMailToStore = (email, item , username)=>{
    const options = {
        from: 'samayatest@outlook.com',
        to: email,
        subject: `Informing you about ${item.name} item has reached the threshold `,
        html: `<!doctype html>
        <html ⚡4email>
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head> 
        <body>
        <h1> miscellaneous store </h1>
        <h4 style="color: black;"> We would like to inform you there is an item '${item.name}' 
        has reached the threshold '${item.threshold}' Remembering you to contact the supplier </h4>
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

module.exports = {
    sendApprovingMail,
    sendRejectionMail,
    sendRequestingMailToLeader,
    sendRequestingMailToStore,
    sendThreshholdCautionMailToStore
}