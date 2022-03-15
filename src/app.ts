import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import swaggerDocument from './swagger.json';
import routes from './config/routes';

dotenv.config();

// mongoose.set('debug', true); //Debug database actions

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connection to database stablished'))
  .catch((e) => console.log('An error ocurred trying to access the database', e));

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.use(cors());
app.set('port', process.env.PORT || 3001);
app.set('json spaces', 2);

app.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

app.listen(app.get('port'), () => {
  console.log(`App listening at http://localhost:${app.get('port')}`);
});
