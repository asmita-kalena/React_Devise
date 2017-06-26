Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  #devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "home#index"

      # devise_for :users, controllers:
      # {
      #   sessions: 'users/sessions'
      #
      # }
      devise_for :users, controllers: {sessions: 'users/sessions', registrations: 'users/registrations', passwords: 'users/passwords'}
        devise_scope :user do
          get '/users/sign_out' => 'devise/sessions#destroy'
        end
end
