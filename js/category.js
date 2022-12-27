const categoryId = getQueryParams('id');

renderArticles(1);

function renderArticles(page = 1) {
  fetch(
    `${BASE_URL}categories_news/${categoryId}/articles?limit=10&page=${page}`
  )
    .then((response) => response.json())
    .then((res) => {
      const articles = res.data;
      const totalPage = res.meta.last_page;
      const elArticles = document.getElementById('articles');

      let htmlContent = '';
      articles.forEach((article, index) => {
        let classLiked = '';
        if (ARTICLES_LIKED.includes(article.id)) classLiked = 'liked';

        const pubDate = dayjs(article.publish_date).fromNow();
        if (index === 0) {
          const categoryName = article.category.name;
          document.getElementById('category-title').innerText = categoryName;
        }
        htmlContent += /*html*/ `
                    <div class="col-lg-6 mb-4">
                        <div class="bg-clr-white hover-box">
                        <div class="row">
                            <div class="col-sm-5 position-relative">
                            <a href="detail.html?id=${article.id}" class="image-mobile zvn-article-thumb h-100">
                                <img class="card-img-bottom d-block radius-image-full" src="${article.thumb}"
                                alt="${article.title}">
                            </a>
                            </div>
                            <div class="col-sm-7 card-body blog-details align-self">
                            <a href="detail.html?id=${article.id}" class="blog-desc line-clamp-2">${article.title}</a>
                            <div class="author align-items-center">
                                <img src="assets/images/a1.jpg" alt="" class="img-fluid rounded-circle" />
                                <ul class="blog-meta">
                                  <li>
                                      <a href="/">${article.author}</a>
                                  </li>
                                  <li class="meta-item blog-lesson">
                                      <span class="meta-value"> <span class="fa fa-clock-o"></span> ${pubDate} </span>
                                  </li>
                                </ul>
                                <i class="fa fa-heart icon-like ${classLiked}" data-id="${article.id}" aria-hidden="true"></i>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>`;
      });
      elArticles.innerHTML = htmlContent;

      renderPagination(page, totalPage);
    })
    .catch((error) => {
      window.location.href = '404.html';
    });
}
