document.addEventListener("DOMContentLoaded", () => {
    console.log('DOMContentLoaded');

    {
        const main = document.querySelector('main');

        if (!main) {
            throw new Error("main is null");
        }

        main.innerHTML += main.innerHTML;
    }
});
