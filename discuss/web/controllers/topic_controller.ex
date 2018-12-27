defmodule Discuss.TopicController do
  use Discuss.Web, :controller

  # The alias lets us write 'Topic' instead of 'Discuss.Topic'
  alias Discuss.Topic

  plug Discuss.Plugs.RequireAuth
    when action in [:new, :create, :edit, :update, :delete]

  def index(conn, _params) do
    topics = Repo.all(Topic)
    render conn, "index.html", topics: topics
  end

  def new(conn, _params) do
    struct = %Topic{}
    params = %{}
    changeset = Topic.changeset(struct, params)
    render conn, "new.html", changeset: changeset
  end

  def create(conn, %{"topic" => topic} = params) do
    changeset = Topic.changeset(%Topic{}, topic)

    case Repo.insert(changeset) do
      {:ok, _topic} ->
        conn
          |> put_flash(:info, "Topic created! :)")
          |> redirect(to: topic_path(conn, :index))
      {:error, changeset} -> render conn, "new.html", changeset: changeset
    end
  end

  def edit(conn, %{"id" => topic_id} = params) do
    topic = Repo.get(Topic, topic_id)
    changeset = Topic.changeset(topic)

    render conn, "edit.html", changeset: changeset, topic: topic

  end

  def update(conn, %{"id" => topic_id, "topic" => topic} = _params) do
    old_topic = Repo.get(Topic, topic_id)
    changeset = Topic.changeset(old_topic, topic)

    case Repo.update(changeset) do
      {:ok, _topic} ->
        conn
          |> put_flash(:info, "Topic updated :)")
          |> redirect(to: topic_path(conn, :index))
      {:error, changeset} ->
        render conn, "edit.html", changeset: changeset, topic: old_topic
    end
  end

  def delete(conn, %{"id" => topic_id}) do
    topic = Repo.get!(Topic, topic_id) |> Repo.delete!

    conn
      |> put_flash(:info, "Topic deleted :o")
      |> redirect(to: topic_path(conn, :index))

  end

end
