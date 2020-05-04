const someUrl = `http://localhost:3000`;

// const makeList = (row) => {
//     const list = document.getElementById('row');
//     const liCont = setAtr('div', 'class', 'li-cont');
//     const li = setAtr('li', 'class', 'li', row.text);
//     if (!row.done) {
//         li.style.textDecoration = 'line-through';
//     }
//
//     const remasterBtn = setAtr('button', 'class', 'remasterBtn', 'Редактировать');
//     const doneBtn = setAtr('button', 'class', "doneBtn", row.done ? 'Сделано' : "Не сделано");
//     const descBtn = setAtr('button', 'class', 'descBtn', 'Описание');
//     const liDelete = setAtr('button', 'class', "li-delete", 'Удалить');
//
//     doneBtn.onclick = () => {
//         row.done === false ?
//             api.doneTask(row.id, true) :
//             api.doneTask(row.id, false);
//     };
//     liDelete.onclick = () => {
//         api.deleteTask(row.id)
//     };
//     descBtn.onclick = () => {
//         if (!descBtn.hasAttribute('data-value')) {
//             api.openDesc(descBtn, row.id);
//             descBtn.setAttribute('data-value', 'true');
//         } else {
//             descBtn.removeAttribute('data-value');
//             descBtn.parentNode.lastChild.classList.toggle('pNone')
//         }
//     };
//     remasterBtn.onclick = () => {
//         const input = setAtr('input', 'placeholder', liCont.firstChild.textContent);
//         input.classList.add('createInput');
//         li.textContent = '';
//         liCont.replaceChild(input, liCont.firstChild);
//         remasterBtn.disabled = true;
//         input.onchange = () => {
//             api.editTask(row.id, input.value);
//             remasterBtn.disabled = false;
//         }
//     };
//
//     liCont.appendChild(li);
//     liCont.appendChild(remasterBtn);
//     liCont.appendChild(descBtn);
//     liCont.appendChild(doneBtn);
//     liCont.appendChild(liDelete);
//     list.appendChild(liCont);
// };

const getList = () => {
    fetch(`${someUrl}/list`)
        .then(response => {
            if (!response.ok) throw new Error("Невозможно загрузить данные, пожалуйтса, перезагрузите стр!");
            return response.json()
        })
        .then(data => {

        })
        .catch((err) => {
            editError(err);
        });
};

getList();

const createList = () => {
    fetch(`${someUrl}/list`)
        .then(response => {
            if (!response.ok) throw new Error("Невозможно загрузить данные, пожалуйтса, перезагрузите стр!");
            return response.json()
        })
        .then(data => {
            const list = document.getElementById('row');
            list.innerHTML = '';
            data.forEach((d) => array.push(d));
        })
        .catch((err) => {
            editError(err);
        });
};

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
    startCreateList : () => createList(),
    getArray: () => getList()
}