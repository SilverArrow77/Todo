import express from 'express';
import router from './routes.mjs'
import {connectToMongoDB} from "./database.mjs";
import 'dotenv/config'
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'dist')));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get("/hello",(req, res)=>{
    res.status(200).json({msg: "hello"});
});

app.use("/api", router);

const port = process.env.PORT || 5000;

const startServer = async () => {
    await connectToMongoDB();
    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
};
startServer();