/**
 * Created by schanx on 2/9/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);
    function PageService($http) {

        var api = {
            "createPage": createPage,
            "updatePage": updatePage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "deletePage":deletePage
        };
        return api;

        function deletePage(pageId) {
            return $http.delete('/api/page/'+pageId);
        }

        function createPage(page,websiteId) {
            return $http.post('/api/website/'+websiteId+'/page',page);
        }
        function findPageByWebsiteId(websiteId) {
            return $http.get('/api/website/'+websiteId+'/page');
        }
        function findPageById(pageId) {
            return $http.get('/api/page/'+pageId);
        }
        function updatePage(page, pageId) {
            return $http.put('/api/page/'+pageId,page);
        }
    }
})();