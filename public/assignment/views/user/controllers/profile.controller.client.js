(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService,$location) {
        var vm = this;
        var userId = $routeParams['uid'];
        console.log(userId);
        vm.update = update;
        vm.deleteUser = deleteUser;
        function update(newUser) {
            var user = UserService.updateUser(userId, newUser);
            if(user == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated"
            }
        }
        function deleteUser() {
            UserService.deleteUser(userId);
            $location.url("/login");
        }

        var user = UserService.findUserById(userId);
        vm.user = user;


    }
})();