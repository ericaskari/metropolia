'use strict';

const mariadb = require('mariadb');
const express = require('express');
const process = require('process');

const httpContext = require('express-http-context');

const morgan = require('morgan');
const ruid = require('express-ruid');

process.on('SIGINT', () => {
    console.info('Interrupted');
    process.exit(0);
});

const credentials = {
    host: process.env.MARIADB_HOSTNAME || 'localhost',
    user: process.env.MARIADB_USER || 'eric',
    password: process.env.MARIADB_PASSWORD || 'eric1234',
    database: process.env.MARIADB_DATABASE || 'eric-db',
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

async function releaseConnection(conn) {
    if (conn) {
        await conn.release();
    }
}

async function createDatabaseUser(player) {
    const conn = await pool.getConnection();
    const [dbResponse] = await conn.query('SELECT player FROM stats WHERE player = (?)', [player]);
    if (dbResponse) {
        await releaseConnection(conn);
        return 'PLAYER_EXIST';
    }

    await conn.query('INSERT INTO stats(player, score) VALUES(?, 0)', [player]);
    await releaseConnection(conn);
    return 'PLAYER_CREATED';
}

async function updateDatabaseScore(player, newScore) {
    await createDatabaseUser(player);
    const conn = await pool.getConnection();

    const [dbResponse] = await conn.query('SELECT score FROM stats WHERE player = (?)', [player]);

    if (dbResponse.score >= newScore) {
        await releaseConnection(conn);
        return 'SCORE_WAS_EQUAL_OR_LOWER';
    }

    await conn.query('UPDATE stats SET score = (?) WHERE player = (?)', [newScore, player]);
    await releaseConnection(conn);
    return 'SCORE_UPDATED';
}

async function getDatabaseScores() {
    const conn = await pool.getConnection();
    const getCurrentScore = await conn.query('SELECT * FROM stats');
    await releaseConnection(conn);
    return getCurrentScore;
}

async function getDatabaseTopFive() {
    const conn = await pool.getConnection();
    const getCurrentScore = await conn.query('SELECT player, score FROM stats ORDER BY score DESC LIMIT 5;');
    await releaseConnection(conn);
    return getCurrentScore;
}

app.get('/update-score', async (req, res, next) => {
    Promise.resolve()
        .then(async () => {
            const { player, score } = req.query;
            if (!player || !score || Number.isNaN(parseInt(score))) return res.send('MISSING_OR_BAD_PARAMETER');
            const response = await updateDatabaseScore(player, parseInt(score));
            res.send(response);
        })
        .catch(next);
});

app.get('/scores', async (req, res, next) => {
    Promise.resolve()
        .then(async () => {
            const response = await getDatabaseScores();
            res.send(response);
        })
        .catch(next);
});

app.get('/top-five', async (req, res, next) => {
    Promise.resolve()
        .then(async () => {
            const response = await getDatabaseTopFive();
            res.send(response);
        })
        .catch(next); // Errors will be passed to Express.
});

app.use((err, req, res, next) => {
    console.error({
        rid: req.rid,
        error: err
    });
    res.status(500).send(`ERROR_HAPPENED! request id: ${req.rid}`);
});

app.listen(8080, () => {
    console.log(`Example app listening on port 8080`);
});
