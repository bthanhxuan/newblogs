const elUlPagination = document.getElementById('pagination');

elUlPagination.addEventListener('click', (e) => {
  const el = e.target;

  if (el.classList.contains('page-numbers')) {
    const page = parseInt(el.dataset.page);
    renderArticles(page);
  }
});

function renderPagination(currentPage, totalPage) {
  let html = '';

  for (let index = 1; index < totalPage; index++) {
    if (index === currentPage) {
      html += `<li><span aria-current="page" class="page-numbers current">${index}</span></li>`;
    } else {
      html += `<li><a class="page-numbers" href="#" data-page="${index}">${index}</a></li>`;
    }
  }

  elUlPagination.innerHTML = html;
}
