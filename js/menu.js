// render menu
fetch(`${BASE_URL}categories_news`)
  .then((response) => response.json())
  .then((res) => {
    const categories = res.data;
    const elMainMenu = document.getElementById('main-menu');

    let htmlContentMainMenu = '';
    let htmlContentOtherMenu = '';
    categories.forEach((category, index) => {
      if (index < 2) {
        htmlContentMainMenu += `<li class="nav-item"><a class="nav-link" href="category.html?id=${category.id}">${category.name}</a></li>`;
      } else {
        htmlContentOtherMenu += `<a class="dropdown-item " href="${category.link}">${category.name}</a>`;
      }
    });

    if (htmlContentMainMenu !== '') {
      htmlContentOtherMenu = /*html*/ `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          Khác <span class="fa fa-angle-down"></span>
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="menu-categories">
          ${htmlContentOtherMenu}
        </div>
      </li>`;
    }
    elMainMenu.innerHTML =
      htmlContentMainMenu +
      htmlContentOtherMenu +
      `<li class="nav-item"><a class="nav-link" href="favorite.html">Yêu thích <span class="text-danger" id="total-fav">(0)</span></a></li>`;

    document.getElementById(
      'total-fav'
    ).innerText = `(${ARTICLES_LIKED.length})`;
  });
