const fs = require("fs");
const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

app.listen(PORT);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/components/home.html");
})

app.get('/sign_in', (req, res) => {
    res.sendFile(__dirname + "/public/components/sign_in.html");
})
app.get('/log_in', (req, res) => {
    res.sendFile(__dirname + "/public/components/log_in.html");
})
app.get('/table_train', (req, res) => {
    res.sendFile(__dirname + "/public/components/table_train.html");
})

app.post('/log_in', (req, res) => {
    let login_user = req.body.login_user;
    let password_user = req.body.password_user;
    let second_password_user = req.body.second_password_user;

    if (login_user == "" || password_user == "" || second_password_user == "") {
        return res.redirect("/home");
    } else {
       if (second_password_user == password_user) {
        let data = fs.readFileSync(__dirname + "/public/xml/users.xml", "utf8");
        let str_to_arr = data.split('\n');
    str_to_arr.pop();
    let dataUser = 
    `${str_to_arr.join('\n')}
    <user>
        <login>${login_user}</login>
        <password>${password_user}</password>
    </user>
</users>`
    fs.writeFileSync(__dirname + "/public/xml/users.xml", dataUser, (error) => {
        if (error) throw error; // если возникла ошибка
        console.log("Асинхронная запись файла завершена.");
    });
        return res.redirect("/sign_in");
    } else {
        return res.redirect("/log_in");
    }}
})

app.use(express.static('public'))



//Стасік, мой любімый говнюк, разбуді в десять часов ноль-ноль мінут
//Хорошо моя зайка