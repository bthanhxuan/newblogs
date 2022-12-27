const elSearchForm = document.getElementById('search-form');

// render top category
fetch(`${BASE_URL}categories_news/featured?limit=4`)
  .then((response) => response.json())
  .then((res) => {
    const categories = res.data;
    const elTopCategory = document.getElementById('top-category');

    let htmlContent = '';
    const ICONS = [
      'fa fa-bath',
      'fa fa-female',
      'fa fa-cutlery',
      'fa fa-pie-chart',
    ];
    categories.forEach((category, index) => {
      htmlContent += /*html*/ `
      <div class="col-lg-3 col-6 grids-feature mt-lg-0 mt-md-4 mt-3">
        <a href="category.html?id=${category.id}">
          <div class="area-box">
            <span class="${ICONS[index]}"></span>
            <h4 class="title-head">${category.name}</h4>
          </div>
        </a>
      </div>`;
    });
    elTopCategory.innerHTML = htmlContent;
  });

// render latest articles
fetch(`${BASE_URL}articles?limit=3`)
  .then((response) => response.json())
  .then((res) => {
    const articles = res.data;
    const elArticlesLatest = document.getElementById('articles-latest');

    let htmlContent = '';
    articles.forEach((article, index) => {
      let classLiked = '';
      if (ARTICLES_LIKED.includes(article.id)) classLiked = 'liked';
      const pubDate = dayjs(article.publish_date).fromNow();
      htmlContent += /*html*/ `
      <div class="col-lg-4 col-md-6 mt-4">
        <div class="top-pic${index + 1}" style="background: url(${
        article.thumb
      }) no-repeat center center; background-size: cover">
          <div class="card-body blog-details">
            <a href="detail.html?id=${article.id}" class="blog-desc">
              ${article.title}
            </a>
            <div class="author align-items-center">
              <img src="assets/images/a1.jpg" alt="${
                article.title
              }" class="img-fluid rounded-circle" />
              <ul class="blog-meta">
                <li><a href="/">${article.author ?? 'Admin'}</a></a></li>
                <li class="meta-item blog-lesson">
                  <span class="meta-value"> <span class="fa fa-clock-o"></span> ${pubDate} </span>
                </li>
              </ul>
              <i class="fa fa-heart icon-like ${classLiked}" data-id="${
        article.id
      }" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>`;
    });
    elArticlesLatest.innerHTML = htmlContent;
  });

// render popular articles
fetch(`${BASE_URL}articles/popular?limit=3`)
  .then((response) => response.json())
  .then((res) => {
    const articles = res.data;
    const elArticlesPopular = document.getElementById('articles-popular');

    let htmlContent = '';
    articles.forEach((article) => {
      let classLiked = '';
      if (ARTICLES_LIKED.includes(article.id)) classLiked = 'liked';

      const pubDate = dayjs(article.publish_date).fromNow();
      const descText = article.description;
      const shortDesc =
        descText.split(' ').slice(0, 20).join(' ') +
        (descText.length > 20 ? ' ...' : '');

      htmlContent += /*html*/ `
      <div class="col-lg-4 col-md-6 mt-md-0 mt-4">
        <div class="card h-100">
          <div class="card-header p-0 position-relative">
            <a href="detail.html?id=${article.id}" class="zvn-article-thumb">
              <img class="card-img-bottom d-block radius-image-full" src="${article.thumb}"
                alt="${article.title}">
            </a>
          </div>
          <div class="card-body blog-details">
            <span class="label-blue">${article.category.name}</span>
            <a href="detail.html?id=${article.id}" class="blog-desc line-clamp-2">${article.title}</a>
            <p>${shortDesc}</p>
            <div class="author align-items-center">
              <img src="assets/images/a2.jpg" alt="" class="img-fluid rounded-circle" />
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

      elArticlesPopular.innerHTML = htmlContent;
    });
  });

// render general articles
let currentPage = 2;
renderArticlesGeneral(currentPage);

const btnLoadMore = document.getElementById('btn-load-more');
btnLoadMore.addEventListener('click', () => {
  currentPage++;
  const iconLoading = /*html*/ `
    <svg style="display: inline-block; width: 1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="50" cy="50" fill="none" stroke="currentColor" stroke-width="10" r="35"
        stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(120.057 50 50)">
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s"
          values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
      </circle>
    </svg>
  `;
  btnLoadMore.innerHTML = `${iconLoading} Xem thêm`;
  renderArticlesGeneral(currentPage);
});

function renderArticlesGeneral(page = 1) {
  fetch(`${BASE_URL}articles?limit=4&page=${page}`)
    .then((response) => response.json())
    .then((res) => {
      const articles = res.data;
      const elArticlesGeneral = document.getElementById('articles-general');

      let htmlContent = '';
      articles.forEach((article) => {
        let classLiked = '';
        if (ARTICLES_LIKED.includes(article.id)) classLiked = 'liked';

        const pubDate = dayjs(article.publish_date).fromNow();

        htmlContent += /*html*/ `
          <div class="col-lg-6 mt-4">
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
      elArticlesGeneral.innerHTML += htmlContent;
      btnLoadMore.innerHTML = 'Xem thêm';
    });
}
