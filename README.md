Приложение-поиск и аренда отелей. 

Области хранения данных:

-БД на mongoDb Atlas
-Redux store на клиенте
-sessionStorage 

Сущности приложения:

-пользователь: БД( список пользователей),  sessionStorage(сессия текущего пользователя), redux store(отображения в браузере)
-отель: БД (список отелей), redux стор(отображение в браузере)
-отзыв на отель: БД(список отзывов), стор(отображение в браузере)
-подписка e-mail: БД(список подписанных email адресов)

  Таблицы БД:
  -пользователи -users:id/login/password/registed_at/role_id
  -роли - roles: id/name
  -статьи - posts: id/title/image_url/content/published_at
  -комментарии - comments: id/author_id/ post_id /content


Схема для редакс стора на клиенте:
-user : id/login/ role_id/session
-hotel: id/ title/ description/ [image_url]/ country/ price/ reviews: [review]
