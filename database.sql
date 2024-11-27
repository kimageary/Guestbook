CREATE DATABASE guestbook;

USE guestbook;

DROP TABLE  IF EXISTS entries;

CREATE TABLE entries(
	id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    job_title VARCHAR(50),
    company VARCHAR(50),
    linkedIN VARCHAR(50),
    email VARCHAR(50),
    meet_options VARCHAR(50),
    other VARCHAR(50),
    message VARCHAR(250),
    mailing_list VARCHAR(50),
    date_submitted TIMESTAMP DEFAULT NOW()
    );
    
INSERT INTO entries (first_name, last_name, job_title, 
company, linkedIN, email, meet_options, other, message, 
mailing_list) VALUES('Kim', 'Mageary', 'Student', 'Greenriver',
'linkedin.com', 'kim@gmail.com', 'school', 'blah blah','okokokokoko','true');
        
	SELECT * FROM entries;