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
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function createPage (page) {
            if(page!=null)
            {
                PageService.createPage(vm.websiteId, page);
            }
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };
    }
})();