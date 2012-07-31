load("vertx.js");

vertx.deployVerticle("articles.index.rb");

vertx.deployModule("vertx.web-server-v1.0", {
  port: 8080
, host: "localhost"
, bridge: true
, inbound_permitted: [
    {
      address: "articles.index"
    }
  ]
, outbound_permitted: [
    {}
  ]
});
