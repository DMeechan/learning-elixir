# Learning Elixir & Phoenix

## Elixir

Elixir code gets transpiled into Erlang, which is then compiled and executed on the BEAM *(Bogdan's Erlang Abstract Machine)*.

Not all of Erlang's functionality has been implemented in Elixir, so for some things (like managing the file system), we might need to write a little bit of Erlang.

### Styling Conventions

- Use **underscores** instead of camelCase - like `create_hand` or `binary_to_term`
- You _can_ use 'single quotes', but you *should* use "double quotes" everywhere
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

- Functions automatically return the last value in the function without you needing to use the `return` keyword. Example which returns "hi there":

```ruby
def hello do
    "hi there"
end
```

- Iterate (perform a **comprehension**) through items in a list with the arrow syntax:

```ruby
for suit <- suits do
    suit
end
```

- When you do a **comprehension**, you're mapping each of the values and returning a new array. So the code above is similar to doing `return suit.map(suit -> suit)` in JS
- You can do method overloading by creating methods with the same name but a different *number* of parameters (i.e., its **arity**)
- Nested list comprehensions (nested loops) might not be the best idea if you need to iterate through two lists because it will return a list of lists, not a flat list of values
- Instead of nesting lists comprehensions, you can (should?) iterate through them together in a single comprehension:

```ruby
for suit <- suits, value <- values do
    "#{value} of #{suit}"
end
```

- Lists are written with square brackets: [1, 2, 3] or ["Apple", "Pear"]
- Tuples are written with curly brackets: {1, 2}
- An **atom** (or **symbol**) is like an enum in Java. They are atomic units that you can compare values against (like Strings). For example, a file read operation might return the status `:ok` or `:error`. Those are symbols / atoms.

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

## Command line

- Create a 'cards' project with `mix new cards`
- Compile your project with `iex -S mix`

## Functional Programming & Project Design

- Rather than storing state in local variables (like in OOP), we don;t store any state
- Functions simply take an input and return an output
- You don't have objects; you work with primitive data types like Strings, lists, etc.
- If you want to run a method against some data, you do `method(data)` *instead of* `data.method()`

## Phoenix

Phoenix