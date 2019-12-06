const express = require('express');

const projectsRouter = require('../data/routes/project-router.js')
const actionsRouter = require('../data/routes/action-router.js')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);  

module.exports = server;