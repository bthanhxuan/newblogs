const keyword = getQueryParams('keyword');

const inputSearch = document.getElementById('input-search');

renderArticles(1, keyword);

function renderArticles(page = 1, searchValue = '') {
  fetch(`${BASE_URL}articles/search?limit=9&q=${keyword}&page=${page}`)
    .then((response) => response.json())
    .then((res) => {
      const articles = res.data;
      const totalPage = res.meta.last_page;
      const total = res.meta.total;

      const elArticles = document.getElementById('articles');

      document.getElementById('search-title').innerHTML = /*html*/ `
        Đã tìm thấy <span class="font-italic">${total}</span> bài viết với từ khóa <span class="font-italic">"${keyword}"</span>  
      `;

      let htmlContent = '';
      articles.forEach((article, index) => {
        let classLiked = '';
        if (ARTICLES_LIKED.includes(article.id)) classLiked = 'liked';

        const pubDate = dayjs(article.publish_date).fromNow();

        const descText = article.description;
        let shortDesc =
          descText.split(' ').slice(0, 20).join(' ') +
          (descText.length > 20 ? ' ...' : '');

        let titleArticle = article.title;

        if (searchValue !== '') {
          const regex = new RegExp(searchValue, 'ig');
          titleArticle = titleArticle.replaceAll(regex, function (match) {
            return `<mark>${match}</mark>`;
          });
          shortDesc = shortDesc.replaceAll(regex, function (match) {
            return `<mark>${match}</mark>`;
          });
        }

        htmlContent += /*html*/ `
                    <div class="col-lg-4 col-md-6 item mb-4">
                      <div class="card h-100">
                          <div class="card-header p-0 position-relative">
                              <a href="detail.html?id=${article.id}" class="zvn-article-thumb">
                                  <img class="card-img-bottom d-block radius-image-full" src="${article.thumb}"
                                      alt="${article.title}">
                              </a>
                          </div>
                          <div class="card-body blog-details">
                              <a href="detail.html?id=${article.id}" class="blog-desc line-clamp-2">${titleArticle}</a>
                              <p>${shortDesc}</p>
                              <div class="author align-items-center mt-3 mb-1">
                                  <img src="assets/images/a3.jpg" alt="" class="img-fluid rounded-circle" />
                                  <ul class="blog-meta">
                                      <li>
                                          <a href="/">${article.author}</a> </a>
                                      </li>
                                      <li class="meta-item blog-lesson">
                                        <span class="meta-value"> <span class="fa fa-clock-o"></span> ${pubDate} </span>
                                      </li>
                                  </ul>
                                  <i class="fa fa-heart icon-like ${classLiked}" data-id="${article.id}" aria-hidden="true"></i>
                              </div>
                          </div>
                      </div>
                    </div>`;
      });
      elArticles.innerHTML = htmlContent;

      renderPagination(page, totalPage);
    });
}
