/**
 * Created by schanx on 3/17/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);
    function FlickrImageSearchController($routeParams,$location, FlickrService, WidgetService) {
        var vm=this;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;
        }
        init();
        function searchPhotos(searchTerm) {
                console.log("ds");
                FlickrService
                    .searchPhotos(searchTerm)
                    .then(function (response) {
                        data = response.data.replace("jsonFlickrApi(", "");
                        data = data.substring(0, data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    });
            }

        function selectPhoto(photo) {
                console.log("in here");

                var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
                url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
                var widget ={};
                widget._id = vm.widgetId;
                widget.widgetType = "IMAGE";
                widget.width = "100%";
                widget.url = url;
                widget.pageId = vm.pageId;
                /*WidgetService
                    .findWidgetById(vm.widgetId)
                    .then(function (resWidget) {
                        console.log(resWidget.width+"width");
                        if(resWidget.width!=null){
                            widget.width=resWidget.width;
                        }
                        else{
                            console.log("here we go width");
                            widget.width = "100%";
                        }
                    });*/
                WidgetService
                    .updateWidget(widget,vm.widgetId)
                    .then(function (){
                        console.log(widget);
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    },function (err) {
                        res.sendStatus(404).send(err);
                    });
            }


    }
})();