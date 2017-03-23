/**
 * Created by schanx on 3/20/17.
 */
module.exports=function () {
    var model = null;
    var mongoose = require("mongoose");
    var widgetSchema;// = require('./widget.schema.server')();
    var widgetModel;// = mongoose.model('widgetModel', widgetSchema);

    var api = {
        "createWidget": createWidget,
        "findAllWidgetsForPage": findAllWidgetsForPage,
        "findWidgetById": findWidgetById,
        "deleteWidget":deleteWidget,
        "updateWidget": updateWidget,
        "setModel": setModel,
        "getModel":getModel,
        "reSortWidget":reSortWidget
    };
    return api;
    function setModel(_model) {
        model=_model;
        widgetSchema = require('./widget.schema.server')(_model);
        widgetModel = mongoose.model("widgetModel", widgetSchema);
    }
    function getModel(){
        return widgetModel;
    }

    function createWidget(pageId,widget){
        widget._page = pageId;
        return widgetModel
            .find({"_page": pageId})
            .then(function (widgets) {
                    widget.pos = widgets.length;
                    return widgetModel
                        .create(widget)
                        .then(function (newWidget) {
                            return model
                                .pageModel
                                .findPageById(pageId)
                                .then(function (page) {
                                    newWidget._page = page._id;
                                    page.widgets.push(newWidget._id);
                                    page.save();
                                    newWidget.save();
                                    return newWidget;
                                }, function (err) {
                                    res.sendStatus(404);
                                });
                        }, function (err) {
                            res.sendStatus(404);
                        });
                },
                function (err) {
                    res.sendStatus(404).send(err);
                });
    }

    function findAllWidgetsForPage(pageId){
        return widgetModel.find({"_page":pageId})
            .sort('pos')
            .exec(function (err,widgets) {
                if(err){
                    return err;
                }else {
                    return widgets;
                }
            });
    }

    function findWidgetById(widgetId){
        return widgetModel.findById(widgetId);
    }
    function updateWidget(widgetId,updatedWidget){
        return widgetModel.update({_id:widgetId},{$set:updatedWidget});
    }

    function deleteWidget(widgetId) {
        return widgetModel.findByIdAndRemove(widgetId,function(err,widget){
            if(widget!=null){
                var pageId = widget._page;
                var pos = widget.pos;
                widgetModel.find({_page: pageId}, function (err, widgets) {
                    widgets.forEach(function (widget) {
                        if (widget.pos > pos) {
                            widget.pos = widget.pos - 1;
                            widget.save();
                        }
                    });
                });
                widget.remove();
            }
        });
    }
    function reSortWidget(pageId, start, end) {
        return widgetModel
            .find({ _page: pageId}, function (err, widgets) {
                widgets.forEach(function (widget) {
                    if (start < end) {
                        if (widget.pos == start) {
                            widget.pos = end;
                            widget.save();
                        }
                        else if (widget.pos > start && widget.pos <= end) {
                            widget.pos = widget.pos - 1;
                            widget.save();
                        }
                    } else {
                        if (widget.pos == start) {
                            widget.pos = end;
                            widget.save();
                        }

                        else if (widget.pos < start && widget.pos >= end) {
                            widget.pos = widget.pos + 1;
                            widget.save();
                        }
                    }
                });
            });
    }
};