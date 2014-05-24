var showCtrl = ['$scope','$http', '$timeout', '$modal', function($scope,$http,$timeout,$modal){
    $http.defaults.headers.post['X-CSRF-TOKEN']= $('meta[name="csrf-token"]').attr('content');
    $scope.card = {};
		$scope.question = {};

		$scope.load_tag_cloud = function(){
			$http.get('/api/questions/tag_cloud').success(function(data) {
				$scope.tag_cloud = data.tag_cloud;
			});
		};

		$scope.submit_answer = function(){
			$http.post('/api/questions/submit_answer',{question_id: $scope.question.id, answer_title: $scope.user_answer}).success(function(data) {
				console.log(data);
				$scope.user_answer = "";
				$scope.card.answers.push(data.answer);
			});
		};

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

		$scope.load_tag_cloud();
	}];