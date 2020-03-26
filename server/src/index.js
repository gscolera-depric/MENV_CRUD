const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const morgan = require('morgan');
const gracefulShutdown = require('http-graceful-shutdown');

const { Client, Provider } = require('./controllers')

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 7878;
const dbURL = process.env.DB_URL;

const app = express();
const apiDocs = YAML.load(path.resolve(__dirname, 'swagger.yaml'));

app.use(morgan('short'))
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocs));
app.use('/api/client', Client);
app.use('/api/provider', Provider);

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const onServerUp = () => console.log(`Server is up on -> \x1b[1;34m${host}:${port}\x1b[0m`);

mongoose.connect(dbURL)
  .then(() => {
    let server = app.listen(port, host, onServerUp);
    gracefulShutdown(server);
  })
  .catch(e => console.log(e));
