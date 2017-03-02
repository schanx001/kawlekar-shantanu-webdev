/**
 * Created by schanx on 2/14/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            var promise = WebsiteService.findWebsiteById(vm.websiteId);
            promise
                .success(function (website){
                    vm.website = website;
                });
            var promise1 = WebsiteService.findWebsitesByUser(vm.userId);
            promise1
                .success(function (websites){
                    vm.websites = websites;
                });
        }
        init();
        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function () {
                    alert("Sorry! Website not deleted");
                });

        };
        function updateWebsite () {
            WebsiteService.updateWebsite(vm.website,vm.websiteId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function () {
                    alert("Sorry! Website not updated");
                });
        };
    }
})();