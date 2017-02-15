/**
 * Created by schanx on 2/15/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createPage = createPage;
        vm.websiteId = $routeParams.wid;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function createPage (page) {
            //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            if(page!=null)
            {
                PageService.createPage(vm.websiteId, page);
            }
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };
    }
})();