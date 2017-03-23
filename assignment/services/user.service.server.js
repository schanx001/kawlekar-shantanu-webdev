/**
 * Created by schanx on 2/27/17.
 */
module.exports = function (app, model) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);

    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , email: "alice@husky.neu.edu"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  , email: "bob@husky.neu.edu"},
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  ,email: "charly@husky.neu.edu"},
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",email: "jose@husky.neu.edu" }
    // ];
    var userModel = model.userModel;

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    console.log("LOL");
                    res.sendStatus(400).send(error);
                }
            );
        /*for (var u in users) {
            if (users[u]._id === userId) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);*/
    }

    function createUser(req, res) {
        // var newUser = req.body;
        // newUser._id = (new Date()).getTime() + "";
        // users.push(newUser);
        // res.json(newUser);
        var user = req.body;
        var newUser = {
            username: user.username,
            password: user.password,
            //email: user.email,
            firstname: user.firstname,
            lastname: user.lastname
        };

        userModel
            .createUser(newUser)
            .then(function (newUser) {
                res.send(newUser);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser = req.body;
        /*for(var u in users) {
         var user = users[u];
         if( user._id === userId ) {
         var newUser = req.body;
         users[u].firstName = newUser.firstName;
         users[u].lastName = newUser.lastName;
         users[u].email = newUser.email;
         res.sendStatus(200);
         return;
         }
         }*/
        userModel
            .updateUser(userId, newUser)
            .then(function (response) {
                if (response.nModified === 1) {
                    userModel
                        .findUserById(userId)
                        .then(function (response) {
                            res.json(response);
                        }, function () {
                            res.sendStatus(404);
                        })
                }
                else {
                    res.sendStatus(404);
                }
            }, function () {
                res.sendStatus(404);
            });
    }

    function findUserByUserId(req, res) {
        var userId = req.params['userId'];
        /*
         for(var u in users) {
         var user = users[u];
         if( user._id === userId) {
         res.send(user);
         return;

         }
         }*/
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        console.log("findbyuname");
        /*var user = users.find(function (u) {
            return u.username == username;
        });
        if (user) {
            res.send(user);
        } else {
            res.sendStatus(404).send('User not found for username: ' + username);
        }*/
        userModel
            .findUserByUsername(username)
            .then(function (users) {
                if (users.length != 0) {
                    res.send(users[0]);
                }
                else {
                    res.sendStatus(404);
                }
            },function (err) {
                    res.sendStatus(404);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        /*var user = users.find(function(u){
         return u.username == username && u.password == password;
         });
         if(user) {
         res.send(user);
         } else {
         res.sendStatus(404).send('User not found for username: ' + username + ' and password: ' + password);
         }
         }*/
        userModel
            .findUserByCredentials(username, password)
            .then(function (response) {
                if (response.length != 0) {
                    res.json(response[0])
                }
                else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }
};