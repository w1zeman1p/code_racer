module Api
  class StagesController < ApplicationController
    def create
      @stage = current_user.stages.new

      if @stage.save
        @stage.racers << current_user
        render :show
      else
        render json: @stage.errors.full_messages, status: 422
      end
    end

    def show
      @stage = Stage.find_by(token: params[:id])

      unless @stage.racers.include?(current_user)
        @stage.racers << current_user
        Pusher["stage_#{ params[:id] }"].trigger('add_racer', {
          id: current_user.id,
          nickname: current_user.nickname
        })
      end

      render :show
    end

    def start
      @registration = RaceRegistration.new(current_user, random_track)
      @registration.save
      @stage = Stage.find(params[:id])

      Pusher["stage_#{ @stage.token }"].trigger('start_race', {
        track_id: @registration.track.id
      })
    end

    private

    def random_track
      Track.random
    end
  end
end
