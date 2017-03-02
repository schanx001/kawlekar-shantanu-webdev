(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.createWebsite = createWebsite;

        function init() {
            vm.userId = $routeParams.uid;
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise
                .success(function (websites){
                    vm.websites = websites;
                });
        }
        init();

        function createWebsite (website) {
            if(website!=null)
            {
                WebsiteService
                    .createWebsite(website, vm.userId)
                    .success(function() {
                        $location.url("/user/"+vm.userId+"/website");
                    })
                    .error(function () {
                        alert("Sorry! Website not created");
                    });
            }

        };
    }
})();