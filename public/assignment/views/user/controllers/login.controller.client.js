(function(){
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;
        function login(user) {
            if(user==null)
            {
                vm.error = "fill in the username and password";
            }
            else {
                var promise = UserService.findUserByCredentials(user.username, user.password);

                promise
                    .success(function (user) {
                        if (user) {
                            $location.url('/user/' + user._id);
                        } else {
                            vm.error = 'user not found';
                        }

                    })
                    .error(function (er) {
                        vm.error = "user not found";
                    });
            }
        }
    }
})();