class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    # respond_to :json
  end
end
