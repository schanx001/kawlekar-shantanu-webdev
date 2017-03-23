/**
 * Created by schanx on 3/20/17.
 */
module.exports= function() {
    var model = null;
    var mongoose = require("mongoose");
    var pageSchema ;//= require('./page.schema.server')();
    var pageModel ;//= mongoose.model('pageModel', pageSchema);

    var api = {
        "createPage": createPage,
        "findAllPagesForWebsite": findAllPagesForWebsite,
        "findPageById": findPageById,
        "updatePage": updatePage,
        "setModel": setModel,
        "deletePage":deletePage,
        "getModel"  :getModel
    };

    return api;

    function getModel() {
        return pageModel;
    }
    function setModel(_model) {
        model = _model;
        pageSchema = require('./page.schema.server')(_model);
        pageModel = mongoose.model("pageModel", pageSchema);
    }

    function deletePage(pageId){
        return pageModel.findByIdAndRemove(pageId,function(err,page){
            if(page!=null){
                page.remove();
            }
        });
    }

    function createPage(websiteId,page) {
        return pageModel
            .create(page)
            .then(function (newPage) {
                return model
                    .websiteModel
                    .findWebsiteById(websiteId)
                    .then(function (website) {
                        website.pages.push(newPage);
                        newPage._website=website._id;
                        website.save();
                        newPage.save();
                        return newPage;
                    },function (err) {
                        return err;
                    });
            },function (err) {
                return err;
            });
    }

    function updatePage(pageId,page) {
        return pageModel.update({_id:pageId},{$set:page});
    }
    function findAllPagesForWebsite(websiteId){
        return pageModel.find({"_website":websiteId});
    }
    function findPageById(pageId){
        return pageModel.findById({_id:pageId});
    }
};