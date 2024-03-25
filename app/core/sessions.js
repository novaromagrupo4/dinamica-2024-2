const path = require("path");
const session = require("express-session");
const createFileStore = require("session-file-store");

module.exports = function(app) {

  const FileStore = createFileStore(session);

  const store = new FileStore({
    path: path.join(app.locals.app_path, "/storage/sessions"),
  });

  app.use(
    session({
      secret: "w29Z35VA4gHJIXEjUW9syIE1c9a54LdZq2o90C2ILD1HJozXM8",
      resave: false,
      saveUninitialized: true,
      store: store,
    })
  );

}
