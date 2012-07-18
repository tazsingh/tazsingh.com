;(function() {
  var eb = new vertx.EventBus(window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + 
    "/eventbus");

  eb.onopen = function() {
    eb.send("articles.index", {}, function(reply) {
      console.log(reply.articles);
    });
  };
})();
