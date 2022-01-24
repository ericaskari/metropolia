document.addEventListener("DOMContentLoaded", () => {
    console.log('DOMContentLoaded');

    {
        const inputNumber = document.querySelector('#num1');
        const sumButton = document.querySelector('#sum');
        const subtractionButton = document.querySelector('#sub');
        const multiplyButton = document.querySelector('#multi');
        const divisionButton = document.querySelector('#div');
        const equalButton = document.querySelector('#equal');
        const output = document.querySelector('#vastaus');
        const debug = document.querySelector('#debug');

        if (!inputNumber) {
            throw new Error("inputNumber is null");
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

        if (!equalButton) {
            throw new Error("equalButton is null");
        }

        if (!output) {
            throw new Error("output is null");
        }

        if (!debug) {
            throw new Error("debug is null");
        }


        inputNumber.addEventListener('input', (event) => calculator(0, parseFloat(event.target.value ?? '')));
        sumButton.onclick = (event) => calculator(1);
        subtractionButton.onclick = (event) => calculator(2);
        multiplyButton.onclick = (event) => calculator(3);
        divisionButton.onclick = (event) => calculator(4);
        equalButton.onclick = (event) => calculator(5);


        //  0 => inputNumber
        //  1 => sumButton
        //  2 => subtractionButton
        //  3 => multiplyButton
        //  4 => divisionButton
        //  5 => equalButton


        const numbers = [null];

        const operations = [];

        const calculator = (eventType, inputNumberValue = 0) => {
            calculatorCore(eventType, inputNumberValue);

            debug.innerText = JSON.stringify({numbers, operations, eventType, inputNumberValue}, undefined, 3)
        }

        const calculatorCore = (eventType, inputNumberValue = 0) => {
            if (eventType === 5 && operations[operations.length - 1] === 5) {
                console.log('pressing equal after a calculation: nothing going to happen');
                return;
            }

            //  when number input changes
            if (eventType === 0) {
                numbers[numbers.length - 1] = inputNumberValue;

                return;
            }

            // when we need to update the output because "=" pressed
            if (eventType === 5) {

                const calculatedValue = calculate();

                inputNumber.value = calculatedValue;

                numbers.push(calculatedValue);
                
                operations.push(eventType);

                return;
            }

            numbers.push(numbers[numbers.length - 1]);

            operations.push(eventType);

            inputNumber.focus();
        };

        const calculate = () => {
            switch (operations[operations.length - 1]) {
                case 1:
                    return numbers[numbers.length - 2] + numbers[numbers.length - 1];

                case 2:
                    return numbers[numbers.length - 2] - numbers[numbers.length - 1];

                case 3:
                    return numbers[numbers.length - 2] * numbers[numbers.length - 1];

                case 4:
                    return numbers[numbers.length - 2] / numbers[numbers.length - 1];
            }
            throw new Error('Not supposed to reach here');
        }
    }
});
