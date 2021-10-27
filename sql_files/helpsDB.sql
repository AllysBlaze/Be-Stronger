

SELECT trainings.training_id, trainings.training_category, training_sets.set_name, COUNT(set_excercise.excercise_id) AS excercise_count, trainings.training_date,trainings.training_duration
FROM trainings
LEFT JOIN set_excercise ON trainings.training_custom_id=set_excercise.set_id
LEFT JOIN training_sets ON trainings.training_custom_id=training_sets.set_id
WHERE trainings.user_id=2
GROUP BY training_custom_id
ORDER BY trainings.training_date;


SELECT training_sets.set_id,set_name, users.user_name, 
COUNT(set_excercise.excercise_id) AS excercise_count 
FROM training_sets
INNER JOIN set_excercise ON training_sets.set_id=set_excercise.set_id
INNER JOIN users ON training_sets.set_author_id=users.user_id
GROUP BY training_sets.set_id;

SELECT SEC_TO_TIME(SUM( TIME_TO_SEC(single_excercises.excercise_duration) * set_excercise.excercise_repetiton )) 
FROM set_excercise
INNER JOIN single_excercises ON single_excercises.excercise_id = set_excercise.excercise_id
GROUP BY set_id;


UPDATE training_sets AS tr,
(SELECT set_excercise.set_id,SEC_TO_TIME(SUM( TIME_TO_SEC(single_excercises.excercise_duration) * set_excercise.excercise_repetiton )) AS duration 
FROM set_excercise
INNER JOIN single_excercises ON single_excercises.excercise_id = set_excercise.excercise_id
GROUP BY set_id) AS tr2
SET tr.set_duration=tr2.duration
WHERE tr.set_id=tr2.set_id;


SELECT trainings.training_id,trainings.training_custom_id,training_sets.set_duration
FROM trainings
JOIN training_sets ON training_custom_id=set_id;


UPDATE trainings
JOIN training_sets ON training_custom_id=set_id
SET trainings.training_duration=training_sets.set_duration
WHERE training_category='custom';


SELECT training_category, COUNT(training_category) FROM trainings
WHERE user_id=5
GROUP BY training_category;

SELECT COUNT(*) AS training_count,week(training_date,1) AS "week", SEC_TO_TIME(SUM(TIME_TO_SEC(training_duration))) AS "time"
FROM trainings
WHERE user_id=5
GROUP BY week(training_date,1);

SELECT set_name, user_name, set_duration FROM training_sets
JOIN users ON set_author_id=user_id
WHERE set_author_id=1
UNION
SELECT set_name, user_name, set_duration FROM training_sets
JOIN users ON set_author_id=user_id;