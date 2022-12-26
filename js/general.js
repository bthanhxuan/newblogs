const BASE_URL = 'https://apiforlearning.zendvn.com/api/v2/';

dayjs.extend(window.dayjs_plugin_relativeTime);
dayjs.locale('vi');

let ARTICLES_LIKED = JSON.parse(localStorage.getItem('ARTICLES_LIKED')) || [];

// event like article
document.addEventListener('click', (e) => {
  const el = e.target;

  if (el.classList.contains('icon-like')) {
    const id = parseInt(el.dataset.id);
    if (ARTICLES_LIKED.includes(id)) {
      ARTICLES_LIKED = ARTICLES_LIKED.filter((idLiked) => idLiked !== id);
      el.classList.remove('liked');
    } else {
      ARTICLES_LIKED.push(id);
      el.classList.add('liked');
    }
    localStorage.setItem('ARTICLES_LIKED', JSON.stringify(ARTICLES_LIKED));
    document.getElementById(
      'total-fav'
    ).innerText = `(${ARTICLES_LIKED.length})`;
  }
});

function getQueryParams(key) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(key);
}
