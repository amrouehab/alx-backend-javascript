class AppController {
  static getHomepage(req, res) {
    res.status(200).send('Hello ALX!');
  }
}

module.exports = AppController;

