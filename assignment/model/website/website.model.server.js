/**
 * Created by schanx on 3/20/17.
 */
module.exports= function(){
    var model=null;
    var mongoose=require("mongoose");
    var websiteSchema;// =require('./website.schema.server')();
    var websiteModel;// = mongoose.model('websiteModel',websiteSchema);


    var api = {
        "createWebsiteForUser"      :createWebsiteForUser,
        "findAllWebsitesForUser"    :findAllWebsitesForUser,
        "findWebsiteById"           :findWebsiteById,
        "updateWebsite"             :updateWebsite,
        "deleteWebsite"             :deleteWebsite,
        "setModel"                  :setModel,
        "getModel"                  :getModel

    };

    return api;
    function getModel() {
        return websiteModel;
    }

    function setModel(_model){
        model = _model;
        websiteSchema = require('./website.schema.server')(_model);
        websiteModel = mongoose.model("websiteModel", websiteSchema);
    }

    function createWebsiteForUser(userId,website) {
        return websiteModel
            .create(website)
            .then(function (newWebsite) {
                return model.userModel
                    .findUserById(userId)
                    .then(function (user) {
                        newWebsite._user = user._id;
                        user.websites.push(newWebsite);
                        user.save();
                        newWebsite.save();
                        return newWebsite;
                    }, function (err) {
                        return err;
                    })
            },function (err) {
                return err;
            });
    }

    function findWebsiteById(websiteId){
        return websiteModel.findById({_id:websiteId});
    }

    function findAllWebsitesForUser(userId){
        return websiteModel.find({"_user":userId});
    }
    function updateWebsite(websiteId, updatedWebsite){
        return websiteModel.update({_id:websiteId},{$set:updatedWebsite});
    }
    function deleteWebsite(websiteId) {
        return websiteModel.findByIdAndRemove(websiteId,function (err,website) {
            if(err){
                res.sendStatus(404).send(err);
            }
            else{
                website.remove();
            }
        })
    }
};