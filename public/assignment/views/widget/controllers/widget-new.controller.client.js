/**
 * Created by schanx on 2/15/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm.createWidget = createWidget;

        function init() {
            vm.userId = $routeParams.uid;
            vm.pageId = $routeParams.pid;
            vm.websiteId = $routeParams.wid
            vm.widgetId = $routeParams.wgid;
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }

        init();


        function createWidget(widgetType) {
            newWidget = {};
            newWidget._id = (new Date()).getTime().toString();
            newWidget.widgetType = widgetType;
            newWidget.pageId = vm.pageId;

            switch (widgetType) {
                case "HEADER":
                    newWidget.text = "Default Text";
                    newWidget.size = 3;
                    break;
                case "IMAGE":
                    newWidget.url ="https://s-media-cache-ak0.pinimg.com/564x/1b/1f/63/1b1f6328a29190f4d29acb8a0aa3601c.jpg" ;
                    newWidget.width = "100%";
                    break;
                case "YOUTUBE":
                    newWidget.url = "https://www.youtube.com/embed/d_Got7zDfGE";
                    newWidget.width = "100%";
                    break;
                case "HTML":
                    newWidget.text = "Default Text";
                    break;
            }
            WidgetService.createWidget(vm.pageId, newWidget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
        }
    }


})();