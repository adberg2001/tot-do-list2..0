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
    const range = document.querySelector('.range');

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
    } else if (open > 0 || close > 0) {
        row.setAttribute('class', ' justify-content-lg-between');
        rangeEmpty.style.display = 'none';
        listEmpty.style.display = 'none';
        img.style.display = 'none';
        openedCont.style.display = 'unset';
        closedCont.style.display = 'unset';
    } else {
        console.log(open, close);
        rangeEmpty.style.display = 'none';
        listEmpty.style.display = 'none';
        img.style.display = 'none';
        openedCont.style.display = 'none';
        closedCont.style.display = 'none';

        const Error = setAtr('div', 'class', 'redError ml-4', 'Ошибка загрузки статистики');
        openedCont.parentNode.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="#B01E1E"/>
</svg>

        `;
        row.style.flexWrap = 'unset'

        range.style.flexDirection = 'row';
        range.style.justifyContent = 'start';
        range.style.alignItems = 'center';
        range.style.paddingLeft = '41px';
        range.appendChild(Error);
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