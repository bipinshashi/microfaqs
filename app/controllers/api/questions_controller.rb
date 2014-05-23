class Api::QuestionsController < ApplicationController
	include ActsAsTaggableOn::TagsHelper

	def trending
		questions = Question.all
		trending_questions = card_format(questions)
		render :json => {:status => 200, :questions => trending_questions}
	end

	def tag_cloud
		render :json => {:tag_cloud => Question.tag_counts.first(10)}
	end

	def filter_by_tag
		questions = Question.tagged_with(params[:tag])
		filtered_questions = card_format(questions)
		render :json => {:status => 200, :questions => filtered_questions}
	end

	def tags
		tags = ActsAsTaggableOn::Tag.all.where(["name LIKE ?","%#{params[:q]}%"])
		if tags.blank?
			tags = [{:id => 0, :name => params[:q]}]
		end
		render :json => tags
	end


	private
	def card_format(questions)
		cards = []
		questions.each do |q|
			cards << {:question => q, :answer => q.answers.sort_by {|ans| ans.net_vote}.last}
		end
		return cards
	end

end