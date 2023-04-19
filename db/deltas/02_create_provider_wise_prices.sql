CREATE TABLE `provider_wise_prices` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `provider` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `date` date NOT NULL DEFAULT current_date(),
  `last_updated` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
);