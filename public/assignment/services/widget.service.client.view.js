/**
 * Created by schanx on 2/9/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);
    function WidgetService() {
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
        var api = {
            "createWidget":createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget":deleteWidget
        };
        return api;

        function createWidget(pageId,widget) {
            widget.pageId = pageId;
            widget._id = (new Date()).getTime().toString();
            widgets.push(widget);
        }

        function deleteWidget(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widgets.splice(w, 1);
                }
            }
        }

        function updateWidget(widgetId,widget) {
            for(var w in widgets){
                var widget_var=widgets[w];
                if(widget_var._id === widgetId){
                    widgets[w].widgetType = widget.widgetType
                    widgets[w].size = widget.size;
                    widgets[w].text = widget.text;
                    return widgets[w];
                }
            }
            return null;
        }

        function findWidgetsByPageId(pageId) {
            var widgets_list=[];
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    widgets_list.push(widgets[w]);
                }
            }
            return widgets_list;
        }

        function findWidgetById(widgetId) {
            var widget_list=[];
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return widgets[w];
                }
            }
        }

    }
})();