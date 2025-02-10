const chatCtrl = require('./controllers/ChatbotController');

const routes = (fastify, opts, done) => {
    fastify.get('/', chatCtrl.show);
    done()
};

module.exports = routes;