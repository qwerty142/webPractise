document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tableForm');
    const tableContainer = document.getElementById('tableContainer');
    const loadParamsButton = document.getElementById('loadParams');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const days = parseInt(document.getElementById('days').value, 10);
        const lessons = parseInt(document.getElementById('lessons').value, 10);
        const language = document.getElementById('language').value;

        localStorage.setItem('tableParams', JSON.stringify({ days, lessons, language }));

        generateTable(days, lessons, language);
    });

    loadParamsButton.addEventListener('click', () => {
        const savedParams = JSON.parse(localStorage.getItem('tableParams'));
        if (savedParams) {
            document.getElementById('days').value = savedParams.days;
            document.getElementById('lessons').value = savedParams.lessons;
            document.getElementById('language').value = savedParams.language;
        } else {
            alert('Параметры не сохранены!');
        }
    });

    function generateTable(days, lessons, language) {
        tableContainer.innerHTML = '';

        const table = document.createElement('table');
        table.classList.add('schedule-table');

        const headers = language === 'ru'
            ? ['День', 'Урок 1', 'Урок 2', 'Урок 3', 'Урок 4', 'Урок 5']
            : ['Day', 'Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4', 'Lesson 5'];

        const headerRow = document.createElement('tr');
        headers.slice(0, lessons + 1).forEach((header) => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        const daysOfWeek = language === 'ru'
            ? ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
            : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        for (let i = 0; i < days; i++) {
            const row = document.createElement('tr');
            const dayCell = document.createElement('td');
            dayCell.textContent = daysOfWeek[i];
            row.appendChild(dayCell);

            for (let j = 0; j < lessons; j++) {
                const cell = document.createElement('td');
                cell.textContent = `-`;
                row.appendChild(cell);
            }

            table.appendChild(row);
        }

        tableContainer.appendChild(table);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const main = document.querySelector('.main');

    if (header && main) {
        const headerHeight = header.offsetHeight;
        main.style.paddingTop = `${headerHeight}px`;
    }
});
