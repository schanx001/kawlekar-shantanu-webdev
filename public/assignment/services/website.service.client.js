/**
 * Created by schanx on 2/9/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);
    function WebsiteService($http){

        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "findWebsitesByUser": findWebsitesByUser,
            "deleteWebsite": deleteWebsite,
            "updateWebsite":updateWebsite
        };
        return api;

        function deleteWebsite(websiteId) {
            return $http.delete('/api/website/'+websiteId);
        }

        function createWebsite(website,userId) {
            return $http.post('/api/user/'+userId+'/website',website);
        }
        function findWebsitesByUser(userId) {
            return $http.get('/api/user/'+userId+'/website');
        }
        function findWebsiteById(websiteId) {
            return $http.get('/api/website/'+websiteId);
        }
        function updateWebsite(website, websiteId) {
            return $http.put('/api/website/'+websiteId,website);
        }


    }
})();