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
            const value = window.prompt('kokonaisluku:') ?? '';
            const parsedValue = parseInt(value);
            if (Number.isNaN(parsedValue) || parsedValue < 0) {
                outputEl.innerText = `Enter a positive number`;
                return;
            }
            if (parsedValue === 0 || parsedValue === 1) {
                outputEl.innerText = `1`;
                return;
            }
            let sum = 1;
            for (let i = parsedValue; i > 0; i--) {
                sum = sum * i;
            }
            outputEl.innerText = `${sum}`;
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
            let needAGoodValue = true;
            let value = 0;
            while (needAGoodValue) {
                const promptValue = window.prompt('kokonaisluku:') ?? '';
                value = parseInt(promptValue);
                needAGoodValue = Number.isNaN(value) || value < 0;
            }
            outputEl.innerText = `${Math.sqrt(value)}`;
        };
    }
    {
        function isLeapYear(year) {
            if ((year % 100) === 0) {
                return (year % 400) === 0;
            }
            return (year % 4) === 0;
        }
        const startEl = document.querySelector('#start-section-3-button');
        const outputEl = document.querySelector('#section-3-output');
        if (!startEl) {
            throw new Error("startEl is null");
        }
        if (!outputEl) {
            throw new Error("outputEl is null");
        }
        startEl.onclick = (event) => {
            const startYearPromptValue = window.prompt('aloitusvuosi:') ?? '';
            const startYear = parseInt(startYearPromptValue);
            if (Number.isNaN(startYear) || startYear < 0) {
                outputEl.innerText = `Enter a positive number`;
                return;
            }
            const lastYearPromptValue = window.prompt('loppuvuosi:') ?? '';
            const lastYear = parseInt(lastYearPromptValue);
            if (Number.isNaN(lastYear) || lastYear < 0) {
                outputEl.innerText = `Enter a positive number`;
                return;
            }
            if (lastYear < startYear) {
                outputEl.innerText = `loppuvuosi ei voi olla pienempi kuin aloitusvuosi`;
                return;
            }
            //  Create array with length of years we need
            const listItems = new Array(lastYear - startYear)
                //  fill it with a random value to make it filled and not empty
                .fill(0)
                //  pass the index, we can use it to calculate the years after startYear
                .map((value, index) => index)
                //  map to real years
                .map((index) => startYear + index)
                //  remove years that are not leap year by returning false to filter
                .filter(isLeapYear)
                //  put each element in it's correct format
                .map((x) => `<li>${x}</li>`)
                //  connect all array items together
                .join('');
            outputEl.innerHTML = `<ul>${listItems}</ul>`;
        };
    }
    {
        function diceRandom() {
            return Math.floor(Math.random() * 6) + 1;
        }
        const startEl = document.querySelector('#start-section-4-button');
        const outputEl = document.querySelector('#section-4-output');
        if (!startEl) {
            throw new Error("startEl is null");
        }
        if (!outputEl) {
            throw new Error("outputEl is null");
        }
        startEl.onclick = (event) => {
            const diceCountPromptValue = window.prompt('arpakuutioiden m????r??:') ?? '';
            const diceCount = parseInt(diceCountPromptValue);
            if (Number.isNaN(diceCount) || diceCount < 0) {
                outputEl.innerText = `Enter a positive number`;
                return;
            }
            //  Array with length of dices we need to throw
            const diceSum = new Array(diceCount)
                //  Fill with random value so it will not be empty
                .fill(0)
                //  Throw random dice for each entry
                .map(() => diceRandom())
                //  Sum array values together
                .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
            outputEl.innerText = String(diceSum);
        };
    }
    {
        function isPrime(testCase) {
            for (let i = 2; i < testCase; i++) {
                if (testCase % i === 0) {
                    return false;
                }
            }
            return testCase > 1;
        }
        const startEl = document.querySelector('#start-section-5-button');
        const outputEl = document.querySelector('#section-5-output');
        if (!startEl) {
            throw new Error("startEl is null");
        }
        if (!outputEl) {
            throw new Error("outputEl is null");
        }
        startEl.onclick = (event) => {
            const promptValue = window.prompt('kokonaisluku:') ?? '';
            const value = parseInt(promptValue);
            if (Number.isNaN(value) || value < 0) {
                outputEl.innerText = `Enter a positive number`;
                return;
            }
            outputEl.innerText = `${isPrime(value) ? 'se on alkuluku' : 'se ei ole alkuluku'}`;
        };
    }
    {
        function diceRandom() {
            return Math.floor(Math.random() * 6) + 1;
        }
        const startEl = document.querySelector('#start-section-6-button');
        const outputEl = document.querySelector('#section-6-output');
        if (!startEl) {
            throw new Error("startEl is null");
        }
        if (!outputEl) {
            throw new Error("outputEl is null");
        }
        startEl.onclick = (event) => {
            const diceThrowCountPromptValue = window.prompt('arpakuutioiden lukum????r??:') ?? '';
            const diceThrowCount = parseInt(diceThrowCountPromptValue);
            if (Number.isNaN(diceThrowCount) || diceThrowCount < 0) {
                outputEl.innerText = `Enter a positive number`;
                return;
            }
            const selectedNumberPromptValue = window.prompt('kiinnostavan silm??lukujen summa:') ?? '';
            const selectedNumber = parseInt(selectedNumberPromptValue);
            if (Number.isNaN(selectedNumber) || selectedNumber < 0) {
                outputEl.innerText = `Enter a positive number`;
                return;
            }
            const dicePossibilities = [1, 2, 3, 4, 5, 6];
            //  Create an array with length = diceThrow - 1 because reduce function has a staring point
            const output = new Array(diceThrowCount - 1)
                //  Fill it with dice possibility array so we can calculate all possibilities
                .fill(dicePossibilities)
                .reduce((prev, curr) => {
                const output = [];
                for (let i of prev) {
                    for (let j of curr) {
                        output.push(`${i} ${j}`);
                    }
                }
                return output;
            }, dicePossibilities.map(x => `${x}`));
            //  convert back from string to number '6 6 6' => [6, 6, 6]
            const parsedOutput = output
                .map((x) => x.split(' ').map((x) => parseInt(x)));
            console.log({ parsedOutput });
            const possibilityCount = parsedOutput.length;
            //  calculate each possibility sum value
            const summedOutput = parsedOutput
                .map((x) => x.reduce((prev, curr) => prev + curr, 0));
            //  No need to sort. It's just for convenience
            const sortedSummedOutput = summedOutput
                .sort((a, b) => a - b);
            //  Let's see how rare is selected number
            const selectedNumberCount = sortedSummedOutput
                .filter((x) => x === selectedNumber).length;
            //  calculate the rareness percentage
            const probability = (selectedNumberCount * 100) / possibilityCount;
            const diceThrow = new Array(diceThrowCount)
                .fill(diceRandom())
                .reduce(((previousValue, currentValue) => previousValue + currentValue), 0);
            outputEl.innerText = [
                `arpakuutioiden lukum????r??: ${diceThrowCount}`,
                `kiinnostavan silm??lukujen summa: ${selectedNumber}`,
                `todenn??k??isyys: ${Math.trunc(probability * 1000) / 1000} %`,
                `heitettyjen noppien summa: ${diceThrow}`,
                `${diceThrow === selectedNumber ? 'onnittelut, voitit!' : 'yrit?? uudelleen ensi kerralla'}`
            ].join('\n');
        };
    }
    {
        function randomBingo(digit) {
            const allPossibles = [
                (4 * digit) - 3,
                (4 * digit) - 2,
                (4 * digit) - 1,
                (4 * digit)
            ];
            const randomSelector = Math.floor(Math.random() * 4);
            return allPossibles[randomSelector];
        }
        const startEl = document.querySelector('#start-section-7-button');
        const outputEl = document.querySelector('#section-7-output');
        const bingoSquares = document.querySelectorAll('.bingo-square');
        if (!startEl) {
            throw new Error("startEl is null");
        }
        if (!outputEl) {
            throw new Error("outputEl is null");
        }
        if (!bingoSquares || bingoSquares.length !== 25) {
            throw new Error("bingoSquares is null");
        }
        startEl.onclick = (event) => {
            bingoSquares.forEach((node, index) => {
                node.innerText = String(randomBingo(index + 1));
            });
        };
    }
});
