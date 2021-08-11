const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', () => {
    resizeBy.send('Welcome to my forma!');
});

app.post('/api/forma', (req, res) => {
    let data = req.body;
    let smtpTransport = nodemailer.createTransport({
        // service: 'Gmail',
        // Asad's email, host, pass, on sendinblue
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false,
        auth: {
            user: "maryum@mayfairitconsultancy.com",
            pass: "h7xV2GJHInBwqyLF"
        }
    });

    console.log('Connected!');

    let mailOptions = {
        from: data.email, // data.email
        to: `maryum@mayfairitconsultancy.com`,
        subject: `Message from ${data.name}`,
        html: `
        
        <h3>Information</h3>
            <ul>
                <li>Name: ${data.name}</li>
                <li>Email: ${data.email}</li>
            </ul>

            <h4>Message:</h4>
            <p>${data.message}</p>

        `
    }

    console.log('Created email!');

    smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
            response.send(error);
            console.log(error);
        }

        else {
            response.send('Success!');
        }
    })

    smtpTransport.close();
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});