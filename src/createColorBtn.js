const setAtr = (tag, atr, atrName, text) => {
    const el = document.createElement(tag);
    el.setAttribute(atr, atrName);
    el.textContent = text;
    return el;
};

const setBorderToInput = (input) => {
    input.setAttribute('id', 'checkedInput')
};
const color = [
    {
        name: "white",
        color: '#FFFBE3'
    }, {
        name: "pink",
        color: "#FFD2D2"
    }, {
        name: 'gray',
        color: '#D3D2FF'
    }, {
        name: 'blue',
        color: '#D7FDD1'
    }, {
        name: 'yellow',
        color: '#F8E1B6'
    }];

export default {
    createColorBtn: (row, colorCont) => {

        color.forEach((c) => {
            const colorLabel = setAtr('label', 'id', `${c.name}label`);
            colorLabel.setAttribute('class', 'color-label');

            const colorRadio = setAtr('input', 'type', 'radio');
            colorRadio.setAttribute('name', `${row.id}radio`);
            colorRadio.setAttribute('value', `${c.color}`);

            const colorCircle = setAtr('div', 'class', `color-circle ${c.name}-color-btn`);
            if (row.color === c.color) setBorderToInput(colorCircle);
            colorLabel.appendChild(colorRadio);
            colorLabel.appendChild(colorCircle);
            colorCont.appendChild(colorLabel);
        });
    }
};