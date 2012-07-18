require "vertx"
require "kramdown"

Vertx::EventBus.register_handler "articles.index" do |message|
  Vertx::FileSystem.read_dir "articles", ".*\.md" do |err, res|
    articles = []
    files_read = 0

    res.to_a.reverse.each do |article|
      Vertx::FileSystem.read_file_as_buffer article do |err, response|
        articles << {
          body: Kramdown::Document.new(response.to_s).to_html,
          date: File.basename(article, ".md").to_i,
        }

        if (files_read += 1) == res.length
          message.reply articles: articles
        end
      end
    end
  end
end
