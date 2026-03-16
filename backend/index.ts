import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

//Here will be routes

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});