defmodule Identicon do

  def main(input) do
    input
      |> hash_input
      |> pick_colour
      |> build_grid
      |> filter_odd_squares
      |> build_pixel_map
      |> draw_image
      |> save_image(input)
  end

  # Perform pattern matching within the parameters
  # By extracting the hex value from the `image` struct
  # And then using pattern matching to extract the first 3 array values:
  # r, g, b
  # And then also store the original input in the record `image`
  def pick_colour(%Identicon.Image{hex: [r, g, b | _tail]} = image) do
    # Now let's create a new record
    # Containing the values inside image (just `hex` in his case)
    # And with the RGB values stored in a tuple called `colour`
    %Identicon.Image{image | colour: {r, g, b}}
  end

  def hash_input(input) do
    hex = :crypto.hash(:md5, input)
      |> :binary.bin_to_list

    %Identicon.Image{hex: hex}
  end

  def build_grid(%Identicon.Image{hex: hex} = image) do
    grid =
      hex
      |> Enum.chunk(3)
      |> Enum.map(&mirror_row/1)
      |> List.flatten
      |> Enum.with_index

    %Identicon.Image{image | grid: grid}
  end

  defp mirror_row(row) do
    # input: [145, 46, 200]
    [first, second | _tail] = row

    # output: [145, 46, 200, 46, 1415]
    row ++ [second, first]
  end

  def filter_odd_squares(%Identicon.Image{grid: grid} = image) do
    grid = Enum.filter grid, fn({colour_code, _index}) ->
      rem(colour_code, 2) == 0
    end

    %Identicon.Image{image | grid: grid}
  end

  def build_pixel_map(%Identicon.Image{grid: grid} = image) do
    pixel_map = Enum.map grid, fn({_colour, index}) ->
      x = rem(index, 5) * 50
      y = div(index, 5) * 50
      top_left = {x, y}
      bottom_right = {x + 50, y + 50}

      {top_left, bottom_right}
    end

    %Identicon.Image{image | pixel_map: pixel_map}
  end

  def draw_image(%Identicon.Image{colour: colour, pixel_map: pixel_map}) do
    image = :egd.create(250, 250)
    fill = :egd.color(colour)

    Enum.each pixel_map, fn({top_left, bottom_right}) ->
      # This is a rare case where we're mutating a record (image)
      # Due to the Erlang Graphical Library
      :egd.filledRectangle(image, top_left, bottom_right, fill)
    end

    :egd.render(image)
  end

  def save_image(image, filename) do
  File.write("#{filename}.png", image)
  end

end
