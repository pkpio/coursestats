-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 10, 2016 at 03:25 PM
-- Server version: 5.6.28-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `coursestats`
--
CREATE DATABASE IF NOT EXISTS `coursestats` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `coursestats`;

-- --------------------------------------------------------

--
-- Table structure for table `autogrades`
--

DROP TABLE IF EXISTS `autogrades`;
CREATE TABLE IF NOT EXISTS `autogrades` (
  `gradeid` int(11) NOT NULL AUTO_INCREMENT,
  `coursename` varchar(64) NOT NULL,
  `courseyear` int(4) NOT NULL DEFAULT '2015',
  `coursesem` int(1) NOT NULL DEFAULT '1',
  `tucanid` varchar(15) DEFAULT NULL,
  `grade_10` int(11) DEFAULT NULL,
  `grade_13` int(11) DEFAULT NULL,
  `grade_17` int(11) DEFAULT NULL,
  `grade_20` int(11) DEFAULT NULL,
  `grade_23` int(11) DEFAULT NULL,
  `grade_27` int(11) DEFAULT NULL,
  `grade_30` int(11) DEFAULT NULL,
  `grade_33` int(11) DEFAULT NULL,
  `grade_37` int(11) DEFAULT NULL,
  `grade_40` int(11) DEFAULT NULL,
  `grade_50` int(11) DEFAULT NULL,
  `grade_others` int(11) NOT NULL DEFAULT '0',
  `addedby` int(11) NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`gradeid`),
  KEY `grades_fk2` (`addedby`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
CREATE TABLE IF NOT EXISTS `courses` (
  `courseid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `year` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `teacherid` int(11) NOT NULL,
  `tucanid` varchar(15) NOT NULL,
  `addedby` int(11) DEFAULT NULL,
  `linkedid` int(11) DEFAULT NULL,
  `searchcount` int(11) NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`courseid`),
  KEY `courses_fk0` (`teacherid`),
  KEY `courses_fk1` (`addedby`),
  KEY `linkedcourse` (`linkedid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=42 ;

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
CREATE TABLE IF NOT EXISTS `grades` (
  `gradeid` int(11) NOT NULL AUTO_INCREMENT,
  `courseid` int(11) NOT NULL,
  `teacherid` int(11) NOT NULL,
  `grade_10` int(11) DEFAULT NULL,
  `grade_13` int(11) DEFAULT NULL,
  `grade_17` int(11) DEFAULT NULL,
  `grade_20` int(11) DEFAULT NULL,
  `grade_23` int(11) DEFAULT NULL,
  `grade_27` int(11) DEFAULT NULL,
  `grade_30` int(11) DEFAULT NULL,
  `grade_33` int(11) DEFAULT NULL,
  `grade_37` int(11) DEFAULT NULL,
  `grade_40` int(11) DEFAULT NULL,
  `grade_50` int(11) DEFAULT NULL,
  `grade_others` int(11) DEFAULT NULL,
  `addedby` int(11) NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `extras` text,
  PRIMARY KEY (`gradeid`),
  KEY `grades_fk0` (`courseid`),
  KEY `grades_fk1` (`teacherid`),
  KEY `grades_fk2` (`addedby`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=35 ;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE IF NOT EXISTS `reviews` (
  `reviewid` int(11) NOT NULL AUTO_INCREMENT,
  `studentid` int(11) NOT NULL,
  `courseid` int(11) NOT NULL,
  `content_level` int(1) NOT NULL DEFAULT '2',
  `exam_level` int(1) NOT NULL DEFAULT '2',
  `exam_eval_level` int(1) NOT NULL DEFAULT '2',
  `review` text,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewid`),
  UNIQUE KEY `unique_review` (`studentid`,`courseid`),
  KEY `coursereviews_fk0` (`studentid`),
  KEY `coursereviews_fk1` (`courseid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=72 ;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `studentid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(32) NOT NULL,
  `emailcode` varchar(10) NOT NULL,
  `token` varchar(24) DEFAULT NULL,
  `isactive` tinyint(1) NOT NULL DEFAULT '0',
  `isadder` tinyint(1) NOT NULL DEFAULT '0',
  `iscrawler` tinyint(1) NOT NULL DEFAULT '0',
  `isadmin` tinyint(1) NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`studentid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=42 ;

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
CREATE TABLE IF NOT EXISTS `teachers` (
  `teacherid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `website` varchar(256) DEFAULT NULL,
  `addedby` int(11) DEFAULT NULL,
  `searchcount` int(11) NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`teacherid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=32 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_fk0` FOREIGN KEY (`teacherid`) REFERENCES `teachers` (`teacherid`),
  ADD CONSTRAINT `courses_fk1` FOREIGN KEY (`addedby`) REFERENCES `students` (`studentid`),
  ADD CONSTRAINT `linkedcourse` FOREIGN KEY (`linkedid`) REFERENCES `courses` (`courseid`);

--
-- Constraints for table `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `grades_fk0` FOREIGN KEY (`courseid`) REFERENCES `courses` (`courseid`),
  ADD CONSTRAINT `grades_fk1` FOREIGN KEY (`teacherid`) REFERENCES `teachers` (`teacherid`),
  ADD CONSTRAINT `grades_fk2` FOREIGN KEY (`addedby`) REFERENCES `students` (`studentid`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `coursereviews_fk0` FOREIGN KEY (`studentid`) REFERENCES `students` (`studentid`),
  ADD CONSTRAINT `coursereviews_fk1` FOREIGN KEY (`courseid`) REFERENCES `courses` (`courseid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
