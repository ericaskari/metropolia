export function configNavbar() {
    const navbar = document.querySelector('#navbar')!;

    navbar.innerHTML = `
            <a href='https://users.metropolia.fi/~mohamas/mediakurssin-palautukset'>Home</a>
            <div></div>
            <a href='https://github.com/ericaskari/metropolia-2021-2-digital-media'>
                <img alt='' height='30' src='/src/images/GitHub-Mark-64px.png'>
            </a>`;
}
