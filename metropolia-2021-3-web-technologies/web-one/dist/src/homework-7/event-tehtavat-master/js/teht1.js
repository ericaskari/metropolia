document.addEventListener("DOMContentLoaded", () => {
    console.log('DOMContentLoaded');

    {

        const button = document.querySelector('button');

        if (!button) {
            throw new Error("button is null");
        }

        button.onclick = (event) => {
            window.alert('Nappia klikattu');
        };
    }

});
