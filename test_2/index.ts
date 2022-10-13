import express, { Express } from 'express';
import dotenv from 'dotenv';
import router from "./router";
import fileService from './service/file-service';


dotenv.config();

const port = process.env.PORT;

const app: Express = express();
app.use('/', router);



const start = async (): Promise<void> => {
  try {
      app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
      });
      await fileService.writeToFile();
  } catch (e) {
      console.log(e)
  }
}
start();


