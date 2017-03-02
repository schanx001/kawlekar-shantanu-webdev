/**
 * Created by schanx on 2/15/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise
                .success(function (pages){
                    vm.pages = pages;
                });
            var promise1 = PageService.findPageById(vm.pageId);
            promise1
                .success(function (page){
                    vm.page = page;
                });
        }
        init();
        function deletePage () {
            PageService
                .deletePage(vm.pageId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })
                .error(function () {
                    alert("page not deleted");
                })

        };
        function updatePage () {
            PageService
                .updatePage(vm.page,vm.pageId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })
                .error(function () {
                    alert("page not updated");
                })

        };
    }
})();