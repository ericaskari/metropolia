const pics = [
    {
        thumb: 'http://www.fillmurray.com/100/100',
        big: 'http://www.fillmurray.com/640/480',
    },
    {
        thumb: 'http://lorempixel.com/100/100/sports/1/',
        big: 'http://lorempixel.com//640/480/sports/1/',
    },
    {
        thumb: 'https://placeimg.com/100/100/tech',
        big: 'https://placeimg.com/640/480/tech',
    },
];

document.addEventListener("DOMContentLoaded", () => {
    console.log('DOMContentLoaded');

    const list = document.querySelector('ul');
    const div = document.querySelector('div');

    if (!list) {
        throw new Error("list is null");
    }

    if (!div) {
        throw new Error("div is null");
    }

    div.onclick = () => {
        div.classList.add('hidden');
        div.classList.remove('visible');

    }

    const changeThumbnail = (id) => {
        const index = parseInt(String(id).split('-')[2]);
        console.log(index)

        div.innerHTML = `<img src="${pics[index].big}" alt="${pics[index].big}"/>`
        div.classList.remove('hidden');
        div.classList.add('visible');

    }


    list.innerHTML = pics.map(({big, thumb}, index) => `<li id="image-icon-${index}"><img src="${thumb}" alt="${thumb}"></li>`).join('');

    list.childNodes.forEach(thumbListItem => {
        thumbListItem.onclick = () => {
            changeThumbnail(thumbListItem.id);
        };
    });

});
