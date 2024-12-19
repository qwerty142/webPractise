// IIFE для выполнения скрипта
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const main = document.querySelector('.main');

    if (header && main) {
        const headerHeight = header.offsetHeight;
        main.style.paddingTop = `${headerHeight}px`;
    }
});

(function () {
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;

        const footer = document.querySelector('.footer');
        if (footer) {
            const loadInfo = document.createElement('p');
            loadInfo.textContent = `Скорость загрузки страницы: ${loadTime} мс`;
            loadInfo.style.fontSize = '0.9rem';
            loadInfo.style.color = '#aaa';
            footer.appendChild(loadInfo);
        }
    });


    const menuLinks = document.querySelectorAll('.nav__link');
    menuLinks.forEach(link => {

        link.addEventListener('mouseover', () => {
            link.style.backgroundColor = '#45a049';
            link.style.color = '#fff';
        });

        link.addEventListener('mouseout', () => {
            link.style.backgroundColor = '';
            link.style.color = '';
        });

        if (link.href === document.location.href) {
            console.log('done')
            link.classList.add('nav__link--active');
        }
    });
})();
