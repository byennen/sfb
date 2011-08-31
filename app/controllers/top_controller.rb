class TopController < ApplicationController
  
  def index
    if authenticated?
      redirect_to canvas_path
    else
      redirect_to new_facebook_path
    end
  end

end
