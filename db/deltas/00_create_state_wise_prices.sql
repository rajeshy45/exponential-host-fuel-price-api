CREATE TABLE `state_wise_prices` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `state_code` varchar(2) NOT NULL,
  `state_name` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `date` date NOT NULL DEFAULT current_date(),
  `last_updated` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
);