"use client";

import { Volume2, VolumeOff } from "lucide-react";
import { useState } from "react";


export default function Home() {
  const [gameOver, setGameOver] = useState(false);
  const [greenIsClicked, setGreenClicked] = useState(false);
  const [redIsClicked, setRedClicked] = useState(false);
  const [yellowIsClicked, setYellowClicked] = useState(false);
  const [blueIsClicked, setBlueClicked] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [compMoves, setCompMoves] = useState<number[]>([]);
  const [isShowingMoves, setIsShowingMoves] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [sound, setSound] = useState(false);

  // Make start button disappear once clicked
  const handleStartButton = () => {
    gameplay();
    setHideButton(true);
  }

  // Handle sound on/off
  const soundButton = () => {
    setSound(!sound);
  }

  // Restart button resets everything if game is over
  const restartButton = () => {
   setGameOver(false);
   setHideButton(false);
   setCompMoves([]);
   setIndex(0);
   setScore(0);
  }

  // Computer generates random new move and adds it to previous computer moves array
  const generateMove = () => {
    const randomChoice = Math.floor(Math.random() * 4);
    const addMove = [...compMoves, randomChoice + 1];
    setCompMoves(addMove);
    showMoves(addMove);
  }

 // Function to play tones with the specified frequency and duration
 const playTone = (frequency: number, duration: number = 300) => {
  // Use type assertion to inform TypeScript about webkitAudioContext
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.type = 'sine'; // Choose the waveform type
  oscillator.frequency.value = frequency; // Set frequency of the tone
  oscillator.start();

  // Stop the tone after the specified duration
  setTimeout(() => {
    oscillator.stop();
  }, duration);
};

// Define frequencies for each Simon game button
const tones = {
  green: 329.63,  // E4
  red: 261.63,    // C4
  yellow: 220.00, // A3
  blue: 164.81    // E3
};

  // Show the computer moves by lighting up board buttons
  const showMoves = (moves: number[]) => {
    setIsShowingMoves(true); //by setting this to true the player can't click a button until the computer is done showing moves
    let i = 0;
    const interval = setInterval(() => {
      if (i < moves.length ) {
        switch (moves[i]) {
          case 1:
            setGreenClicked(!greenIsClicked);
            if (sound) {playTone(tones.green)};
            setTimeout(() => {
              setGreenClicked(false);
            }, 200);
            break;
          case 2:
            setRedClicked(!redIsClicked);
            if (sound) {playTone(tones.red)};
            setTimeout(() => {
              setRedClicked(false);
            }, 200);
            break;
          case 3:
            setYellowClicked(!yellowIsClicked);
            if (sound) {playTone(tones.yellow)};
            setTimeout(() => {
              setYellowClicked(false);
            }, 200);
            break;
          case 4:
            setBlueClicked(!blueIsClicked);
            if (sound) {playTone(tones.blue)};
            setTimeout(() => {
              setBlueClicked(false);
            }, 200);
            break;
        }
        i++;
      } else {
        clearInterval(interval);
        setIsShowingMoves(false);
        setIndex(0);
        }
    }, 600-(10 * (moves.length < 50? moves.length : 50 ))); // Delay between moves which decreases as game progresses but quits decreasing after 50 levels
      };

  // Click handlers for when player clicks each color
  const handleClickGreen = () => {
    setGreenClicked(!greenIsClicked);
    if (sound) {playTone(tones.green)};
    setTimeout(() => {
      setGreenClicked(false);
    }, 200);
    checkPlayerMoves(compMoves, index, 1);
  };

  const handleClickRed = () => {
    setRedClicked(!redIsClicked);
    if (sound) {playTone(tones.red)};
    setTimeout(() => {
      setRedClicked(false);
    }, 200);
    checkPlayerMoves(compMoves, index, 2);
  };
  const handleClickYellow = () => {
    setYellowClicked(!yellowIsClicked);
    if (sound) {playTone(tones.yellow)};
    setTimeout(() => {
      setYellowClicked(false);
    }, 200);
    checkPlayerMoves(compMoves, index, 3);
  };
  const handleClickBlue = () => {
    setBlueClicked(!blueIsClicked);
    if (sound) {playTone(tones.blue)};
    setTimeout(() => {
      setBlueClicked(false);
    }, 200);
    checkPlayerMoves(compMoves, index, 4);
  };


  // Check if the player's move matches the computer's move at the current index
  const checkPlayerMoves = (comp: number[], ind: number, color: number) => {
    if (comp[ind] === color) {
      setScore(score + 1);
      setIndex(index + 1);
      // If it's the last element in the array call gameplay
      if (ind === comp.length - 1) {
          gameplay();
      }
  } else {
      setGameOver(true); // Game over if the player makes a mistake
      setIsShowingMoves(true); // Prevent player from pressing game buttons
  }
};

  //Computer adds another random move to its sequence and index is set back to zero
  const gameplay = () => {
      generateMove();
      setIndex(0);
  };

  return (
    <main className="relative h-screen flex flex-col items-center justify-center bg-white ">
      <div className="w-full h-[15%] flex flex-row items-center justify-center">
        <button onClick={soundButton} className="stroke-blue-600 text-blue-600 font-bold text-xl"> Click for Sound:&nbsp;{sound? <Volume2 />: <VolumeOff />}</button></div>
      <div className="relative flex flex-col w-[300px] h-[300px] md:w-[600px] md:h-[600px] border-black border-4 bg-gray-950 shadow-black shadow-lg rounded-full justify-center items-center p-9">
      <div className="flex flex-row w-[92%] h-[45%] justify-center items-center mb-5">
          <div
            onClick={() => !isShowingMoves && handleClickGreen()}
            className={`w-[50%] h-full  game-piece-top-left mr-5 ${
              greenIsClicked ? "bg-green-300 shadow-2xl shadow-green-300 scale-95" : "bg-green-700 border-4 border-green-800"}`}>
          </div>
          <div
            onClick={() => !isShowingMoves && handleClickRed()}
            className={`w-[50%] h-full  game-piece-top-right ${
              redIsClicked ? "bg-red-300 shadow-2xl shadow-red-300 scale-95" : "bg-red-700 border-4 border-red-800"}`} >
        </div>
        </div>
        <div className="flex flex-row w-[92%] h-[45%] justify-center items-center">
          <div
            onClick={() => !isShowingMoves && handleClickYellow()}
            className={`w-[50%] h-full  game-piece-bottom-left mr-5 ${
              yellowIsClicked ? "bg-yellow-200 shadow-2xl shadow-yellow-200 scale-95" : "bg-yellow-500 border-4 border-yellow-600"}`}>
          </div>
          <div
            onClick={() => !isShowingMoves && handleClickBlue()}
            className={`w-[50%] h-full  game-piece-bottom-right ${
              blueIsClicked ? "bg-blue-300 shadow-2xl shadow-blue-300 scale-95" : "bg-blue-700 border-4 border-blue-800"}`}>
          </div>
        </div>
        <div
          className="absolute flex flex-col justify-center items-center w-[100px] h-[100px] md:w-[250px] md:h-[250px] rounded-full border-black border-4 bg-gray-950">
          <h1 className="text-white text-center text-2xl"> Score:&nbsp;{score}</h1>
          {!hideButton && <button onClick={handleStartButton} className="text-red-600 text-center text-2xl">Start Game</button>}
          {gameOver ?  <button onClick={restartButton} className="text-red-600 text-center text-2xl">Restart</button> : <></> }
          </div>
      </div>
  </main>
);

};