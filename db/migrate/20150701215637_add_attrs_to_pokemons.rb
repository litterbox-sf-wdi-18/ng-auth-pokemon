class AddAttrsToPokemons < ActiveRecord::Migration
  def change
    add_column :pokemons, :name, :string
    add_column :pokemons, :ndex, :string
    add_column :pokemons, :type, :string
    add_column :pokemons, :photo_url, :string
  end
end
