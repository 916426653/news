/**
 * Created by qingyun on 16/10/19.
 */
angular.module('starter')
    .controller('TreeController',['$stateParams','commentService','$scope',function ($stateParams,commentService,$scope) {
        var replyId = $stateParams.id;

        commentService.get(replyId).then(function (data) {
            var commentIds = data.data.commentIds;
            var conmments = data.data.comments;
            var floor = new Floor();
            $scope.cate = floor.read(commentIds,conmments);
            console.log($scope.cate)
        });
        $scope.loadMore=function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    }])
    .directive('recursion',function($compile){
        function cpl(element, link){
            // Normalize the link parameter
            if(angular.isFunction(link)){
                link = { post: link };
            }
            // Break the recursion loop by removing the contents
            var contents = element.contents().remove();
            var compiledContents;
            return {
                pre: (link && link.pre) ? link.pre : null,
                /**
                 * Compiles and re-adds the contents
                 */
                post: function(scope, element){
                    // Compile the contents
                    if(!compiledContents){
                        compiledContents = $compile(contents);
                    }
                    // Re-add the compiled contents to the element
                    compiledContents(scope, function(clone){
                        element.append(clone);
                    });
                    // Call the post-linking function, if any
                    if(link && link.post){
                        link.post.apply(null, arguments);
                    }
                }
            };
        }

        return {
            restrict:'EA',
            scope: {recursion:'='},
            // template: '<li ng-repeat="item in recursion">\
            //             <a href="{{item.cateId}}.html">{{item.my.content}}</a>\
            //             <ul recursion="item.children">\
            //             </ul>\
            //         </li>',
            templateUrl:'temp/replyList.html',
            compile: function(element){

                return cpl(element, function(scope, iElement, iAttrs, controller, transcludeFn){
                    // Define your normal link function here.
                    // Alternative: instead of passing a function,
                    // you can also pass an object with
                    // a 'pre'- and 'post'-link function.
                });
            }
        };
    });
class Floor{

    split(arr){
        for(var i = 0;i<arr.length;i++){
            arr[i]=arr[i].split(',');
        }
        return arr;
    }
    read(arr,data){
        arr = this.split(arr);
        for(var i=0;i<arr.length;i++){

            arr[i] = this.floor(arr[i],data);
        }
        return arr;
    }
    floor(arr,data) {
        var s= {};
        var temp = {};

        for(var i=(arr.length)-1;i>=0;i--){
            if(i==(arr.length-1)){
                s['my']=data[arr[(arr.length)-1]];

                s.children=[{'my':data[arr[i-1]]}];
                temp = s.children[0];
            }else{
                if(i>0){

                    temp.children = [{'my':data[arr[i-1]]}];
                    temp = temp.children[0];
                }
            }
        }
        return s;
    }

}

