module Api
  module V1
    class PokemonController < ApiController

      def index
        @pokemons = Pokemon.all
        render json: @pokemons
      end

    end
  end
end