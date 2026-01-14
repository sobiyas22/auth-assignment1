import express from 'express';
import loginRouter from './login.route.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const PORT = 8000;

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', loginRouter);
app.get('/health',(req,res)=>{
    res.send({status: 'OK'});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});