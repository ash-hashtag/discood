import fastify from "fastify";

const app = fastify();
let id = "";

app.get("/", (request, response) => {
    response.send(id);
})

app.get("/:id", (request, response) => {
    response.send(id);
    if (request.params.id != "favicon.ico") {
        id = request.params.id;
    }
})

app.listen({
    port: 80,
    host: "0.0.0.0"
})