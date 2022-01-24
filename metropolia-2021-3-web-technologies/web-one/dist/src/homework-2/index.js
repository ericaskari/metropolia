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
            const value = window.prompt('Kuhan pituuden(cm):') ?? '';
            const parsedValue = parseFloat(value);
            const lowestAllowed = 37;
            if (Number.isNaN(parsedValue) || parsedValue < 0) {
                outputEl.innerText = `Enter a positive number`;
                return;
            }
            if (parsedValue < lowestAllowed) {
                outputEl.innerText = `Kuha on alamittainen. \n${lowestAllowed - parsedValue} senttiä alimmasta sallitusta pyyntimitasta puuttuu.`;
                return;
            }
            outputEl.innerText = `Kuha ei ole alamittainen`;
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
        const groups = ['Rohkelikko', 'Luihuinen', 'Puuskupuh', 'Korpinkynsi'];
        startEl.onclick = (event) => {
            const name = window.prompt('Nimi:') ?? '';
            const random = Math.floor(Math.random() * (3 + 1));
            switch (random) {
                case 0:
                    outputEl.innerText = `${name}, olet ${groups[random]}`;
                    break;
                case 1:
                    outputEl.innerText = `${name}, olet ${groups[random]}`;
                    break;
                case 2:
                    outputEl.innerText = `${name}, olet ${groups[random]}`;
                    break;
                case 3:
                    outputEl.innerText = `${name}, olet ${groups[random]}`;
                    break;
            }
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
            const gender = window.prompt('Sukupuoli (nainen/mies):') ?? '';
            console.log(gender);
            if (gender !== 'nainen' && gender !== 'mies') {
                outputEl.innerText = `allowed values for gender: nainen, mies`;
                return;
            }
            const hemoglobinUnparsed = window.prompt('hemoglobiiniarvon (g/l):') ?? '';
            const parsedValue = parseInt(hemoglobinUnparsed);
            if (Number.isNaN(parsedValue) || parsedValue < 0) {
                outputEl.innerText = `Enter a positive number`;
                return;
            }
            const womenMinHemoglobin = 117;
            const womenMaxHemoglobin = 175;
            const menMinHemoglobin = 134;
            const menMaxHemoglobin = 195;
            if (gender === 'nainen') {
                if (parsedValue < womenMinHemoglobin) {
                    outputEl.innerText = `alhainen`;
                    return;
                }
                if (parsedValue > womenMaxHemoglobin) {
                    outputEl.innerText = `korkea`;
                    return;
                }
                outputEl.innerText = `normaali`;
                return;
            }
            else if (gender === 'mies') {
                if (parsedValue < menMinHemoglobin) {
                    outputEl.innerText = `alhainen`;
                    return;
                }
                if (parsedValue > menMaxHemoglobin) {
                    outputEl.innerText = `korkea`;
                    return;
                }
                outputEl.innerText = `normaali`;
                return;
            }
            else {
            }
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
            const moneyInWalletUnParsed = window.prompt('lompakossa olevan rahamäärä') ?? '';
            const butTicketPriceUnParsed = window.prompt('bussilipun hinta') ?? '';
            const moneyInWalletParsed = parseFloat(moneyInWalletUnParsed);
            const butTicketParsed = parseFloat(butTicketPriceUnParsed);
            if (Number.isNaN(moneyInWalletParsed) || moneyInWalletParsed < 0) {
                outputEl.innerText = `Enter a positive number`;
                return;
            }
            if (Number.isNaN(butTicketParsed) || butTicketParsed < 0) {
                outputEl.innerText = `Enter a positive number`;
                return;
            }
            const moneyInWallet = Math.trunc(moneyInWalletParsed * 100) / 100;
            const butTicket = Math.trunc(butTicketParsed * 100) / 100;
            if (butTicket > moneyInWallet) {
                outputEl.innerText = `Raha ei rittä`;
                return;
            }
            outputEl.innerText = `Hyvää matkaa!\njäljellä oleva raha:${moneyInWallet - butTicket}`;
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
            const prompt = window.confirm('Lasketaanko neliöjuuri?');
            if (!prompt) {
                outputEl.innerText = 'Neliöjuurta ei lasketa';
                return;
            }
            const dataUnParsed = window.prompt('luku:') ?? '';
            const data = parseFloat(dataUnParsed);
            if (Number.isNaN(data) || data < 0) {
                outputEl.innerText = `Negatiivisen luvun neliöjuuri ei ole määritelty`;
                return;
            }
            outputEl.innerText = `Neliöjuuri: ${Math.sqrt(data)}`;
        };
    }
    {
        function isLeapYear(year) {
            if ((year % 100) === 0) {
                return (year % 400) === 0;
            }
            return (year % 4) === 0;
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
            const dataUnParsed = window.prompt('vuosiluku:') ?? '';
            const data = parseFloat(dataUnParsed);
            if (Number.isNaN(data) || data < 0) {
                outputEl.innerText = `Enter a positive number`;
                return;
            }
            outputEl.innerText = isLeapYear(data) ? `${data} on karkausvuosi` : `${data} ei ole karkausvuosi`;
        };
    }
});
