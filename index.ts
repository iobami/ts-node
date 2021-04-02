import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

import { initDb } from './src/db';
import { routes } from './src/services';
import webpush from './src/services/webpush';

const env = dotenv.config();
dotenvExpand(env);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, './src/client')));
app.use(express.json());

initDb();
webpush();
routes(app);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on PORT: ${PORT}`);
});
