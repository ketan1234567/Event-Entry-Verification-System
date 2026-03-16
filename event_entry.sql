-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 16, 2026 at 01:15 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','viewer') NOT NULL DEFAULT 'viewer',
  `last_login_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_selfies`
--

CREATE TABLE `employee_selfies` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(50) NOT NULL,
  `selfie_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_selfies`
--

INSERT INTO `employee_selfies` (`id`, `employee_id`, `selfie_path`, `created_at`) VALUES
(1, '102875', 'uploads/selfies/selfie_102875_1773536801945.jpg', '2026-03-15 01:06:42'),
(2, '102875', 'uploads/selfies/selfie_102875_1773536991391.jpg', '2026-03-15 01:09:51'),
(3, '102875', 'uploads/selfies/selfie_102875_1773546119035.jpg', '2026-03-15 03:41:59'),
(4, '102875', 'uploads/selfies/selfie_102875_1773554046005.jpg', '2026-03-15 05:54:06'),
(5, '10287555', 'uploads/selfies/selfie_10287555_1773554351218.jpg', '2026-03-15 05:59:11'),
(6, '102875', 'uploads/selfies/selfie_102875_1773554549029.jpg', '2026-03-15 06:02:29'),
(7, '100464', 'uploads/selfies/selfie_100464_1773556749610.jpg', '2026-03-15 06:39:09'),
(8, '103310', 'uploads/selfies/selfie_103310_1773562129147.jpg', '2026-03-15 08:08:49'),
(9, '1040660', 'uploads/selfies/selfie_1040660_1773562813560.jpg', '2026-03-15 08:20:13'),
(10, '875543', 'uploads/selfies/selfie_875543_1773563204494.jpg', '2026-03-15 08:26:44'),
(11, '34789', 'uploads/selfies/selfie_34789_1773591137449.jpg', '2026-03-15 16:12:17'),
(12, '104567', 'uploads/selfies/selfie_104567_1773607918755.jpg', '2026-03-15 20:51:58'),
(13, '2345667', 'uploads/selfies/selfie_2345667_1773607994742.jpg', '2026-03-15 20:53:14'),
(14, '6788543', 'uploads/selfies/selfie_6788543_1773608155403.jpg', '2026-03-15 20:55:55'),
(15, '690789', 'uploads/selfies/selfie_690789_1773608400545.jpg', '2026-03-15 21:00:00'),
(16, '555555', 'uploads/selfies/selfie_555555_1773609354647.jpg', '2026-03-15 21:15:54'),
(17, '987654', 'uploads/selfies/selfie_987654_1773609610200.jpg', '2026-03-15 21:20:10'),
(18, '4444444', 'uploads/selfies/selfie_4444444_1773609909093.jpg', '2026-03-15 21:25:09'),
(19, '10266666', 'uploads/selfies/selfie_10266666_1773610038742.jpg', '2026-03-15 21:27:18'),
(20, '999999', 'uploads/selfies/selfie_999999_1773610272776.jpg', '2026-03-15 21:31:12'),
(21, '777777', 'uploads/selfies/selfie_777777_1773610693707.jpg', '2026-03-15 21:38:13'),
(22, '666666', 'uploads/selfies/selfie_666666_1773610785706.jpg', '2026-03-15 21:39:45'),
(23, '555555555', 'uploads/selfies/selfie_555555555_1773611237421.jpg', '2026-03-15 21:47:17'),
(24, '678912', 'uploads/selfies/selfie_678912_1773611678373.jpg', '2026-03-15 21:54:38'),
(25, '55555555', 'uploads/selfies/selfie_55555555_1773611781817.jpg', '2026-03-15 21:56:21'),
(26, '6678833', 'uploads/selfies/selfie_6678833_1773611849862.jpg', '2026-03-15 21:57:29'),
(27, '223567', 'uploads/selfies/selfie_223567_1773612394606.jpg', '2026-03-15 22:06:34'),
(28, '9843662', 'uploads/selfies/selfie_9843662_1773612760844.jpg', '2026-03-15 22:12:40'),
(29, '333324566', 'uploads/selfies/selfie_333324566_1773612851508.jpg', '2026-03-15 22:14:11'),
(30, '66664', 'uploads/selfies/selfie_66664_1773614230547.jpg', '2026-03-15 22:37:10'),
(31, '6662341', 'uploads/selfies/selfie_6662341_1773614304347.jpg', '2026-03-15 22:38:24'),
(32, '643211', 'uploads/selfies/selfie_643211_1773614594559.jpg', '2026-03-15 22:43:14'),
(33, '2321344', 'uploads/selfies/selfie_2321344_1773615657769.jpg', '2026-03-15 23:00:57'),
(34, '1244567', 'uploads/selfies/selfie_1244567_1773615821524.jpg', '2026-03-15 23:03:41');

-- --------------------------------------------------------

--
-- Table structure for table `entries`
--

CREATE TABLE `entries` (
  `id` bigint(20) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `gate_id` int(11) NOT NULL,
  `entry_token_id` bigint(20) NOT NULL,
  `entry_type` enum('entry','reentry') NOT NULL DEFAULT 'entry',
  `entry_time` datetime NOT NULL DEFAULT current_timestamp(),
  `device_fingerprint` varchar(255) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `entry_tokens`
--

CREATE TABLE `entry_tokens` (
  `id` bigint(20) NOT NULL,
  `token` char(64) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `event_id` int(11) DEFAULT NULL,
  `gate_id` int(11) DEFAULT NULL,
  `type` enum('entry','reentry') NOT NULL DEFAULT 'entry',
  `status` enum('active','used','expired','revoked') NOT NULL DEFAULT 'active',
  `device_fingerprint` varchar(255) DEFAULT NULL,
  `issued_at` datetime NOT NULL,
  `expires_at` datetime NOT NULL,
  `used_at` datetime DEFAULT NULL,
  `used_ip` varchar(45) DEFAULT NULL,
  `used_user_agent` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `event_code` varchar(50) NOT NULL,
  `name` varchar(150) NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `status` enum('upcoming','ongoing','ended') NOT NULL DEFAULT 'ongoing',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `event_code`, `name`, `start_time`, `end_time`, `status`, `created_at`, `updated_at`) VALUES
(1, 'EVT2026', 'Sample Event', '2026-03-15 04:50:39', '2026-03-16 04:50:39', 'ongoing', '2026-03-15 04:50:39', '2026-03-15 04:50:39');

-- --------------------------------------------------------

--
-- Table structure for table `gates`
--

CREATE TABLE `gates` (
  `id` int(11) NOT NULL,
  `gate_code` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gates`
--

INSERT INTO `gates` (`id`, `gate_code`, `name`, `location`, `status`, `created_at`, `updated_at`) VALUES
(1, 'G1', 'Gate 1', 'Main Entrance', 'active', '2026-03-15 04:50:39', '2026-03-15 04:50:39'),
(2, 'G2', 'Gate 2', 'Side Entrance', 'active', '2026-03-15 04:50:39', '2026-03-15 04:50:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_sessions`
--
ALTER TABLE `admin_sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `session_token` (`session_token`),
  ADD KEY `fk_admin_sessions_admin_user` (`admin_user_id`);

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

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
-- Indexes for table `entries`
--
ALTER TABLE `entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_entries_event` (`event_id`),
  ADD KEY `fk_entries_entry_token` (`entry_token_id`),
  ADD KEY `idx_entries_employee_time` (`employee_id`,`entry_time`),
  ADD KEY `idx_entries_gate_time` (`gate_id`,`entry_time`);

--
-- Indexes for table `entry_tokens`
--
ALTER TABLE `entry_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `fk_entry_tokens_event` (`event_id`),
  ADD KEY `fk_entry_tokens_gate` (`gate_id`),
  ADD KEY `idx_entry_tokens_token` (`token`),
  ADD KEY `idx_entry_tokens_employee` (`employee_id`),
  ADD KEY `idx_entry_tokens_status` (`status`,`expires_at`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `event_code` (`event_code`);

--
-- Indexes for table `gates`
--
ALTER TABLE `gates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gate_code` (`gate_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_sessions`
--
ALTER TABLE `admin_sessions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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

--
-- AUTO_INCREMENT for table `entries`
--
ALTER TABLE `entries`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `entry_tokens`
--
ALTER TABLE `entry_tokens`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `gates`
--
ALTER TABLE `gates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_sessions`
--
ALTER TABLE `admin_sessions`
  ADD CONSTRAINT `fk_admin_sessions_admin_user` FOREIGN KEY (`admin_user_id`) REFERENCES `admin_users` (`id`);

--
-- Constraints for table `entries`
--
ALTER TABLE `entries`
  ADD CONSTRAINT `fk_entries_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  ADD CONSTRAINT `fk_entries_entry_token` FOREIGN KEY (`entry_token_id`) REFERENCES `entry_tokens` (`id`),
  ADD CONSTRAINT `fk_entries_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
  ADD CONSTRAINT `fk_entries_gate` FOREIGN KEY (`gate_id`) REFERENCES `gates` (`id`);

--
-- Constraints for table `entry_tokens`
--
ALTER TABLE `entry_tokens`
  ADD CONSTRAINT `fk_entry_tokens_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  ADD CONSTRAINT `fk_entry_tokens_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
  ADD CONSTRAINT `fk_entry_tokens_gate` FOREIGN KEY (`gate_id`) REFERENCES `gates` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
