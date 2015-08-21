CREATE TABLE `teachers` (
	`teacherid` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(64),
	`website` varchar(256),
	PRIMARY KEY (`teacherid`)
);

CREATE TABLE `courses` (
	`courseid` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(64),
	`teacherid` INT NOT NULL,
	`year` INT NOT NULL,
	`semester` INT NOT NULL,
	PRIMARY KEY (`courseid`)
);

CREATE TABLE `grades` (
	`gradeid` INT NOT NULL AUTO_INCREMENT,
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
	PRIMARY KEY (`gradeid`)
);

CREATE TABLE `coursereviews` (
	`coursereviewid` INT NOT NULL AUTO_INCREMENT,
	`studentid` INT NOT NULL,
	`courseid` INT NOT NULL,
	`rating` INT NOT NULL DEFAULT '1',
	`review` TEXT,
	PRIMARY KEY (`coursereviewid`)
);

CREATE TABLE `students` (
	`studentid` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(64) NOT NULL,
	`email` varchar(64) NOT NULL,
	`password` varchar(32) NOT NULL,
	`emailcode` varchar(10) NOT NULL,
	`verified` BOOLEAN NOT NULL DEFAULT '0',
	`registered` TIMESTAMP NOT NULL,
	PRIMARY KEY (`studentid`)
);

CREATE TABLE `tokens` (
	`tokenid` INT NOT NULL AUTO_INCREMENT,
	`studentid` INT NOT NULL,
	`token` varchar(10) NOT NULL,
	`isvalid` BOOLEAN NOT NULL DEFAULT '1',
	PRIMARY KEY (`tokenid`)
);

ALTER TABLE `courses` ADD CONSTRAINT `courses_fk0` FOREIGN KEY (`teacherid`) REFERENCES `teachers`(`teacherid`);

ALTER TABLE `grades` ADD CONSTRAINT `grades_fk0` FOREIGN KEY (`courseid`) REFERENCES `courses`(`courseid`);

ALTER TABLE `grades` ADD CONSTRAINT `grades_fk1` FOREIGN KEY (`teacherid`) REFERENCES `teachers`(`teacherid`);

ALTER TABLE `grades` ADD CONSTRAINT `grades_fk2` FOREIGN KEY (`addedby`) REFERENCES `students`(`studentid`);

ALTER TABLE `coursereviews` ADD CONSTRAINT `coursereviews_fk0` FOREIGN KEY (`studentid`) REFERENCES `students`(`studentid`);

ALTER TABLE `coursereviews` ADD CONSTRAINT `coursereviews_fk1` FOREIGN KEY (`courseid`) REFERENCES `courses`(`courseid`);

ALTER TABLE `tokens` ADD CONSTRAINT `tokens_fk0` FOREIGN KEY (`studentid`) REFERENCES `students`(`studentid`);

