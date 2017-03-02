/**
 * Created by schanx on 2/27/17.
 */
module.exports = function (app) {
    app.post("/api/user/:userId/website",createWebsite);
    app.get("/api/user/:userId/website",findWebsitesByUser);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];
    function findWebsiteById(req, res) {
        var wid = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id === wid) {
                res.json(websites[w]);
            }
        }
        res.sendStatus(404);
    }

    function findWebsitesByUser(req, res) {
        var userId = req.params['userId'];
        var sites=[];
        for(var w in websites) {
            if(websites[w].developerId === userId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    }
    function deleteWebsite(req , res) {
        var websiteId = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id === websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
            }
        }
        res.sendStatus(404).send("website not found");

    }

    function createWebsite(req, res) {
        var userId = req.params['userId'];
        var website = req.body;
        website.developerId = userId;
        website._id = (new Date()).getTime().toString();
        websites.push(website);
        res.json(website);
    }

    function updateWebsite(req,res) {
        var websiteId = req.params['websiteId'];
        var website = req.body;
        for(var w in websites){
            var website_var=websites[w];
            if(website_var._id === websiteId){
                websites[w].name = website.name;
                websites[w].description = website.description;
                res.json(websites);
                return;
            }
        }
        res.sendStatus(404);
    }
}