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

function createId() {
  // trả về một chuỗi ngẫu nhiên gồm 12 ký tự: 0-9a-zA-Z;
  const characters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
  let length = 12;
  let charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    let idx = Math.floor(Math.random() * charactersLength);
    result += characters[idx];
  }
  return result;
}
