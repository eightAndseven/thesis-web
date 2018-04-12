-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2018 at 09:01 AM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `powerboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `id` int(11) NOT NULL,
  `user_activity` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_username` varchar(50) NOT NULL,
  `date_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`id`, `user_activity`, `user_id`, `user_username`, `date_time`) VALUES
(1, 'Turn on socket 1', 1, 'Admin', '2018-03-19 19:20:13'),
(2, 'Turn off socket 2', 1, 'Admin', '2018-03-19 20:16:54'),
(3, 'Turn off socket 3', 1, 'Admin', '2018-03-19 21:24:14'),
(4, 'Turn off socket 4', 1, 'Admin', '2018-03-19 22:26:12'),
(5, 'Turn on socket 2', 1, 'Admin', '2018-03-19 23:46:35'),
(6, 'Turn on socket 3', 1, 'Admin', '2018-03-20 00:27:44'),
(7, 'Turn on socket 4', 1, 'Admin', '2018-03-20 01:12:46'),
(8, 'Schedule off socket 3 at 2018-03-20 04:56:42', 1, 'Admin', '2018-03-20 04:53:42'),
(9, 'Schedule off socket 2 at 2018-03-20 06:32:44', 1, 'Admin', '2018-03-20 06:27:44'),
(10, 'Turn off socket 4', 1, 'Admin', '2018-03-20 08:00:00'),
(11, 'Turn on socket 4', 1, 'Admin', '2018-03-20 08:02:01'),
(12, 'Turn off socket 4', 1, 'Admin', '2018-03-20 08:02:36'),
(13, 'Turn on socket 2', 1, 'Admin', '2018-03-20 09:42:23');

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `id` int(10) NOT NULL,
  `username` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`id`, `username`, `name`, `password`) VALUES
(1, 'admin', 'Admin', '$1$P0w3rbo@$M7y8mf4ru5HpWGgiD9MvD0'),
(23, 'Hallelujah', 'Jay Star', '$1$P0w3rbo@$YlWaXzoNzJjntev9HRw9D0'),
(24, 'Hallelujah88', 'Jay Star', '$1$P0w3rbo@$HlONNrk/n6FlmV4lI5MaB.'),
(25, 'reinyear', 'Reinier Santos', '$1$P0w3rbo@$FFpTfD0cZ8dGN/e0L6EBM.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
