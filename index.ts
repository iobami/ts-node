import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', ({},res) => res.send('Express + TypeScript Server'));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
