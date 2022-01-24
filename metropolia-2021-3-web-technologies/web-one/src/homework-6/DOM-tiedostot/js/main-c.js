document.addEventListener("DOMContentLoaded", () => {
    console.log('DOMContentLoaded');

    {
        const article = document.querySelector('article');

        if (!article) {
            throw new Error("article is null");
        }

        const clonedArticle = article.cloneNode(true);

        article.parentNode.append(clonedArticle)
    }
});
