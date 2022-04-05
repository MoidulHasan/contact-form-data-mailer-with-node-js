/**
 * Title: Main app
 * Descriptions: This is the main app of kajkam initiative
 * Author: Moidul Hasan Khan
 * Date: 02/04/2022
 */

// Dependencies
const express = require('express');
const cors = require("cors");
const app = express();
const PORT = 5858;
const { sendMail } = require("./sendMail");
app.use(express.json());

// Allow Cross Origin Request
app.use(cors());



app.route('/contact')

.post((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const name = req.body.name;
    const email = req.body.email;
    const category = req.body.category;
    const subject = req.body.subject;
    const message = req.body.message;
    console.log(name, email, category, subject, message);
    const messageData = {
            name,
            email,
            category,
            subject,
            message
        }
        // console.log(messageData);
        // const mail = sendMail(messageData);
        // console.log(mail);
    if (sendMail(messageData)) {
        // res.status(200).json("Message Send Successfull");
        res.status(200).json({
            status: 'success',
            data: {
                message: "Message Send Successfull"
            }
        });
    } else {
        // res.status(5000).json("There is a server error, please try again letter");
        res.status(500).json({
            status: 'Internal Server Error',
            data: {
                message: "There is a server error, please try again letter"
            }
        });
    }

})

app.get('*', function(req, res) {
    // res.send('URL Not Found', 404);
    res.status(404).json({
        status: 'URL Not Found',
        data: {
            message: "URL Not Found"
        }
    });
});

app.listen(PORT, function(err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});