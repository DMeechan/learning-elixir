defmodule Lispex.Tokenizer do
  def tokenize(str) do
    str
      |> String.replace("(", " ( ")
  end
end
