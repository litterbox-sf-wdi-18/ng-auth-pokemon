class User < ActiveRecord::Base

  has_secure_password

  before_validation :gen_api_token, on: :create

  validates :email,
            :uniqueness => true,
            :presence => true

  validates :api_token,
            :uniqueness => true

  def self.confirm(params)
    user = self.find_by(:email => params[:email])
    user.try(:authenticate, params[:password])
  end

  # test token
  # "0d50f8b1-0306-4fa3-ad18-0a5d829919ad"

  def gen_api_token
    token = SecureRandom.uuid()

    # validates uniquness
    until User.find_by(:api_token => token).nil?
      token = SecureRandom.uuid()
    end
    self.api_token = token
  end

end
