
-- SQL query for creating state wise prices table

CREATE TABLE `state_wise_prices` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `state` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `country` varchar(255) NOT NULL DEFAULT 'india',
  `fuel` varchar(255) NOT NULL DEFAULT 'petrol',
  `date` date NOT NULL DEFAULT current_date(),
  `last_updated` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
);