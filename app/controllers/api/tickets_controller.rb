# frozen_string_literal: true

module Api
  class TicketsController < ApplicationController
    def index
      form = TicketsForm.new(params)
      @tickets = MyTicketsQuery.search(user_id: form.user_id, display_count: 50, page: 1)
    end

    def show
      @ticket = Ticket.find(params[:id])
    end

    def create
      ticket = RegistTicketUsecase.execute(
        current_user: current_user,
        title: params[:title],
        description: params[:description],
        point: params[:point] || 0
      )
      @ticket = ticket
      render :show, status: :created
    rescue StandardError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end

    def search
      form = TicketSearchForm.new(params)
      @tickets = TicketSearchQuery.search(user_id: form.user_id, keyword: form.keyword)
      render json: @tickets
    end
  end
end