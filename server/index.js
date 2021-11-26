import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);

const CONNECTION_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT|| 5000;


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


import { fileURLToPath} from 'url';
import { dirname, resolve } from 'path'

const __fileName = fileURLToPath(import.meta.url) 
const __dirname = dirname(__fileName)

const buildFolderPath = resolve(__dirname, '../client/build')
app.use(express.static(buildFolderPath))

//React Router 
app.get('*', (req, res) => {
  res.sendFile(`${buildFolderPath}/index.html`)
})