import express from 'express';
import { index, create, update, del, getGrade } from './grades/index.js';
import { getNota, getMedia, getTop3 } from './nota/index.js';

const routes = express.Router();

routes.get('/grade', index);
routes.post('/grade', create);
routes.put('/grade', update);
routes.delete('/grade/:id', del);
routes.get('/grade/:id', getGrade);

routes.get('/nota', getNota);
routes.get('/media', getMedia);
routes.get('/top3', getTop3);

export default routes;
