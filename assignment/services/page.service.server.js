/**
 * Created by schanx on 2/27/17.
 */
module.exports = function (app,model) {
    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/website/:websiteId/page",findPageByWebsiteId);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);
    var pageModel = model.pageModel;
    function createPage(req,res) {
        var websiteId=req.params.websiteId;
        var newPage=req.body;
        pageModel
            .createPage(websiteId,newPage)
            .then(function (page) {
                res.json(page);
            },function (err) {
               res.sendStatus(404);
            });
    }

    function deletePage(req,res) {
        var pageId=req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(function (page) {
                res.json(page);
            },function (err) {
                res.sendStatus(404).send(err);
            });
     }

    function updatePage(req,res) {
        var pageId=req.params.pageId;
        var updatedPage=req.body;
        pageModel
            .updatePage(pageId,updatedPage)
            .then(function (response) {
                if(response.ok==1&& response.n==1){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            },function (err) {
                res.sendStatus(404);
            });
    }

    function findPageByWebsiteId(req,res) {
        var websiteId=req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            },function (err) {
                return res.sendStatus(404);
            });
    }

    function findPageById(req,res) {
        var pageId=req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            },function (err) {
                res.sendStatus(404);
            });
    }
};