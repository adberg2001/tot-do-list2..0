const setAtr = (tag, atr, atrName, text) => {
    const el = document.createElement(tag);
    el.setAttribute(atr, atrName);
    el.textContent = text;
    return el;
};

export default {
    rangAll: (open, close) => {
        getTotalDone(open, close)
    }
}

const getTotalDone = (open, close) => {
    const row = document.getElementById('row');

    const openedCont = document.querySelector('.opened-cont');
    const closedCont = document.querySelector('.closed-cont');

    const openRinger = document.getElementById('openRinger');
    const closeRinger = document.getElementById('closeRinger');

    const opened = document.getElementById('opened');
    const closed = document.getElementById('closed');

    const rangeEmpty = document.querySelector('.rangeEmpty');
    const listEmpty = setAtr(
        'div',
        'class',
        'empty ml-4',
        `заметок пока нет`
    );
    const img = setAtr('img', 'src', 'img/lightVector.svg');

    let total = open + close;

    if (open === 0 && close === 0) {
        row.setAttribute('class', 'justify-content-lg-center');
        openedCont.style.display = 'none';
        closedCont.style.display = 'none';

        rangeEmpty.style.display = 'unset';
        img.style.display = 'unset';
        listEmpty.style.display = 'unset';

        opened.textContent = open;
        closed.textContent = close;
    } else {
        row.setAttribute('class', ' justify-content-lg-between');
        rangeEmpty.style.display = 'none';
        listEmpty.style.display = 'none';
        img.style.display = 'none';
        openedCont.style.display = 'unset';
        closedCont.style.display = 'unset';
    }

    opened.textContent = open;
    closed.textContent = close;
    opened.style.display = 'unset';
    closed.style.display = 'unset';

    openRinger.style.width = `${(open * 100) / total}%`;
    closeRinger.style.width = `${(close * 100) / total}%`;

    row.appendChild(img);
    row.appendChild(listEmpty);
};