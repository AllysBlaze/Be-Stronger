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

INSERT INTO trainings
(user_id,training_category,training_date)
VALUES
(1,'rower',NOW()),
(1,'bieganie',NOW()),
(2,'rolki',NOW()),
(4,'plywanie',NOW()),
(2,'rower',NOW()),
(6,'rower',NOW()),
(5,'rower',NOW());

INSERT INTO trainings
(user_id,training_custom_id,training_date)
VALUES
(2,3,NOW()),
(1,4,NOW()),
(5,1,NOW()),
(3,2,NOW()),
(5,4,NOW()),
(5,3,NOW());


SELECT trainings.training_id, trainings.training_category, training_sets.set_name, COUNT(set_excercise.excercise_id) AS excercise_count, trainings.training_date,trainings.training_duration
FROM trainings
LEFT JOIN set_excercise ON trainings.training_custom_id=set_excercise.set_id
LEFT JOIN training_sets ON trainings.training_custom_id=training_sets.set_id
WHERE trainings.user_id=2
GROUP BY training_custom_id
ORDER BY trainings.training_date;