const { log, error } = require('console')
require("dotenv").config();
const express = require('express') // importing express
const mongoose = require('mongoose') //importing mongoose 
const path = require('path')
const app = express()
const port = process.env.PORT

//telling that we are using view engine
app.set("view engine", "ejs");


//for read html data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//sending here a static file
app.use(express.static(path.join(__dirname, 'public')))

//mongoose conection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("m conected");
    })
    .catch((error) => {
        console.log(error);
    })

//accoding to html data struture a same struture is created into mongodb using schema process
const userSchema = new mongoose.Schema({
    username: {
        type: String, //telling type is string
        required: true //required or not
    },
    email: {
        type: String,
        required: true,
        unique: true // by this we can tell this will be unique for everyuser
    },
    pass: {
        type: String,
        required: true
    }
})

//this is used for connect schema to database
const User = mongoose.model("User", userSchema)

//sending html files
app.get('/', (req, res) => {
    res.render("loginSignUpPage"),
        { error: false, msg: null }; //here error is handling where email should alredy exist in data base
});


// getting html data using post methode -- for signUp
app.post("/signUp", async (req, res) => {
    const { username, email, pass } = req.body
    const newUser = new User({ username, email, pass })

    const existnewuser = await User.exists({ email: req.body.email });
    if (existnewuser) {
        console.log("already accouunt having");
        res.render("loginSignUpPage", { error: true, msg: "Try different email" });
    }
    else {
        await newUser.save()
        console.log("data saved");
        console.log(newUser);
        res.render("info", {
            name: newUser.username,
            email: newUser.email
        });
    }
})

// getting html data using post methode -- for login
app.post("/login", async (req, res) => {
    const { email, pass } = req.body
    const findUser = await User.findOne({ email })
    if (findUser) {
        console.log("yes exists");
        if (findUser.pass === pass) {
            res.render("info", {
                name: findUser.username,
                email: findUser.email
            });
        }
        else {
            res.render("loginSignUpPage", {
                error: true,
                msg: "Password invalid"
            });
        }
    }
    else {
        console.log("user not exists");
        res.render("loginSignUpPage", {
            error: true,
            msg: "email Invalid"
        });
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
