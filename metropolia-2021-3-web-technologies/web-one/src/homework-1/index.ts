{
    const wait = (ms: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    };

    async function randomDelay() {
        const delay = Math.trunc(Math.random() * 100);
        await wait(delay);
    }

    function randomNumberBetweenZeroAndNine() {
        return Math.trunc(Math.random() * 10);
    }

    function randomNumberBetweenOneAndSix() {
        return Math.trunc((Math.random() * 6) + 1);
    }

    function section2() {
        const startSectionTwoButton = document.querySelector<HTMLButtonElement>('#start-section-2-button');
        const nameOutputEl = document.querySelector<HTMLSpanElement>('#name-output');

        if (!startSectionTwoButton) {
            throw new Error("startSectionTwoButton is null");
        }

        if (!nameOutputEl) {
            throw new Error("nameOutputEl is null");
        }

        startSectionTwoButton.onclick = (event) => {
            const value = window.prompt('Nimi');

            if (!value) {
                nameOutputEl.innerText = `Enter your name`;
                return;
            }

            nameOutputEl.innerText = `Hei, ${value}`;
        };
    }

    function section3() {
        const startSectionThreeButton = document.querySelector<HTMLButtonElement>('#start-section-3-button');

        const circleAreaOutputEl: HTMLElement | null = document.querySelector<HTMLSpanElement>('#circle-area-output');

        if (!circleAreaOutputEl) {
            throw new Error("circleAreaOutputEl is null");
        }

        if (!startSectionThreeButton) {
            throw new Error("startSectionThreeButton is null");
        }

        startSectionThreeButton.onclick = (event: any) => {
            const value = window.prompt('ympyrän säte:');

            if (!value) {
                circleAreaOutputEl.innerText = 'Please enter a number';
                return;
            }

            const radius = parseFloat(value);

            if (Number.isNaN(radius)) {
                circleAreaOutputEl.innerText = 'Please enter a number';
                return;
            }

            circleAreaOutputEl.innerText = `Pinta-ala: ${Math.PI * radius * radius}`;
        };
    }

    function section4() {
        const startSectionThreeButton = document.querySelector<HTMLButtonElement>('#start-section-4-button');
        const rectangleCircuitOutputEL = document.querySelector<HTMLSpanElement>('#rectangle-circuit-output');
        const rectangleAreaOutputEL = document.querySelector<HTMLSpanElement>('#rectangle-area-output');

        if (!rectangleCircuitOutputEL) {
            throw new Error("rectangleCircuitOutputEL is null");
        }

        if (!rectangleAreaOutputEL) {
            throw new Error("rectangleAreaOutputEL is null");
        }

        if (!startSectionThreeButton) {
            throw new Error("startSectionThreeButton is null");
        }

        startSectionThreeButton.onclick = () => {
            const width = window.prompt('Suorakulmion kanta:') ?? '';
            const height = window.prompt('Suorakulmion korkeus:') ?? '';

            const parsedWidth = parseFloat(width);
            const parsedHeight = parseFloat(height);

            if (Number.isNaN(parsedWidth) || Number.isNaN(parsedHeight)) {
                rectangleCircuitOutputEL.innerText = 'Please enter a number for width and height';
                rectangleAreaOutputEL.innerText = '';
                return;
            }

            rectangleCircuitOutputEL.innerText = `Suorakulmion piiri: ${(parsedWidth * 2) + (parsedHeight * 2)}`;
            rectangleAreaOutputEL.innerText = `pinta-ala: ${parsedWidth * parsedHeight}`;
        };
    }

    function section5() {
        const startSectionThreeButton = document.querySelector<HTMLButtonElement>('#start-section-5-button');

        const sumOutputEl = document.querySelector<HTMLSpanElement>('#section-5-sum-output');
        const multiplicationOutputEl = document.querySelector<HTMLSpanElement>('#section-5-tulo-output');
        const averageOutputEl = document.querySelector<HTMLSpanElement>('#section-5-keskiarvo-output');

        if (!sumOutputEl) {
            throw new Error("sumOutputEl is null");
        }

        if (!multiplicationOutputEl) {
            throw new Error("multiplicationOutputEl is null");
        }

        if (!averageOutputEl) {
            throw new Error("averageOutputEl is null");
        }

        if (!startSectionThreeButton) {
            throw new Error("startSectionThreeButton is null");
        }

        startSectionThreeButton.onclick = () => {
            const unParsedDigit1 = window.prompt('Kokonaisluku 1') ?? '';
            const unParsedDigit2 = window.prompt('Kokonaisluku 2') ?? '';
            const unParsedDigit3 = window.prompt('Kokonaisluku 3') ?? '';

            const digit1 = parseInt(unParsedDigit1);
            const digit2 = parseInt(unParsedDigit2);
            const digit3 = parseInt(unParsedDigit3);

            if (Number.isNaN(digit1) || Number.isNaN(digit2) || Number.isNaN(digit3)) {
                sumOutputEl.innerText = 'Please enter a number for all three inputs';
                multiplicationOutputEl.innerText = '';
                averageOutputEl.innerText = '';
                return;
            }

            sumOutputEl.innerText = `lukujen summa: ${digit1 + digit2 + digit3}`;
            multiplicationOutputEl.innerText = `lukujen tulo: ${digit1 * digit2 * digit3}`;
            averageOutputEl.innerText = `lukujen keskiarvo: ${(digit1 + digit2 + digit3) / 3}`;
        };
    }

    function section6() {
        const startSectionButton = document.querySelector<HTMLButtonElement>('#start-section-6-button');

        const outputEl = document.querySelector<HTMLSpanElement>('#section-6-output');

        if (!startSectionButton) {
            throw new Error("startSectionButton is null");
        }

        if (!outputEl) {
            throw new Error("outputEl is null");
        }

        startSectionButton.onclick = () => {
            const unParsedDigit1 = window.prompt('Leivisköinä:') ?? '';
            const unParsedDigit2 = window.prompt('Nauloina:') ?? '';
            const unParsedDigit3 = window.prompt('Luoteina:') ?? '';

            //  Leiviskä = 20 pound
            const leiviska = Number.isNaN(parseFloat(unParsedDigit1)) ? 0 : parseFloat(unParsedDigit1);

            //  nauloina = pound = 32 luotia
            const naulo = Number.isNaN(parseFloat(unParsedDigit2)) ? 0 : parseFloat(unParsedDigit2);

            //  Luoti = 13,3gram
            const luoti = Number.isNaN(parseFloat(unParsedDigit3)) ? 0 : parseFloat(unParsedDigit3);

            const LEIVISKA_TO_NAULO = 20;

            const NAULO_TO_LUOTI = 32;

            const LUOTI_TO_GRAM = 13.3;

            const leiviskaInGram = leiviska * LEIVISKA_TO_NAULO * NAULO_TO_LUOTI * LUOTI_TO_GRAM;

            const nauloInGram = naulo * NAULO_TO_LUOTI * LUOTI_TO_GRAM;

            const luotiInGram = luoti * LUOTI_TO_GRAM;

            const sum: number = leiviskaInGram + nauloInGram + luotiInGram;

            const sumKgValue = Math.trunc(sum / 1000);

            const sumGramValue = Math.trunc((sum - (sumKgValue * 1000)) * 1000) / 1000;

            outputEl.innerText = `Massa nykymittojen mukaan: ${sumKgValue} kilogrammaa ja ${sumGramValue} grammaa. `;
        };
    }

    function section7() {
        const startSectionButton = document.querySelector<HTMLButtonElement>('#start-section-7-button');

        const outputInterestEl = document.querySelector<HTMLSpanElement>('#section-7-output-interest');
        const outputBalanceEl = document.querySelector<HTMLSpanElement>('#section-7-output-balance');

        if (!outputInterestEl) {
            throw new Error("outputInterestEl is null");
        }

        if (!outputBalanceEl) {
            throw new Error("outputBalanceEl is null");
        }
        if (!startSectionButton) {
            throw new Error("startSectionButton is null");
        }

        startSectionButton.onclick = () => {
            const unParsedSaldo = window.prompt('Tilin saldo:') ?? '';
            const unParsedPercentage = window.prompt('Vuotuisen korkoprosenti:') ?? '';

            const saldo = Number.isNaN(parseFloat(unParsedSaldo)) ? 0 : parseFloat(unParsedSaldo);
            const percentage = Number.isNaN(parseFloat(unParsedPercentage)) ? 0 : parseFloat(unParsedPercentage);

            const interest = saldo * percentage / 100;
            const balance = saldo + interest;

            const interestAsCurrency = Math.round(interest * 100) / 100;

            const balanceAsCurrency = Math.round(balance * 100) / 100;

            outputInterestEl.innerText = `Vuodessa kertyvän koron määrä: ${interestAsCurrency}`;

            outputBalanceEl.innerText = `Kasvanut saldo: ${balanceAsCurrency}`;
        };
    }

    function section8() {
        const rollDiceButtonEl = document.querySelector<HTMLButtonElement>('#roll-dice-button');
        const diceOneOutputEl = document.querySelector<HTMLSpanElement>('#section-8-output-dice-1');
        const diceTwoOutputEl = document.querySelector<HTMLSpanElement>('#section-8-output-dice-2');
        const diceSumOutputEl = document.querySelector<HTMLSpanElement>('#section-8-output-dice-sum');

        if (!rollDiceButtonEl) {
            throw new Error("rollDiceButtonEl is null");
        }

        if (!diceOneOutputEl) {
            throw new Error("diceOneOutputEl is null");
        }

        if (!diceTwoOutputEl) {
            throw new Error("diceTwoOutputEl is null");
        }

        if (!diceSumOutputEl) {
            throw new Error("diceSumOutputEl is null");
        }

        let diceTurn = 0;

        rollDiceButtonEl.onclick = () => {
            const diceSide = Math.trunc(Math.random() * 6) + 1;

            if (diceTurn === 0) {
                diceOneOutputEl.innerText = `${diceSide}`;
                diceTurn = 1;
                return;
            }

            if (diceTurn === 1) {
                diceTwoOutputEl.innerText = `${diceSide}`;
                diceSumOutputEl.innerText = `${parseInt(diceOneOutputEl.innerText) + parseInt(diceTwoOutputEl.innerText)}`;
                diceTurn = 2;
                return;
            }

            if (diceTurn === 2) {
                diceOneOutputEl.innerText = `${diceSide}`;
                diceTwoOutputEl.innerText = '';
                diceSumOutputEl.innerText = '';
                diceTurn = 1;
                return;
            }
        };
    }

    function section9() {
        const generateBtnEl = document.querySelector<HTMLButtonElement>('#generate-button');
        const codeOutput1El = document.querySelector<HTMLSpanElement>('#section-9-output-1');
        const codeOutput2El = document.querySelector<HTMLSpanElement>('#section-9-output-2');

        if (!generateBtnEl) {
            throw new Error("generateBtnEl is null");
        }

        if (!codeOutput1El) {
            throw new Error("codeOutput1El is null");
        }

        if (!codeOutput2El) {
            throw new Error("codeOutput2El is null");
        }

        generateBtnEl.onclick = async () => {
            const code11 = randomNumberBetweenZeroAndNine();
            await randomDelay();
            const code12 = randomNumberBetweenZeroAndNine();
            await randomDelay();
            const code13 = randomNumberBetweenZeroAndNine();

            codeOutput1El.innerText = `${code11}${code12}${code13}`;

            const code21 = randomNumberBetweenOneAndSix();
            await randomDelay();
            const code22 = randomNumberBetweenOneAndSix();
            await randomDelay();
            const code23 = randomNumberBetweenOneAndSix();

            codeOutput2El.innerText = `${code21}${code22}${code23}`;
        };
    }

    document.addEventListener("DOMContentLoaded", () => {
        console.log('DOMContentLoaded');

        section2();
        section3();
        section4();
        section5();
        section6();
        section7();
        section8();
        section9();
    });

}
