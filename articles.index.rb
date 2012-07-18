require "vertx"
require "kramdown"

Vertx::EventBus.register_handler "articles.index" do |message|
  Vertx::FileSystem.read_dir("articles", ".*\.md") do |err, res|
    articles = []

    res.to_a.reverse.each_with_index do |article, index|
      Vertx::FileSystem.read_file_as_buffer article do |err, response|
        articles << {
          body: Kramdown::Document.new(response.to_s).to_html,
          date: File.basename(article, ".md").to_i,
        }

        if index == res.length - 1
          message.reply articles: articles
        end
      end
    end
  end
end
