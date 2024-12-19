document.addEventListener('DOMContentLoaded', () => {
    const dataContainer = document.getElementById('data-container');
    const preloader = document.getElementById('preloader');


    async function fetchData(filterType) {
        console.log('Начинается загрузка данных...');
        const preloader = document.createElement('div');
        preloader.classList.add('preloader');
        dataContainer.innerHTML = '';
        dataContainer.appendChild(preloader);

        dataContainer.innerHTML = '';

        await new Promise(resolve => setTimeout(resolve, 100));
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments');
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

            const data = await response.json();
            console.log('Данные успешно получены:', data);

            const filteredData =
                filterType === 'above-100'
                    ? data.filter(item => item.id > 100)
                    : data.filter(item => item.id <= 200);

            showNotification('success', 'Данные успешно загружены.');

            initializeTable(filteredData);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error.message);
            showNotification('error', 'Не удалось загрузить данные.');
        } finally {
            preloader.style.display = 'none';
            preloader.remove();
        }
    }


    let isFilterAbove100 = true;
    fetchData(isFilterAbove100 ? 'above-100' : 'below-200');


    setInterval(() => {
        isFilterAbove100 = !isFilterAbove100;
        fetchData(isFilterAbove100 ? 'above-100' : 'below-200');
    }, 10000);
});

function showNotification(type, message) {
    Swal.fire({
        title: type === 'success' ? 'Успех!' : 'Ошибка!',
        text: message,
        icon: type,
        confirmButtonText: 'ОК',
        confirmButtonColor: '#4CAF50' // Зеленая
    });
}

function initializeTable(data) {

    const tableContainer = document.getElementById('data-container');
    tableContainer.innerHTML = `
        <table id="data-table" class="display" style="width:100%">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Сообщение</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `;

    const tbody = tableContainer.querySelector('tbody');
    data.forEach(item => {
        const row = `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.body}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
    });

    $('#data-table').DataTable({
        paging: true,
        searching: true,
        responsive: true,
        language: {
            search: "Поиск:",
            lengthMenu: "Показать _MENU_ записей",
            info: "Показаны _START_ - _END_ из _TOTAL_ записей",
            paginate: {
                first: "Первая",
                last: "Последняя",
                next: "Следующая",
                previous: "Предыдущая"
            }
        }
    });
}
