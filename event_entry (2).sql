-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2026 at 05:45 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `event_entry`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','get1','get2','get3','get4') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'admin', 'admin@ondirect.com', '$2b$10$r3zyW//3FVAXZBYiwamsze4wBp4n.XfeuGci8G5D27KQ9ztNwDwRG', 'admin', '2026-03-16 21:34:13'),
(2, 'get1', 'get1@ondirect.com', '$2b$10$Q8GrDKw9UomscreHBxp52.KaRgHv9BC7nYGsn4okJVF188NbhxX1m', 'get1', '2026-03-17 15:26:33'),
(3, 'get2', 'get2@ondirect.com', '$2b$10$trGg/w/orSKNMOUczQUhn.M6FZn5aL6bB9ZxMy66hFKW42lUazlp6', 'get2', '2026-03-17 15:27:10'),
(4, 'get3', 'get3@ondirect.com', '$2b$10$pyoC7.bx.umSuaDr/b8n3euMR8AveK/JkQeQNkjh/3eKPOseNmzP6', 'get3', '2026-03-17 15:27:25'),
(5, 'get4', 'get4@ondirect.com', '$2b$10$yfYtcybMKUQ73y0kvg5V3.dDD5SSsLFBExyNVj6u6.fe7imm9.Adi', 'get4', '2026-03-17 15:27:39');

-- --------------------------------------------------------

--
-- Table structure for table `admin_sessions`
--

CREATE TABLE `admin_sessions` (
  `id` bigint(20) NOT NULL,
  `admin_user_id` int(11) NOT NULL,
  `session_token` char(64) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `expires_at` datetime NOT NULL,
  `invalidated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(50) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `status` enum('active','blocked') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `employee_selfies`
--

CREATE TABLE `employee_selfies` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `selfie_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee_selfies`
--

INSERT INTO `employee_selfies` (`id`, `employee_id`, `selfie_path`, `created_at`) VALUES
(1, 102875, 'uploads/selfies/selfie_102875_1773536801945.jpg', '2026-03-14 19:36:42'),
(2, 102875, 'uploads/selfies/selfie_102875_1773536991391.jpg', '2026-03-14 19:39:51'),
(3, 102875, 'uploads/selfies/selfie_102875_1773546119035.jpg', '2026-03-14 22:11:59'),
(4, 102875, 'uploads/selfies/selfie_102875_1773554046005.jpg', '2026-03-15 00:24:06'),
(5, 10287555, 'uploads/selfies/selfie_10287555_1773554351218.jpg', '2026-03-15 00:29:11'),
(6, 102875, 'uploads/selfies/selfie_102875_1773554549029.jpg', '2026-03-15 00:32:29'),
(7, 100464, 'uploads/selfies/selfie_100464_1773556749610.jpg', '2026-03-15 01:09:09'),
(8, 103310, 'uploads/selfies/selfie_103310_1773562129147.jpg', '2026-03-15 02:38:49'),
(9, 1040660, 'uploads/selfies/selfie_1040660_1773562813560.jpg', '2026-03-15 02:50:13'),
(10, 875543, 'uploads/selfies/selfie_875543_1773563204494.jpg', '2026-03-15 02:56:44'),
(11, 34789, 'uploads/selfies/selfie_34789_1773591137449.jpg', '2026-03-15 10:42:17'),
(12, 104567, 'uploads/selfies/selfie_104567_1773607918755.jpg', '2026-03-15 15:21:58'),
(13, 2345667, 'uploads/selfies/selfie_2345667_1773607994742.jpg', '2026-03-15 15:23:14'),
(14, 6788543, 'uploads/selfies/selfie_6788543_1773608155403.jpg', '2026-03-15 15:25:55'),
(15, 690789, 'uploads/selfies/selfie_690789_1773608400545.jpg', '2026-03-15 15:30:00'),
(16, 555555, 'uploads/selfies/selfie_555555_1773609354647.jpg', '2026-03-15 15:45:54'),
(17, 987654, 'uploads/selfies/selfie_987654_1773609610200.jpg', '2026-03-15 15:50:10'),
(18, 4444444, 'uploads/selfies/selfie_4444444_1773609909093.jpg', '2026-03-15 15:55:09'),
(19, 10266666, 'uploads/selfies/selfie_10266666_1773610038742.jpg', '2026-03-15 15:57:18'),
(20, 999999, 'uploads/selfies/selfie_999999_1773610272776.jpg', '2026-03-15 16:01:12'),
(21, 777777, 'uploads/selfies/selfie_777777_1773610693707.jpg', '2026-03-15 16:08:13'),
(22, 666666, 'uploads/selfies/selfie_666666_1773610785706.jpg', '2026-03-15 16:09:45'),
(23, 555555555, 'uploads/selfies/selfie_555555555_1773611237421.jpg', '2026-03-15 16:17:17'),
(24, 678912, 'uploads/selfies/selfie_678912_1773611678373.jpg', '2026-03-15 16:24:38'),
(25, 55555555, 'uploads/selfies/selfie_55555555_1773611781817.jpg', '2026-03-15 16:26:21'),
(26, 6678833, 'uploads/selfies/selfie_6678833_1773611849862.jpg', '2026-03-15 16:27:29'),
(27, 223567, 'uploads/selfies/selfie_223567_1773612394606.jpg', '2026-03-15 16:36:34'),
(28, 9843662, 'uploads/selfies/selfie_9843662_1773612760844.jpg', '2026-03-15 16:42:40'),
(29, 333324566, 'uploads/selfies/selfie_333324566_1773612851508.jpg', '2026-03-15 16:44:11'),
(30, 66664, 'uploads/selfies/selfie_66664_1773614230547.jpg', '2026-03-15 17:07:10'),
(31, 6662341, 'uploads/selfies/selfie_6662341_1773614304347.jpg', '2026-03-15 17:08:24'),
(32, 643211, 'uploads/selfies/selfie_643211_1773614594559.jpg', '2026-03-15 17:13:14'),
(33, 2321344, 'uploads/selfies/selfie_2321344_1773615657769.jpg', '2026-03-15 17:30:57'),
(34, 1244567, 'uploads/selfies/selfie_1244567_1773615821524.jpg', '2026-03-15 17:33:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employee_id` (`employee_id`);

--
-- Indexes for table `employee_selfies`
--
ALTER TABLE `employee_selfies`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee_selfies`
--
ALTER TABLE `employee_selfies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
