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


    /*var widgets=[
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
*/
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

            // folder where file is saved to
            /*for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].width = width;
                    widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
                    pageId = widgets[i].pageId;
                }
            }*/

            //var mimetype = myFile.mimetype;
            imgWidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

            widgetModel
                .updateWidget(widgetId, imgWidget)
                .then(function (response) {
                    if(response.ok===1&&response.n===1){

                        console.log("in hereeeee1");
                        widgetModel
                            .findWidgetById(widgetId)
                            .then(function (newResponse) {
                                console.log("in hereeeee2");
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
            /*widgetModel
                .findWidgetById(widgetId)
                .then(function (response) {
                    if (response.ok === 1 && response.n === 1) {
                        response.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
                        console.log(response.url);
                        response.save();
                        pageId = response._page;
                        console.log(pageId + "dfgshsghfgh");
                        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/"+widgetId);
                    }
                    else {
                        res.sendStatus(404);
                    }
                }, function (err) {
                    res.sendStatus(404).send(err);
                });*/
        }
        else{
            pageId = req.body.pageId;
            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/"+widgetId);
        }

    }


    function createWidget(req,res) {
        var widget=req.body;
        var pageId = req.params.pageId;
        //var newWidget={};
        console.log(widget.text +" hello");
        /*switch(widget.widgetType){
            case "HEADER":
                newWidget={
                    type:widget.widgetType,
                    size:widget.size,
                    text:widget.text
                };
                break;
            case "HTML":
                newWidget={
                    type:widget.widgetType,
                    text:widget.text
                };
                break;
            case "IMAGE":
                newWidget={
                    type:widget.widgetType,
                    width:widget.width,
                    url:widget.url
                };
                break;
            case "YOUTUBE":
                newWidget={
                    type:widget.widgetType,
                    width:widget.width,
                    url:widget.url
                };
                break;
            case "TEXT":
                newWidget={
                    type:widget.widgetType,
                    text:widget.text,
                    rows:widget.rows,
                    placeholder:widget.placeholder,
                    formatted: widget.formatted
                };
                break;
        }*/
        //widget._id = (new Date()).getTime().toString();
        //widgets.push(widget);
        //res.json(widget);
        //console.log(newWidget);
        widgetModel
            .createWidget(pageId,widget)
            .then(function (newWidget) {
                console.log(newWidget.text+" in heree");
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
        
    /*    for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
            }
        }
        res.sendStatus(404).send("cannot delete widget");
    */}

    function updateWidget(req,res) {
        var widgetId = req.params.widgetId;
        var updatedWidget = req.body;
        console.log("in he");
        /*widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                if(widget.width!=""){
                    console.log("in he");
                    updatedWidget.width=width.width;
                }
            },function (err) {
                res.sendStatus(404);
            });*/
        /*for(var w in widgets){
            var widget_var=widgets[w];
            //console.log(widget_var);
            //widgets[w].widgetType = updatedWidget.widgetType;
            if(widget_var._id === widgetId){
                switch(updatedWidget.widgetType){
                    case "HEADER":
                        widgets[w].text = updatedWidget.text;
                        widgets[w].size = updatedWidget.size;
                        res.sendStatus(200);
                        return;
                    case "IMAGE":
                        widgets[w].width = updatedWidget.width;
                        widgets[w].url = updatedWidget.url;
                        res.json(widgets[w]);
                        //res.sendStatus(200);
                        return;
                    case "YOUTUBE":
                        widgets[w].width = updatedWidget.width;
                        widgets[w].url = updatedWidget.url;
                        res.sendStatus(200);
                        return;
                    case "HTML":
                        widgets[w].text = updatedWidget.text;
                        res.sendStatus(200);
                        return;
                }*/
            widgetModel
                    .updateWidget(widgetId,updatedWidget)
                    .then(function (response) {
                        console.log(response);
                        if(response.ok===1&&response.n===1){

                            console.log("yahhoo");
                            res.sendStatus(200);
                        }
                        else{
                            res.sendStatus(404);
                        }
                    },function (err) {
                        res.sendStatus(404);
                    });
                /*
                widgets[w].widgetType = widget.widgetType
                widgets[w].size = widget.size;
                widgets[w].text = widget.text;
                if (widget.widgetType == 'IMAGE') {

                    widgets[w].url = widget.url;
                }res.json(widgets[w]);
                return;*/
    /*        }
        }
        res.sendStatus(404);
    */
    }

    function findWidgetsByPageId(req,res) {
        var pageId=req.params.pageId;
        /*var widgets_list=[];
        for(var w in widgets) {
            if(widgets[w].pageId === pageId) {
                widgets_list.push(widgets[w]);
            }
        }
        res.json(widgets_list);*/
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
        /*var widget_list=[];
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                res.json(widgets[w]);
                return;
            }
        }
        res.sendStatus(404);*/

        console.log(widgetId);

        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget){

                console.log("succesful");
                res.json(widget);

            },function (err) {
                console.log(err);
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