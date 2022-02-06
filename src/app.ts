import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import swaggerDocument from './swagger.json';
import routes from './config/routes';

dotenv.config();
const app = express();
routes(app);

app.use(cors());
app.set('port', process.env.PORT || 3001);
app.set('json spaces', 2);

app.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(app.get('port'), () => {
  console.log(`App listening at http://localhost:${app.get('port')}`);
});
