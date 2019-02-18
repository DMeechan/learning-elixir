defmodule Lispex.ParserTest do
  use ExUnit.Case
  doctest Lispex

  alias Lispex.Parser

  test "parses tokens into tree" do
    # test with LISP code: (begin (define r 10) (* r r))
    input = ["(", "begin", "(", "define", "r", "10", ")", "(", "*", "r", "r", ")", ")"]
    acc = []
    output = Parser.parse(input, acc)

    expected_output = [[:begin, [:define, :r, 10], [:*, :r, :r]]]
    assert expected_output == output

    # test with LISP code: (begin (if (> x y) (set! max x) (set! max y)))
    input = [ "(", "begin", "(", "if", "(", ">", "x", "y", ")", "(", "set!", "max", "x", ")", "(", "set!", "max", "y", ")", ")", ")"]
    acc = []
    output = Parser.parse(input, acc)

    expected_output = [[:begin, [:if, [:>, :x, :y], [:set!, :max, :x], [:set!, :max, :y]]]]
    assert expected_output == output
  end

end
