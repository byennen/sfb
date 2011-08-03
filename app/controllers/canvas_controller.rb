class CanvasController < ApplicationController
  before_filter :require_authentication
  
  def index
  end

  def authorize
    @auth = Facebook.auth.from_signed_request(params[:signed_request])
    if @auth.authorized?
      authenticate Facebook.identify(@auth.user)
      render :show
    else
      render :authorize
    end
  end

end
