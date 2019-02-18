defmodule Lispex do
  @moduledoc """
  Documentation for Lispex.
  """

  alias Lispex.{Tokenizer, Parser}

  def log(code) do
    IO.inspect code |> run
  end

  def run(code) do
    code |> Tokenizer.tokenize |> Parser.parse([])
  end

  @doc """
  Hello world.

  ## Examples

      iex> Lispex.hello()
      :world

  """
  def hello do
    :world
  end
end
