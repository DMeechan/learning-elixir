defmodule Lispex.Tokenizer do
  def tokenize(str) do
    str
      |> String.replace("(", " ( ")
      |> String.replace(")", " ) ")
      |> String.split()
  end
end
