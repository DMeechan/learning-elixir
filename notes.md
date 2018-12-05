# Learning Elixir & Phoenix

## Elixir

### Styling Conventions

- You _can_ use 'single quotes', but you *should* use "double quotes" everywhere
- If a method returns a boolean, you *should* add a `?` after it, like: `def contains?(deck, card) do`. The `?` doesn't actually change anything though

### Pattern Matching

- To extract values from a tuple: { hand, rest_of_deck } = split_deck
- => where `split_deck = { [hand], [rest of deck] }`

### Standard library

#### Enum

- `Enum.member?(list, value)` to check if a value exists in enumnerable data
- `Enum.split(array, number_of_values)` to extract some values from an array and return a tuple: {[my hand], [rest of the deck]}

#### String & List

- `String.contains?("my name is", "name")` to check if a string contains a substring
- `String.contains?("my name is", ["name", "elixir"])` returns true - it checks if a string contains any substring in a list
- `List.flatten(list)` to flatten a nested list of lists

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