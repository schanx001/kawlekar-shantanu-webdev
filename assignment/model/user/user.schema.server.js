/**
 * Created by schanx on 3/19/17.
 */
module.exports = function(model) {
    var mongoose = require('mongoose');
    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'websiteModel'}],
        dateCreated: {type: Date, default: Date.now()}
    },{collection:'assignment.mongo.users'});


    userSchema.post('remove', function() {
        var websiteModel =model.websiteModel.getModel();
        var pageModel = model.pageModel.getModel();
        var widgetModel = model.widgetModel.getModel();
        var user = this;

        pageModel.find({_website: {$in: user.websites}}, '_id', function (err, pages) {
            if(err == null) {
                widgetModel.remove({_page: {$in: pages}}).exec();
                pageModel.remove({_id: {$in: pages}}).exec();
                websiteModel.remove({_id: {$in: user.websites}}).exec();
            }
        });

    });

    return userSchema;
}
//module.exports = userSchema;