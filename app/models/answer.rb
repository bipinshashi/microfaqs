class Answer < ActiveRecord::Base
	belongs_to :question
	belongs_to :user

	def net_vote
		self.upvote - self.downvote
	end
end
