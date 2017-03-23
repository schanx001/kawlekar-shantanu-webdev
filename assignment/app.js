/**
 * Created by schanx on 2/27/17.
 */
module.exports = function (app) {
    var model = require("./model/models.server")();
    require("./services/user.service.server")(app, model);
    require("./services/website.service.server")(app, model);
    require("./services/page.service.server")(app, model);
    require("./services/widget.service.server")(app, model);
}