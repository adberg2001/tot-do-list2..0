const createList = (row) => {
    const list = document.getElementById('row');
    const liCont = setAtr('div', 'class', 'li-cont');
    const li = setAtr('li', 'class', 'li', row.text);
    if (!row.done) {
        li.style.textDecoration = 'line-through';
    }

    const remasterBtn = setAtr('button', 'class', 'remasterBtn', 'Редактировать');
    const doneBtn = setAtr('button', 'class', "doneBtn", row.done ? 'Сделано' : "Не сделано");
    const descBtn = setAtr('button', 'class', 'descBtn', 'Описание');
    const liDelete = setAtr('button', 'class', "li-delete", 'Удалить');

    doneBtn.onclick = () => {
        row.done === false ?
            doneTask(row.id, true) :
            doneTask(row.id, false);
    };
    liDelete.onclick = () => {
        deleteTask(row.id)
    };
    descBtn.onclick = () => {
        if (!descBtn.hasAttribute('data-value')) {
            openDesc(descBtn, row.id);
            descBtn.setAttribute('data-value', 'true');
        } else {
            descBtn.removeAttribute('data-value');
            descBtn.parentNode.lastChild.classList.toggle('pNone')
        }
    };
    remasterBtn.onclick = () => {
        const input = setAtr('input', 'placeholder', liCont.firstChild.textContent);
        input.classList.add('createInput');
        li.textContent = '';
        liCont.replaceChild(input, liCont.firstChild);
        remasterBtn.disabled = true;
        input.onchange = () => {
            editTask(row.id, input.value);
            remasterBtn.disabled = false;
        }
    };

    liCont.appendChild(li);
    liCont.appendChild(remasterBtn);
    liCont.appendChild(descBtn);
    liCont.appendChild(doneBtn);
    liCont.appendChild(liDelete);
    list.appendChild(liCont);
};


const startCreatList = () => {
    fetch('http://localhost:3000/list')
        .then(response => {
            if (!response.ok) throw new Error("Невозможно загрузить данные, пожалуйтса, перезагрузите стр!");
            return response.json()
        })
        .then(data => {
            const list = document.getElementById('row');
            list.innerHTML = '';
            data.forEach(function (row) {
                createList(row);
            });
        })
        .catch((err) => {
            editError(err);
        })
};

const createTask = (text, done, desc) => {
    fetch('http://localhost:3000/add', {
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
        .then(() => startCreatList())
        .catch((err) => {
            editError(err)
        })
};

const editTask = (id, text) => {
    fetch(`http://localhost:3000/edit/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text: text}),
    })
        .then(response => {
            if (!response.ok) throw new Error('Ошибка с редактированием!')
        })
        .then(() => startCreatList())
        .catch((err) => {
            editError(err)
        })
};

const doneTask = (id, text) => {
    fetch(`http://localhost:3000/edit/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({done: text}),
    }).then(response => {
        if (!response.ok) throw new Error("Ошибка с выполнением задачи!")
    })
        .then(() => startCreatList())
        .catch((err) => {
            editError(err)
        })
};

const deleteTask = (id) => {
    fetch(`http://localhost:3000/delete/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }).then(response => {
        if (!response.ok) throw new Error("Ошибка с удалением!")
    })
        .then(() => startCreatList())
        .catch((err) => {
            editError(err)
        })
};

const openDesc = (descBtn, id) => {
    const p = document.createElement('p');
    fetch(`http://localhost:3000/list/${id}`)
        .then(response => response.json())
        .then(data => {
            p.textContent = data.desc;
            descBtn.parentNode.appendChild(p);
        });
};

const setAtr = (tag, atr, atrName, text) => {
    const el = document.createElement(tag);
    el.setAttribute(atr, atrName);
    el.textContent = text;
    return el;
};

const editError = (err) => {
    console.log(err);
    error.textContent = err;
    error.style.border = "5px solid rgb(6, 0, 255)";
    error.style.backgroundColor = "#fffa00";
    error2.textContent = err;
    error2.style.border = "5px solid rgb(6, 0, 255)";
    error2.style.backgroundColor = "#fffa00";
};

const headerRow = document.getElementById('header-row');
const textArea = document.getElementById('text');
const addBtn = document.getElementById('input-btn');

const error = document.querySelector('.error');
const error2 = document.querySelector('.error2');

startCreatList();

addBtn.addEventListener('click', () => {
    if (headerRow.value && textArea.value) {
        createTask(headerRow.value, true, textArea.value)
    } else {
        headerRow.setAttribute('placeholder', 'Не оставляйте поле пустым!');
        textArea.setAttribute('placeholder', 'Не оставляйте поле пустым!');
    }
});