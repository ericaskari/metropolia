const mariadb = require('mariadb');
const express = require('express');
const process = require('process');
import { initEndpoints } from './endpoints';

const httpContext = require('express-http-context');

const morgan = require('morgan');
const ruid = require('express-ruid');

process.on('SIGINT', () => {
    console.info('Interrupted');
    process.exit(0);
});

const credentials = {
    host: process.env.MARIADB_HOSTNAME || 'localhost',
    user: process.env.MARIADB_USER || 'MARIADB_USER',
    password: process.env.MARIADB_PASSWORD || 'MARIADB_PASSWORD',
    database: process.env.MARIADB_DATABASE || 'MARIADB_DATABASE',
    port: process.env.MARIADB_PORT || 3306
};

console.log(credentials);

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

const app = express();

app.use(httpContext.middleware);
app.use(ruid({ setInContext: true }));

morgan.token('rid', (req, res) => req.rid);

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

app.use(
    morgan(':rid :remote-addr :url :method :status :res[content-length] :response-time ms', {
        stream: {
            write: (message) => {
                console.log(message);
            }
        }
    })
);

initEndpoints(app, pool);

app.use((err, req, res, next) => {
    console.error({
        rid: req.rid,
        error: err
    });
    res.status(500).send(`ERROR_HAPPENED! request id: ${req.rid}`);
});

app.listen(8080, () => {
    console.log(`Listening on port 8080`);
});
