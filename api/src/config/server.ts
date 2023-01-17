
import express from 'express';
import cors from 'cors'
import morgan from 'morgan';

import config  from './env';
import routes from '../modules';

import "./database";

const app = express();
app.set('port', config.port); 
app.use(morgan('dev'));
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api', routes)

export default app;