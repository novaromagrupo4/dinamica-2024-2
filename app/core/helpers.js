const path = require('path');

module.exports = function (app) {

  app.locals.old = (str) => {
    return str;
  };

}