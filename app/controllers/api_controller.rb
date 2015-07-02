class ApiController < ApplicationController
  protect_from_forgery with: :null_session

  before_action :require_api_token

  class TokenError < StandardError
  end

  rescue_from "TokenError", with: :render_error

  private

    def require_api_token
      @current_user = User.find_by(api_token: params[:api_token])
      raise TokenError, "Token Not Found" unless @current_user
    end

    def render_error(e)
      render json: { errors: {message: e.message} }
    end

end