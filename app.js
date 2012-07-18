load("vertx.js");

vertx.deployVerticle("web-server", {
  port: 8080
, host: "localhost"
});
