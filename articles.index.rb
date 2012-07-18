require "vertx"
require "kramdown"

Vertx::EventBus.register_handler "articles.index" do |message|
  Vertx::FileSystem.read_dir("articles", ".*\.md") do |err, res|
    articles = []

    res.each_with_index do |article, index|
      Vertx::FileSystem.read_file_as_buffer article do |err, response|
        articles << Kramdown::Document.new(response.to_s).to_html

        if index == res.length - 1
          message.reply articles: articles
        end
      end
    end
  end
end
