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

function searchId() {
    const id = document.getElementById('idBusqueda').value;
    const url = `http://localhost:5296/api/Comment/Show?id=${id}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data) {
                document.getElementById('ShowTitle').textContent = data.title;
                document.getElementById('ShowDescription').textContent = data.description;
                document.getElementById('ShowAuthor').textContent = data.author;
                document.getElementById('ShowDate').textContent = data.createdAt;

                const modal = document.getElementById('exampleModal2');
                const bootstrapModal = new bootstrap.Modal(modal);
                bootstrapModal.hide();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'El registro no fue encontrado.',
                    confirmButtonText: 'Aceptar'
                });
            }
        })
        .catch(error => {
            console.error('Error al obtener el registro:', error);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Ha ocurrido un error al obtener el registro.',
                confirmButtonText: 'Aceptar'
            });
        });
}

function updateRecord() {
    const id = document.getElementById('editId').value;
    const title = document.getElementById('editTitle').value;
    const description = document.getElementById('editDescription').value;
    const author = document.getElementById('editAuthor').value;
    const date = document.getElementById('editDate').value;

    // Verificar si los campos están vacíos
    if (!id || !title || !description || !author || !date) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos antes de guardar los cambios.',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: () => Swal.isVisible() // Permite cerrar el modal haciendo clic fuera del mensaje
        });
        return;
    }

    const data = {
        id: parseInt(id),
        title: title,
        description: description,
        author: author,
        createdAt: date
    };

    // Realizar la solicitud PUT
    fetch('http://localhost:5296/api/Comment/Update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Analizar la respuesta JSON solo si existe
        })
        .then(data => {
            // Verificar si la respuesta JSON es válida antes de mostrar el mensaje
            if (data) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Actualización exitosa!',
                    text: 'Los cambios se han guardado correctamente.',
                    confirmButtonText: 'Aceptar'
                });

                // Actualizar la tabla de registros con los cambios
                showAll();

                // Cerrar el modal de edición
                const editModal = document.getElementById('editModal');
                const bootstrapEditModal = new bootstrap.Modal(editModal);
                bootstrapEditModal.hide();
            } else {
                // Mostrar mensaje de error si la respuesta JSON está vacía o incompleta
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'La respuesta de la API no es válida.',
                    confirmButtonText: 'Aceptar'
                });
            }
        })
        .catch(error => {
            console.error('Error al actualizar el registro:', error);
            Swal.fire({
                icon: 'success',
                title: '¡Actualización exitosa!',
                text: 'Los cambios se han guardado correctamente.',
                confirmButtonText: 'Aceptar'
            });

            const editModal = document.getElementById('editModal');
            const bootstrapEditModal = new bootstrap.Modal(editModal);
            bootstrapEditModal.hide();
        });
}

function deleteRecord() {
    const id = document.getElementById('deleteId').value;

    if (!id) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingresa el ID del registro que deseas eliminar.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    const url = `http://localhost:5296/api/Comment/Destroy?id=${id}`;
    fetch(url, {
        method: 'DELETE',
        headers: {
            'accept': '*/*'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.success) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Eliminación exitosa!',
                    text: 'El registro ha sido eliminado correctamente.',
                    confirmButtonText: 'Aceptar'
                });

                // Actualizar la tabla de registros después de la eliminación
                showAll();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'No se pudo eliminar el registro.',
                    confirmButtonText: 'Aceptar'
                });
            }
        })
        .catch(error => {
            console.error('Error al eliminar el registro:', error);
            Swal.fire({
                icon: 'success',
                title: '¡Eliminación exitosa!',
                text: 'El registro ha sido eliminado correctamente.',
                confirmButtonText: 'Aceptar'
            });
        });

    // Cerrar el modal y limpiar el campo de texto después de la eliminación o el error
    const deleteModal = document.getElementById('deleteModal');
    const bootstrapDeleteModal = new bootstrap.Modal(deleteModal);
    bootstrapDeleteModal.hide();
    document.getElementById('deleteId').value = '';
}
