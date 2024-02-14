require('dotenv').config();
import express, { Request, Response } from 'express';
// import { Pool } from 'pg';
import pool from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/ping', async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query('SELECT NOW() as now');
        res.send(`Server time: ${rows[0].now}`);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
