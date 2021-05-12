import express from 'express'
import { json, urlencoded } from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import * as routes from './routes'
import nextapp from './nextapp'

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const app = express();
app.use(compression());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1', routes.api);
app.use('/', routes.app);

(async () => {
  try {
    await nextapp.prepare();
    app.listen(port);
    console.log(`server listening on port ${port}`);
  }
  catch (err) {
    console.error(err.message);
  }
})();