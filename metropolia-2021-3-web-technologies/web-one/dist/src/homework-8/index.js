"use strict";
class ShowModel {
    url = '';
    name = '';
    premiered = '';
    summary = '';
    image = {
        medium: '',
        original: ''
    };
    static fromApi(show) {
        const model = new ShowModel();
        model.url = show.url ?? '';
        model.name = show.name ?? '';
        model.premiered = show.premiered ?? '';
        model.summary = show.summary ?? '';
        model.image = show.image ?? { original: '', medium: '' };
        return model;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    console.log('DOMContentLoaded');
    const searchInputEl = document.querySelector('#search-input');
    const searchResultEl = document.querySelector('#search-result');
    const searchButtonEl = document.querySelector('#search-button');
    if (!searchInputEl) {
        throw new Error("searchInputEl is null");
    }
    if (!searchResultEl) {
        throw new Error("searchResultEl is null");
    }
    if (!searchButtonEl) {
        throw new Error("searchButtonEl is null");
    }
    const controller = new AbortController();
    const { signal } = controller;
    let isOngoingRequest = false;
    const updateUI = (models) => {
        if (models.length === 0) {
            searchResultEl.replaceChildren();
            searchResultEl.innerText = 'List is empty';
            return;
        }
        const htmlElements = models.map((show) => {
            const imageEl = document.createElement('img');
            imageEl.src = show.image.medium;
            const year = show.premiered.split('-')[0];
            const nameEl = document.createElement('h4');
            nameEl.innerText = `${show.name} (${year})`;
            const summaryEl = document.createElement('span');
            summaryEl.innerHTML = show.summary;
            const linkEl = document.createElement('a');
            linkEl.href = show.url;
            linkEl.innerText = 'see more';
            linkEl.target = '_blank';
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('show-item-image-wrapper');
            imageWrapper.replaceChildren(imageEl);
            const dataWrapper = document.createElement('div');
            dataWrapper.classList.add('show-item-data-wrapper');
            dataWrapper.replaceChildren(...[
                nameEl,
                summaryEl,
                linkEl
            ]);
            const wrapper = document.createElement('div');
            wrapper.classList.add('show-item');
            wrapper.replaceChildren(imageWrapper, dataWrapper);
            return wrapper;
        });
        searchResultEl.replaceChildren(...htmlElements);
    };
    const showLoadingSpinner = () => {
        const spinner = document.createElement('div');
        spinner.classList.add('spinner-border');
        searchResultEl.replaceChildren(spinner);
    };
    const getDataFromEndpoint = async (searchText) => {
        try {
            isOngoingRequest = true;
            showLoadingSpinner();
            const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchText}`, { signal }).then(response => response.json());
            isOngoingRequest = false;
            console.log(response);
            const models = response.map(x => ShowModel.fromApi(x.show));
            console.log(models);
            updateUI(models);
        }
        catch (e) {
            console.error('Error while fetching shows');
            console.error(e);
        }
    };
    searchButtonEl.onclick = (event) => {
        event.preventDefault();
        const value = searchInputEl.value;
        console.log(value);
        if (isOngoingRequest) {
            console.log('Cancelling ongoing request...');
            controller.abort();
        }
        getDataFromEndpoint(value).then().catch();
    };
});
