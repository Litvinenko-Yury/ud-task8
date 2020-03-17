'use strict';

//Получить кнопку "Начать расчет" через id
let btnStart = document.getElementById('start');

//Получить все блоки в правой части программы c классом название-value
let value = document.querySelector('.result-table'),
    valueCollection = value.querySelectorAll(`[class*="value"]`), // получил коллекцию
    budgetValue = document.querySelector('.budget-value'),
    dayBudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthSavingsValue = document.querySelector('.monthsavings-value'),
    yearSavingsValue = document.querySelector('.yearsavings-value'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('#sum'),
    persentValue = document.querySelector('#percent');


//Получить поля(input) c обязательными расходами через класс
let expensesItem = document.querySelectorAll('.expenses-item'); // получил коллекцию

//Получить кнопки “Утвердить” и “Рассчитать” через Tag, в отдельные переменные
let btnExpenses = document.querySelector('.expenses-item-btn'), // утвердить
    btnOptional = document.querySelector('.optionalexpenses-btn'), // еще одна утвердить
    btnCount = document.querySelector('.count-budget-btn'); // рассчитать

//Получить поля для ввода необязательных расходов (optionalexpenses-item)
let optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'); // получил коллекцию


//Получить оставшиеся поля через querySelector (статьи возможного дохода, чекбокс, сумма, процент, год, месяц, день)
let inputIncome = document.querySelector('.choose-income');
let inputID = document.querySelector('.checksavings #savings');
let inputSum = document.querySelector('#sum');
let inputPersent = document.querySelector('#percent');
let yearValue = document.querySelector('.year-value');
let monthValue = document.querySelector('.month-value');
let dayValue = document.querySelector('.day-value');


/**ФУНКЦИИ */

/*функция при запуске скрипта делает кнопки не активными*/
// btnExpenses.setAttribute('disabled', 'disabled');
// btnOptional.setAttribute('disabled', 'disabled');
// btnCount.setAttribute('disabled', 'disabled');

/*функция на кнопке СТАРТ*/
let time,
    money;

btnStart.addEventListener('click', function () {
    btnExpenses.removeAttribute('disabled');
    btnOptional.removeAttribute('disabled');
    btnCount.removeAttribute('disabled');

    time = prompt('Введите дату в формате YYYY-MM-DD', ' '); // опрос пользователя
    money = Number(prompt('Ваш бюджет на месяц?', ' ')); // опрос пользователя

    //проверка данных money, вводимых пользователем:
    // - на наличие введенных данных, т.е. строка не пустая, money == "";
    // - то, что введено - цифры,  isNaN();
    //- не мог отменить этот prompt(), money == null;
    while (isNaN(money) || money == '' || money == null) {
        money = Number(prompt('Ваш бюджет?', ' ')); // повторный опрос пользователя
    }

    appData.budget = money; // полученные данные записываем в объект appData
    appData.timeData = time; // полученные данные записываем в объект appData
    budgetValue.textContent = money.toFixed(); // записываем budgetValue textContent и округляем до ближайшего целого числа

    yearValue.value = new Date(Date.parse(time)).getFullYear(); // из введенной пользователем даты получаем год
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1; // из введенной пользователем даты получаем месяц
    dayValue.value = new Date(Date.parse(time)).getDate(); // из введенной пользователем даты получаем день
});

let sum = 0;
btnExpenses.addEventListener('click', function () {
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

        /*проверка введенных данных на разные условия*/
        if (typeof (a) === 'string' && typeof (a) != null && typeof (b) != null && a != "" && b != "" && a.length < 50) {
            console.log("Все верно!");
            appData.expenses[a] = b; //пара ключ-значение
            sum += +b; // к sum добавить значение b;  '+' перед b нужен для преобразования b в число
        } else { //если проверка не пройдена, вернуться к вопросу заново
            i--;
        }
    }

    expensesValue.textContent = sum; // записываем expensesValue textContent
    console.log(sum);
});

btnOptional.addEventListener('click', function () {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' '; // записываем optionalExpensesValue textContent. Но не через суммирование в переменной, а сразу в объект.
    }
});

btnCount.addEventListener('click', function () {
    if (appData.budget != undefined) {
        //appData.moneyPerDay = (appData.budget / 30).toFixed();
        console.log('appData.budget = ' + appData.budget);
        console.log('sum = ' + sum);

        appData.moneyPerDay = ((appData.budget - sum) / 30).toFixed();

        dayBudgetValue.textContent = appData.moneyPerDay; // записываем dayBudgetValue textContent.

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = 'минимальный уровень'; // записываем levelValue textContent
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = 'средний  уровень';
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = 'высокий  уровень';
        } else {
            levelValue.textContent = 'Произошла ошибка';
        }
    } else {
        dayBudgetValue.textContent = 'Произошла ошибка';
    }
});

inputIncome.addEventListener('input', function () {
    let items = inputIncome.value;
    appData.income = items.split(",");
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value, // '+' - для преобразования в числовой тип данных
            persent = +persentValue.value;

        appData.monthIncome = sum / 100 / 12 * persent;
        appData.yearIncome = sum / 100 * persent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

persentValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value, // '+' - для преобразования в числовой тип данных
            persent = +persentValue.value;

        appData.monthIncome = sum / 100 / 12 * persent;
        appData.yearIncome = sum / 100 * persent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});


/*Глобальный объект*/
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};
console.log(appData);
