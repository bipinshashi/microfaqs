class QuestionsController < ApplicationController

	def show
		question = Question.find(params[:id])
		@card = {:question => question, :answers => question.answers.sort_by {|ans| ans.net_vote}.reverse, :tags => question.tag_list}.to_json
	end

end
