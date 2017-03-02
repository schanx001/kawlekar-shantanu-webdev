/**
 * Created by schanx on 2/9/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);
    function WidgetService($http) {

        var api = {
            "createWidget":createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget":deleteWidget
        };
        return api;

        function deleteWidget(widgetId) {
            return $http.delete('/api/widget/'+widgetId);
        }

        function createWidget(widget,pageId) {
            return $http.post('/api/page/'+pageId+'/widget',widget);
        }
        function findWidgetsByPageId(pageId) {
            return $http.get('/api/page/'+pageId+'/widget');
        }
        function findWidgetById(widgetId) {
            return $http.get('/api/widget/'+widgetId);
        }
        function updateWidget(widget, widgetId) {
            return $http.put('/api/widget/'+widgetId,widget);
        }

    }
})();