const mariadb = require('mariadb');
const express = require('express');
const process = require('process');
import { initEndpoints } from './endpoints';

const httpContext = require('express-http-context');

const morgan = require('morgan');
const ruid = require('express-ruid');

//  Docker exit signal helper
process.on('SIGINT', () => {
    console.info('Interrupted');
    process.exit(0);
});

//  Database credentials
const credentials = {
    host: process.env.MARIADB_HOSTNAME || 'localhost',
    user: process.env.MARIADB_USER || 'MARIADB_USER',
    password: process.env.MARIADB_PASSWORD || 'MARIADB_PASSWORD',
    database: process.env.MARIADB_DATABASE || 'MARIADB_DATABASE',
    port: process.env.MARIADB_PORT || 3306
};

console.log(credentials);

//  Database connection pool
const pool = mariadb.createPool({
    ...credentials,
    connectionLimit: 50,
    logger: {
        query: (query) => {
            console.log(query);
        },
        error: (err) => {
            console.log(err);
        }
    }
});

//  Express server
const app = express();

//  Adding unique request id to each request
app.use(httpContext.middleware);
//  Adding unique request id to each request
app.use(ruid({ setInContext: true }));

//  introducing request id to morgan logging
morgan.token('rid', (req, res) => req.rid);

//  morgan logging for each request
app.use(
    morgan(':rid :remote-addr :url :method HTTP/:http-version :user-agent', {
        immediate: true,
        stream: {
            write: (message) => {
                console.log(message);
            }
        }
    })
);

//  morgan logging for each response
app.use(
    morgan(':rid :remote-addr :url :method :status :res[content-length] :response-time ms', {
        stream: {
            write: (message) => {
                console.log(message);
            }
        }
    })
);

//  Adding our endpoints
initEndpoints(app, pool);

//  Global error handler
app.use((err, req, res, next) => {
    console.error({
        rid: req.rid,
        error: err
    });
    res.status(500).send(`ERROR_HAPPENED! request id: ${req.rid}`);
});

//  Starting the server
app.listen(8080, () => {
    console.log(`Listening on port 8080`);
});
