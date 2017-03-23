/**
 * Created by schanx on 2/15/17.
 */
(function(){
        angular
            .module("WebAppMaker")
            .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams,$location, WidgetService) {
        var vm = this;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;
        vm.searchImage = searchImage;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;
            var promise = WidgetService.findWidgetById(vm.widgetId);
            promise
                .success(function (widget) {

                    vm.widget = widget;
                });
            var promise1 = WidgetService.findWidgetsByPageId(vm.pageId);
            promise1
                .success(function (widgets) {
                    vm.widgets =widgets;
                });
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/template/editors/widget-'+type+'-editor.view.client.html';
        }

        function deleteWidget(){
            WidgetService.deleteWidget(vm.widgetId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                })
                .error(function () {
                    alert("widget not deleted");
                })
        }

        function updateWidget(){
            WidgetService.updateWidget(vm.widget,vm.widgetId)
                .success(function () {
                    console.log(vm.widgetId+"  in update widget client side");
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                })
                .error(function () {
                    alert("widget not updated");
                })
        }
        
        function searchImage() {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId+"/flickr");
        }
    }
})();