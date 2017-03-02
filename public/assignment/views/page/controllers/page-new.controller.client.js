/**
 * Created by schanx on 2/15/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.createPage = createPage;
        function init() {
            vm.websiteId = $routeParams.wid;
            vm.userId = $routeParams.uid;
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise
                .success(function (pages) {
                    vm.pages = pages;
                });
        }
        init();

        function createPage (page) {
            if(page!=null)
            {
                PageService
                    .createPage(page,vm.websiteId)
                    .success(function () {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    })
                    .error(function () {
                        alert("page not created");
                    });
            }
        };
    }
})();