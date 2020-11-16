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
newRates.getRates = () =>  ApiConnector.getStocks((response) => {
    if (response.success) {
        newRates.clearTable();
        newRates.fillTable(response.data);
    }
})
newRates.getRates()
setInterval(() => newRates.getRates(), 6000);



//Операции с деньгами
const newBalance = new MoneyManager();

//Пополнение баланса
newBalance.addMoneyCallback = (data) => ApiConnector.addMoney(data, (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        newBalance.setMessage(response.success, 'Ваш баланс пополнен');// Не заметил сразу окно вывода. Спасибо! 
    } else {
        newBalance.setMessage(response.success, response.error);
      }  
});

//Конвертация 
newBalance.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data); 
        newBalance.setMessage(response.success, 'Конвертирование прошло успешно');
    } else {
        newBalance.setMessage(response.success, response.error);
      }
})

//Перевод
newBalance.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data); 
        newBalance.setMessage(response.success, 'Перевод выполнен');
    } else {
        newBalance.setMessage(response.success, response.error);
      } 
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
        newBalance.setMessage(response.success, `Пользователь ${data.name} добавлен(а) в друзья`);
    } else {
        newBalance.setMessage(response.success, response.error);
      }
})


//Удаление из списка
friend.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
        friend.clearTable(response.data);
        friend.fillTable(response.data);
        newBalance.updateUsersList(response.data);
        newBalance.setMessage(response.success, 'Пользователь удалён из друзей');
    } else {
        newBalance.setMessage(response.success, response.error);
      }
})


 
  