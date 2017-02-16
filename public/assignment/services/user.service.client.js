/**
 * Created by schanx on 2/9/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);
    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , email: "alice@husky.neu.edu"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  , email: "bob@husky.neu.edu"},
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  ,email: "charly@husky.neu.edu"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",email: "jose@husky.neu.edu" }
        ];
        var api = {
            "createUser":createUser,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "deleteUser":deleteUser
        };
        return api;
        
        function updateUser(userId,user) {
            for(var u in users){
                var user_var=users[u];
                if(user_var._id === userId){
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                    users[u].email = user.email;
                    return users[u];
                }
            }
            return null;
        }
        function findUserById(uid) {
            for(var u in users) {
                var user = users[u];
                if( user._id === uid ) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username &&
                    user.password === password) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username ) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function createUser(user) {
            newUser={
            username : user.username,
            password : user.password,
            _id : (new Date()).getTime().toString()}
            users.push(newUser);
            return newUser;
            }


        function deleteUser(userId) {
            for(var u in users) {
                var user = users[u];
                if( user._id === userId) {
                    users.splice(u,1);
                }
            }
        }
    }
})();