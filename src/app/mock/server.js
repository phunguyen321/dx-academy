const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(require("./index.js")());
const middleWares = jsonServer.defaults();
const port = 4000;

server.use(middleWares);
server.use(router);
server.listen(port, () => {
  console.log(`server run on port ${port}`);
});
