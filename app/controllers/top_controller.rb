class TopController < ApplicationController
  
  def index
    redirect_to canvas_url if authenticated?
  end

end
