const firstTimeBox = document.querySelector('.first');

setInterval(start, 1000);

function start () {
    let date = new Date();
    firstTimeBox.innerHTML = goodDay (date);
};

function getDayPart (date){
    let hour = date.getHours();
    if(hour >= 5 && hour < 11) return 'Доброе утро';
    else if(hour >= 11 && hour < 16) return 'Добрый день';
    else if(hour >= 16 && hour <= 23) return 'Добрый вечер';
    else return 'Доброй ночи';
};

function getDayName (date){
    let day = date.toLocaleString('ru', { weekday: 'long' });
    let bigDay = date.toLocaleString('ru', { weekday: 'narrow' });
    return day.replace(day[0], bigDay);
};

function getCerrentTime (date){
    let time = date.toLocaleString('ru', { hour: 'numeric', minute: 'numeric', second: 'numeric' }); 
    return time;
};

function getDayBefore(date){
    const newYear = date.getFullYear();
        let nextDate = new Date(`December 31, ${newYear}`);
        let msPerDay = 24*60*60*1000;
        let daysLeft = Math.round((nextDate.getTime() - date.getTime())/msPerDay);
        let dayname = '';
        let ds = '' + daysLeft;
        let dd = parseInt(ds.substr(ds.length-1));
        if(daysLeft > 4 && daysLeft < 21) dayname = " дней";
        else if(dd == 1) dayname = " день";
        else if(dd == 2 || dd == 3 || dd == 4) dayname = " дня";
        else dayname = " дней";
        return `${daysLeft} ${dayname}`;
};

function goodDay(date){
    let partOfDay = getDayPart(date);
    let nameOfDay = getDayName(date);
    let currentTime = getCerrentTime(date);
    let dayBefore = getDayBefore(date);
    return `${partOfDay} <br/>
            Сегодня: ${nameOfDay} <br/>
            Текущее время: ${currentTime} PM <br/>
            До Нового года осталось ${dayBefore}`;
};