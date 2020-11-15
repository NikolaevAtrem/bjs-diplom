'use strict'

//Выход из личного кабинета
const userLogOut = new LogoutButton();

userLogOut.action = () => ApiConnector.logout((response) => {
  if (response.success) {
      location.reload();
  }
});
  
//Информация о пользователе
ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
})

//Получение текущих курсов валюты
const newRates = new RatesBoard();
newRates.getRates = () => ApiConnector.getStocks((response) => {
    if (response.success) {
        newRates.clearTable();
        newRates.fillTable(response.data);
    }
})
setInterval(() => newRates.getRates(), 6000);


//Операции с деньгами
const newBalance = new MoneyManager();

//Пополнение баланса
newBalance.addMoneyCallback = (data) => ApiConnector.addMoney(data, (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);   
    }
    //Вывод сообщения?? Не получается вывести сообщение
    // newBalance.setMessage(risSuccess, message)   
});

//Конвертация 
newBalance.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);  
    }
    //Вывод сообщения?? Не получается вывести сообщение
    // newBalance.setMessage(risSuccess, message)  
})

//Перевод
newBalance.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);   
    }
     //Вывод сообщения?? Не получается вывести сообщение
    // newBalance.setMessage(risSuccess, message) 
})

//Избранные
const friend = new FavoritesWidget();

//Вывод списка
ApiConnector.getFavorites((response) => {
    if (response.success) {
        friend.clearTable(response.data);
        friend.fillTable(response.data);
        newBalance.updateUsersList(response.data);
    }
})

//Добавление в список
friend.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
        friend.clearTable(response.data);
        friend.fillTable(response.data);
        newBalance.updateUsersList(response.data);
    }
    //Вывод сообщения?? Не получается вывести сообщение
    // newBalance.setMessage(risSuccess, message)
})


//Удаление из списка
friend.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
        friend.clearTable(response.data);
        friend.fillTable(response.data);
        newBalance.updateUsersList(response.data);
    }
    //Вывод сообщения?? Не получается вывести сообщение
    // newBalance.setMessage(risSuccess, message)
})


 
  