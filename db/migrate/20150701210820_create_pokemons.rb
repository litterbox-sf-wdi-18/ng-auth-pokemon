class CreatePokemons < ActiveRecord::Migration
  def change
    create_table :pokemons do |t|
      
      t.timestamps null: false
    end
  end
end
