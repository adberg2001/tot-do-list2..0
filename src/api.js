const someUrl = `http://localhost:3000`;

const error = document.querySelector('.error');
const editError = (err) => {
    console.log(err);
    error.textContent = err;
    error.style.border = "5px solid rgb(6, 0, 255)";
    error.style.backgroundColor = "#fffa00";
};

export default {
    createLst: () => {
        return fetch(`${someUrl}/list`)
            .then( response => {
                if (!response.ok) throw  new Error('Ошибка загрузки списка заметок');
                return response.json()})
    },
    createTask: (text, done, desc, color) => {
        return fetch(`${someUrl}/add`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                text: text,
                done: done,
                desc: desc,
                color: color
            })
        })
            .then(response => {
                if (!response.ok) throw new Error("Ошибка, вас взломали!")
            })
            .catch((err) => {
                editError(err)
            })
    },
    editHeadOfList: (id, text) => {
        return fetch(`${someUrl}/edit/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text: text}),
        })
            .then(response => {
                if (!response.ok) throw new Error('Ошибка с редактированием!')
            })
            .catch((err) => {
                editError(err)
            })
    },
    editDescOfList: (id, text) => {
        return fetch(`${someUrl}/edit/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text: text}),
        })
            .then(response => {
                if (!response.ok) throw new Error('Ошибка с редактированием!')
            })
            .catch((err) => {
                editError(err)
            })
    },
    doneTask: (id, text) => {
        return fetch(`${someUrl}/edit/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({done: text}),
        }).then(response => {
            if (!response.ok) throw new Error("Ошибка с выполнением задачи!")
        })
            .catch((err) => {
                editError(err)
            })
    },
    deleteTask: (id) => {
        return fetch(`${someUrl}/delete/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            if (!response.ok) throw new Error("Ошибка с удалением!")
        }).catch((err) => {
                editError(err)
            })
    },
    changeBg: (color, id) => {
        return fetch(`${someUrl}/edit/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({color: color}),
        }).then(response => {
            if (!response.ok) throw new Error("Ошибка с выполнением задачи!")
        })
            .catch((err) => {
                editError(err)
            })
    }
}