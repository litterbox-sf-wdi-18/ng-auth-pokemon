class UsersController < ApplicationController

  def create
    @user = User.create(params.require(:user).permit(:email, :password, :password_confirmation))
    render json: @user
  end

  def show
    @user = User.find_by(api_token: params[:id])
    if @user
      render json: @user
    else
      render json: {}, status: 400
    end
  end

end
