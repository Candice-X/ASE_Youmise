-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	5.7.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Card`
--

DROP TABLE IF EXISTS `Card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Card` (
  `CardID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '1： 为用户自定义类型',
  `Types` tinyint(2) unsigned DEFAULT NULL COMMENT '1: system cards， one to one \n2：system cards , 邀请卡，one send to many\n3: user customized\n0: invalide card\n',
  `CardName` varchar(45) DEFAULT NULL,
  `CardImgURL` varchar(255) DEFAULT NULL,
  `CardNote` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CardID`),
  UNIQUE KEY `Cardcol_UNIQUE` (`CardImgURL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Card`
--

LOCK TABLES `Card` WRITE;
/*!40000 ALTER TABLE `Card` DISABLE KEYS */;
/*!40000 ALTER TABLE `Card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ExchangeCard`
--

DROP TABLE IF EXISTS `ExchangeCard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ExchangeCard` (
  `ExchangeID` int(10) unsigned NOT NULL,
  `ReceiverID` int(10) unsigned DEFAULT NULL,
  `ReceiverCardID` int(10) unsigned DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Status` tinyint(3) DEFAULT NULL COMMENT '1: 发起人\n2：请求交换\n3： 同意交换\n4： 拒绝交换\n',
  `SenderID` int(10) unsigned NOT NULL,
  `SenderCardID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ExchangeID`),
  KEY `fk_ExchangeCard_User1_idx` (`SenderID`),
  KEY `fk_ExchangeCard_Card1_idx` (`SenderCardID`),
  KEY `fk_exchangecard_Receiver_idx` (`ReceiverID`),
  KEY `fk_ExchangeCard_ReceiverCard_idx` (`ReceiverCardID`),
  CONSTRAINT `fk_ExchangeCard_Card1` FOREIGN KEY (`SenderCardID`) REFERENCES `Card` (`CardID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ExchangeCard_ReceiverCard` FOREIGN KEY (`ReceiverCardID`) REFERENCES `Card` (`CardID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ExchangeCard_User1` FOREIGN KEY (`SenderID`) REFERENCES `User` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_exchangecard_Receiver` FOREIGN KEY (`ReceiverID`) REFERENCES `User` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ExchangeCard`
--

LOCK TABLES `ExchangeCard` WRITE;
/*!40000 ALTER TABLE `ExchangeCard` DISABLE KEYS */;
/*!40000 ALTER TABLE `ExchangeCard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Messages`
--

DROP TABLE IF EXISTS `Messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Messages` (
  `MessageID` int(10) unsigned NOT NULL,
  `SenderID` int(10) unsigned NOT NULL,
  `ReceiverID` int(10) unsigned DEFAULT NULL,
  `Status` tinyint(3) unsigned DEFAULT NULL COMMENT '1: 未读\n2： 已读\n\n',
  `Title` varchar(45) DEFAULT NULL,
  `MsgContent` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`MessageID`),
  KEY `fk_Messages_User1_idx` (`SenderID`),
  KEY `fk_Messages_Receiver_idx` (`ReceiverID`),
  CONSTRAINT `fk_Messages_Receiver` FOREIGN KEY (`ReceiverID`) REFERENCES `User` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Messages_User1` FOREIGN KEY (`SenderID`) REFERENCES `User` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Messages`
--

LOCK TABLES `Messages` WRITE;
/*!40000 ALTER TABLE `Messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `Messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Records`
--

DROP TABLE IF EXISTS `Records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Records` (
  `RecordID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `SenderID` int(10) unsigned NOT NULL,
  `ReceiverID` int(10) unsigned DEFAULT NULL,
  `Card_CardID` int(10) unsigned NOT NULL,
  `ExpireDate` date DEFAULT NULL COMMENT 'Default: forever',
  `CreateDate` date DEFAULT NULL,
  `FinishDate` date DEFAULT NULL,
  `CardTitle` varchar(45) DEFAULT NULL,
  `CardContent` varchar(255) DEFAULT NULL,
  `Status` int(11) DEFAULT NULL COMMENT '1: 有效的卡片，具有收卡人，发卡人，在有效期内，\n2：已发送但是没有接收人，\n3： 邀请卡类型，接收人为多人\n4：过期卡\n5：无效卡，发出后三天没有回复\n6： 已使用',
  `Finshed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`RecordID`),
  KEY `fk_Records_Card_idx` (`Card_CardID`),
  KEY `fk_Records_User1_idx` (`SenderID`),
  KEY `fk_Records_Receiver_idx` (`ReceiverID`),
  CONSTRAINT `fk_Records_Card` FOREIGN KEY (`Card_CardID`) REFERENCES `Card` (`CardID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Records_Receiver` FOREIGN KEY (`ReceiverID`) REFERENCES `User` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Records_User1` FOREIGN KEY (`SenderID`) REFERENCES `User` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Records`
--

LOCK TABLES `Records` WRITE;
/*!40000 ALTER TABLE `Records` DISABLE KEYS */;
/*!40000 ALTER TABLE `Records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `UserID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `UserName` varchar(80) NOT NULL COMMENT 'Wechat NickName: ',
  `Email` varchar(128) DEFAULT NULL,
  `Password` varchar(45) NOT NULL,
  `UserType` tinyint(4) NOT NULL COMMENT 'user type :\n1: Wechat \n2: e-mail\n3: others',
  `OpenId` varchar(64) DEFAULT NULL COMMENT '微信的用户唯一标识，如果UserType ==1,\n登录时会获得用户的',
  `JoinDate` date DEFAULT NULL,
  `AvatarURL` varchar(255) DEFAULT NULL,
  `Gender` tinyint(1) DEFAULT NULL COMMENT '1: male\n2:female',
  `MonthLimite` int(11) DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  KEY `openID_wechat` (`OpenId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-15  0:29:06
