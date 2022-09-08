CREATE TABLE `alpha_users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `login` varchar(255) CHARACTER SET utf8 NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

INSERT INTO `alpha_users` VALUES(0, "Pancake");
INSERT INTO `alpha_users` VALUES(0, "Badcake");

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

INSERT INTO `alpha_towns` VALUES(0, 1, 1, "Sourcetown", 1, 0);
INSERT INTO `alpha_towns` VALUES(0, 2, 1, "Badtown", 1, 3);

CREATE TABLE `alpha_battles` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `town_id` int(11) NOT NULL,
    `start_time` bigint NOT NULL,
    `winner` int(11) DEFAULT "-1",
    PRIMARY KEY (`id`, `town_id`),
    FOREIGN KEY (id) REFERENCES alpha_users(id),
    FOREIGN KEY (winner) REFERENCES alpha_users(id)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

INSERT INTO alpha_battles(town_id, start_time) VALUES(0, 0);

CREATE TABLE `alpha_battle_rounds` (
    `battle_id` int(11) NOT NULL,
    `round` int(11) NOT NULL,
    `round_data` JSON NOT NULL,
    PRIMARY KEY (`battle_id`, `round`),
    FOREIGN KEY (battle_id) REFERENCES alpha_battles(id)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

INSERT INTO  alpha_battle_rounds values(0, 0, "{}");
INSERT INTO  alpha_battle_rounds values(0, 1, "{}");

-- CREATE TABLE `alpha_round_units`(
--     `round` int(11) NOT NULL,
--     `battle_id` int(11) NOT NULL,
--     `user_id` int(11) NOT NULL,
--     `type` int(11) NOT NULL,
--     `count` int(11) DEFAULT 0,
--     `lost` int(11) DEFAULT 0,
--     `first_health` int(11),
--     `ammo` int(11),
--     PRIMARY KEY (`round`, `battle_id`, `user_id`, `type`),
--     FOREIGN KEY (battle_id) REFERENCES alpha_battles(id),
--     FOREIGN KEY (user_id) REFERENCES alpha_users(id)
-- ) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

CREATE TABLE `alpha_missions` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `from` int(11) NOT NULL,
    `to` int(11) NOT NULL,
    `state` int(11) NOT NULL,
    `next_stage_time` bigint NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`from`) REFERENCES alpha_towns(id),
    FOREIGN KEY (`to`) REFERENCES alpha_towns(id)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

INSERT INTO alpha_missions VALUES(0, 1, 2, 0, 1000);

CREATE TABLE `alpha_mission_units` (
    `mission_id` int(11) NOT NULL,
    `type` int(11) NOT NULL,
    `count` int(11) NOT NULL,
    PRIMARY KEY (`mission_id`, `type`),
    FOREIGN KEY (mission_id) REFERENCES alpha_missions(id)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

INSERT INTO `alpha_mission_units` VALUES(1, 1, 5);

CREATE TABLE `alpha_town_units` (
  `town_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`town_id`, `type`),
  FOREIGN KEY (town_id) REFERENCES alpha_towns(id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

INSERT INTO alpha_town_units(town_id, `type`, count) VALUES(2, 2, 8);