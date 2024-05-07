import React, { useEffect } from 'react';
import * as Tone from 'tone';

const synth = new Tone.Synth().toDestination();

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

const VirtualKeyboard = ({ onUserInput }) => {

    const playNote = (note) => {
        Tone.start();
        document.querySelector('button').focus();
        if (note !== 'C2' && note !== 'C#2') {
            synth.triggerAttackRelease(note + '4', '0.5');
        } else if (note === 'C2') {
            synth.triggerAttackRelease('C5', '0.5');
        } else {
            synth.triggerAttackRelease('C#5', '0.5');
        }
        onUserInput(note);
        document.querySelector('button').blur();
    };

    const handleKeyDown = (event) => {
        const key = event.key.toUpperCase();
        const note = getNoteFromKey(key);
        const buttons = document.querySelectorAll('button');
        buttons.forEach((button) => {
            if (button.id === note) {
                button.click();
                button.classList.add('button_key');
                document.addEventListener('keyup', () => {
                    button.classList.remove('button_key');
                });
            }
        });
    };

    const getNoteFromKey = (key) => {
        return keyMap[key];
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const getKeyFromNote = (note) => {
        for (const key in keyMap) {
            if (keyMap[key] === note) {
                return key;
            }
        }
        return null;
    };

    return (
        <div className="virtual-keyboard flex justify-center mt-8">
            <div className="relative flex">
                {['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C2', 'C#', 'D#', 'F#', 'G#', 'A#'].map((note, index) => (
                    <button
                        key={index}
                        id={note}
                        onClick={() => playNote(note)}
                        className={`border-2 border-gray-400 rounded-b-md 
                        ${note === 'C' ||
                                note === 'D' ||
                                note === 'E' ||
                                note === 'F' ||
                                note === 'G' ||
                                note === 'A' ||
                                note === 'B' ||
                                note === 'C2'
                                ? 'bg-white w-20 h-96'
                                : 'bg-black text-white absolute top-0 h-44 w-16 shadow-xl'
                            } ${note === 'C#'
                                ? 'left-[47.5px]'
                                : note === 'D#'
                                    ? 'left-[127.5px]'
                                    : note === 'F#'
                                        ? 'left-[287.5px]'
                                        : note === 'G#'
                                            ? 'left-[367.5px]'
                                            : note === 'A#'
                                                ? 'left-[447.5px]'
                                                : note === 'B#'
                                                    ? 'left-[850px]'
                                                    : ''
                            }`}>
                        {note} || <span className='text-red-500'>{getKeyFromNote(note)}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default VirtualKeyboard;