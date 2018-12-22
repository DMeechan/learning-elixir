defmodule Discuss.TopicController do
  use Discuss.Web, :controller

  # The alias lets us write 'Topic' instead of 'Discuss.Topic'
  alias Discuss.Topic

  def new(conn, _params) do
    struct = %Topic{}
    params = %{}
    changeset = Topic.changeset(struct, params)
    render conn, "new.html", changeset: changeset
  end

  def create(conn, %{"topic" => topic} = params) do
    changeset = Topic.changeset(%Topic{}, topic)

    case Repo.insert(changeset) do
      {:ok, post} -> IO.inspect(post)
      {:error, changeset} -> render conn, "new.html", changeset: changeset
    end
  end

end
