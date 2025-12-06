import express from 'express';
import router from './router/router.js';
import { connectToDb } from './DB/dbService.js';
import cors from "cors";
import chalk from 'chalk';
import dotenv from "dotenv";
import serverLogger from './middlewares/loggerService.js';
dotenv.config();

console.log('JWT_SECRET loaded:', process.env.JWT_SECRET); // Add this line
console.log('PORT loaded:', process.env.PORT); // Add this line

const app = express();
const port = process.env.PORT || 3000;

app.use(
    cors({
        origin: ["http://127.0.0.1:5500", "http://localhost:5173"],
    })
);

app.use(express.json());
app.use(serverLogger);

app.get('/api/test', (req, res) => {
    res.send({ message: "Server works!" })
})

app.use(router);

app.listen(port, () => {
    //התחלת הרצת השרת והאזנה לפורט ספציפי
    console.log(`Server is listening to port ${port}`);
    connectToDb();
});