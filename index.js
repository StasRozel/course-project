const express = require('express');
const app = express();

const PORT = 3000;

app.listen(PORT);

app.get('/home', (req, res)=> {
    res.sendFile(__dirname + "/public/components/home.html");
})
// app.get('/booking', (req, res)=> {
//     res.sendFile(__dirname + "/components/booking.html");
// })
// app.get('/sign_in', (req, res)=> {
//     res.sendFile(__dirname + "/components/sign_in.html");
// })
// app.get('/log_in', (req, res)=> {
//     res.sendFile(__dirname + "/components/log_in.html");
// })
// app.get('/table_train', (req, res)=> {
//     res.sendFile(__dirname + "/components/table_train.html");
// })

app.use(express.static('public'));