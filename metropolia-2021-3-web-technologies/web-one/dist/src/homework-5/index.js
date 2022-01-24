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
        function printAsLiter(gallons) {
            if (Number.isNaN(gallons)) {
                throw new Error('number expected');
            }
            if (!outputEl) {
                throw new Error("outputEl is null");
            }
            outputEl.innerText = `${gallons * 3785}`;
        }
        startEl.onclick = (event) => {
            const value = window.prompt(`gallona:`) ?? '';
            const parsed = parseInt(value);
            if (Number.isNaN(parsed) || parsed < 0) {
                outputEl.innerText = `Enter a positive number`;
                return;
            }
            printAsLiter(parsed);
        };
    }
    {
        function gallonToLiter(gallons) {
            if (Number.isNaN(gallons)) {
                throw new Error('number expected');
            }
            return gallons * 3785;
        }
        const startEl = document.querySelector('#start-section-2-button');
        const outputEl = document.querySelector('#section-2-output');
        if (!startEl) {
            throw new Error("startEl is null");
        }
        if (!outputEl) {
            throw new Error("outputEl is null");
        }
        startEl.onclick = (event) => {
            const value = window.prompt(`gallona:`) ?? '';
            const parsed = parseInt(value);
            if (Number.isNaN(parsed) || parsed < 0) {
                outputEl.innerText = `Enter a positive number`;
                return;
            }
            outputEl.innerText = `${gallonToLiter(parsed)}`;
        };
    }
    {
        function absoluteValue(value) {
            return Math.abs(value);
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
            const value = window.prompt(`kokonaisluku:`) ?? '';
            const parsed = parseInt(value);
            if (Number.isNaN(parsed)) {
                outputEl.innerText = `Enter a number`;
                return;
            }
            outputEl.innerText = `${absoluteValue(parsed)}`;
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
            const biggestInput = new Array(3)
                .fill(0)
                .map((x, index) => window.prompt(`kokonaisluku ${index + 1}/3`))
                .map(x => parseInt(x || ''))
                .filter(x => !Number.isNaN(x))
                .reduce(((previousValue, currentValue) => Math.max(previousValue, currentValue)));
            outputEl.innerText = `${biggestInput}`;
        };
    }
    {
        function attachStrings(...names) {
            return names.join('');
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
            const strings = new Array(3)
                .fill('')
                .map((x, index) => window.prompt(`nimi ${index + 1}/3`) ?? '');
            outputEl.innerText = `${attachStrings(...strings)}`;
        };
    }
    {
        function logAdditiveInverse(...numbers) {
            numbers.map(x => x * -1).map(x => console.log(x));
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
            const numbers = new Array(3)
                .fill(0)
                .map((x, index) => window.prompt(`kokonaisluku ${index + 1}/3`))
                .map(x => parseInt(x || ''))
                .filter(x => !Number.isNaN(x));
            logAdditiveInverse(...numbers);
        };
    }
    {
        function filterOutOddNumbers(...numbers) {
            return numbers.filter((value, index) => value % 2 === 0);
        }
        const startEl = document.querySelector('#start-section-7-button');
        const outputEl = document.querySelector('#section-7-output');
        if (!startEl) {
            throw new Error("startEl is null");
        }
        if (!outputEl) {
            throw new Error("outputEl is null");
        }
        startEl.onclick = (event) => {
            const numbers = new Array(3)
                .fill(0)
                .map((x, index) => window.prompt(`kokonaisluku ${index + 1}/3`))
                .map(x => parseInt(x || ''))
                .filter(x => !Number.isNaN(x));
            outputEl.innerText = `${filterOutOddNumbers(...numbers).join(' ja ')}`;
        };
    }
    {
        function fibonacci(total, currentIteration = 0, lastValue = [1, 1]) {
            if (currentIteration === total) {
                return lastValue;
            }
            const newValue = [...lastValue, lastValue[lastValue.length - 1] + lastValue[lastValue.length - 2]];
            return (fibonacci(total, currentIteration + 1, newValue));
        }
        const startEl = document.querySelector('#start-section-8-button');
        const outputEl = document.querySelector('#section-8-output');
        if (!startEl) {
            throw new Error("startEl is null");
        }
        if (!outputEl) {
            throw new Error("outputEl is null");
        }
        startEl.onclick = (event) => {
            const value = window.prompt(`kokonaisluku:`) ?? '';
            const parsed = parseInt(value);
            if (Number.isNaN(parsed) || parsed < 0) {
                outputEl.innerText = `Enter a positive number`;
                return;
            }
            outputEl.innerText = `${fibonacci(parsed).join(', ')}`;
        };
    }
    {
        const fibonacci = (total, currentIteration = 0, lastValue = [1, 1]) => {
            if (currentIteration === total) {
                return lastValue;
            }
            const newValue = [...lastValue, lastValue[lastValue.length - 1] + lastValue[lastValue.length - 2]];
            return (fibonacci(total, currentIteration + 1, newValue));
        };
        const startEl = document.querySelector('#start-section-9-button');
        const outputEl = document.querySelector('#section-9-output');
        if (!startEl) {
            throw new Error("startEl is null");
        }
        if (!outputEl) {
            throw new Error("outputEl is null");
        }
        startEl.onclick = (event) => {
            const value = window.prompt(`kuinka monta Fibonaccin kokonaislukuja tarvitsette:`) ?? '';
            const parsed = parseInt(value);
            if (Number.isNaN(parsed) || parsed < 0) {
                outputEl.innerText = `Enter a positive number`;
                return;
            }
            outputEl.innerText = `${fibonacci(parsed).join(', ')}`;
        };
    }
});
