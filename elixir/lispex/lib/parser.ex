defmodule Lispex.Parser do

  @doc"""
  Make a new subtree if we find a '('
  """
  def parse(["(" | tail], acc) do
    {rem_tokens, sub_tree} = parse(tail, [])
    parse(rem_tokens, [sub_tree | acc])
  end

  @doc"""
  Accumulate the current sub tree in the parent tree, if we find a ')'
  """
  def parse([")" | tail], acc) do
    {tail, Enum.reverse(acc)}
  end

  @doc"""
  Roll back and start accumulating when we have no more tokens left
  """
  def parse([], acc) do
    Enum.reverse(acc)
  end

  @doc"""
  Start accumulating symbols and parse remaining tokens when we find a symbol
  """
  def parse([head | tail], acc) do
    parse(tail, [String.to_atom(head) | acc])
  end
end
