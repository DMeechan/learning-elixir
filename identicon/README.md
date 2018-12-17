# Identicon

What is an identicon?

An identicon is a visual representation of a hash. So what does that look like?

You've probaly seen identicons before because GitHub has them. Whenever you first created a profile, you get assigned a hash (presumably based on your username, but I'm unsure). Then that hash gets converted into a visualisation and becomes your profile picture.

For example, have a look at [this account](https://github.com/programmer1).

Here's [another example account](https://github.com/programmer12).

## How do you specifically define an identicon?

- It's a 250px x 250px square image. 
- This image is made up of a 5x5 grid of squares, where each square is 50px tall and 50px wide.
- So there are 5 squares in every row, and 5 rows. 25 squares in total.
- So we need to choose a random colour based on the hash
- Then randomly fill in those squares based on the bash
- And note that the grid is mirrored along the y axis. So the left side == right side

## So how will we generate the identicon?

Here's the process:

1. Get a String input
2. Generate a hash from that input
3. Generate an image from that hash

Now let's have a look at that process in detail:

1. Get a String input
2. Compute an MD5 hash binary list (a list of binary values: 0 - 255) from the String
3. List of numbers
4. Pick a colour (first three values in the hash's binary list)
5. Build a grid of squares (even values will be coloured; odd values will be white)
6. Convert the grid into an image
7. Save the image to a file

## Installation

If [available in Hex](https://hex.pm/docs/publish), the package can be installed as:

  1. Add `identicon` to your list of dependencies in `mix.exs`:

    ```elixir
    def deps do
      [{:identicon, "~> 0.1.0"}]
    end
    ```

  2. Ensure `identicon` is started before your application:

    ```elixir
    def application do
      [applications: [:identicon]]
    end
    ```

