defmodule Lispex.TokenizerTest do
  use ExUnit.Case
  doctest Lispex

  test "splits String into array of space-separated-tokens" do
    input = "(begin (if (> x y) (set! max x) (set! max y)))"
    output = Lispex.Tokenizer.tokenize(input)

    expected = [ "(", "begin", "(", "if", "(", ">", "x", "y", ")", "(", "set!", "max", "x", ")", "(", "set!", "max", "y", ")", ")", ")"]
    assert expected == output
  end
end
