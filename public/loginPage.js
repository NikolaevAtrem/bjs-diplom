
'use strict'

const newUser = new UserForm();

//Авторизация пользователя
newUser.loginFormCallback = (data) => ApiConnector.login(data, (response) => {
  if (response.success) {
    location.reload();
  } else {
    newUser.setLoginErrorMessage(response.error);
  }
})

//Регистрация пользователя
newUser.registerFormCallback = (data) => ApiConnector.register(data, (response) => {
  if (response.success) {
    location.reload();
  } else {
    newUser.setRegisterErrorMessage(response.error);
  }
})




  





    

