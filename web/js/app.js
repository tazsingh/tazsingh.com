;(function() {
  var eb = new vertx.EventBus(window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + 
    "/eventbus");

  eb.onopen = function() {
    eb.send("articles.index", {}, function(reply) {
      var content = document.getElementById("content");
      content.innerHTML = "";

      for(var i = 0; i < reply.articles.length; i++) {
        content.innerHTML += "<section><div class=\"date\">"
          + moment(reply.articles[i].date * 1000).format("MMM D YYYY h:mma") + "</div>"
          + reply.articles[i].body + "</section>";
      }
    });
  };
})();
