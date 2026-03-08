Rails.application.routes.draw do

  namespace :api, format: 'json' do
    resources :tickets, only: [:index, :show, :create] do
      collection do
        get 'search', to: 'tickets#search'
      end
    end
  end
end
