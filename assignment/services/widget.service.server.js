/**
 * Created by schanx on 2/27/17.
 */
module.exports = function (app) {


    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findWidgetsByPageId);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);


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


    var widgets=[
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function uploadImage(req, res) {
        var pageId = null;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        if(req.file!=null) {
            var myFile = req.file;
        var destination = myFile.destination; // folder where file is saved to
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].width = width;
                    widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
                    pageId = widgets[i].pageId;
                }
            }
            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }
        else{
            pageId = req.body.pageId;
            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/"+widgetId);
        }

    }


    function createWidget(req,res) {
        var widget=req.body;
        widget.pageId = req.params.pageId;
        //widget._id = (new Date()).getTime().toString();
        widgets.push(widget);
        res.json(widget);
    }

    function deleteWidget(req,res) {
        var widgetId=req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
            }
        }
        res.sendStatus(404).send("cannot delete widget");
    }

    function updateWidget(req,res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for(var w in widgets){
            var widget_var=widgets[w];
            if(widget_var._id === widgetId){
                widgets[w].widgetType = widget.widgetType
                widgets[w].size = widget.size;
                widgets[w].text = widget.text;
                res.json(widgets[w]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findWidgetsByPageId(req,res) {
        var pageId=req.params.pageId;
        var widgets_list=[];
        for(var w in widgets) {
            if(widgets[w].pageId === pageId) {
                widgets_list.push(widgets[w]);
            }
        }
        res.json(widgets_list);
    }

    function findWidgetById(req,res) {
        var widgetId=req.params.widgetId;
        var widget_list=[];
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                res.json(widgets[w]);
                return;
            }
        }
        res.sendStatus(404);
    }
}