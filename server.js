import fastify from "fastify";

const app = fastify();

app.get("/", (request, response) => {
    response.send("Hello World");
})

app.listen({
    port: 80,
    host: "0.0.0.0"
})