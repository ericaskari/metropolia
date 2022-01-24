export function changeTitle(title: string) {
    const titleElement = document.querySelector('title')!;

    titleElement.innerText = title;
}
