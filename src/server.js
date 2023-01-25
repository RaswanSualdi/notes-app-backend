const Hapi = require('@hapi/hapi');
const { info } = require('console');
const routes = require('./routes');

async function init() {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  server.route(routes);
  await server.start();
  console.log(`Server Sedang berjalan di ${server.info.uri}`);
}

init();
