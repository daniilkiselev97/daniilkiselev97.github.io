let modeleController = (function() {

    let Income = function (id, description, value) {
        this.id = id
        this.description = description
        this.value = value
    }
    let Expense = function (id, description, value) {
        this.id = id
        this.description = description
        this.value = value
        this.percentage = -1
    }
    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100)
        } else {
            this.percentage = -1
        }

    }
    Expense.prototype.getPercentage = function(){
        return this.percentage
    }

    function addItem (type, desc, val) {

        let newItem, ID, lastIndex
        ID = 0;

        //Генерируем id
        
        if (data.allItems[type].length > 0) {
            lastIndex = data.allItems[type].length-1   
            ID = data.allItems[type][lastIndex].id + 1

        } else {
        ID = 0;
        }

        //В зависимости от типа используем соответсвующий конструктор и создаем объект

        if (type == 'inc') {
            newItem = new Income(ID, desc, parseFloat(val))

        } else if (type == 'exp') {
            newItem = new Expense(ID, desc, parseFloat(val))

        }

        //Записывем объект в нашу структуру данных

        data.allItems[type].push(newItem);

        return newItem


    }
    function deleteItem(type, id){
        //Найти запись по айди с расходами и расходами
        let ids = data.allItems[type].map(function(item){
            return item.id
        })
        //Найти индекс записи
        index = ids.indexOf(id)

        if(index!==-1){
        data.allItems[type].splice(index, 1)

        }

        

    }

    function calculateTotalSum (type) {
        let sum = 0;

        data.allItems[type].forEach(item => {
            sum = sum + item.value
        })

        return sum


    }

    function calculateBudget () {
        //Посчитать все доходы
        data.totals.inc = calculateTotalSum('inc')
        
        //Посчитать все расходы
        data.totals.exp = calculateTotalSum('exp')
        

        //Посчитать общий бюджет
        data.budget = data.totals.inc - data.totals.exp

        //Посчитать % для расходов

        if(data.totals.inc > 0) {

            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
            
        } else {
            data.percentage = -1
        }
        
        
        

    }

    function getBudget() {

        return {
            budget: data.budget,
            totalIncome: data.totals.inc,
            totalExp: data.totals.exp,
            percentAge: data.percentage
        }
    }
    function calculatePercentages () {
        data.allItems.exp.forEach(item => {
            item.calcPercentage(data.totals.inc)
        })
    }
    function getAllidsAndPercentages(){

        //[ [0, 15], [4,56] ] id %

        let allPerc = data.allItems.exp.map(item=>{
            return [item.id, item.getPercentage()]

        })

        return allPerc;
    }

    let data = {

        allItems: {
            inc:[],
            exp:[]
        },

        totals:{
            inc:0,
            exp:0
        },
        budget : 0,
        percentage: -1,
    }

    return {
        addItem: addItem,
        calculateBudget:calculateBudget,
        getBudget:getBudget,
        deleteItem:deleteItem,
        calculatePercentages:calculatePercentages,
        getAllidsAndPercentages:getAllidsAndPercentages,
        // test: function(){
        //     console.log(data)
        // }
    }

    

    
    

})()