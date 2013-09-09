/*
 Comimoc front v1.0
 (c) 2013 Jérôme Steunou https://github.com/JSteunou/comimoc-front
 License: BSD
*/

(function(comimoc, angular) {
    
    comimoc.constant('SimpleI18n', {
        'en': {
            'zoneTitle': {'0': 'No comments yet.',
                          'one': '1 comment so far.',
                          'other': '{} comments.'},
            'formTitle': 'Add a comment:',
            'formSubmit': 'Submit'
        },
        
        'fr': {
            'zoneTitle': {'0': 'Pas encore de commentaires.',
                          'one': '1 commentaire.',
                          'other': '{} commentaires.'},
            'formTitle': 'Ajouter un commentaire:',
            'formSubmit': 'Envoyer'
        },
    });
    
    comimoc.factory('Comments', ['$resource', 'COMIMOC_CONFIG', function($resource, COMIMOC_CONFIG) {
        // expose `Comments` resource service
        
        // transform on query GET
        // because the API never return array
        // but object containing array (security reason)
        var transformResponse = function(data) {
            var jsonData = angular.fromJson(data);
            return jsonData.comments;
        };
        
        return $resource(COMIMOC_CONFIG.RESOURCES_LOCATION + "/comments",
                         {},
                         {'query':  {method:'GET',  isArray: true, transformResponse: transformResponse}});
        
    }]);
    
    comimoc.controller('CommentCtrl', ['$scope', 'Comments', 'COMIMOC_CONFIG', 'SimpleI18n',
                       function($scope, Comments, COMIMOC_CONFIG, SimpleI18n) {
        // handle getting and posting new comments
        
        
        // -- private --
        
        var getPage = function() {
            var page = window.location.pathname;
            if(COMIMOC_CONFIG.ARGS) {
                page += window.location.search;
            }
            if(COMIMOC_CONFIG.HASH) {
                page += window.location.hash;
            }
            
            return page;
        };
        
        var getWebsite = function() {
            return COMIMOC_CONFIG.WEBSITE || '';
        };
        
        var normalize = function(comment) {
            comment.when = new Date(comment.when);
            return comment;
        };
        
        var locale = COMIMOC_CONFIG.LOCALE || 'en';
        
        // -- public --
        
        $scope.i18n = SimpleI18n[locale];
        
        $scope.comments = Comments.query({website: getWebsite(), page: getPage()});
        $scope.comments.$promise.then(function(comments) {
            comments.forEach(function(comment) {
               comment = normalize(comment);
            });
        });
        $scope.comment = new Comments();
        
        $scope.submit = function(valid) {
            if(valid) {
                $scope.comment.website = getWebsite();
                $scope.comment.page = getPage();
                
                $scope.comment.$save().then(
                    function(comment) {
                        delete $scope.error;
                        $scope.comment = new Comments();
                        $scope.comments.push(normalize(comment));
                    },
                    function(resp) {
                        $scope.error = resp;
                    });
            }
        };
            
    }]);


})(angular.module('comimoc'), angular);

