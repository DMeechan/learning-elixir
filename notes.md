# Learning Elixir & Phoenix

## Elixir

### Styling Conventions

- You _can_ use 'single quotes', but you *should* use "double quotes" everywhere
- If a method returns a boolean, you *should* add a `?` after it, like: `def contains?(deck, card) do`. The `?` doesn't actually change anything though

### Syntax

- Functions automatically return the last value in the function without you needing to use the `return` keyword. Example which returns "hi there":

```ruby
def hello do
    "hi there"
end
```

- You can do method overloading by creating methods with the same name but a different *number* of parameters (i.e., its **arity**)

## Command line

- Create a 'cards' project with `mix new cards`
- Compile your project with `iex -S mix`

## Functional Programming & Project Design

- Rather than storing state in local variables (like in OOP), we don;t store any state
- Functions simply take an input and return an output

## Phoenix

Phoenix