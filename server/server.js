import express from 'express';
import router from './router/router.js';
import { connectToDb } from './DB/dbService.js';
import cors from "cors";


const app = express();
const port = 3000;

app.use(
    cors({
        origin: ["http://127.0.0.1:5500", "http://localhost:5173"],
    })
);

app.use(express.json());


app.get('/api/test', (req, res) => {
    res.send({ message: "Server works!" })
})

app.use(router);

app.listen(port, () => {
    //התחלת הרצת השרת והאזנה לפורט ספציפי
    console.log(`Server is listening to port ${port}`);
    connectToDb();
});