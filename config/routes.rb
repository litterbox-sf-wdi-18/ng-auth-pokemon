Rails.application.routes.draw do
  root to: "application#index"

  post "/sessions", to: "sessions#create"

  # resources :users, only: [:show, :create, :update, :delete]
  # resources :pokemon, only: [:index, :show, :create, :update, :delete]

  namespace :api do
    namespace :v1 do 
      resources :users, only: [:show, :create, :update, :delete]
      resources :pokemon, only: [:index, :show, :create, :update, :delete]
    end
  end

  get "/*path", to: "application#index"
end
