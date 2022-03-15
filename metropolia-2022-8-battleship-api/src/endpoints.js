export function initEndpoints(app, pool) {
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

    app.get('/update-score', (req, res, next) => {
        Promise.resolve()
            .then(async () => {
                const { player, score } = req.query;
                if (!player || !score || Number.isNaN(parseInt(score))) return res.send('MISSING_OR_BAD_PARAMETER');
                const response = await updateDatabaseScore(player, parseInt(score));
                res.send(response);
            })
            .catch(next);
    });

    app.get('/scores', (req, res, next) => {
        Promise.resolve()
            .then(async () => {
                const response = await getDatabaseScores();
                res.send(response);
            })
            .catch(next);
    });

    app.get('/top-five', (req, res, next) => {
        Promise.resolve()
            .then(async () => {
                const response = await getDatabaseTopFive();
                res.send(response);
            })
            .catch(next); // Errors will be passed to Express.
    });
}
