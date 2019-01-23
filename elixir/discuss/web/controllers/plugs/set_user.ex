defmodule Discuss.Plugs.SetUser do
  import Plug.Conn
  import Phoenix.Controller

  alias Discuss.Repo
  alias Discuss.User

  def init(_params) do
    # do any computationally heavy calculations in here
    # (like getting some special values from DB or whatever)
    # which can be calculated once and then re-used
    # in every call of this plug
    # since the output of this init function is used as
    # the _params for the call() function below
  end

  def call(conn, _params) do
    user_id = get_session(conn, :user_id)

    # the statement below is similar to doing:
    # colour = true && "red"
    # colour is now red

    cond do
      user = user_id && Repo.get(User, user_id) ->
        assign(conn, :user, user)
        # this sets conn.assigns.user to the user struct
      true ->
        assign(conn, :user, nil)
    end

  end
end
