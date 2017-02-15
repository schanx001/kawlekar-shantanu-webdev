/**
 * Created by schanx on 2/14/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService,$location) {
        var vm = this;
        vm.register = register;
        function register(user) {
            var loginUser= UserService.findUserByCredentials(user.username,user.password);
            if(loginUser===null){

                newUser = UserService.createUser(user);
                $location.url('/user/' + newUser._id);
            }
            else{
                alert("user already exists");
            }

        }
    }
})();