(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService,$location) {
        var vm = this;
        var userId = $routeParams['uid'];
        //vm.update = update;
        vm.unregisterUser = unregisterUser;
        vm.update = update;
        var user = UserService.findUserById(userId);
        //vm.user = user;
        function init() {
            UserService
                .findUserById(userId)
                .success(renderUser);
        }
        init();

        function unregisterUser(user) {
            var answer = confirm("Are you sure?");
            if(answer) {
                UserService
                    .deleteUser(user._id)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = 'unable to remove user';
                    });
            }
        }


        function renderUser(user) {
            vm.user = user;
        }
        function update(newUser) {
            UserService
                .updateUser(userId, newUser)
                .success(function (response) {
                    vm.message = "user successfully updated"
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
        }
    }
})();