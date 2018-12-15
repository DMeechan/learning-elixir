defmodule Identicon do

  def main(input) do

  end

  def hash_input(input) do
    :crypto.hash(:md5, input)
  end

end
