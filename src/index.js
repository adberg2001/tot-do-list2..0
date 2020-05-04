import api from './api.js';

const makeList = (row) => {
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
        const input = setAtr('input', 'placeholder', liCont.firstChild.textContent);
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

api.getList();

const setAtr =  (tag, atr, atrName, text) => {
    const el = document.createElement(tag);
    el.setAttribute(atr, atrName);
    el.textContent = text;
    return el;
};

const headerRow = document.getElementById('header-row');
const textArea = document.getElementById('text');
const addBtn = document.getElementById('input-btn');

addBtn.addEventListener('click', () => {
    if (headerRow.value && textArea.value) {
        api.createTask(headerRow.value, true, textArea.value)
    } else {
        headerRow.setAttribute('placeholder', 'Не оставляйте поле пустым!');
        textArea.setAttribute('placeholder', 'Не оставляйте поле пустым!');
    }
});
