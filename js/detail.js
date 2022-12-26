const articleId = getQueryParams('id');

const elArticleTitle = document.getElementById('article-tittle');
const elArticleDate = document.getElementById('article-date');
const elArticleAuthor = document.getElementById('article-author');
const elArticleCategory = document.getElementById('article-category');
const elArticleThumb = document.getElementById('article-thumb');
const elArticleContent = document.getElementById('article-content');
const elArticleRelated = document.getElementById('article-related');
const elArticleSeen = document.getElementById('article-seen');

let articlesSeen = JSON.parse(localStorage.getItem('ARTICLES_SEEN')) || [];
if (!articlesSeen.includes(articleId)) {
  if (articlesSeen.length >= 3) {
    articlesSeen.shift();
  }
  articlesSeen.push(articleId);
  localStorage.setItem('ARTICLES_SEEN', JSON.stringify(articlesSeen));
}

articlesSeen.forEach((articleSeenId) => {
  fetch(`${BASE_URL}articles/${articleSeenId}`)
    .then((response) => response.json())
    .then((res) => {
      const article = res.data;
      let htmlContent = /*html*/ `
        <article class="post">
          <figure class="post-thumb">
            <img src="${article.thumb}" alt="${
        article.title
      }" class="h-100 w-100" style="oject-fit: cover;">
          </figure>
          <div class="text">
            <a href="detail.html?id=${article.id}">${article.title}</a>
          </div>
          <div class="post-info">${dayjs(article.publish_date).fromNow()}</div>
        </article>  
      `;
      elArticleSeen.innerHTML += htmlContent;
    });
});

fetch(`${BASE_URL}articles/${articleId}`)
  .then((response) => response.json())
  .then((res) => {
    const article = res.data;

    elArticleTitle.innerText = article.title;
    elArticleDate.innerText = dayjs(article.publish_date).fromNow();
    elArticleAuthor.innerText = article.author;
    elArticleCategory.innerHTML = `<strong>${article.category.name}</strong>`;
    elArticleCategory.href = `category.html?id=${article.category_id}`;
    elArticleThumb.src = article.thumb;
    elArticleContent.innerHTML = article.content;
  });

fetch(`${BASE_URL}articles/${articleId}/related?limit=3`)
  .then((response) => response.json())
  .then((res) => {
    const articles = res.data;
    let htmlContent = '';

    articles.forEach((article) => {
      htmlContent += /*html*/ `
        <article class="post">
          <figure class="post-thumb">
            <img src="${article.thumb}" alt="${
        article.title
      }" class="h-100 w-100" style="oject-fit: cover;">
          </figure>
          <div class="text">
            <a href="detail.html?id=${article.id}">${article.title}</a>
          </div>
          <div class="post-info">${dayjs(article.publish_date).fromNow()}</div>
        </article>  
      `;
    });
    elArticleRelated.innerHTML = htmlContent;
  });
