class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :api_token

      t.timestamps null: false
    end
    
    add_index(:users, :api_token, unique: true)
  end
end
