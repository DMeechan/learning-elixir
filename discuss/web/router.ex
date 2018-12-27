defmodule Discuss.Router do
  use Discuss.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Discuss do
    pipe_through :browser # Use the default browser stack

    get "/", TopicController, :index
    resources "/topics", TopicController

    # THE RESOURCES TAG ABOVE CONDENSES ALL OF THESE CRUD OPS (below)
    # INTO A SINGLE LINE OF CODE
    # ASSUMING WE'RE FOLLOWING CRUD API CONVENTIONS

    # READ
    # get "/topics", TopicController, :index
    # get "/topics/new", TopicController, :new
    # get "/topics/:id/edit", TopicController, :edit

    # CREATE, UPDATE, DELETE
    # post "/topics", TopicController, :create
    # delete "/topics/:id", TopicController, :delete
    # put "/topics/:id", TopicController, :update

  end

  scope "/auth", Discuss do
    pipe_through :browser

    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
  end

  # Other scopes may use custom stacks.
  # scope "/api", Discuss do
  #   pipe_through :api
  # end
end
