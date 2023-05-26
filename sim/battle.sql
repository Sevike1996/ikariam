CREATE TABLE `alpha_users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `login` varchar(255) CHARACTER SET utf8 NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

CREATE TABLE `alpha_towns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `town_number` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT 'Polis',
  `pos0_level` int(11) NOT NULL DEFAULT '1',
  `pos14_level` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES alpha_users(id)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

CREATE TABLE `alpha_battles` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `mission_id` int NOT NULL,
    `start_time` bigint NOT NULL,
    `battlefield_size` int NOT NULL,
    `winner` int(11),
    PRIMARY KEY (`id`, `mission_id`),
    FOREIGN KEY (`winner`) REFERENCES alpha_users(id),
    FOREIGN KEY (`mission_id`) REFERENCES alpha_missions(id)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

CREATE TABLE `alpha_rounds` (
    `mission_id` int(11) NOT NULL,
    `round` int(11) NOT NULL,
    `round_path` varchar(255) NOT NULL,
    PRIMARY KEY (`mission_id`, `round`),
    FOREIGN KEY (mission_id) REFERENCES alpha_missions(id)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

CREATE TABLE `alpha_missions` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `from` int(11) NOT NULL,
    `to` int(11) NOT NULL,
    `state` int(11) NOT NULL,
    `type` int NOT NULL,
    `next_stage_time` bigint NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`from`) REFERENCES alpha_towns(id),
    FOREIGN KEY (`to`) REFERENCES alpha_towns(id)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;


CREATE TABLE `alpha_mission_units` (
    `mission_id` int(11) NOT NULL,
    `type` int(11) NOT NULL,
    `count` int(11) NOT NULL,
    PRIMARY KEY (`mission_id`, `type`),
    FOREIGN KEY (mission_id) REFERENCES alpha_missions(id)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;


CREATE TABLE `alpha_town_units` (
  `town_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`town_id`, `type`),
  FOREIGN KEY (town_id) REFERENCES alpha_towns(id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;


INSERT INTO `alpha_users` VALUES(0, "Pancake");
INSERT INTO `alpha_users` VALUES(0, "Badcake");

INSERT INTO `alpha_towns` VALUES(0, 1, 1, "Sourcetown", 1, 0);
-- id 0, user_id=2 (badcake), town_number (of user), name, city hall level 1, wall level 1
INSERT INTO `alpha_towns` VALUES(0, 2, 1, "Badtown", 1, 1);

-- from sourcetown to badtown, state=EN_ROUTE, type=PLUNDER, next_stage_time=1000
INSERT INTO `alpha_missions` VALUES(0, 1, 2, 1, 5, 1000);
INSERT INTO `alpha_mission_units` VALUES(1, 0, 5);

-- defend badtown with 8 spearmans.
INSERT INTO alpha_town_units(town_id, `type`, count) VALUES(2, 2, 8);