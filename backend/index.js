const  express= require("express");
const app = express();
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

require('dotenv').config();
require('./Models/db')

const PORT= process.env.PORT

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/product',ProductRouter);

app.get('/ping',(req,res)=>{
    res.send("meet");
})


app.listen(PORT,()=>{
    console.log(`Server is Runing on ${PORT}`);
})
