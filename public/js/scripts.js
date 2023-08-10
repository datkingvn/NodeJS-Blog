document.addEventListener('DOMContentLoaded', function () {

    const allButton = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    for (var i = 0; i < allButton.length; i++) {
        allButton[i].addEventListener('click', function () {
            searchBar.style.visibility = 'visible';
            searchBar.classList.add('open');
            this.setAttribute('aria-expanded', 'true');
            // input sẽ nhận trạng thái focus và con trỏ chuột sẽ tự động được đặt trong trường input
            searchInput.focus()
        });
    }

    searchClose.addEventListener('click', function () {
        searchBar.style.visibility = 'hidden';
        searchBar.classList.remove('open');
        this.setAttribute('aria-expanded', 'focus');
    });



})