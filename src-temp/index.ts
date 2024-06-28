import express from 'express';
import config from "./config";
import { relay, hero } from './routes'

const app = express();
app.use(express.json());
app.use('/api', relay);
app.use('/api/hero', hero);

app.listen(config.PORT, async () => {
  console.log(`Server is running at http://localhost:${config.PORT}`);
});
