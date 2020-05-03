import api from './api';

const makeList = (row) => {
    const list = document.getElementById('row');
    const liCont = api.setAtr('div', 'class', 'li-cont');
    const li = api.setAtr('li', 'class', 'li', row.text);
    if (!row.done) {
        li.style.textDecoration = 'line-through';
    }

    const remasterBtn = api.setAtr('button', 'class', 'remasterBtn', 'Редактировать');
    const doneBtn = api.setAtr('button', 'class', "doneBtn", row.done ? 'Сделано' : "Не сделано");
    const descBtn = api.setAtr('button', 'class', 'descBtn', 'Описание');
    const liDelete = api.setAtr('button', 'class', "li-delete", 'Удалить');

    doneBtn.onclick = () => {
        row.done === false ?
            api.doneTask(row.id, true) :
            api.doneTask(row.id, false);
    };
    liDelete.onclick = () => {
        api.deleteTask(row.id)
    };
    descBtn.onclick = () => {
        if (!descBtn.hasAttribute('data-value')) {
            api.openDesc(descBtn, row.id);
            descBtn.setAttribute('data-value', 'true');
        } else {
            descBtn.removeAttribute('data-value');
            descBtn.parentNode.lastChild.classList.toggle('pNone')
        }
    };
    remasterBtn.onclick = () => {
        const input = api.setAtr('input', 'placeholder', liCont.firstChild.textContent);
        input.classList.add('createInput');
        li.textContent = '';
        liCont.replaceChild(input, liCont.firstChild);
        remasterBtn.disabled = true;
        input.onchange = () => {
            api.editTask(row.id, input.value);
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


const createList = () => {
    fetch(`http://localhost:3000/list`)
        .then(response => {
            if (!response.ok) throw new Error("Невозможно загрузить данные, пожалуйтса, перезагрузите стр!");
            return response.json()
        })
        .then(data => {
            const list = document.getElementById('row');
            list.innerHTML = '';
            data.forEach(function (row) {
                makeList(row);
            });
        })
        .catch((err) => {
            editError(err);
        })
};

const headerRow = document.getElementById('header-row');
const textArea = document.getElementById('text');
const addBtn = document.getElementById('input-btn');

const error = document.querySelector('.error');

createList();

addBtn.addEventListener('click', () => {
    if (headerRow.value && textArea.value) {
        api.createTask(headerRow.value, true, textArea.value)
    } else {
        headerRow.setAttribute('placeholder', 'Не оставляйте поле пустым!');
        textArea.setAttribute('placeholder', 'Не оставляйте поле пустым!');
    }
});

const editError = (err) => {
    console.log(err);
    error.textContent = err;
    error.style.border = "5px solid rgb(6, 0, 255)";
    error.style.backgroundColor = "#fffa00";
};

export default {
    editError : (err) => {
        console.log(err);
        error.textContent = err;
        error.style.border = "5px solid rgb(6, 0, 255)";
        error.style.backgroundColor = "#fffa00";
    },
    createList : () => {
        fetch(`http://localhost:3000/list`)
            .then(response => {
                if (!response.ok) throw new Error("Невозможно загрузить данные, пожалуйтса, перезагрузите стр!");
                return response.json()
            })
            .then(data => {
                const list = document.getElementById('row');
                list.innerHTML = '';
                data.forEach(function (row) {
                    makeList(row);
                });
            })
            .catch((err) => {
                editError(err);
            })
    }
}