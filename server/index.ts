import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SERVER_CONFIG } from './config.js';
import { apiRouter } from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// Enable CORS for development
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// API Routes
app.use('/api', apiRouter);

// Serve static frontend assets in production
const distPath = path.resolve(__dirname, '..', 'dist');
app.use(express.static(distPath));

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('Private Vaccination Certificate Server Running');
    }
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(SERVER_CONFIG.port, () => {
    console.log(`\n?? Node.js Production Application Server Running`);
    console.log(`   Port:             ${SERVER_CONFIG.port}`);
    console.log(`   Network:          ${SERVER_CONFIG.network.toUpperCase()}`);
    console.log(`   Contract Address: ${SERVER_CONFIG.contractAddress}`);
    console.log(`   Health Endpoint:  http://localhost:${SERVER_CONFIG.port}/api/health\n`);
  });
}

export { app };
