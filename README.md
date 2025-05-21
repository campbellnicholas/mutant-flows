# Mutant: Year Zero Dice Roller

A React-based dice roller for the Mutant: Year Zero tabletop roleplaying game. This application provides a digital interface for rolling the game's unique dice system, which uses green, yellow, and black dice to determine successes, failures, and gear damage.

## Features

- Roll combinations of green, yellow, and black dice
- Automatic calculation of successes, failures, and broken gear
- Push mechanic for re-rolling non-success dice
- Roll history with session persistence
- Descriptive labels for rolls
- Visual feedback for dice results
- Responsive design

## Dice System

- **Green Dice**: Base dice
  - 6: Success
  - 1: Failure
- **Yellow Dice**: Skill dice
  - 5-6: Success
  - 1: Failure
- **Black Dice**: Gear dice
  - 5-6: Success
  - 1: Failure + Broken Gear

## Usage

1. Select the number of dice you want to roll
2. (Optional) Add a description for your roll
3. Click "Roll" to roll the dice
4. If desired, use the "Push" button to re-roll non-success dice
5. View your roll history below
6. Clear history using the "Clear History" button when needed

## Technical Details

- Built with React + TypeScript + Vite
- Uses sessionStorage for roll history persistence
- Styled with CSS modules
- Fully responsive design
- Accessible UI components

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## License

BSD 2-Clause License

Copyright (c) 2025, Nick Campbell

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
