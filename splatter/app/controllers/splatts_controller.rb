class SplattsController < ApplicationController
  # GET /splatts
  # GET /splatts.json
  def index
    @splatts = Splatt.all

    render json: @splatts
  end

  # GET /splatts/1
  # GET /splatts/1.json
  def show
    @splatt = Splatt.find(params[:id])

    render json: @splatt
  end

  # POST /splatts
  # POST /splatts.json
  def create
    user = User.find(params[:splatt][:user])
    #newparams = {:user => user, :body => params[:splatt][:body]}
    #newparams[:user] = user
    #newparams[:body] = params[:splatt][:body]
    @splatt = Splatt.new({:body => params[:body]})

    if @user.splatts.push(splatt)
      render json: splatt, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end

  end


  # DELETE /splatts/1
  # DELETE /splatts/1.json
  def destroy
    @splatt = Splatt.find(params[:id])
    @splatt.destroy

    head :no_content
  end

  private
    def splatt_params(params)
      params.permit(:body, :user_id)
    end
end
