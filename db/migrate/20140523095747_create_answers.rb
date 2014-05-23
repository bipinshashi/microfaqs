class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.string :title
      t.integer :upvote
      t.integer :downvote
      t.integer :user_id

      t.timestamps
    end
  end
end
