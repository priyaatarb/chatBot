
module.exports = class ChatBotController {

    static show(req, rep) {
        rep.view('index.ejs');
    }
}