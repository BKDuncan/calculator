### Seng 513 Assignment 2 - Calculator

## Features
### Calculations
- Add, Multiply, Subtract, and Divide: (`1 x 2`)
- Decimal calculations: (`1.2 + 7.555`)
- Chaining Calculations: (`1 + 2 + 3 - 5 x 6`)
- Brackets to enforce order of operations: `(1 + 2) x 3`
- Division by zero: `1 / 0 = Infinity`
- Simple infinity operations: `Infinity + 1 = Infinity`
- Error detection: `2.0.3 = ERROR`

### User Friendliness
- Fully resizeable from 600px wide (rubric requirement) all the way down to `60 x 60` pixels!
- Mobile-friendly for both **portrait** and **landscape** views
- `CE` key for backspace operation
- `C` key for clear operation
- Can reuse answer in the next calculation: `1 x 2 = 2` => `x 2 = 4`
- Starting with a number key ignores previous answers and doesn't reuse it: `1 + 1 = 2` => `3 + 5 = 8`
- Error continuation (hitting a new key clears error states)
- Ignore duplicates if the user hits an operation, decimal or equals sign multiple times in a row: `1 x x 5` => `1 x 5`
- Overwrite operations if a different one is hit consecutively: `2 x - + 5` => `2 + 5`
- Brackets to do implicit multiplication: `(1)(-2)((3)(4))2` => `1 x (-2) x (3 x 4) x 2`
- Avoid errors by automatically padding zeroes when trailing zeroes are missing in a decimal number: `1.2 x 1. + .5` => `1.2 x 1.0 + .5`
- Displays last calculation or previous answer above the current calculation
- Calculation is scrollable when it overflows on mobile and web