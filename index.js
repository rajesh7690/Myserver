import express from "express";
import Connection from "./database/db.js";
import cors from "cors";
import route from "./routes/route.js";

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',route);

const PORT =8000;

Connection();

app.listen(PORT, console.log('server running'))