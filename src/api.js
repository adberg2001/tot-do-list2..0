const someUrl = `http://localhost:3000`;

const createList = () => {
    fetch(`http://localhost:3000/list`)
        .then(response => {
            if (!response.ok) throw new Error("Невозможно загрузить данные, пожалуйтса, перезагрузите стр!");
            return response.json()
        })
        .then(data => {
            const list = document.getElementById('row');
            list.innerHTML = '';
            getList(data);
        })
        .catch((err) => {
            editError(err);
        })
};

const getList = (data) => data.forEach( (li) => li );

const error = document.querySelector('.error');
const editError = (err) => {
    console.log(err);
    error.textContent = err;
    error.style.border = "5px solid rgb(6, 0, 255)";
    error.style.backgroundColor = "#fffa00";
};

export default {
    createTask: (text, done, desc) => {
        fetch(`${someUrl}/add`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                text: text,
                done: done,
                desc: desc
            })
        })
            .then(response => {
                if (!response.ok) throw new Error("Ошибка, вас взломали!")
            })
            .then(() => createList())
            .catch((err) => {
                editError(err)
            })
    },
    editTask: (id, text) => {
        fetch(`${someUrl}/edit/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text: text}),
        })
            .then(response => {
                if (!response.ok) throw new Error('Ошибка с редактированием!')
            })
            .then(() => createList())
            .catch((err) => {
                editError(err)
            })
    },
    doneTask: (id, text) => {
        fetch(`${someUrl}/edit/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({done: text}),
        }).then(response => {
            if (!response.ok) throw new Error("Ошибка с выполнением задачи!")
        })
            .then(() => createList())
            .catch((err) => {
                editError(err)
            })
    },
    deleteTask: (id) => {
        fetch(`${someUrl}/delete/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            if (!response.ok) throw new Error("Ошибка с удалением!")
        })
            .then(() => createList())
            .catch((err) => {
                editError(err)
            })
    },
    openDesc: (descBtn, id) => {
        const p = document.createElement('p');
        fetch(`${someUrl}/list/${id}`)
            .then(response => response.json())
            .then(data => {
                p.textContent = data.desc;
                descBtn.parentNode.appendChild(p);
            });
    },
    startCreateList: () => createList(),
    startGetList: () => getList()
}