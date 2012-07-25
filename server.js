load("vertx.js");

vertx.deployVerticle("articles.index.rb");

vertx.deployVerticle("web-server", {
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
