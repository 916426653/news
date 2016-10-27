/**
 * Created by qingyun on 16/10/13.
 */
angular.module('starter')
    .service('commentService', ['$http', function ($http) {

    var offset = 0, limit = 10;
    var last_id ;
    this.getComment = function (id) {
        offset += limit;
        var url = '/comment/' +last_id + ' /app/comments/newList?format=building&headLimit=3&ibc=newsappios&limit='+limit+'&offset='+offset+'&showLevelThreshold=5&tailLimit=2';
        return $http.get(url);
    }

    this.get = function (id) {
        last_id = id;

        var url = '/comment/' + id + '/app/comments/hotList?format=building&headLimit=3&ibc=newsappios&limit=10&offset=0&showLevelThreshold=5&tailLimit=2';

        return $http.get(url);

    }
}])
    .controller('reply',['commentService','$scope','$stateParams',function (commentService,$scope,$stateParams) {
        id=$stateParams.id
        console.log(id)
        $scope.loadMore=function () {
            commentService.get(id).then(function (data) {
                console.log(data)
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        }
}]);
