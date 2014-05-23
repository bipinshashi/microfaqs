angular.module('microfaqs', ['ui.bootstrap']);
var homeCtrl = ['$scope','$http', '$timeout', '$modal', function($scope,$http,$timeout,$modal){
    $http.defaults.headers.post['X-CSRF-TOKEN']= $('meta[name="csrf-token"]').attr('content');
		$scope.cards = [];

		$scope.load_questions = function(){
			$http.get('/api/questions/trending').success(function(data) {
				$scope.cards = data.questions;
			});
		};


		$scope.load_questions();
}];