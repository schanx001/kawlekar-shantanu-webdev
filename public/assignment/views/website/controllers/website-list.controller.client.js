/**
 * Created by schanx on 2/14/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise
                .success(function (websites){
                    vm.websites = websites;
                });
        }
        init();
    }
})();