class Question < ActiveRecord::Base
	acts_as_taggable
	has_many :answers, :dependent => :destroy
	belongs_to :user
end
