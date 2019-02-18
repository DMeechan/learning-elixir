defmodule Lispex do
  @moduledoc """
  Documentation for Lispex.
  """

  alias Lispex.{Tokenizer, Parser, Env, Eval}

  def log(code) do
    IO.inspect(code |> interpret)
  end

  @spec interpret(binary(), any()) :: {any(), any()}
  def interpret(code, env \\ Env.new_env()) do
    code
    |> Tokenizer.tokenize()
    |> Parser.parse([])
    |> Eval.eval(env, 0)
  end

  def scheme_string(exp) do
    case is_list(exp) do
      true -> "(" <> (Enum.map(exp, fn x -> scheme_string(x) end) |> Enum.join(" ")) <> ")"
      false -> to_string(exp)
    end
  end

  def repl(env \\ nil) do
    program = IO.gets("lispex> ")
    {result, env} = program |> interpret(env)
    result |> scheme_string |> IO.puts()
    repl(env)
  end
end
