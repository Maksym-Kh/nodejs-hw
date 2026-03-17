import express from 'express';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errors } from 'celebrate';
import 'dotenv/config';
import noteRouter from './routes/notesRoutes.js';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

await connectMongoDB();

app.use(logger());

app.use(noteRouter);

app.use(notFoundHandler);

app.use(errors());
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is configured to run on port: ${port}`);
});
