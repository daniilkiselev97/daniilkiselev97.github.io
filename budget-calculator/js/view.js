let viewController = (function() {


    let DOMstrings = {
        inputType: '#input__type',
        inputDescription: '#input__description',
        inputValue: '#input__value',
        form: '#budget-form',
        incomeContainer: '#income__list',
        expenseContainer:'#expenses__list',
        budgetLabel: '#budget-value',
        incomeLabel: '#income-label',
        expensesLabel:'#expense-label',
        expensesPercentLabel:'#expense-percent-label',
        budgetTable: '#budget-table',
        monthLabel: '#month',
        yearLabel: '#year'

    }

    function getInput() {
        return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value
        }

    }

    function formatNumber (num, type){
        let numSplit, int, dec, newInt, resultNumber

        //Убираем знак минус у отрицательного числа
        num = Math.abs(num) // Math.abs(-10) -> 10 возвращает абсолютный вид числа
        //Приводим к 2 цифрам после точки
        num = num.toFixed(2) //Оставляем 2 числа после запятой (2.2345).toFixed(2) = 2.23 ; 2.toFixed(2) = 2.00

        numSplit = num.split('.') //45.78 -> ['45', '78']
        int = numSplit[0] //Достаем целую часть  '45'
        dec = numSplit[1] //Достаем десятичную часть  '78'

        //Расставляем запятые :   123456 -> 123,456 идем с конца числа и через каждый 3 числа ставим запятую
        //Исходя из длины числа мы делим его на части по 3 цифры
        //Начиная с правой стороны расставляем запятые после каждого 3 числа
        //Если длина номера больше чем 3 цифры то ставим запятые

        if(int.length > 3){
            newInt = '';
            //'123456789' lengh = 9  9/3 -> отмеряем по 3 знака
            // console.log("formatNumber ~ int.length", int.length)


            for (let i = 0; i < int.length / 3; i++  ) {
                // console.log("formatNumber ~ i", i)
                //'(,->delete)123,456,789' Каждые три раза с конца ставим запятую
                //Формируем новую строку с номером
                newInt = 
                //Добавляем запятую каждые 3 числа
                ',' +
                //Вырезаем кусок из исходной строки
                int.substring(int.length - 3 * (i + 1), int.length - 3*i) +   688957483
                //Добавляем конец строки 
                newInt;
                // console.log("formatNumber ~ newInt", newInt)

            }
            // console.log("formatNumber ~ newInt", newInt)

            //Убираем запятую в начале если она есть
            if (newInt[0] === ',') {
                newInt = newInt.substring(1) //Верни новую строчку начиная с индекса 1 и до конца

            }


        } else if (int === '0') {
            newInt = '0';

        } else {
            newInt = int;

        }

        resultNumber = newInt + '.' + dec

        if(type === 'exp') {
            resultNumber = '- ' + resultNumber
        } else if (type === 'inc') {
            resultNumber = '+ ' + resultNumber

        }

        return resultNumber






    }

    function renderListItem(obj, type) {

        let containerElement, html

        if(type === 'inc'){
            containerElement = DOMstrings.incomeContainer
            html = `<li id="inc-%id%" class="budget-list__item item item--income">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">%value%</div>
                            <button class="item__remove">
                                <img
                                    src="./img/circle-green.svg"
                                    alt="delete"
                                />
                            </button>
                        </div>
                    </li>`;

        } else {
            containerElement = DOMstrings.expenseContainer
            html = `<li id="exp-%id%" class="budget-list__item item item--expense">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">
                                %value%
                                <div class="item__badge">
                                    <div class="item__percent badge badge--dark">
                                        15%
                                    </div>
                                </div>
                            </div>
                            <button class="item__remove">
                                <img src="./img/circle-red.svg" alt="delete" />
                            </button>
                        </div>
                    </li>`;

        }

        newHtml = html.replace("%id%", obj.id);
        newHtml = newHtml.replace("%description%", obj.description);
        newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

        document.querySelector(containerElement).insertAdjacentHTML('beforeend', newHtml)
    }

    function clearFields() {
        let inputDesc, inputVal
        inputDesc = document.querySelector(DOMstrings.inputDescription)
        inputVal = document.querySelector(DOMstrings.inputValue)

        inputDesc.value = ''
        inputDesc.focus()
        inputVal.value = ''
    }
    function updateBudget(obj){
        let type;

        if (obj.budget > 0) {
            type === 'inc'
        } else {
            type = 'exp'
        }
        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type)
        document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'inc')
        document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp')

        if(obj.percentAge > 0){

        document.querySelector(DOMstrings.expensesPercentLabel).textContent = obj.percentAge

        } else {
            document.querySelector(DOMstrings.expensesPercentLabel).textContent = '--'

        }

    }
    function deleteListItem(itemId){
        document.getElementById(itemId).remove()

    }

    function updateItemsPercentages(items){
        items.forEach(item => {
            //Находим li по id
            let el = document.getElementById(`exp-${item[0]}`).querySelector('.item__percent') //[0 , 25] id = 0 %=25
            //Если процент расхода больше или равен 0, то отображаем его на странице
            el.parentElement.style.display = 'block' //Делаем блок с % видимым, если там есть элементы

            if(item[1]>=0) {
                el.textContent = item[1] + '%'

            } else {
                el.parentElement.style.display = 'none' //Обращаемся к его родителю и скрываем его со страницы (%)
            }

        });


    }

    function dispalyMonth () {
        let now, year, month
        now = new Date();
        month = now.getMonth() //Индекс месяца начиная с нуля 0-январь
        year = now.getFullYear() // 2022

        monthArray = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'

        ]
        month = monthArray[month]

        document.querySelector(DOMstrings.monthLabel).innerText = month
        document.querySelector(DOMstrings.yearLabel).innerText = year
    }

    return {
        getInput: getInput,
        renderListItem: renderListItem,
        clearFields: clearFields,
        updateBudget: updateBudget,
        deleteListItem:deleteListItem,
        updateItemsPercentages:updateItemsPercentages,
        dispalyMonth:dispalyMonth,
        getDomStrings: function() {
        return DOMstrings
    }}

})()