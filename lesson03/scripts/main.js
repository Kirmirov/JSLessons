let lang = prompt('Введите обозначение языка ru или en'),
    ruDays = 'Понедельник, Вторник, Среда, Червег, Пятница, Суббота, Воскресенье',
    enDays = 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
    daysNames = new Map([
        ['ru', 'Понедельник, Вторник, Среда, Червег, Пятница, Суббота, Воскресенье'],
        ['en', 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday']
    ]);
    outputStr = daysNames.get(lang),
    namePerson = prompt('Введите имя');

//ex one
//variant a
if(lang == 'ru') console.log(ruDays);
if(lang == 'en') console.log(enDays);

//variant b
switch(lang){
    case 'ru': console.log(ruDays);
        break;
    case 'en': console.log(enDays);
        break;
}

//variant c
console.log(outputStr);

//ex two
namePerson == 'Артем' ? console.log('Директор') : namePerson == 'Максим' ? console.log('Преподаватель') : console.log('Студент');