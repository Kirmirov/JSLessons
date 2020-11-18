const countTimer = deadline => {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaning = () => {
        let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor((timeRemaining / 60 / 60)/24);
        return {timeRemaining, hours, minutes, seconds};
    };

    const formatTime = data => {
        if (data < 10) return '0' + data;
        else return data;
    };

    const timerUpdate = () => {
        let timer = getTimeRemaning();
        timerHours.textContent = formatTime(timer.hours);
        timerMinutes.textContent = formatTime(timer.minutes);
        timerSeconds.textContent = formatTime(timer.seconds);
        if (timer.timeRemaining < 0) {
            clearInterval(call);
            document.getElementById('timer').style.color = 'red';
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }
    };
    timerUpdate();
    const call = setInterval(timerUpdate, 1000);
};

export default countTimer;