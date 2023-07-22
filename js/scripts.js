function sendDataToEndpoint(data) {
    const jsonData = JSON.stringify(data);


    const url = 'http://localhost:5296/api/Comment/Store';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: 'Los datos se han guardado correctamente.',
                confirmButtonText: 'Aceptar'
            });
        })
        .catch(error => {

            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Ha ocurrido un error al guardar los datos.',
                confirmButtonText: 'Aceptar'
            });
        });
}


function add() {

    const title = document.getElementById('a').value;
    const description = document.getElementById('b').value;
    const author = document.getElementById('c').value;
    const d = new Date(document.getElementById('d').value);
    const data = {
        title: title,
        description: description,
        author: author,
        createdAt: d
    };

    sendDataToEndpoint(data);

    const modal = document.getElementById('exampleModal');
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.hide();

    document.getElementById('a').value = '';
    document.getElementById('b').value = '';
    document.getElementById('c').value = '';
    document.getElementById('d').value = '';
}

function showAll() {
    const url = 'http://localhost:5296/api/Comment';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateTable(data);
        })
        .catch(error => {
            console.error('Error al obtener los registros:', error);
        });
}

function updateTable(records) {
    const tableBody = document.querySelector('tbody');

    tableBody.innerHTML = '';

    records.forEach((record, index) => {
        const newRow = tableBody.insertRow();

        const numberCell = newRow.insertCell(0);
        numberCell.textContent = index + 1;

        const titleCell = newRow.insertCell(1);
        titleCell.textContent = record.title;

        const descriptionCell = newRow.insertCell(2);
        descriptionCell.textContent = record.description;

        const authorCell = newRow.insertCell(3);
        authorCell.textContent = record.author;

        const creationDateCell = newRow.insertCell(4);
        creationDateCell.textContent = record.createdAt;
    });
}