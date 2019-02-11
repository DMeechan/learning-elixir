How do you iterate through iterable stuff (like arrays or strings) in JavaScript?

---

```javascript
for (let value of array) {
    console.log(value);
}
```

===

How do you iterate through objects in JavaScript?

---

```javascript
for (let key in object) {
    const value = object[key];
}
```

===

How do you reverse a string?

---

```javascript
string
    .split('')
    .reverse()
    .join('');
```

===

How do you get a character from a string?

---

```javascript
// apple
word.charAt(0) // returns a
```

===

How do you get a segment of an array or string?

---

`array.slice` returns a copy of the array (or string) segment; it does not mutate the original array

```javascript
array = [1, 2, 3, 4, 5]
array.slice(1, 3) // returns [2, 3]
```

===

How do you insert something (or multiple things) inside an array?

---

`array.splice(index, num_to_remove, ...items)` mutates the original array and will `add` and / or `remove` items

```javascript
let array = [1, 2, 3, 4, 5]

array.splice(2, 0, "dog", "ate", 550, "fish")

array === [1, 2, "dog", "ate", 550, "fish", 3, 4, 5]
```

===

How do you remove (or replace) something(s) in an array?

---

`array.splice(index, num_to_remove, ...items)` mutates the original array and will `add` and / or `remove` items

```javascript
let array = [1, 2, "dog", "ate", 550, "fish", 3, 4, 5]

array.splice(2, 1, "cat")

array === [1, 2, "cat", "ate", 550, "fish", 3, 4, 5]
```

===

How can you divide a string into substrings (or even an array if you're a madman)?

---

`array.split(separator, limit)` takes a string, splits it up by the `separator` character(s) and then returns an array of the new split strings

Both paramaters are **optional**

```javascript
const names = 'adam, bob, charlie, daisie, echo';

names.split()
// returns ["adam, bob, charlie, daisie, echo"]

names.split(', ')
// returns ["adam", "bob", "charlie", "daisie", "echo"]

names.split(', ', 3)
// returns ["adam", "bob", "charlie"]

```