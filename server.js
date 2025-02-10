const os = require('node:os');
const cluster = require('node:cluster');
const fastifyModule = require('fastify');
const axios = require('axios');
const env = require('./environment-vars');
const fastifyView = require("@fastify/view");
const path = require('path');
 
const cpus = os.cpus();
console.log(`The total number of CPUs is ${cpus.length}`);
 
const fastify = fastifyModule({
    logger: env.NODE_ENV === 'dev'
});
 
 
fastify.register(fastifyView, {
    engine: {
        ejs: require("ejs")
    },
    root: path.join(__dirname, 'versions/v1/views')
});
 
 
fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'versions/v1/assets'),
    prefix: '/v1/'
});
 
 
fastify.register(require('@fastify/cors'), {
    origin: "*",
    methods: ["GET", "POST"]
});
 
 
fastify.register(require('./versions/v1/routes'), { prefix: '/v1' });
 
 
fastify.post('/api/chat', async (request, reply) => {
    const { message } = request.body;
   
 
    if (!message) {
        return reply.status(400).send({ error: "Message is required" });
    }
 
    try {
        const backendResponse = await axios.post(
            'https://knowledgepagebackend.onrender.com/query',
            { message: message },
            { headers: { 'Content-Type': 'application/json' } }
        );
 
 
        return reply.send({ reply: ` ${backendResponse.data.response || "No response received"}` });
    } catch (error) {
        console.error('Error calling backend:', error?.response?.data || error.message);
        return reply.status(500).send({ error: "Failed to get response from backend" });
    }
});
 
console.log("Cluster Mode:", env.CLUSTERIZE);
console.log("Server Port:", env.PORT);
 
 
if (env.CLUSTERIZE === 'Y' && cluster.isMaster) {
    console.log(`Master process running: PID ${process.pid}`);
 
    for (let i = 0; i < cpus.length; i++) {
        cluster.fork();
    }
 
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {
    fastify.listen({ host: env.HOST, port: env.PORT }, (err, addr) => {
        if (err) {
            console.error("Server Error:", err);
            process.exit(1);
        }
        console.log(`Server running at ${addr}`);
    });
}