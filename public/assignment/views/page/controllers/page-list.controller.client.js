/**
 * Created by schanx on 2/14/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise
                .success(function (pages) {
                    vm.pages=pages;
                });
        }
        init();
    }
})();