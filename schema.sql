CREATE TABLE `teachers` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(1024),
	`website` varchar(1024),
	PRIMARY KEY (`id`)
);

CREATE TABLE `courses` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(1024),
	`teacherid` INT(1024) NOT NULL,
	`year` INT NOT NULL,
	`semester` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `grades` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`courseid` INT NOT NULL,
	`teacherid` INT NOT NULL,
	`grade_1.0` INT NOT NULL DEFAULT '0',
	`grade_1.3` INT NOT NULL DEFAULT '0',
	`grade_1.7` INT NOT NULL DEFAULT '0',
	`grade_2.0` INT NOT NULL DEFAULT '0',
	`grade_2.3` INT NOT NULL DEFAULT '0',
	`grade_2.7` INT NOT NULL DEFAULT '0',
	`grade_3.0` INT NOT NULL DEFAULT '0',
	`grade_3.3` INT NOT NULL DEFAULT '0',
	`grade_3.7` INT NOT NULL DEFAULT '0',
	`grade_4.0` INT NOT NULL DEFAULT '0',
	`grade_5.0` INT NOT NULL DEFAULT '0',
	`grade_others` INT NOT NULL DEFAULT '0',
	`addedby` INT NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
);

CREATE TABLE `coursereviews` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`studentid` INT NOT NULL AUTO_INCREMENT,
	`courseid` INT NOT NULL,
	`rating` INT NOT NULL,
	`review` TEXT DEFAULT '0',
	PRIMARY KEY (`id`,`studentid`)
);

CREATE TABLE `students` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(1024) NOT NULL,
	`email` varchar(1024) NOT NULL AUTO_INCREMENT,
	`password` varchar(1024) NOT NULL,
	`verified` BOOLEAN NOT NULL DEFAULT 'false',
	`registered` TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`,`email`)
);

CREATE TABLE `tokens` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`studentid` INT NOT NULL,
	`token` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `courses` ADD CONSTRAINT `courses_fk0` FOREIGN KEY (`teacherid`) REFERENCES `teachers`(`id`);

ALTER TABLE `grades` ADD CONSTRAINT `grades_fk0` FOREIGN KEY (`courseid`) REFERENCES `courses`(`id`);

ALTER TABLE `grades` ADD CONSTRAINT `grades_fk1` FOREIGN KEY (`teacherid`) REFERENCES `teachers`(`id`);

ALTER TABLE `grades` ADD CONSTRAINT `grades_fk2` FOREIGN KEY (`addedby`) REFERENCES `students`(`id`);

ALTER TABLE `coursereviews` ADD CONSTRAINT `coursereviews_fk0` FOREIGN KEY (`studentid`) REFERENCES `students`(`id`);

ALTER TABLE `coursereviews` ADD CONSTRAINT `coursereviews_fk1` FOREIGN KEY (`courseid`) REFERENCES `courses`(`id`);

ALTER TABLE `tokens` ADD CONSTRAINT `tokens_fk0` FOREIGN KEY (`studentid`) REFERENCES `students`(`id`);

