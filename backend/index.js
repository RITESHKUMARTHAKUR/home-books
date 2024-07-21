const express = require('express')
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const env = require('dotenv').config();
const connectDB = require("./db/connect");



const PORT = process.env.PORT || 5000;
const origin = ['https://homebooks.in','https://www.homebooks.in', 'http://localhost:3000', 'http://192.168.29.234:3000'];


app.use(cors({credentials: true, origin: origin }));
// app.use(cors({origin: origin }));
// app.use(cors());
app.use(express.json());
app.use(cookieParser());


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
const getBooks = require('./routes/Books/getBooks'); //getAllBooks
const getSingleBook = require('./routes/Books/getSingleBook'); //getAllBooks

const createOrder = require('./routes/Orders/createOrder');
const createCartOrder = require('./routes/Orders/createCartOrder');
const addCart = require('./routes/Orders/addCart');
const removeCart = require('./routes/Orders/removeCart');
const getCart = require('./routes/Orders/getCart');
const getOrders = require('./routes/Orders/getOrder');
const getAllOrders = require('./routes/Orders/getAllOrders');
const updateOrder = require('./routes/Orders/updateOrder');
const getSingleOrder = require('./routes/Orders/getSingleOrder');

const userMessage = require('./routes/Messages/userMessage');
const getAllMessage = require('./routes/Messages/getAllMessages');
const addPromotion = require('./routes/Promotions/addPromotions');

const otpMail = require('./routes/Delivery/otpMail');
const verifyOtp = require('./routes/Delivery/verifyOtp');

// Api Endpoints
app.post("/signup", signup);
app.post("/login", login);
app.post("/logout", logout);
app.get("/profile", profile);
app.get("/getProfile", getProfile);

//School Api Endpoints
app.get("/getSchool", getSchool);
app.get("/getSchool/:id", getSchoolInfo);
app.post("/addSchool", addSchool);

//<------- Book Api Endpoints ------->
app.get("/getSchoolBooks/:id", getSchoolBooks);
app.get("/getBooks", getBooks);
app.get("/getSingleBook/:id", getSingleBook);
app.post("/addBook", addBook);
//<------- Book Api Endpoints ------->

//<------- Order Api Endpoints ------->
app.post("/createOrder", createOrder);         //Bulk Order Api
app.post("/createCartOrder", createCartOrder); //Create Order from Cart Api
app.post("/addCart", addCart);                 //Add Single Item To Cart Api
app.delete("/removeCart", removeCart);                 //Remove Single Item from Cart Api
app.get("/getCart/:email", getCart);           //Get All Cart Items Api
app.get("/getOrders/:email", getOrders);       //Get Orders of User Api
app.get("/getAllOrders", getAllOrders);       //Get All Orders Api
app.put("/updateOrder/:orderId", updateOrder);       //Get All Orders Api
app.get("/getOrder/:orderId",getSingleOrder);  //Get Single Order
//<------- Order Api Endpoints ------->

//<------- Order Api Endpoints ------->
app.post("/otp-mail", otpMail);
app.post("/otp-verify", verifyOtp);
//<------- Order Api Endpoints ------->

//<------- Message Api Endpoints ------->
app.post("/userMessage", userMessage);
app.post("/getAllMessage", getAllMessage);
//<------- Message Api Endpoints ------->

//<------- Promotion Api Endpoints ------->
app.post("/addPromotion", addPromotion);
//<------- Promotion Api Endpoints ------->






