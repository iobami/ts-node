import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const env = dotenv.config();
dotenvExpand(env);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './src/client')));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on PORT: ${PORT}`);
});
