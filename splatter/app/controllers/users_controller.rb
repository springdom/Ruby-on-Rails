  
class UsersController < ApplicationController
  before_filter :set_headers
  # GET /users
  # GET /users.json
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.find(params[:id])

    render json: @user
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params(params[:user]))

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    @user = User.find(params[:id])

    if @user.update(user_params(params[:user]))
      head :no_content
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user = User.find(params[:id])
    @user.destroy

    head :no_content
  end
  def splatts
	@user = User.find(params[:id])
	render json: @user.splatts
  end
  # GET /users/splatts-feed/1
  def splatts_feed
	@feed = Splatt.find_by_sql("SELECT * FROM follows JOIN splatts ON follows.followed_id = splatts.user_id WHERE follows.follower_id = #{params[:id]} ORDER BY created_at DESC")
	render json: @feed
  end
  
  def show_follows
	@user = User.find(params[:id])
	render json: @user.follows
  end


  def show_followers
	@user = User.find(params[:id])	
    render json: @user.followed_by
  end

  def add_follows
	@user1 = User.find(params[:id])
	@user2 = User.find(params[:follows_id])
  if @user1.follows << @user2
	render json: @user1.follows
  else
	render json: @user1.error, status: :unprocessable_entity
  end
  end

  def delete_follows
	@user1 = User.find(params[:id])
	@user2 = User.find(params[:follows_id])
    if @user1.follows.delete(@user2)
		render json: @user1.follows
    else
		render json: @user1.error, status: :unprocessable_entity
  end	

 end
 private
  def user_params(params)
	params.permit(:email, :password, :name, :blurb)
  end	
   	def set_headers
		headers['Access-Control-Allow-Origin'] = '*'
	end
end
