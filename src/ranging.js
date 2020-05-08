import api from "./api.js";

const setAtr = (tag, atr, atrName, text) => {
    const el = document.createElement(tag);
    el.setAttribute(atr, atrName);
    el.textContent = text;
    return el;
};

export default {
    rangAll : (list) => {
        let close = 0;
        let open = 0;
        list.forEach(l => {
            l.done ? open++ : close++;
        });
        getTotalDone(open, close);
    },
    getMarkDone : ( done, id ) => {
        console.log(done, id);
        return done === false ?
            api.doneTask( id, true) :
            api.doneTask( id, false);
    }
}

const getTotalDone = (open, close) => {
    const rangeCont = document.querySelector('.range');
    const row = document.getElementById('row');
    const openedCont = document.querySelector('.opened-cont');
    const closedCont = document.querySelector('.closed-cont');
    const opened = document.getElementById('opened');
    const closed = document.getElementById('closed');
    const openRinger = document.getElementById('openRinger');
    const closeRinger = document.getElementById('closeRinger');
    let total = open + close;

    if (open === 0 && close === 0) {
        row.setAttribute('class', 'justify-content-lg-center');
        openedCont.style.display = 'none';
        closedCont.style.display = 'none';
        row.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 0.5C5.20156 0.5 0.5 5.20156 0.5 11C0.5 16.7984 5.20156 21.5 11 21.5C16.7984 21.5 21.5 16.7984 21.5 11C21.5 5.20156 16.7984 0.5 11 0.5ZM11.75 16.0625C11.75 16.1656 11.6656 16.25 11.5625 16.25H10.4375C10.3344 16.25 10.25 16.1656 10.25 16.0625V9.6875C10.25 9.58438 10.3344 9.5 10.4375 9.5H11.5625C11.6656 9.5 11.75 9.58438 11.75 9.6875V16.0625ZM11 8C10.7056 7.99399 10.4253 7.87282 10.2192 7.6625C10.0132 7.45218 9.89773 7.16945 9.89773 6.875C9.89773 6.58055 10.0132 6.29782 10.2192 6.0875C10.4253 5.87718 10.7056 5.75601 11 5.75C11.2944 5.75601 11.5747 5.87718 11.7808 6.0875C11.9868 6.29782 12.1023 6.58055 12.1023 6.875C12.1023 7.16945 11.9868 7.45218 11.7808 7.6625C11.5747 7.87282 11.2944 7.99399 11 8Z" fill="white"/>
</svg>

        `;
        const rangeEmpty = setAtr('div', 'class', 'listEmpty ml-4', 'заметок пока нет');
        const listEmpty = setAtr('div', 'class', 'listEmpty ml-4', 'заметок пока нет');
        opened.textContent = open;
        closed.textContent = close;

        rangeCont.appendChild(rangeEmpty);
        row.appendChild(listEmpty);
    }

    opened.textContent = open;
    closed.textContent = close;
    openRinger.style.width = `${(open * 100) / total}%`;
    closeRinger.style.width = `${(close * 100) / total}%`;
};