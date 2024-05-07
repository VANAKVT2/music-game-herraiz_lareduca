import React, { useEffect, useState } from 'react';
import VirtualKeyboard from './VirtualKeyboard';

const MusicGame = () => {
    const [sequence, setSequence] = useState([]);
    const [userInput, setUserInput] = useState([]);
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);

    const keyMap = {
        'A': 'C',
        'W': 'C#',
        'S': 'D',
        'E': 'D#',
        'D': 'E',
        'F': 'F',
        'T': 'F#',
        'G': 'G',
        'Y': 'G#',
        'H': 'A',
        'U': 'A#',
        'J': 'B',
        'K': 'C2'
    };

    const getKeyFromNote = (note) => {
        return Object.keys(keyMap).find((key) => keyMap[key] === note);
    }

    useEffect(() => {
        generateSequence();
    }, []);

    const generateSequence = () => {
        const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C2', 'C#', 'D#', 'F#', 'G#', 'A#'];
        const newSequence = [];
        for (let i = 0; i < Math.floor(Math.random() * (12 - 4 + 1) + 4); i++) {
            newSequence.push(notes[Math.floor(Math.random() * notes.length)]);
        }
        setSequence(newSequence);
        setUserInput([]);
    };

    const generateKeyboardSequence = () => {
        return sequence.map((note) => getKeyFromNote(note));
    }
    const handleUserInput = (note) => {
        const updatedUserInput = [...userInput, note];
        setUserInput(updatedUserInput);

        if (updatedUserInput[updatedUserInput.length - 1] === sequence[updatedUserInput.length - 1]) {
            console.log("correcto");
        } else {
            console.log("incorrecto");
            setUserInput([]);
            setScore(0);
        }

        if (updatedUserInput.length === sequence.length) {
            if (updatedUserInput.every((note, index) => note === sequence[index])) {
                setScore(score + 1);
                generateSequence();
                generateKeyboardSequence();
                if (score + 1 > maxScore) {
                    setMaxScore(score + 1);

                }
            }
        }

        console.log(updatedUserInput, sequence);
    };

    return (
        <div className="music-game">
            <h1>Music Game</h1>
            <div className="sequence">
                {sequence.map((note, index) => (
                    <span
                        key={index}
                        className={
                            userInput[index] && userInput[index] === note ? 'correct' : ''
                        }
                    >
                        {note}{' '}
                    </span>
                ))}
            </div>
            <div className="keyboard-sequence" >
                {generateKeyboardSequence().map((key, index) => (
                    <span key={index} className={userInput[index] && userInput[index] === key ? 'correct text-xl font tracking-[0.6em]' : 'text-xl font tracking-[0.6em]'}>
                        {key}
                    </span>
                ))}
            </div>

            {((maxScore == score) && score != 0) && <div className="score">YOU ARE CURRENTLY MARKING THE MAX SCORE LESSGOU  </div>}
            <div className='flex text-center scores'>
                <div className="score">Max score: {maxScore}</div>
                <div className="score">Score: {score}</div>
            </div>
            <hr className='w-1/2 bar' />
            <VirtualKeyboard onUserInput={handleUserInput} />
        </div >
    );
};

export default MusicGame;