/**
 * Created by schanx on 2/27/17.
 */
module.exports = function (app,model) {

    app.post("/api/user/:userId/website",createWebsite);
    app.get("/api/user/:userId/website",findWebsitesByUser);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);
    var websiteModel = model.websiteModel;

    function findWebsiteById(req, res) {
        var wid = req.params.websiteId;
        websiteModel
            .findWebsiteById(wid)
            .then(function(response){
                res.json(response);
            },function(err){
                res.sendStatus(404);
            });
    }

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;
               websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (response) {
                res.json(response);
            },function (err) {
                res.sendStatus(404);
            });
    }

    function deleteWebsite(req , res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (website) {
                res.json(website);
            },function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
        websiteModel
            .createWebsiteForUser(userId,website)
            .then(function (website){
                res.json(website);
            },function(err){
                res.sendStatus(404);
            });
    }

    function updateWebsite(req,res) {
        var websiteId = req.params.websiteId;
        var updatedWebsite = req.body;
        websiteModel
            .updateWebsite(websiteId,updatedWebsite)
            .then(function(response){
                if(response.ok===1 && response.n===1){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }, function (err){
                res.sendStatus(404);
            });
    }
};