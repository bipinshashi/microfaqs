class Api::QuestionsController < ApplicationController
	include ActsAsTaggableOn::TagsHelper

	def trending
		questions = Question.all
		trending_questions = card_format(questions)
		render :json => {:status => 200, :questions => trending_questions}
	end

	def tag_cloud
		tag_cloud = Question.tag_counts.first(10)
		formatted_tag_cloud = []
		tag_cloud.each_with_index { |t,i|
			formatted_tag_cloud << {:class => "cloud-#{i+1}", :name => t.name}
		}
		render :json => {:tag_cloud => formatted_tag_cloud.shuffle}
	end

	def filter_by_tag
		questions = Question.tagged_with(params[:tag].split("-").join(" "))
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
			cards << {:question => q, :answer => q.answers.sort_by {|ans| ans.net_vote}.last, :tags => q.tag_list}
		end
		return cards
	end

end