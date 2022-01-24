"use strict";
document.addEventListener("DOMContentLoaded", () => {
    console.log('DOMContentLoaded');
    {
        const startEl = document.querySelector('#start-section-1-button');
        const outputEl = document.querySelector('#section-1-output');
        if (!startEl) {
            throw new Error("startEl is null");
        }
        if (!outputEl) {
            throw new Error("outputEl is null");
        }
        startEl.onclick = (event) => {
            const data = new Array(5)
                .fill('')
                .map((x, index) => {
                const value = window.prompt(`kokonaisluku ${index}:`) ?? '';
                const parsed = parseInt(value);
                if (Number.isNaN(parsed) || parsed < 0) {
                    outputEl.innerText = `Enter a positive number`;
                    return;
                }
                return parsed;
            });
            outputEl.innerText = `${data.reverse().join(' ')}`;
        };
    }
    {
        const startEl = document.querySelector('#start-section-2-button');
        const outputEl = document.querySelector('#section-2-output');
        if (!startEl) {
            throw new Error("startEl is null");
        }
        if (!outputEl) {
            throw new Error("outputEl is null");
        }
        startEl.onclick = (event) => {
            const value1 = window.prompt('osallistujien määrä:') ?? '';
            const parsedValue1 = parseInt(value1);
            if (Number.isNaN(parsedValue1) || parsedValue1 < 0) {
                outputEl.innerText = `Enter a positive number`;
                return;
            }
            const guests = new Array(parsedValue1).fill('').map((_, index) => {
                return window.prompt(`osallistujan ${index + 1}`) ?? '-';
            });
            console.log(guests);
            outputEl.innerText = guests.join('\n');
        };
    }
    {
        const startEl = document.querySelector('#start-section-3-button');
        const outputEl = document.querySelector('#section-3-output');
        if (!startEl) {
            throw new Error("startEl is null");
        }
        if (!outputEl) {
            throw new Error("outputEl is null");
        }
        startEl.onclick = (event) => {
            const guests = new Array(6)
                .fill('')
                .map((_, index) => window.prompt(`koiran nimi ${index + 1}:`) ?? '')
                .map(x => `<li>${x}</li>`);
            outputEl.innerHTML = `<ul>${guests.join('\n')}</ul>`;
        };
    }
    {
        const startEl = document.querySelector('#start-section-4-button');
        const outputEl = document.querySelector('#section-4-output');
        if (!startEl) {
            throw new Error("startEl is null");
        }
        if (!outputEl) {
            throw new Error("outputEl is null");
        }
        startEl.onclick = (event) => {
            const list = [];
            do {
                const value = window.prompt('luku:') ?? '';
                const parsedValue = parseInt(value);
                if (Number.isNaN(parsedValue) || parsedValue < 0) {
                    outputEl.innerText = `Enter a positive number`;
                    return;
                }
                list.push(parsedValue);
            } while (list[list.length - 1] !== 0);
            const sorted = list.filter(x => x !== 0).sort((a, b) => b - a);
            outputEl.innerText = `${sorted.join(' ')}`;
        };
    }
    {
        const startEl = document.querySelector('#start-section-5-button');
        const outputEl = document.querySelector('#section-5-output');
        if (!startEl) {
            throw new Error("startEl is null");
        }
        if (!outputEl) {
            throw new Error("outputEl is null");
        }
        startEl.onclick = (event) => {
            const list = [];
            do {
                const value = window.prompt('luku:') ?? '';
                const parsedValue = parseInt(value);
                if (Number.isNaN(parsedValue) || parsedValue < 0) {
                    outputEl.innerText = `Enter a positive number`;
                    return;
                }
                list.push(parsedValue);
            } while (list.filter(x => x === list[list.length - 1]).length <= 1);
            outputEl.innerText = `luku on jo annettu`;
        };
    }
    {
        const startEl = document.querySelector('#start-section-6-button');
        const outputEl = document.querySelector('#section-6-output');
        if (!startEl) {
            throw new Error("startEl is null");
        }
        if (!outputEl) {
            throw new Error("outputEl is null");
        }
        startEl.onclick = (event) => {
            const list = [];
            do {
                const value = window.prompt('luku:') ?? '';
                const parsedValue = parseInt(value);
                if (Number.isNaN(parsedValue) || parsedValue < 0) {
                    outputEl.innerText = `Enter a positive number`;
                    return;
                }
                list.push(parsedValue);
            } while (list[list.length - 1] !== 0);
            const filtered = list.filter(x => x !== 0);
            const isEven = filtered.length % 2 === 0; // 1 2 3 4 5 6 => 3 + 4
            // 1 2 3 4 5 => 3
            // 1 2 3 4 5 6 7 8 9 => 5
            if (isEven) {
                const median = filtered[filtered.length / 2] + filtered[(filtered.length / 2) - 1];
                outputEl.innerText = `${median}`;
                return;
            }
            const median = filtered[Math.trunc(filtered.length / 2)];
            outputEl.innerText = `${median}`;
            return;
        };
    }
    {
        const startEl = document.querySelector('#start-section-7-button');
        const outputEl = document.querySelector('#section-7-output');
        if (!startEl) {
            throw new Error("startEl is null");
        }
        if (!outputEl) {
            throw new Error("outputEl is null");
        }
        startEl.onclick = (event) => {
            const value = window.prompt('äänestäjien lukumäärä:') ?? '';
            const participants = parseInt(value);
            if (Number.isNaN(participants) || participants < 0) {
                outputEl.innerText = `Enter a positive number`;
                return;
            }
            const participantsVoting = new Array(participants).fill(0);
            participantsVoting.forEach((_, index) => {
                const value = window.prompt(`äänestäjä(${index + 1}): (1-${participantsVoting.length}):`) ?? '';
                const vote = parseInt(value);
                if (Number.isNaN(vote) || vote < 1 || vote > participantsVoting.length) {
                    return;
                }
                participantsVoting[vote - 1] = participantsVoting[vote - 1] + 1;
            });
            const winner = participantsVoting.reduce(((previousValue, currentValue) => Math.max(previousValue, currentValue)), 0);
            outputEl.innerText = `winner: ${participantsVoting.indexOf(winner) + 1}`;
        };
    }
});
