Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'babies/index'
      post 'babies/create'
      get '/show/:id', to: 'babies#show'
      delete '/destroy/:id', to: 'babies#destroy'
    end
  end
  root 'homepage#index'

  get '/*path' => 'homepage#index'
end
