const PAGE_RANGE = 10;
const elUlPagination = document.getElementById('pagination');
let currentPage = 1;
let start = currentPage;
let end = PAGE_RANGE;

elUlPagination.addEventListener('click', (e) => {
  const el = e.target;

  if (el.classList.contains('page-numbers')) {
    if (!(el.id === 'btn-next' || el.id === 'btn-prev')) {
      const page = parseInt(el.dataset.page);
      currentPage = page;
      renderArticles(page);
    }
  }

  if (el.id === 'btn-next') {
    currentPage++;
    if (currentPage % PAGE_RANGE === 1) {
      start = currentPage;
      end = PAGE_RANGE * (Math.floor(start / PAGE_RANGE) + 1);
    }
    renderArticles(currentPage);
  }

  if (el.id === 'btn-prev') {
    currentPage--;
    if (currentPage % PAGE_RANGE === 0) {
      end = currentPage;
      start = end - PAGE_RANGE + 1;
    }
    renderArticles(currentPage);
  }
});

function renderPagination(currentPage, totalPage) {
  const isFirstPage = currentPage === 1 ? 'disabled' : '';
  const isLastPage = currentPage === totalPage ? 'disabled' : '';
  if (end > totalPage) end = totalPage;
  let html = `<li><a href="#" aria-current="page" class="page-numbers ${isFirstPage}" id="btn-prev">Prev</a></li>`;
  for (let index = start; index <= end; index++) {
    if (index === currentPage) {
      html += `<li><span aria-current="page" class="page-numbers current">${index}</span></li>`;
    } else {
      html += `<li><a class="page-numbers" href="#" data-page="${index}">${index}</a></li>`;
    }
  }
  html += `<li><a aria-current="page" href="#" class="page-numbers ${isLastPage}" id="btn-next">Next</a></li>`;

  elUlPagination.innerHTML = html;
}
