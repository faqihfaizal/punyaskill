create database punyaskill;

use punyaskill;

CREATE TABLE users (
  id_user INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  fullname VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  foto_user VARCHAR(255) DEFAULT NULL,
  role ENUM('admin', 'student') NOT NULL DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from users;

CREATE TABLE instruktur (
  id_instruktur INT AUTO_INCREMENT PRIMARY KEY,
  nama_instruktur VARCHAR(100) NOT NULL,
  deskripsi_instruktur text,
  bidang_instruktur VARCHAR(100) UNIQUE NOT NULL,
  foto_instruktur varchar (225) default null,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
select * from instruktur;

CREATE TABLE course (
    id_course INT AUTO_INCREMENT PRIMARY KEY,
    id_instruktur INT NOT NULL,
    judul_course VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    thumbnail VARCHAR(255),
    deskripsi_course TEXT,
    durasi_course VARCHAR(50),
    skill_level ENUM('Beginner','Intermediate','Advanced') DEFAULT 'Beginner',
    last_update DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Relasi ke tabel lain
    CONSTRAINT fk_course_instructor 
        FOREIGN KEY (id_instruktur) REFERENCES instruktur(id_instruktur)
        ON DELETE CASCADE ON UPDATE CASCADE
);
select * from course;



CREATE TABLE user_course (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT NOT NULL,
  id_course INT NOT NULL,
  enrolled_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  progress DECIMAL(5,2) NOT NULL DEFAULT 0.00, 
  UNIQUE KEY uq_user_course (id_user, id_course),
  INDEX idx_enroll_user (id_user),
  INDEX idx_enroll_course (id_course),
  CONSTRAINT fk_enroll_user FOREIGN KEY (id_user) REFERENCES users(id_user)
      ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_enroll_course FOREIGN KEY (id_course) REFERENCES course(id_course)
      ON DELETE CASCADE ON UPDATE CASCADE
);
select * from user_course;

CREATE TABLE materi (
    id_materi INT AUTO_INCREMENT PRIMARY KEY,
    id_course INT NOT NULL,
    judul_materi VARCHAR(150) NOT NULL,
    content text,
    file_materi varchar (225) not null,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_materi_quiz 
	FOREIGN KEY (id_course) REFERENCES course(id_course)
	ON DELETE CASCADE ON UPDATE CASCADE
);
select * from materi;

SELECT id_materi, id_course,judul_materi,content,file_materi,created_at FROM materi WHERE id_course = 1 ORDER BY created_at DESC;
CREATE TABLE quiz (
    id_quiz INT AUTO_INCREMENT PRIMARY KEY,
    id_materi INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    soal_quiz varchar(225) not null,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_quiz_materi 
    FOREIGN KEY (id_materi) REFERENCES materi(id_materi) ON DELETE CASCADE ON UPDATE CASCADE
);
select * from quiz;

CREATE TABLE user_quiz (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_quiz INT NOT NULL,
    jawaban_quiz varchar (225) default null,
    score INT,
    taken_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (id_user, id_quiz),
	CONSTRAINT fk_quiz_user FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_quiz_quiz FOREIGN KEY (id_quiz) REFERENCES quiz(id_quiz) ON DELETE CASCADE ON UPDATE CASCADE
);
