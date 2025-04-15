const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const pool = require('./data');
const path = require('path');
const compression = require("compression");
const multer = require("multer");

const authRoutes = require('./routes/authRoutes');
const classRoutes = require('./routes/classRoutes');
const requestRoutes = require('./routes/requestRoutes');
const searchRoutes = require('./routes/searchRoutes');

app.use(compression());

app.use(session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'..', 'public')));
app.use(express.static(path.join(__dirname,'..', 'src')));

app.use(authRoutes);
app.use(classRoutes);
app.use(requestRoutes);
app.use( searchRoutes);

app.get('/', (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,'..', 'public', 'home.html'));
    }
    const user = req.session.user;
    return res.redirect(`/home/${user.username}`);

}); 

app.get("/home/:username", (req, res) => {
    if (!req.session.user) {
        return res.sendFile(path.join(__dirname,'..', 'public', 'home.html'));
    }
    res.sendFile(path.join(__dirname,'..', "public", "student.html"));
});

app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
