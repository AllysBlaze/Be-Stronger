INSERT INTO users 
(user_name,user_password,email,user_weight,user_height,user_birth)
VALUES
('test','test','test@admin.com',60,170,'2000-01-01'),
('admin','admin','admin@admin.com',50,160,'2000-01-01'),
('test2','test2','test2@admin.com',60,170,'2000-01-01'),
('test3','test3','test3@admin.com',60,170,'2000-01-01'),
('a','$2b$10$gZALjUWLchNRGi1ZQmV6MeLtYIsbt5oZjpa2lbB8j9fQBmE.nA5Om','test5@admin.com',60,170,'2000-01-01'),
('test4','test4','test4@admin.com',60,170,'2000-01-01');

INSERT INTO single_excercises
    (excercise_name, excercise_duration,excercise_description)
    VALUES
    ('przysiady','00:00:20','opis'),
    ('pompki','00:00:15','opis'),
    ('deska: 1min','00:01:00','opis'),
    ('brzuszki','00:00:01','opis'),
    ('wykrok','00:00:01','opis'),
    ('nożyce pionowe','00:00:20','opis'),
    ('ukłon japoński','00:00:10','opis'),
    ('deska: 2min','00:02:00','opis'),
    ('skłony','00:00:01','opis');

INSERT INTO training_sets
(set_author_id,set_description)
VALUES
(1,'opis'),(3,'opis'),(1,'opis'),(2,'opis'),(5,'opis'),(5,'opis'),(2,'opis'),(5,'opis'),(4,'opis');

INSERT INTO set_excercise
(set_id, excercise_id,excercise_repetiton,excercise_order)
VALUES
(1,2,10,1),(1,3,1,2),(1,4,10,3),(1,1,10,4),
(2,4,15,1),(2,6,1,2),(2,2,20,3),(2,4,30,4),
(3,5,10,1),(3,3,1,2),(3,1,10,3),(3,6,10,4),
(4,2,10,1),(4,3,1,2),(4,4,10,3),(4,1,10,4),
(5,5,15,1),(5,6,1,2),(5,2,20,3),(5,4,30,4),(5,9,20,5),(5,6,10,6),
(6,1,10,1),(6,3,1,2),(6,6,10,3),(6,2,10,4),
(7,8,10,1),(7,4,1,2),(7,8,10,3),(7,5,10,4),(7,4,10,5),
(8,5,10,1),(8,3,1,2),(8,2,10,3),(8,7,10,4),(8,1,20,5),(8,8,10,6),
(9,2,10,1),(8,7,1,2),(9,9,10,3),(9,3,10,4);

UPDATE training_sets AS tr,
(SELECT set_excercise.set_id,SEC_TO_TIME(SUM( TIME_TO_SEC(single_excercises.excercise_duration) * set_excercise.excercise_repetiton )) AS duration 
FROM set_excercise
INNER JOIN single_excercises ON single_excercises.excercise_id = set_excercise.excercise_id
GROUP BY set_id) AS tr2
SET tr.set_duration=tr2.duration
WHERE tr.set_id=tr2.set_id;

INSERT INTO trainings
(user_id,training_category,training_date,training_duration)
VALUES
(1,'jazda na rowerze','2021-10-10','00:45:00'),
(1,'bieganie','2021-10-11','01:45:00'),
(5,'jazda na rolkach','2021-10-10','02:00:00'),
(4,'trekking','2021-09-29','00:30:00'),
(2,'joga','2021-10-5','00:15:00'),
(3,'skakanie na skakance','2021-10-12','00:45:00'),
(4,'trekking','2021-10-07','00:45:00'),
(2,'skakanie na skakance','2021-10-23','00:45:00'),
(1,'bieganie','2021-10-21','00:45:00'),
(5,'joga','2021-10-19','00:45:00'),
(6,'jazda na rolkach','2021-10-17','00:45:00'),
(5,'pływanie','2021-10-29','00:50:00'),
(1,'jazda na rowerze','2021-10-10','00:45:00'),
(1,'bieganie','2021-10-11','01:45:00'),
(5,'jazda na rolkach','2021-10-18','02:00:00'),
(4,'trekking','2021-09-29','00:30:00'),
(2,'joga','2021-10-5','00:15:00'),
(3,'skakanie na skakance','2021-10-12','00:45:00'),
(4,'trekking','2021-10-07','00:45:00'),
(2,'skakanie na skakance','2021-10-23','00:45:00'),
(1,'bieganie','2021-10-19','00:45:00'),
(5,'joga','2021-10-11','00:45:00'),
(6,'jazda na rolkach','2021-10-12','00:45:00'),
(5,'pływanie','2021-10-23','00:50:00');


INSERT INTO trainings
(user_id,training_custom_id,training_date)
VALUES
(2,3,NOW()),
(1,4,NOW()),
(5,1,NOW()),
(3,2,NOW()),
(5,4,NOW()),
(5,3,NOW()),
(5,5,'2021-10-11'),
(5,2,'2021-10-21'),
(5,9,'2021-10-10'),
(5,5,'2021-10-30'),
(5,1,'2021-10-01');


UPDATE trainings
JOIN training_sets ON training_custom_id=set_id
SET trainings.training_duration=training_sets.set_duration
WHERE training_category='custom';