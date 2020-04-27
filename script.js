const createRow = (row) => {
    const list = document.getElementById('row');
    const liCont = document.createElement('div');
    liCont.classList.add('li-cont');
    liCont.setAttribute('id', row.id);

    const li = document.createElement('li');
    li.classList.add('li');
    li.setAttribute('id', row.id);
    li.textContent = row.text;
    if (!row.done) {
        li.style.textDecoration = 'line-through';
    }

    const remasterBtn = document.createElement('button');
    remasterBtn.textContent = 'Редактировать';
    remasterBtn.setAttribute('data-number', row.id);
    remasterBtn.setAttribute('id', row.id);
    remasterBtn.classList.add("remasterBtn");

    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Сделано';
    doneBtn.setAttribute('data-number', row.id);
    doneBtn.setAttribute('data-value', row.done);
    doneBtn.setAttribute('id', row.id);
    doneBtn.classList.add("doneBtn");

    const liDelete = document.createElement('button');
    liDelete.textContent = 'Удалить';
    liDelete.setAttribute('data-number', row.id);
    liDelete.setAttribute('class', "li-delete");

    liCont.appendChild(li);
    liCont.appendChild(remasterBtn);
    liCont.appendChild(doneBtn);
    liCont.appendChild(liDelete);
    list.appendChild(liCont);
};


const createTask = (text, done, desc) => {
    fetch('http://localhost:3000/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            text: text,
            done: done,
            desc: desc
        }),
    })
        .then(() => window.location.reload())
};

const editTask = (id, body) => {
    fetch(`http://localhost:3000/edit/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text: body}),
    })
        .then(() => window.location.reload());
};

const doneTask = (id, body) => {
    fetch(`http://localhost:3000/edit/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({done: body}),
    })
        .then(() => window.location.reload());
};

const deleteTask = (id) => {
    fetch(`http://localhost:3000/delete/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });
};

const createInput = (id) => {
    const li = document.getElementById(`${id}`);
    const input = document.createElement('input');
    const reBtn = document.getElementById(`${id}`);
    input.setAttribute('placeholder', li.textContent);
    input.classList.add('createInput');

    li.textContent = "";
    li.appendChild(input);

    input.onchange = () => {
        editTask(id, input.value);
        reBtn.disabled = false;
    };
};

fetch('http://localhost:3000/list')
    .then(response => response.json())
    .then(json => {
        console.log(json);

        json.forEach(function (j) {
            createRow(j);
        })
    })
    .then(() => {
        const remasterBtn = document.querySelectorAll('.remasterBtn');
        remasterBtn.forEach((r) => {
            let id = r.getAttribute('data-number');
            r.addEventListener('click', () => {
                r.disabled = true;
                createInput(id);
            })
        })

    })
    .then(() => {
        const doneBtn = document.querySelectorAll('.doneBtn');

        doneBtn.forEach((d) => {
            let id = d.getAttribute('data-number');
            let done = d.getAttribute('data-value');
            d.addEventListener('click', () => {
                done === "false" ? doneTask(id, true) : doneTask(id, false);
            })
        })
    })
    .then(() => {
        const liDelete = document.querySelectorAll('.li-delete');

        liDelete.forEach(l => {
            let id = l.getAttribute('data-number');

            l.addEventListener('click', () => {
                deleteTask(id);
                window.location.reload();
            })
        })
    })
    .then(() => {
        const liCont = document.querySelectorAll('.li-cont');
        liCont.forEach((l) => {
            let disabled = false;
            let id = l.getAttribute('id');
            const p = document.createElement('p');

            l.addEventListener('click', () => {
                fetch(`http://localhost:3000/list/${id}`)
                    .then(response => response.json())
                    .then(data => {
                        p.textContent = data.desc;
                        return p;
                    });

                if (!disabled) {
                    l.appendChild(p);
                    disabled = true;
                } else {
                    const a = document.getElementById(`${id}`);

                    for (let i = 0; i < a.children.length; i++) {
                        if (a.children[i].tagName === 'P') {
                            console.log(a.children[i])
                            a.children[i].classList.toggle('pNone')
                        }
                    }
                }
            })
        })
    });

const headerRow = document.getElementById('header-row');
const textArea = document.getElementById('text');
const addBtn = document.getElementById('input-btn');

headerRow.onchange = () => {
    textArea.onchange = () => {
        addBtn.addEventListener('click', event => {
            createTask(headerRow.value, true, textArea.value)
        });
    }
};