let controller = (function(budgetCtrl, uiCtrl ) {

    

    let setupEventListeners = function() {

    let DOM = uiCtrl.getDomStrings()
    document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem)

    //Клик по таблице с доходами и расходами
    document.querySelector(DOM.budgetTable).addEventListener('click', ctrlDeleteItem)

    }
    //Обновляем проценты у каждой записи
    function updatePercentages (){

        //Посчитаем проценты для каждой записи типо Expence
        budgetCtrl.calculatePercentages()
        // budgetCtrl.test()

        //Получаем данные по процентам с модели
        let idsAndPercents = budgetCtrl.getAllidsAndPercentages()

        //Обновить UI с новыми процентами
        uiCtrl.updateItemsPercentages(idsAndPercents)

        


    }

    //Функция срабатывающая при отправке формы
    function ctrlAddItem(event) {
        event.preventDefault();
        //Получаем данные из формы
        let input = uiCtrl.getInput();
        if (input.value!=='' && !isNaN(input.value) && input.value > 0){

            //Добавляем полученные данные в модель
            let newItem = budgetCtrl.addItem(input.type, input.description, input.value)
            // budgetCtrl.test()


            //Добавить запись в ui
            uiCtrl.renderListItem(newItem, input.type)
            uiCtrl.clearFields()
            generateTestData.init()
            //Посчитать бюджет
            updateBudget()
            //Пересчитали проценты
            updatePercentages()


        }



        
        
    }
    //функция удаления элементов
    function ctrlDeleteItem(event){
        let itemId, splitID, type, ID

        if(event.target.closest('.item__remove')){
            //Находим id записи , которую надо удалить
            itemId = event.target.closest('li.budget-list__item').id //inc-0
            //console.log("ctrlDeleteItem ~ itemId", itemId) //inc- 0

            splitID = itemId.split('-')  // ['inc', '0']
            type = splitID[0]
            ID = parseInt(splitID[1]) 

            //Удаление записи из модели
            budgetCtrl.deleteItem(type, ID)
            //Удаление записи из шаблона
            uiCtrl.deleteListItem(itemId)
            //Посчитать бюджет
            updateBudget()
            //Пересчитали проценты
            updatePercentages()



            


            


        }


    }

    function updateBudget() {
        //Расчитать бюджет в модели
        budgetCtrl.calculateBudget()
        //Получить расчитанный бюджет из модели
        budgetObj = budgetCtrl.getBudget()

        //Отобразить бюджет в шаблоне
        uiCtrl.updateBudget(budgetObj)

        
    }

    return {
        init: function(){

            //запускаем текущий месяц и год
            uiCtrl.dispalyMonth()

            setupEventListeners()
            uiCtrl.updateBudget({
                budget: 0,
                totalIncome: 0,
                totalExp: 0,
                percentAge: 0,
            })

        }
    }


})(modeleController, viewController)

controller.init()