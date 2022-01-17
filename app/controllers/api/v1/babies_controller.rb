class Api::V1::BabiesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    babies = Baby.where(query_params).order(created_at: :desc)
    render json: babies
  end

  def create
    begin
      baby = Baby.create!(baby_params)
      if baby
        render json: baby
      else
        render json: baby.errors
      end
    rescue ActiveRecord::RecordInvalid => e
      render json: {error: e.message}.to_json, status: 400
    end
  end

  def show
    if baby
      render json: baby
    else
      render json: baby.errors
    end
  end

  def destroy
    baby&.destroy
    render json: { message: 'Baby name deleted!' }
  end

  private

  def baby_params
    params.permit(:name, :list_id)
  end

  def query_params
    params.permit(:list_id)
  end

  def baby
    @baby ||= Baby.find(params[:id])
  end
end
