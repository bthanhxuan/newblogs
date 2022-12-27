const articleId = parseInt(getQueryParams('id'));

const elArticleTitle = document.getElementById('article-tittle');
const elArticleDate = document.getElementById('article-date');
const elArticleAuthor = document.getElementById('article-author');
const elArticleCategory = document.getElementById('article-category');
const elArticleThumb = document.getElementById('article-thumb');
const elArticleContent = document.getElementById('article-content');
const elArticleRelated = document.getElementById('article-related');
const elArticleSeen = document.getElementById('article-seen');
const inputCommentName = document.getElementById('comment-name');
const inputCommentMessage = document.getElementById('comment-message');
const elCommentForm = document.getElementById('comment-form');
const elCommentList = document.getElementById('comments-list');
const elCommentTotal = document.getElementById('comment-total');

let COMMENTS = JSON.parse(localStorage.getItem('COMMENTS')) || {};

renderComments(COMMENTS);

elCommentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const commentName = inputCommentName.value;
  const commentMessage = inputCommentMessage.value;
  const commentItem = {
    id: createId(),
    name: commentName,
    message: commentMessage,
    date: new Date(),
    articleId: articleId,
  };

  if (COMMENTS[articleId]) {
    COMMENTS[articleId].push(commentItem);
  } else {
    COMMENTS[articleId] = [commentItem];
  }

  renderComments(COMMENTS);
  inputCommentName.value = '';
  inputCommentMessage.value = '';
  localStorage.setItem('COMMENTS', JSON.stringify(COMMENTS));
});

function renderComments(items) {
  let htmlContent = '';
  const listComment = items[articleId] || [];
  elCommentTotal.innerText = listComment.length;

  listComment.forEach((item) => {
    htmlContent += /*html*/ `
      <div class="media-grid">
          <div class="media">
              <a class="comment-img" href="#url"><img src="assets/images/a1.jpg"
                      class="img-responsive" width="100px" alt="${item.name}"></a>
              <div class="media-body comments-grid-right">
                  <h5>${item.name}</h5>
                  <ul class="p-0 comment">
                      <li class="">${item.date}</li>
                      <li>
                          <a href="#comment" class="text-primary">Reply</a>
                      </li>
                  </ul>
                  <p>${item.message}</p>
              </div>
          </div>
      </div>
    `;
  });
  elCommentList.innerHTML = htmlContent;
}

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
  })
  .catch((error) => {
    window.location.href = '404.html';
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
