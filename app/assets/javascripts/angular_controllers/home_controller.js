angular.module('microfaqs', ['ui.bootstrap']);
var homeCtrl = ['$scope','$http', '$timeout', '$modal', function($scope,$http,$timeout,$modal){
    $http.defaults.headers.post['X-CSRF-TOKEN']= $('meta[name="csrf-token"]').attr('content');
		$scope.cards = [];
		$scope.tag_cloud = [];

		$scope.load_questions = function(){
			$http.get('/api/questions/trending').success(function(data) {
				$scope.cards = data.questions;
				console.log("loading questions");
			});
		};

		$scope.load_questions_by_tag = function(tag){
			$http.get('/api/questions/filter_by_tag?tag='+tag).success(function(data) {
				$scope.cards = data.questions;
				console.log("loading questions by filter");
			});
		};

		$scope.load_tag_cloud = function(){
			$http.get('/api/questions/tag_cloud').success(function(data) {
				$scope.tag_cloud = data.tag_cloud;
			});
		};

		$scope.submit_question = function(){
			console.log($scope.question_title);
			$('#myModal').modal('hide');
			var tag_list = [];
			$(".token-input-token-facebook p").map(function(){
				tag_list.push($(this).html());
			});
			console.log(tag_list);
			$http.post('/api/questions/submit',{question: $scope.question_title, tags: tag_list}).success(function(data) {
				$scope.load_questions();
			});
		}


		$scope.load_questions();
		$scope.load_tag_cloud();
}];