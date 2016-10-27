/**
 * Created by qingyun on 16/10/13.
 */
function DataService($http) {
    var offset = 0;
    var size=10;
    var id;
    var isRequesting = false;
    this.getLists=function () {
        var url = '/163/getSubDocPic?from=toutiao&fn=1&prog=LMA1&passport=&devId=xoedrIW%2B3Rt4l8pUvGdOEKpf1EYb5T9gRf4fBOGROoFb3mnQy%2F8LrNIu7bfDsCH%2B&offset=' + offset + '&size='
            + size + '&version=15.1&spever=false&net=wifi&lat=34qUv%2FiF8%2BeVafFPTTydOQ%3D%3D&lon=J3FWwuNJ4%2FX4l6tN03aQxg%3D%3D&ts=1474183347&sign=8gjKE6Eq98IRhHe3q%2B%2FWkspM8xdvXbcOMDCWpbUFa4548ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore';
        return $http.get(url);
    }
    this.getNext=function () {
        if(!isRequesting){
            isRequesting=true;
            offset+=size;
            return this.getLists();
        }
    }
    this.setReqState=function (state) {
        isRequesting = state;
    }
    this.getNewDetail=function (id) {
        var detailUrl = '/163detail/' + id + '/full.html';
        return $http.get(detailUrl);
    }
}
angular.module('starter')
    .service('listService',DataService)
    .controller('news',['listService','$scope',
        function (listService,$scope) {
            $scope.items=[];
            listService.getNext().then(function (data) {
                var items= data.data.tid;
                $scope.items = items;
            })
            listService.setReqState(false);
            $scope.loadMore = function () {
                var promise=listService.getNext()

                if(promise){
                    promise.then(function (data) {
                        var items = data.data.tid;
                        $scope.items = $scope.items.concat(items);
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        listService.setReqState(false);
                    })
                }
            };
        }])
    .controller('topic',['$stateParams','$scope','getListService',function ($stateParams,$scope, getListService) {
        var url= '163/getSubDocPic?tid=T1348647909107&from=toutiao&offset=0' +
            '&size=10 &fn=2&prog=LMA1&passport=&devId=Tut5Dg10ZzEDZCYOeMZpaA%3D%3D&lat=Uy6hHj9yGT0UBUYmKPIvkQ%3D%3D&lon=OVi2fyhYOHzZzrZMq7WQzw%3D%3D&version=16.0&net=wifi&ts=1475037667&sign=QQpSxJ0R7sXeQdUVGkXqbw0uLGAm6eHOseB4390gneB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=netease_gw&mac=pZytz3VDScT0euk8QHcTGqhnYB%2BxK6YGLcdcZR%2BsrK8%3D'
        $scope.u = getListService.getList(url)

    }])