INSERT INTO users 
(user_name,user_password,email,user_weight,user_gender,user_height,user_birth)
VALUES
('test','test','test@admin.com',60,'M',170,'2000-01-01'),
('admin','admin','admin@admin.com',50,'K',160,'2000-01-01'),
('test2','test2','test2@admin.com',60,'M',170,'2000-01-01'),
('test3','test3','test3@admin.com',60,'M',170,'2000-01-01'),
('a','$2b$10$gZALjUWLchNRGi1ZQmV6MeLtYIsbt5oZjpa2lbB8j9fQBmE.nA5Om','test5@admin.com',60,'M',170,'2000-01-01'),
('test4','test4','test4@admin.com',60,'M',170,'2000-01-01');

INSERT INTO single_excercises
    (excercise_name, excercise_duration)
    VALUES
    ('przysiady','00:00:20'),
    ('pompki','00:00:15'),
    ('deska: 1min','00:01:00'),
    ('skłony','00:00:10'),
    ('brzuszki','00:00:01'),
    ('deska: 2min','00:02:00');

INSERT INTO training_sets
(set_author_id)
VALUES
(1),(3),(1),(2);

INSERT INTO set_excercise
(set_id, excercise_id,excercise_repetiton,excercise_order)
VALUES
(1,2,10,1),(1,3,1,2),(1,4,10,3),(1,1,10,4),
(2,4,15,1),(2,6,1,2),(2,2,20,3),(2,4,30,4),
(3,5,10,1),(3,3,1,2),(3,1,10,3),(3,6,10,4),
(4,2,10,1),(4,3,1,2),(4,1,10,3),(4,3,10,4);


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
(1,'rower',NOW(),'00:45:00'),
(1,'bieganie',NOW(),'01:45:00'),
(5,'rolki',NOW(),'02:00:00'),
(4,'plywanie',NOW(),'00:30:00'),
(2,'rower',NOW(),'00:15:00'),
(6,'rower',NOW(),'00:45:00'),
(5,'rower',NOW(),'00:50:00');

INSERT INTO trainings
(user_id,training_custom_id,training_date)
VALUES
(2,3,NOW()),
(1,4,NOW()),
(5,1,NOW()),
(3,2,NOW()),
(5,4,NOW()),
(5,3,NOW());


UPDATE trainings
JOIN training_sets ON training_custom_id=set_id
SET trainings.training_duration=training_sets.set_duration
WHERE training_category='custom';