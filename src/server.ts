import express, { Express, Request, Response } from 'express';
import HelmetMiddleware from './middlewares/helmet.middleware';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const helmetMiddleware = HelmetMiddleware.getInstance();

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send(`⚡️[server]: Server is running`);
});

app.use(helmetMiddleware.applyHeaders.bind(helmetMiddleware));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
