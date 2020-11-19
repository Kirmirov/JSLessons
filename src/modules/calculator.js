import animate from './animate';

const calculator = (price = 1000) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');
    
    const calcValidate = () => {
        const calcInputs = document.querySelectorAll('input.calc-item'); 
        calcInputs.forEach(item => item.addEventListener('input', 
            () => item.value = item.value.replace(/\D/g, '')));
    };
    calcValidate();
    const countSum = () => {
        let total = 0,
        countValue = 1,
        dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if (calcCount.value > 1) countValue += (calcCount.value - 1) / 10;
        if (calcDay.value && calcDay.value < 5) dayValue *= 2;
        else if (calcDay.value && calcDay.value < 10) dayValue *= 1.5;
        if (typeValue && squareValue) total = price * typeValue * countValue * dayValue;
        
        animate ({
            duration: 500,
            timing(timeFraction) {
                return timeFraction;
            },
            draw(progress) {
                totalValue.textContent = Math.floor(progress * total);
            }
        });
    };
    calcBlock.addEventListener('keyup', evt => {
        const target = evt.target;
        if (target.matches('select') || target.matches('input')) countSum();
    });
};

export default calculator;