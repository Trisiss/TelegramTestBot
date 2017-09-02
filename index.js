var parser = require('rss-parser');
const TelegramBot = require('node-telegram-bot-api');
const token = '362883343:AAHEUJIhx7Gc5Qp240uyrIgrZd8wqLtoxA0';
var bot = new TelegramBot(token, {polling: false});

exports.myAwesomeTestBot = function telegramBot (req, res) {
    // Логируем запрос (пригодится для отладки)
    console.log('Request body: ' + JSON.stringify(req.body));

    var request = req.body;
    var message = req.body.message;

    if (typeof message.chat !== "undefined") { 
        var chat = message.chat;

        if (chat.type == "private") {
            // Это сообщение отправлено в личный чат с ботом
            
            // Из какого чата пришло сообщение и текст сообщения
            var chatId = chat.id;
            var messageText = message.text;

            switch (messageText) {
                // Обработка команд
                case '/docker':
                    console.log('Processing command: ' + messageText);

                    // Получить ссылки из RSS ленты и отправить в чат
                    var feed_url = 'https://dev-ops-notes.ru/category/docker/feed/';
                    parser.parseURL(feed_url, function(err, parsed) {
                        parsed.feed.entries.forEach(function(entry) {
                            var msg = decodeURIComponent(entry.link);
                            // Собственно отправка сообщения ботом
                            bot.sendMessage(chatId, msg);
                        });
                    });
                    break;
                default:
                    bot.sendMessage(chatId, 'Привет! Отправь мне /docker и получи последние статьи о Docker!');
                    break;
            }
        }
    }
    res.status(201).send('Done!');
}