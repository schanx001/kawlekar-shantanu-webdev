/**
 * Created by schanx on 2/27/17.
 */
module.exports = function (app,model) {

    var widgetModel = model.widgetModel;

    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findWidgetsByPageId);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.put("/page/:pageId/widget", updateWidgetOrder);

    var multer = require('multer'); // npm install multer --save
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});

    app.post("/api/upload", upload.single('myFile'), uploadImage);



    function uploadImage(req, res) {
        var pageId = null;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var imgWidget ={
            width:width,
            _id:widgetId
        }
        if(req.file!=null) {
            var myFile = req.file;
            var destination = myFile.destination;

            imgWidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

            widgetModel
                .updateWidget(widgetId, imgWidget)
                .then(function (response) {
                    if(response.ok===1&&response.n===1){

                        widgetModel
                            .findWidgetById(widgetId)
                            .then(function (newResponse) {
                                pageId = newResponse._page;
                                res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");

                            });
                         }
                    else{
                        res.sendStatus(404);
                    }
                },function(err){
                    res.sendStatus(404);
                });
        }
        else{
            pageId = req.body.pageId;
            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/"+widgetId);
        }

    }


    function createWidget(req,res) {
        var widget=req.body;
        var pageId = req.params.pageId;

        widgetModel
            .createWidget(pageId,widget)
            .then(function (newWidget) {
                res.json(newWidget);
            },function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function deleteWidget(req,res) {
        var widgetId=req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
            .then(function (widget) {
                res.json(widget);
            },function (err) {
                res.sendStatus(404);
            });
      }

    function updateWidget(req,res) {
        var widgetId = req.params.widgetId;
        var updatedWidget = req.body;

            widgetModel
                    .updateWidget(widgetId,updatedWidget)
                    .then(function (response) {
                        if(response.ok===1&&response.n===1){
                            res.sendStatus(200);
                        }
                        else{
                            res.sendStatus(404);
                        }
                    },function (err) {
                        res.sendStatus(404);
                    });
   }

    function findWidgetsByPageId(req,res) {
        var pageId=req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function(widgets){
                res.json(widgets);
            },function (err){
                res.sendStatus(404);
            });
    }

    function findWidgetById(req,res) {
        var widgetId=req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget){
                res.json(widget);

            },function (err) {
                res.sendStatus(404);
            });
    }


    function updateWidgetOrder(req, res) {
        var pageId = req.params.pageId;
        var start = parseInt(req.query.initial);
        var end = parseInt(req.query.final);

        widgetModel
            .reSortWidget(pageId, start, end)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400);
                });
    }

};