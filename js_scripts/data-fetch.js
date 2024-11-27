document.addEventListener('DOMContentLoaded', () => {
    const dataContainer = document.getElementById('data-container');
    const preloader = document.getElementById('preloader');


    async function fetchData(filterType) {
        console.log('Начинается загрузка данных...');
        preloader.style.display = 'block';
        dataContainer.innerHTML = '';

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments');
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

            const data = await response.json();
            console.log('Данные успешно получены:', data);

            const filteredData =
                filterType === 'above-100'
                    ? data.filter(item => item.id > 100)
                    : data.filter(item => item.id <= 200);

            renderData(filteredData);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error.message);
            showError(error.message || '⚠ Что-то пошло не так');
        } finally {
            preloader.style.display = 'none';
        }
    }


    function renderData(data) {
        console.log('Рендер данных:', data);

        if (data.length === 0) {
            dataContainer.innerHTML = '<p class="error-message">Данные не найдены</p>';
            return;
        }

        data.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('data-item');
            div.innerHTML = `
                <h3>${item.name}</h3>
                <p><strong>Email:</strong> ${item.email}</p>
                <p>${item.body}</p>
            `;
            dataContainer.appendChild(div);
        });
    }


    function showError(message) {
        dataContainer.innerHTML = `<p class="error-message">${message}</p>`;
    }


    let isFilterAbove100 = true;
    fetchData(isFilterAbove100 ? 'above-100' : 'below-200');


    setInterval(() => {
        isFilterAbove100 = !isFilterAbove100;
        fetchData(isFilterAbove100 ? 'above-100' : 'below-200');
    }, 10000);
});
