class ChangeEmailRequirement < ActiveRecord::Migration
  def change
  	change_column :users, :email, :string, :null => true 
  	change_column :questions, :upvote, :integer, :default => 0
  	change_column :questions, :downvote, :integer, :default => 0
  	change_column :answers, :upvote, :integer, :default => 0
  	change_column :answers, :downvote, :integer, :default => 0
  	# remove_index :users, :email

  end
end
