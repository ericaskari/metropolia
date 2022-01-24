document.addEventListener("DOMContentLoaded", () => {
    console.log('DOMContentLoaded');

    {

        const startEl = document.querySelector<HTMLButtonElement>('#start-section-1-button');
        const outputEl = document.querySelector<HTMLSpanElement>('#section-1-output');

        if (!startEl) {
            throw new Error("startEl is null");
        }

        if (!outputEl) {
            throw new Error("outputEl is null");
        }


        function printAsLiter(gallons: number): void {
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

        function gallonToLiter(gallons: number): number {
            if (Number.isNaN(gallons)) {
                throw new Error('number expected');
            }

            return gallons * 3785;
        }

        const startEl = document.querySelector<HTMLButtonElement>('#start-section-2-button');
        const outputEl = document.querySelector<HTMLSpanElement>('#section-2-output');

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

        function absoluteValue(value: number): number {
            return Math.abs(value);
        }

        const startEl = document.querySelector<HTMLButtonElement>('#start-section-3-button');
        const outputEl = document.querySelector<HTMLSpanElement>('#section-3-output');

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
        const startEl = document.querySelector<HTMLButtonElement>('#start-section-4-button');
        const outputEl = document.querySelector<HTMLSpanElement>('#section-4-output');

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
        function attachStrings(...names: string[]) {
            return names.join('');
        }

        const startEl = document.querySelector<HTMLButtonElement>('#start-section-5-button');
        const outputEl = document.querySelector<HTMLSpanElement>('#section-5-output');

        if (!startEl) {
            throw new Error("startEl is null");
        }

        if (!outputEl) {
            throw new Error("outputEl is null");
        }

        startEl.onclick = (event) => {
            const strings: string[] = new Array(3)
                .fill('')
                .map((x, index) => window.prompt(`nimi ${index + 1}/3`) ?? '');

            outputEl.innerText = `${attachStrings(...strings)}`;
        };
    }

    {
        function logAdditiveInverse(...numbers: number[]): void {
            numbers.map(x => x * -1).map(x => console.log(x));
        }

        const startEl = document.querySelector<HTMLButtonElement>('#start-section-6-button');
        const outputEl = document.querySelector<HTMLSpanElement>('#section-6-output');

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
        function filterOutOddNumbers(...numbers: number[]): number[] {
            return numbers.filter((value, index) => value % 2 === 0);
        }

        const startEl = document.querySelector<HTMLButtonElement>('#start-section-7-button');
        const outputEl = document.querySelector<HTMLSpanElement>('#section-7-output');

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
        function fibonacci(total: number, currentIteration: number = 0, lastValue: number[] = [1, 1]): number[] {
            if (currentIteration === total) {
                return lastValue;
            }

            const newValue: number[] = [...lastValue, lastValue[lastValue.length - 1] + lastValue[lastValue.length - 2]];

            return (fibonacci(total, currentIteration + 1, newValue));
        }

        const startEl = document.querySelector<HTMLButtonElement>('#start-section-8-button');
        const outputEl = document.querySelector<HTMLSpanElement>('#section-8-output');

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
        const fibonacci = (total: number, currentIteration: number = 0, lastValue: number[] = [1, 1]): number[] => {
            if (currentIteration === total) {
                return lastValue;
            }

            const newValue: number[] = [...lastValue, lastValue[lastValue.length - 1] + lastValue[lastValue.length - 2]];

            return (fibonacci(total, currentIteration + 1, newValue));
        };

        const startEl = document.querySelector<HTMLButtonElement>('#start-section-9-button');
        const outputEl = document.querySelector<HTMLSpanElement>('#section-9-output');

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
