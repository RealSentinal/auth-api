import express from 'express';
import { Auth } from './api/auth';

const app = express();
const port = process.env.port || 3000;

Auth(app);

app.listen(port, () => console.log(`Listening on port ${port}`));