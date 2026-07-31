# Everlasting Blooms

PROMPT

Создай полностью готовый современный веб-сайт-приглашение на свадьбу (Wedding Invitation Website) с дизайном как на референсе.

Стиль должен максимально повторять пример:

 вертикальный лендинг

 белый фон

 голубые акварельные мазки

 синие цветочные элементы

 романтический минимализм

 плавные анимации

 современный luxury дизайн

 адаптивность под мобильные устройства

 ощущение дорогого свадебного сайта

Используй:

 React

 Next.js

 TypeScript

 TailwindCSS

 Framer Motion

 GSAP (для красивых анимаций)

 React Icons

 Swiper.js

 React Hook Form

 Zod

 Supabase (или Firebase) для хранения RSVP

 QR Generator

 Vercel-ready проект

Главный экран (Hero)

На весь экран.

Содержит:

Большую фотографию пары

Надпись

THE WEDDING OF

Имена

Olivia
&
Ralph

Большой красивый монограмный логотип

O
&
R

Дата

May 18, 2025

Красивую кнопку

Open Invitation

После нажатия:

раскрывается сайт с красивой анимацией.

Добавить фоновую музыку

с кнопкой:

🔊 Music On / Off

Экран Love Story

Большое фото

История знакомства

Красивый текст

Плавное появление элементов

Countdown

Большой таймер

Дни

Часы

Минуты

Секунды

До свадьбы

После наступления даты показывать

Today is our Wedding ❤️

Wedding Timeline

Красивый вертикальный таймлайн

2:00 Ceremony

4:00 Reception

5:00 Dinner

6:00 Photos

7:00 Dance

Иконки

анимация появления

Couple Gallery

Красивая masonry gallery

Лайтбокс

Увеличение фото

Swipe на телефоне

Dress Code

Большая секция

Иконки мужчины и женщины

Палитра цветов

Blue

White

Beige

Light Gray

Запретить

Red

Neon

Black

Gifts

Красивый блок

Текст

Ваше присутствие — лучший подарок.

Если хотите сделать подарок —

QR

Кнопка

Copy Card Number

Кнопка

Open Kaspi

или

Open PayPal

Venue

Большая карта

Google Maps

Фото церкви

Фото ресторана

Кнопки

Navigate

Open Maps

Reception

Большое фото

Описание

Адрес

Время

Кнопка

Open in Google Maps

RSVP

Полностью рабочая форма

Поля

Имя

Фамилия

Телефон

Email

Будете присутствовать?

Да

Нет

Количество гостей

Комментарий

Аллергии

Пожелания по меню

После отправки:

данные сохраняются в Supabase.

Показать красивую анимацию

Thank You ❤️

Админ панель

Защищена паролем

/admin

Возможности

Просмотр всех гостей

Поиск

Фильтр

Экспорт CSV

Экспорт Excel

Удаление гостей

Редактирование

Статистика

Количество подтверждений

Количество отказов

Общее количество гостей

QR

Автоматически генерируется QR

Ведёт на сайт

Floating Menu

Справа

Иконки

Home

Story

Timeline

Gallery

Venue

RSVP

Плавная прокрутка

Animations

Использовать

Framer Motion

GSAP

Scroll Reveal

Fade Up

Parallax

Scale

Blur

Text Reveal

Image Reveal

Page Transition

Loading Screen

Музыка

Автоматическое воспроизведение после взаимодействия пользователя

Кнопка выключения

Показывать проигрыватель

Фото

Все фотографии должны легко заменяться через папку

/public/images

Без изменения кода

Настройки

Все данные должны храниться отдельно

config.ts

Где можно изменить

Имена

Дату

Адрес

Телефон

Фото

Текст

Цвета

Музыку

Логотип

Без изменения компонентов

SEO

Open Graph

Meta

Twitter

Schema.org

Sitemap

robots.txt

favicon

manifest

PWA

Производительность

Lazy Loading

Image Optimization

SSR

Code Splitting

Font Optimization

100 Lighthouse

Адаптивность

Desktop

Tablet

Mobile

Все должно идеально выглядеть.

Дополнительно

Добавить:

✨ падающие лепестки

✨ анимированные цветы

✨ плавный скролл

✨ эффект бумаги

✨ эффект акварели

✨ красивые переходы между блоками

✨ glassmorphism

✨ blur

✨ hover-анимации

Структура проекта

Создай полноценный production-ready проект.

pages/

components/

hooks/

utils/

lib/

types/

styles/

public/

config/

Код

Код должен быть:

 чистым

 масштабируемым

 полностью типизированным

 без заглушек

 без TODO

 без ошибок TypeScript

 готовым к деплою на Vercel

Итог

В результате сгенерируй полностью рабочий проект с полноценным функционалом, включая:

 сохранение RSVP в базе данных;

 административную панель с авторизацией;

 экспорт гостей в CSV и Excel;

 адаптивный дизайн;

 анимации;

 музыкальное сопровождение;

 интеграцию Google Maps;

 QR-код;

 конфигурацию через config.ts;

 готовность к запуску через npm install && npm run dev и деплою на Vercel без дополнительной доработки.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://bloom-and-vow-27.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9def979c-17be-45aa-a956-8b84be3a1ea2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
