const filterByType = (type, ...values) => values.filter(value => typeof value === type), //С помощью filter формируем массив только с выбранным типом данных

	hideAllResponseBlocks = () => { //Объялении функции hideAllResponseBlocks
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //Находим все элементы по классу, приводим к массиву и присваиваем в переменную responseBlocksArray
		responseBlocksArray.forEach(block => block.style.display = 'none'); //С помощью цикла forEach скрываем все найденные элементы со страницы
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { //Объявляем и вызываем функцию showResponseBlock которая принимает три параметра класс для общего блока <di> содержащего результат, текст сообщения, класс для блока <span> содержащего сообщение  
		hideAllResponseBlocks(); //Вызов функции hideAllResponseBlocks скравающей блоки с результатом
		document.querySelector(blockSelector).style.display = 'block'; //Делаем элемент с переданным классом видимым на странице
		if (spanSelector) {//Проверяем был ли передан селектор для блока содеражщего сообщение
			document.querySelector(spanSelector).textContent = msgText;//Если селектор передан то находим элементт по id и присваиваем ему текст переданного сообщения
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //Вызываем showResponseBlock и передаем в нее класс, полученное сообщение с результатом, id

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), //Вызываем showResponseBlock и передаем в нее класс, полученное сообщение с результатом, id

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), //Вызываем функцию showResponseBlock и передаем в нее класс 

	tryFilterByType = (type, values) => {//Объявление и вызов функции tryFilterByType которая принимает тип обрабатываемых значений и сами значения
		try {// Начало блока try-catch 
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); //С помощью eval выполняем строку в котороый вызываем функцию filterByType и передаем в нее тип данных и полученные значения, а после создаем из обработынных данных массив 
			const alertMsg = (valuesArray.length) ? //Проверяем длинну полученного масссива
				`Данные с типом ${type}: ${valuesArray}` : //Если длинна есть то формируем сообщение с результатом
				`Отсутствуют данные типа ${type}`; //Если длинны нет то формируем сообщение об ошибке
			showResults(alertMsg); //Вызываем функцию showResults и передаем в нее сообщение 
		} catch (e) { //В случае возникновения ошибке в блоке выводим в консоль данную ошибку
			showError(`Ошибка: ${e}`);
		}
	};

const filterButton = document.querySelector('#filter-btn'); //Получаем элемент по id filter-btn в переменную filterButton

filterButton.addEventListener('click', e => { //Присваиваем обработчик событий переменной filterButton. Срабатываение происходит по клику на элемент.
	const typeInput = document.querySelector('#type'); // Получаем элемент с id #type в переменную typeInput
	const dataInput = document.querySelector('#data'); // Получаем элемент с id #data в переменную dataInput

	if (dataInput.value === '') { //Проверяем значение переменной dataInput
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //Если dataInput содержит пустую строку то с помощью метода setCustomValidity устанавливаем элементу в переменной dataInput сообщение
		showNoResults(); // а так же вызываем функцию showNoResults
	} else { // Если dataInput не содержит пустую строку
		dataInput.setCustomValidity(''); //Спец. сообщение для переменной dataInput будет пустым
		e.preventDefault(); //Метод preventDefault отменит действия браузера по умлочанию
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //Будет вызвана функция tryFilterByType 
	} // в которую будут переданны (предварительно очищенные от пробелов в начале и конце) значения из переменных dataInput и typeInput виде строки
});

