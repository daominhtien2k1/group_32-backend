import express, { json } from 'express';
import morgan from 'morgan';
import cors from "cors";
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import db from '../models/index.cjs';

import authRouter from './modules/auth/auth.route.js';
import userRoute from './modules/user/user.route.js';

app.use(morgan('dev'));
app.use(cors());
app.use(json());

app.use('/api/auth', authRouter);
app.use('/api/user', userRoute);

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message);
});

db.sequelize.sync().then(() => {
    console.log('Synced db.');
}).catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});