require("dotenv").config();
const path = require('path');

const express = require("express");
const app = express();
const userRouter = require("./api/users/user_router");
const sleepRouter = require("./api/sleeps/sleep_router");

app.use("/static", express.static(path.join(__dirname, '/frontend/public')));
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/sleeps", sleepRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/templates/landing_page.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/templates/signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/templates/login.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/templates/home.html'));
});

app.get('/createsleep', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/templates/createSleep.html'));
});

app.get('/updatesleep', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/templates/updateSleep.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Server running at port: ${process.env.PORT}`);
});