import api from './api.js';
import range from './ranging.js';

const makeList = (row) => {
    const list = document.getElementById('row');
    const p = setAtr('p', null, null, row.desc);
    const liCont = setAtr('div', 'class', 'li-cont');

    const liDelete = setAtr('button', 'class', "li-delete");
    liDelete.style.backgroundImage = "url('img/delete.svg')";

    liCont.style.backgroundColor = row.color;
    const li = setAtr('li', 'class', 'li', row.text);
    if (!row.done) {
        li.style.textDecoration = 'line-through';
    }

    const doneBtn = setAtr('button', 'class', "doneBtn");
    doneBtn.innerHTML = ` 
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path id='${row.id}' d="M15 0C6.71652 0 0 6.71652 0 15C0 23.2835 6.71652 30 15 30C23.2835 30 30 23.2835 30 15C30 6.71652 23.2835 0 15 0ZM21.4788 10.1016L14.4275 19.8783C14.3289 20.0159 14.199 20.128 14.0485 20.2053C13.8979 20.2826 13.7312 20.323 13.5619 20.323C13.3927 20.323 13.2259 20.2826 13.0754 20.2053C12.9249 20.128 12.795 20.0159 12.6964 19.8783L8.5212 14.0926C8.39397 13.9152 8.5212 13.6674 8.73884 13.6674H10.3092C10.6507 13.6674 10.9754 13.8315 11.1763 14.1127L13.5603 17.4208L18.8237 10.1217C19.0246 9.84375 19.346 9.67634 19.6908 9.67634H21.2612C21.4788 9.67634 21.606 9.92411 21.4788 10.1016Z" fill="current-color"/>
</svg>
    `;
    row.done ?
        doneBtn.style.backgroundImage = "url('../img/icon.svg')" :
        doneBtn.style.backgroundImage = "url('../img/greenIcon.svg')";

    const colorCont = setAtr('div', 'class', 'color-cont');
    const whiteLabel = setAtr('label', 'class', 'color-label');
    const pinkLabel = setAtr('label', 'class', 'color-label');
    const grayLabel = setAtr('label', 'class', 'color-label');
    const blueLabel = setAtr('label', 'class', 'color-label');
    const yellowLabel = setAtr('label', 'class', 'color-label');

    const whiteRadio = setAtr('input', 'type', 'radio');
    whiteRadio.setAttribute('name', row.id);

    const pinkRadio = setAtr('input', 'type', 'radio');
    pinkRadio.setAttribute('name', row.id);

    const grayRadio = setAtr('input', 'type', 'radio');
    grayRadio.setAttribute('name', row.id);

    const blueRadio = setAtr('input', 'type', 'radio');
    blueRadio.setAttribute('name', row.id);

    const yellowRadio = setAtr('input', 'type', 'radio');
    yellowRadio.setAttribute('name', row.id);


    const whiteCircle = setAtr('div', 'class', 'color-circle white-color-btn');
    const pinkCircle = setAtr('div', 'class', 'color-circle pink-color-btn');
    const grayCircle = setAtr('div', 'class', 'color-circle gray-color-btn');
    const blueCircle = setAtr('div', 'class', 'color-circle blue-color-btn');
    const yellowCircle = setAtr('div', 'class', 'color-circle yellow-color-btn');

    if (row.color === '#FFFBE3') setBorderToInput(whiteCircle);
    if (row.color === "#FFD2D2") setBorderToInput(pinkCircle);
    if (row.color === "#D3D2FF") setBorderToInput(grayCircle);
    if (row.color === "#D7FDD1") setBorderToInput(blueCircle);
    if (row.color === "#F8E1B6") setBorderToInput(yellowCircle);

    whiteRadio.addEventListener('change', () => {
        api.changeBg('#FFFBE3', row.id)
            .then(() => getList());
    });
    pinkRadio.addEventListener('change', () => {
        api.changeBg('#FFD2D2', row.id)
            .then(() => getList());
    });
    grayRadio.addEventListener('change', () => {
        api.changeBg('#D3D2FF', row.id)
            .then(() => getList());
    });
    blueRadio.addEventListener('change', () => {
        api.changeBg('#D7FDD1', row.id)
            .then(() => getList());
    });
    yellowRadio.addEventListener('change', () => {
        api.changeBg('#F8E1B6', row.id)
            .then(() => getList());
    });


    doneBtn.onclick = () => {
        api.doneTask(row.id, !row.done)
            .then(() => getList())
    };
    liDelete.onclick = () => {
        api.deleteTask(row.id)
            .then(() => getList());
    };
    li.onclick = () => {
        const input = setAtr('input', 'placeholder', liCont.firstChild.textContent);
        input.classList.add('createInput');
        li.textContent = '';
        liCont.replaceChild(input, liCont.firstChild);
        input.onchange = () => {
            api.editHeadOfList(row.id, input.value)
                .then(() => getList());
        };
    };
    p.onclick = () => {
        const input = setAtr('textarea', 'placeholder', liCont.children[2].textContent);
        input.classList.add('descInput');
        p.textContent = '';
        liCont.replaceChild(input, liCont.children[2]);
        input.onchange = () => {
            api.editDescOfList(row.id, input.value)
                .then(() => getList());
        };
    };

    whiteLabel.appendChild(whiteRadio);
    whiteLabel.appendChild(whiteCircle);
    pinkLabel.appendChild(pinkRadio);
    pinkLabel.appendChild(pinkCircle);
    grayLabel.appendChild(grayRadio);
    grayLabel.appendChild(grayCircle);
    blueLabel.appendChild(blueRadio);
    blueLabel.appendChild(blueCircle);
    yellowLabel.appendChild(yellowRadio);
    yellowLabel.appendChild(yellowCircle);

    colorCont.appendChild(whiteLabel);
    colorCont.appendChild(pinkLabel);
    colorCont.appendChild(grayLabel);
    colorCont.appendChild(blueLabel);
    colorCont.appendChild(yellowLabel);

    liCont.appendChild(li);
    liCont.appendChild(doneBtn);
    liCont.appendChild(p);
    liCont.appendChild(colorCont);
    liCont.appendChild(liDelete);
    list.appendChild(liCont);
};

const getList = () => {
    const list = document.getElementById('row');

    let open = 0; let close = 0;
    list.innerHTML = '';
    api.createLst()
        .then((list) => {
            list.forEach(l => l.done ? open ++ : close ++);
            range.rangAll(open, close);
            return list;
        })
        .then(list => {
            list.forEach(l => {
                makeList(l)
            })
        })
};

getList();

const setAtr = (tag, atr, atrName, text) => {
    const el = document.createElement(tag);
    el.setAttribute(atr, atrName);
    el.textContent = text;
    return el;
};

const setBorderToInput = (input) => {
    input.setAttribute('id', 'checkedInput')
};

const headerRow = document.getElementById('header-row');
const textArea = document.getElementById('text');
const addBtn = document.getElementById('input-btn');
const colorInput = document.querySelectorAll('.color-input');
let variableColor = '#FFFBE3';

colorInput.forEach((input) => {
    input.addEventListener('change', () => {
        variableColor = `${input.value}`;
    });
});

addBtn.addEventListener('click', () => {
    if (headerRow.value && textArea.value) {
        api.createTask(headerRow.value, true, textArea.value, variableColor)
            .then(() => getList());
    } else {
        headerRow.setAttribute('placeholder', 'Не оставляйте поле пустым!');
        textArea.setAttribute('placeholder', 'Не оставляйте поле пустым!');
    }
});