const express = require('express')
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const env = require('dotenv').config();
const connectDB = require("./db/connect");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })



const PORT = process.env.PORT || 5000;
const origin = ['https://homebooks.in', 'http://localhost:3000'];


app.use(cors({credentials: true, origin: origin }));
// app.use(cors({origin: origin }));
// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));


const start = async () => {
    try { 
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`${PORT} Yes I'am connected.`);
        })
    }catch (error) {
        console.log(error);
    }
}
start();

app.get("/", (req,res) => {
    res.send("Hello server")
})


// Route Imports
const signup = require('./routes/User/signUp');
const login = require('./routes/User/login');
const logout = require('./routes/User/logout');
const {profile,getProfile} = require('./routes/User/profile');
const {addSchool,getSchool,getSchoolInfo} = require('./routes/School/School');
const addBook = require('./routes/Books/addBook');
const getSchoolBooks = require('./routes/Books/getSchoolBooks');

// Api Endpoints
app.post("/signup", signup);
app.post("/login", login);
app.post("/logout", logout);
app.get("/profile", profile);
app.get("/getProfile", getProfile);

//School Api Endpoints
app.get("/getSchool", getSchool);
app.get("/getSchool/:id", getSchoolInfo);
// app.post("/addSchool", addSchool);
app.post("/addSchool", upload.single('schoolImg') , addSchool);

//Book Api Endpoints
app.get("/getSchoolBooks/:id", getSchoolBooks);
// app.post("/addBook", addBook);
app.post("/addBook", upload.single('bookImg') , addBook);


