/**
 * Created by schanx on 3/20/17.
 */
module.exports=function(model) {
    var mongoose = require("mongoose");
    var pageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: 'websiteModel'},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'widgetModel'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "assignment.mongo.pages"});

    pageSchema.post('remove', function () {
        var page = this;
        var widgetModel = model.widgetModel.getModel();
        var websiteModel = model.websiteModel.getModel();
        widgetModel.remove({_page: page._id}).exec();
        websiteModel.findById(page._website)
            .then(function (website) {
                var index = website.pages.indexOf(page._id);
                if (index > -1) {
                    website.pages.splice(index, 1);
                    website.save();
                }
            });

    });

    return pageSchema;
};