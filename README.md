# Simon Game 🎮

A modern recreation of the classic Simon memory game, built with **React** and utilizing sound effects. The game generates a sequence of moves, and the player must replicate the sequence by clicking on the colored buttons. The game progressively gets faster and adds more moves as the player's score increases.

## Features 🚀

- **Interactive Gameplay**: Players click on colored buttons to match the computer-generated sequence.
- **Sound Effects**: Optional sound effects accompany each button press.
- **Responsive Design**: Fully responsive layout for various screen sizes.
- **Real-Time Feedback**: Visual and auditory cues to signal correct/incorrect moves and display the current score.
- **Restart Functionality**: Players can restart the game when they make a mistake.

## Technologies Used 🛠️

- **Next.js**: A React framework for building server-rendered applications and static websites.
- **TypeScript**: Type-safe environment for more robust code.
- **Lucide React**: Icons library used for sound toggle buttons.
- **Tailwind CSS**: Utility-first CSS framework for styling the game board and UI.
- **Web Audio API**: Used to generate tones that correspond to each button press.

## Installation 💻

1. Clone the repository:

    ```bash
    git clone https://github.com/WarrenPaschetto/simon.git
    cd simon
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

4. Open the app in your browser at `http://localhost:3000`.

## Gameplay 🎮

- **Start the Game**: Click the "Start Game" button in the center to begin. 
- **Sound Toggle**: Click the sound button at the top to enable/disable sound.
- **Gameplay**: Watch the sequence of lit buttons and repeat the sequence by clicking the correct colored buttons.
- **Increasing Difficulty**: The speed of the game increases as you progress through the levels.
- **Restart**: If you make a mistake, click the "Restart" button to try again.

## Code Overview 📂

### Main Components

1. **`Home` Component**: 
    - Contains the game logic, including the sequence generation, button click handlers, and state management.
    - Uses `useState` hooks to manage the state of the game.
    - Manages sound functionality using the Web Audio API.

2. **Key Functions**:
    - `generateMove`: Randomly generates the next move for the computer.
    - `checkPlayerMoves`: Validates the player’s input and checks if it matches the computer's sequence.
    - `playTone`: Plays a tone associated with each color button.
    - `handleClick[Color]`: Handles user clicks for each of the four colored buttons.

3. **Game Board**:
    - The board is divided into four colored sections that react to user inputs.
    - Each section has unique sound frequencies using sine waves for an immersive experience.

## How to Play 🕹️

1. Click the "Start Game" button to begin.
2. The game will display a sequence of colors. Memorize it.
3. Click the buttons in the correct sequence.
4. The game will add one new color to the sequence after each round.
5. The game ends when the user fails to replicate the sequence.

## Contributing 🤝

Contributions are welcome! If you find any bugs or have ideas for new features, feel free to open an issue or submit a pull request.

## License 📄

This project is licensed under the MIT License.
