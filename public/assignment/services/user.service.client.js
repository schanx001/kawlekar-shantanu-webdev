/**
 * Created by schanx on 2/9/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);
    function UserService($http) {
        var api = {
            "createUser":createUser,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "deleteUser":deleteUser
        };
        return api;

        function deleteUser(userId) {
            return $http.delete('/api/user/'+userId);
        }

        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        function findUserById(uid) {
            return $http.get("/api/user/"+uid);
        }
    }
})();