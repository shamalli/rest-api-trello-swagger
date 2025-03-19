CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255),
  `password` string
);

CREATE TABLE `columns` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer
);

CREATE TABLE `cards` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `column_id` integer
);

CREATE TABLE `comments` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `card_id` integer,
  `comment` string
);

ALTER TABLE `columns` ADD CONSTRAINT `user_columns` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `cards` ADD CONSTRAINT `columns_cards` FOREIGN KEY (`column_id`) REFERENCES `columns` (`id`);

ALTER TABLE `comments` ADD CONSTRAINT `cards_comments` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`);
