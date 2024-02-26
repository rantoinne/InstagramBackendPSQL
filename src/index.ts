require('dotenv').config();
import express, { Request, Response } from 'express';
import session from 'express-session';
import logger from 'morgan';
import { connectDb, pool } from './config/database';
import User from './models/User';
import routes from './routes';
import { isDev, isProd } from './config/constants';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: 'application/xml', limit: '10mb' }));
app.use(express.raw({ type: 'text/xml', limit: '5mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (isDev) app.use(logger('dev'));
if (isProd) {
  app.use(logger('common'));
}

connectDb();

app.use(session({
    name: 'instagram_session',
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'strict',
        maxAge  : 30 * 24 * 60 * 60 * 1000, // 30 days
      },
      secret: process.env.COOKIE_SECRET || 'secret',
}))

routes(app);

app.get('/ping', async (req: Request, res: Response) => {
    try {
        const rows = await pool.query('SELECT NOW() as now');
        const user = await User.query().findById(1);
        res.send(`Server time: ${JSON.stringify(user)}`);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal server error');
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const closeHandler = () => {
    try {
        // process reload or close happening
        // close connections, clear cache, etc
        server.close(async () => {
        await Promise.all([
            await pool.end(),
        ]);
        console.log('Bye bye.');
        process.exit(0);
        });
    } catch (e) {
        process.exit(1);
    }
    };
  
process.on('SIGINT', closeHandler);
process.on('SIGTERM', closeHandler);
process.on('SIGQUIT', closeHandler);

module.exports = server;
