defmodule Discuss.AuthController do
  use Discuss.Web, :controller
  plug Ueberauth

  def callback(conn, params) do
    IO.puts("CALLBACK")
    IO.inspect(conn.assigns)
    IO.inspect(params)
    IO.puts("END")
  end
end
