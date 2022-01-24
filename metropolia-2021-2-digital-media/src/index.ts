import './index.scss';
import { configNavbar } from './shared/navbar';
import { changeTitle } from './shared/utilities';

configNavbar();
changeTitle('Javascript homework');

const app = document.querySelector<HTMLDivElement>('#boxes')!;

function box(name: string, path: string) {
    return `<div onclick="window.open('${path}', '_self');" class='box'>${name}</div>`;
}

const hws: { name: string; path: string }[] = [
    {
        name: 'Vikko 1',
        path: 'src/hw1/index.html'
    },
    {
        name: 'Vikko 2 (2/5)',
        path: 'src/hw2-2/index.html'
    },
    {
        name: 'Vikko 2 (3/5)',
        path: 'src/hw2-3/index.html'
    },
    {
        name: 'Vikko 2 (4/5)',
        path: 'src/hw2-4/index.html'
    },
    {
        name: 'Vikko 3 (1/2)',
        path: 'src/hw3-1/index.html'
    },
    {
        name: 'Vikko 3 (2/2)',
        path: 'src/hw3-2/index.html'
    },
    {
        name: 'Vikko 4',
        path: 'src/hw4/index.html'
    },
    {
        name: 'Vikko 5',
        path: 'src/hw5/index.html'
    }
];

app.innerHTML = hws.map((x) => box(x.name, x.path)).join('');
