let week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    date = new Date(),
    toDay = date.getDay() - 1;

for(let key in week){
    let dayBox = document.createElement('div');
    document.body.append(dayBox);
    if (key == toDay) dayBox.innerHTML = " <strong>" + week[key]  + "</strong>";
    else if (key >= 5) dayBox.innerHTML = " <i>" + week[key]  + "</i>";
    else dayBox.innerHTML = week[key];
};