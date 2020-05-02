const localHost = `http://localhost:3000`;

import index from './index'

export default {
    createTask: (text, done, desc) => {
        fetch(`${localHost}/add`, {
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
            .then(() => index.createList())
            .catch((err) => {
                index.editError(err)
            })
    },
    editTask: (id, text) => {
        fetch(`${localHost}/edit/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text: text}),
        })
            .then(response => {
                if (!response.ok) throw new Error('Ошибка с редактированием!')
            })
            .then(() => index.createList())
            .catch((err) => {
                index.editError(err)
            })
    },
    doneTask: (id, text) => {
        fetch(`${localHost}/edit/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({done: text}),
        }).then(response => {
            if (!response.ok) throw new Error("Ошибка с выполнением задачи!")
        })
            .then(() => index.createList())
            .catch((err) => {
                index.editError(err)
            })
    },
    deleteTask: (id) => {
        fetch(`${localHost}/delete/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            if (!response.ok) throw new Error("Ошибка с удалением!")
        })
            .then(() => index.createList())
            .catch((err) => {
                index.editError(err)
            })
    },
    openDesc: (descBtn, id) => {
        const p = document.createElement('p');
        fetch(`${localHost}/list/${id}`)
            .then(response => response.json())
            .then(data => {
                p.textContent = data.desc;
                descBtn.parentNode.appendChild(p);
            });
    },
    setAtr: (tag, atr, atrName, text) => {
        const el = document.createElement(tag);
        el.setAttribute(atr, atrName);
        el.textContent = text;
        return el;
    }
}