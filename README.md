# Learning Elixir & Phoenix

I'm learning Elixir & Phoenix and here are my notes. Enjoy!

## Elixir

Elixir code gets transpiled into Erlang, which is then compiled and executed on the BEAM *(Bogdan's Erlang Abstract Machine)*.

Not all of Erlang's functionality has been implemented in Elixir, so for some things (like managing the file system), we might need to write a little bit of Erlang.

### Styling Conventions

- Use **under_scores** instead of camelCase - like `create_hand` or `binary_to_term`
- You *should* use "double quotes" everywhere (but 'single quotes' do work fine)
- If a method returns a boolean, you *should* add a `?` after it, like: `def contains?(deck, card) do`. The `?` doesn't actually change anything though
- Avoid IF statements wherever you can. If you're ever thinking *I need an IF statement here...*, then think again, my friend. Elixir loves good ol' switch cases and makes them easy to write too. 

For example, have a look at the two examples below:

```javascript
// JavaScript
if (status === "error") {
    return "That file doesn't exist :("
} else if (status === "ok") {
    return binaryToFile(binary);
}
```

```ruby
# Elixir
case status do
    :ok -> :erlang.binary_to_term(binary)
    :error -> "That does doesn't exist :("
end
```

### Pattern Matching

- To extract values from a tuple: { hand, rest_of_deck } = split_deck:
- => where `split_deck = { [hand], [rest of deck] }`
- You've gotta match the structure of the data you're trying to pattern match against:
- => example: `[ colour1, colour2 ] = [ "blue", "green" ]`
- You can perform *validation* within your pattern matching. This language is insanely cool. 

Have a look at these two examples of pattern matching validation:

```ruby
["red", colour] = ["red", "blue"]
# "red" equals "red" so it succeeds
# colour is set to "blue"
```

```ruby
["red", colour] = ["green", "blue"]
# "red" does equal "green" so this fails
# so colour is not assigned a value
```

So pattern matching is pretty cool, right? But don't forget that our values on the left (like `[colourA, colourB]`) need to match the structure of the values on the right (like `["red", "blue"]`).

So what do we do if we only want `colourA`? 

- Can we remove `colourB`? No, because then the pattern won't match and we'll get an error
- Should we leave it as it is? We could... but then the Elixir compiler will give us an *unused variable* warning...

So what do we do?

We put an underscore in front of the variable that we don't care about. For example:

`[colourA, _colourB] = ["red", "blue"]`

Now our pattern match will succeed and we won't get any warnings if we're not using `colourB`.

### Standard library

#### Enum

- `Enum.member?(list, value)` to check if a value exists in enumnerable data
- `Enum.split(array, number_of_values)` to extract some values from an array and return a tuple: {[my hand], [rest of the deck]}

#### String & List

- `String.contains?("my name is", "name")` to check if a string contains a substring
- `String.contains?("my name is", ["name", "elixir"])` returns true - it checks if a string contains any substring in a list
- `List.flatten(list)` to flatten a nested list of lists

#### File System

```ruby
  def save(deck, filename) do
    binary = :erlang.term_to_binary(deck)
    File.write(filename, binary)
  end

  def load(filename) do
    {status, binary} = File.read(filename)
    :erlang.binary_to_term(binary)
  end
```

A more refined load() function using pattern matching validation:

```ruby
    def load(filename) do
        case File.read(filename) do
            {:ok, binary} -> :erlang.binary_to_term(binary)
            {:error, reason} -> "Whoops, that file doesn't exist :("
        end
    end
```

### Syntax

#### Quick Notes

- **Functions** automatically **return the last value in the function** there is no `return` keyword. For example, this returns "hi there":

```ruby
def hello do
    "hi there"
end
```

- You can do **method overloading** by creating methods with the same name but a different *number* of parameters (i.e., its **arity**)
- An **atom** (or **symbol** as it's called in Ruby) is like an enum in Java. They are atomic units that you can compare values against (like Strings). For example, a file read operation might return the status `:ok` or `:error`. Those are symbols / atoms.

#### Iteration

- Iterate (perform a **comprehension**) through items in a list with the arrow syntax:

```ruby
for suit <- suits do
    suit
end
```

- When you do a **comprehension**, you're mapping each of the values and returning a new array. So the code above is similar to doing `return suit.map(suit -> suit)` in JS
- Nested list comprehensions (nested loops) might not be the best idea if you need to iterate through two lists because it will return a list of lists, not a flat list of values
- Instead of nesting lists comprehensions, you can (should?) iterate through them together in a single comprehension:

```ruby
for suit <- suits, value <- values do
    "#{value} of #{suit}"
end
```


#### Pipe operator

You can use the **pipe operator** to make your code less repetetive. It pipes the output from one function into the next function. Note that it gets piped into the first argument.

For example:

```ruby
def create_hand(hand_size) do
    # Without the pipe
    deck = Cards.create_deck
    deck = Cards.shuffle(deck)
    hand = Cards.deal(deck, hand_size)

    # With the pipe
    Cards.create_deck
      |> Cards.shuffle
      |> Cards.deal(hand_size)

  end
```

#### Data structures - lists, tuples, maps, keyword lists

- Lists are written with square brackets: [1, 2, 3] or ["Apple", "Pear"]
- Tuples are written with curly brackets: {1, 2}

There are a couple more key data structures to know about in Elixir: `maps` and `keyword lists`.

##### What's a map?

A map is a collection of key-value pairs. This is like a HashMap in Java or an object in JavaScript. Here's a JavaScript vs Elixir example:

```javascript
// javascript
myDetails = {
  name: "Daniel",
  language: "English",
  randomNum: 10,
  alive: true,
}
```

```ruby
# elixir
my_details = %{
  :name: "Daniel", # you can use atoms as keys
  "language": :english # or you can use Strings or any other primitive data type as the key
  :random_num: 42,
  "alive": true
}
```

##### What's a keyword list?

A keyword list is a list of tuples, where the first element is an atom.

For example:

```ruby
[
  {:name, "Daniel"},
  {:language, :english},
  {:random_num, 42},
  {:alive, :yes}
]
```

Elixir has a shorthand syntax which makes the above code look like this:

```ruby
[
  name: "Daniel",
  language: :english,
  random_num: 42,
  alive: :yes
]
```

Much cleaner, right?

Here we've cut out two things:

1. No more curly brackets needed for the tuples
2. We don't need to show that the keys are atoms (because we know they *must* be atoms in a keyword list)

Also notice how that second example makes it look like a map of key-value pairs. **That is not the case.**

It's a list of tuples. So if you need to find the data with the key `language`, you'll have to look through all the tuples in order to find it. You can't just access it directly like in a map. It's kinda like searching for something in an unsorted array :(

### ExDoc comments

You can add ExDoc comments (much like JavaDoc comments) to your code so you can easily generate wonderful documentation for your project (using the built-in ExDoc tool).

There are two levels of comments:

- Module comments
- Function comments

For example:

```ruby
defmodule Cards do
  @moduledoc """
    Provides methods for creating and handling a dec of cards
  """

  @doc """
    Returns a list of strings representing a deck of cards
  """
  def create_deck do
    ["Ace of Spades", "King of Clubs", "etc"]
  end

  @doc """
    Randomizes the order of a deck of cards
  """
  def shuffle(deck) do
    Enum.shuffle(deck)
  end
end
```

You can even include example code and markdown to demonstrate how exactly to use your code:

```ruby
  @doc """
    Divides a deck into a hand and the remainder of the hand.
    The `hand_size` argument indicates how mnay cards should be dealt.

  ## Examples

      iex> deck = Cards.create_deck
      iex> {hand, deck} = Cards.deal(deck, 1)
      iex> hand
      ["Ace of Spades"]

  """
  def deal(deck, hand_size) do
    Enum.split(deck, hand_size)
  end
```

**Note that the formatting above is important (tabs and line breaks) for the above code example to be displayed correctly**

### Testing

Testing is a first-class citizen in Elixir. There's no need to decide between and install numerous libraries. You just write tests. It's that simple :)

In our project folder, we have a `test` folder containing two files:

- `cards_test.exs` - contains tests for the Cards module
- `test_helper.exs` - used for some global testing set up for our project

There are two types of tests in Elixir:

1. Doc tests - where Elixir runs tests against the code examples in our ExDoc comments
2. Case tests (as found in `cards_tests.exs`) where we perform unit tests: we test facts using assertions

#### The magic of doc testing

Doc testing is super cool: Elixir will automatically parse and run tests against any example code (see the `ExDocs Comments` section above).

So you know for a fact that all of your tests and documentation examples are all working an up to date. Super cool!

Here's an example where we're testing that the contains function returns `true` for cards that are in the deck, and `false` for cards not in the deck.

```ruby
  @doc """
    Determines whether a deck contains a given card

  ## Examples

      iex> deck = Cards.create_deck
      iex> Cards.contains?(deck, "Ace of Spades")
      true
      iex> Cards.contains?(deck, "Soul Card")
      false

  """
  def contains?(deck, card) do
    Enum.member?(deck, card)
  end
```

#### Case tests

Case tests / unit tests work just as you'd expect if you've done unit tests in any other language.

For example, let's test that create_deck returns 20 cards. This should return an error because it actually returns 24:

```ruby
  test "create_deck makes 20 cards" do
    deck_length = length(Cards.create_deck)
    assert deck_length == 20
  end
```

And after running `mix test` I get this back:

```ruby
  1) test create_deck makes 20 cards (CardsTest)
     test/cards_test.exs:5
     Assertion with == failed
     code: deck_length == 20
     lhs:  24
     rhs:  20
     stacktrace:
       test/cards_test.exs:7: (test)

Finished in 0.06 seconds
3 tests, 1 failure
```

Notice how it tells us *exactly* how our test fails. We get told that our value on the left (**lhs**) was 24, but we wanted it to be 20 (**rhs**).

Now let's fix the test. Change the `assert` line to:

```ruby
assert deck_length == 24
```

And run the test again with `mix test`:

```ruby
...

Finished in 0.06 seconds
3 tests, 0 failures
```

Perfect! :)

*Fun fact*: you can use the `refute` keyword to assert that something is `false`. For example:

```ruby
  test "shuffling a deck randomizes it" do
    deck = Cards.create_deck
    assert deck != Cards.shuffle(deck)
    refute deck == Cards.shuffle(deck) # this does the same as the line above
  end
```

## Command line

- Create a 'cards' project with `mix new cards`
- Compile your project with `iex -S mix`
- To install your dependencies, run `mix deps.get`
- Generate ExDoc documentation (much like JavaDocs) using `mix docs`
- Run tests: `mix tests`

## Package Management with Mix and Hex

- Dependencies are stored in your `mix.exs` file inside the private `deps` function
- To add a dependency, add a tuple to the array in this format: `{:name, "~> version"}`
- Then run the command specified in the *Command line* section above

For example:

```ruby
  defp deps do
    [
      {:ex_doc, "~> 0.12.0"}
    ]
  end
```

## Functional Programming & Project Design

- Rather than storing state in local variables (like in OOP), we don't store any state
- Functions simply take an input and return an output
- You don't have objects; you work with primitive data types like strings, lists, etc.
- If you want to run a method against some data, you do `method(data)` *instead of* `data.method()`

## Phoenix

Phoenix