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

		$scope.vote = function(type,object){

			// $http.post('/api/questions/vote_answer',{answer_id: answer.id, type:type}).success(function(data) {
				// console.log(data);
				if (type == 'up') {
					if(!object.upvoted){
						if(object.voted == true)
							object.upvote += 2;
						else
							object.upvote += 1;
						object.upvoted = true;
						object.downvoted = false;
					}
				}else{
					if(!object.downvoted){
						if(object.voted == true)
							object.downvote += 2;
						else
							object.downvote += 1;
						object.downvoted = true;
						object.upvoted = false;
					}
				}
				object.voted = true;
			// });

		};

		function getParameterByName(name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}

		if (/[?&]tag=/.test(location.href) == false) {
			$scope.load_questions();
		}else{
			var tag = getParameterByName("tag");
			$scope.load_questions_by_tag(tag);
		};
		$scope.load_tag_cloud();
}];