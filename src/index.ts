import express, { Application } from 'express';
import bodyParser from "body-parser"
const mainRouter = require('./routes/routes');

const app: Application = express();

app.use(express.json());
app.use(bodyParser.json())
app.use('/api/v1', mainRouter);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

module.exports = app;
