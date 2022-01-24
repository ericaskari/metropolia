document.addEventListener("DOMContentLoaded", () => {
    console.log('DOMContentLoaded');

    {
        const inputNumber1 = document.querySelector('#num1');
        const inputNumber2 = document.querySelector('#num2');
        const sumButton = document.querySelector('#sum');
        const subtractionButton = document.querySelector('#sub');
        const multiplyButton = document.querySelector('#multi');
        const divisionButton = document.querySelector('#div');
        const output = document.querySelector('#vastaus');

        if (!inputNumber1) {
            throw new Error("inputNumber1 is null");
        }

        if (!inputNumber2) {
            throw new Error("inputNumber2 is null");
        }

        if (!sumButton) {
            throw new Error("sumButton is null");
        }

        if (!subtractionButton) {
            throw new Error("subtractionButton is null");
        }

        if (!multiplyButton) {
            throw new Error("multiplyButton is null");
        }

        if (!divisionButton) {
            throw new Error("divisionButton is null");
        }

        if (!output) {
            throw new Error("output is null");
        }

        let inputNumber1Value = 0;

        let inputNumber2Value = 0;

        inputNumber1.addEventListener('input', (event) => {
            inputNumber1Value = parseFloat(event.target.value ?? '');
        });

        inputNumber2.addEventListener('input', (event) => {
            inputNumber2Value = parseFloat(event.target.value ?? '');
        });

        sumButton.onclick = (event) => {
            output.innerText = inputNumber1Value + inputNumber2Value;
        };

        subtractionButton.onclick = (event) => {
            output.innerText = inputNumber1Value - inputNumber2Value;
        };

        multiplyButton.onclick = (event) => {
            output.innerText = inputNumber1Value * inputNumber2Value;
        };

        divisionButton.onclick = (event) => {
            output.innerText = inputNumber1Value / inputNumber2Value;
        };
    }
});
