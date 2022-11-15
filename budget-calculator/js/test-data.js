let generateTestData = (function(){

    let ExampleItem = function(type, description, sum) {
        this.type = type;
        this.description = description;
        this.sum = sum;
    }
    
    let testData = [
        new ExampleItem('inc', 'Зарплата', 1245),
        new ExampleItem("inc", "Фриланс", 820),
        new ExampleItem("inc", "Партнерская программа", 110),
        new ExampleItem("inc", "Продажи digital", 90),
        new ExampleItem("exp", "Рента", 400),
        new ExampleItem("exp", "Бензин", 60),
        new ExampleItem("exp", "Продукты", 300),
        new ExampleItem("exp", "Развлечения", 100)
    
    ]
    
    function getRandomInt (max){
        return Math.floor(Math.random() * max)
    
    }
    
    function insertInUi (){
        
        let random = getRandomInt(testData.length);
        let randonItem = testData[random]
        
        document.querySelector('#input__type').value = randonItem.type
        document.querySelector('#input__description').value = randonItem.description
        document.querySelector('#input__value').value = randonItem.sum
    }

    return {
        init: insertInUi
    }

})()

generateTestData.init()




