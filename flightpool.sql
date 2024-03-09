-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Мар 09 2024 г., 12:17
-- Версия сервера: 8.0.30
-- Версия PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `flightpool`
--

-- --------------------------------------------------------

--
-- Структура таблицы `airports`
--

CREATE TABLE `airports` (
  `id` int NOT NULL,
  `city` text NOT NULL,
  `name` text NOT NULL,
  `iata` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `airports`
--

INSERT INTO `airports` (`id`, `city`, `name`, `iata`, `created_at`, `updated_at`) VALUES
(2, 'Moscow', 'Sheremetyevo', 'SVO', '2024-03-09 06:28:33', '2024-03-09 06:28:33'),
(3, 'Kazan', 'Kazan', 'KZN', '2024-03-09 06:28:58', '2024-03-09 06:28:58');

-- --------------------------------------------------------

--
-- Структура таблицы `bookings`
--

CREATE TABLE `bookings` (
  `id` int NOT NULL,
  `flight_from` int NOT NULL,
  `flight_back` int DEFAULT NULL,
  `date_from` text NOT NULL,
  `date_back` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `code` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `bookings`
--

INSERT INTO `bookings` (`id`, `flight_from`, `flight_back`, `date_from`, `date_back`, `code`, `created_at`, `updated_at`) VALUES
(4, 3, NULL, '09.03.2024', NULL, 'BGMGP', '2024-03-09 08:27:59', '2024-03-09 08:27:59'),
(5, 3, 1, '09.03.2024', '11.03.2024', 'YYJLY', '2024-03-09 08:28:48', '2024-03-09 08:28:48'),
(6, 3, 1, '09.03.2024', '11.03.2024', 'MUOOJ', '2024-03-09 09:00:28', '2024-03-09 09:00:28'),
(7, 3, NULL, '09.03.2024', NULL, 'JLZKS', '2024-03-09 09:02:37', '2024-03-09 09:02:37');

-- --------------------------------------------------------

--
-- Структура таблицы `flights`
--

CREATE TABLE `flights` (
  `id` int NOT NULL,
  `flight_code` text NOT NULL,
  `from_id` int NOT NULL,
  `to_id` int NOT NULL,
  `time_from` text NOT NULL,
  `time_to` text NOT NULL,
  `cost` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `flights`
--

INSERT INTO `flights` (`id`, `flight_code`, `from_id`, `to_id`, `time_from`, `time_to`, `cost`, `created_at`, `updated_at`) VALUES
(1, 'FP1200', 3, 2, '12:00', '13:35', 9500, '2024-03-09 06:32:11', '2024-03-09 06:32:11'),
(2, 'FP1201', 3, 2, '08:35', '10:05', 10500, '2024-03-09 06:33:13', '2024-03-09 06:33:13'),
(3, 'FP2100', 2, 3, '08:35', '10:05', 10500, '2024-03-09 06:34:11', '2024-03-09 06:34:11'),
(4, 'FP2101', 2, 3, '12:00', '13:35', 12500, '2024-03-09 06:35:14', '2024-03-09 06:35:14');

-- --------------------------------------------------------

--
-- Структура таблицы `passengers`
--

CREATE TABLE `passengers` (
  `id` int NOT NULL,
  `booking_id` int NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `birth_date` text NOT NULL,
  `document_number` text NOT NULL,
  `place_from` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `place_back` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `passengers`
--

INSERT INTO `passengers` (`id`, `booking_id`, `first_name`, `last_name`, `birth_date`, `document_number`, `place_from`, `place_back`, `created_at`, `updated_at`) VALUES
(3, 4, 'test', 'test', '22.02.1999', '12345677889', 'A2', NULL, '2024-03-09 08:27:59', '2024-03-09 08:27:59'),
(4, 5, 'test', 'test', '22.02.1999', '12345677889', NULL, NULL, '2024-03-09 08:28:48', '2024-03-09 08:28:48'),
(5, 5, 'test2', 'test2', '25.02.1999', '123456778892', NULL, NULL, '2024-03-09 08:28:48', '2024-03-09 08:28:48'),
(6, 6, 'test', 'test', '22.02.1999', '1234567890', NULL, NULL, '2024-03-09 09:00:28', '2024-03-09 09:00:28'),
(7, 6, 'test2', 'test2', '25.02.1999', '1234567893', NULL, NULL, '2024-03-09 09:00:28', '2024-03-09 09:00:28'),
(8, 7, 'test', 'test', '22.02.1999', '1234567890', 'D2', NULL, '2024-03-09 09:02:37', '2024-03-09 09:02:37');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `phone` text NOT NULL,
  `password` text NOT NULL,
  `document_number` text NOT NULL,
  `api_token` text,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `phone`, `password`, `document_number`, `api_token`, `created_at`, `updated_at`) VALUES
(1, '123', '123', '12121', '12345678', '1234567890', '1121', '2024-03-09 06:45:20', '2024-03-09 06:45:20'),
(8, 'test', 'test2', '+79991234123', '112344', '1234567890', '10456605-8518-4e78-97b3-a0e3da2e27da', '2024-03-09 07:08:27', '2024-03-09 07:08:27');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `airports`
--
ALTER TABLE `airports`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `flights`
--
ALTER TABLE `flights`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `passengers`
--
ALTER TABLE `passengers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `airports`
--
ALTER TABLE `airports`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `flights`
--
ALTER TABLE `flights`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `passengers`
--
ALTER TABLE `passengers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
