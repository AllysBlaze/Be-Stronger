INSERT INTO users 
(user_name,user_password,email,user_weight,user_height,user_birth)
VALUES
('test','test','test@admin.com',60,170,'2000-01-01'),
('admin','admin','admin@admin.com',50,160,'2000-01-01'),
('test2','test2','test2@admin.com',60,170,'2000-01-01'),
('test3','test3','test3@admin.com',60,170,'2000-01-01'),
('a','$2b$10$gZALjUWLchNRGi1ZQmV6MeLtYIsbt5oZjpa2lbB8j9fQBmE.nA5Om','test5@admin.com',60,170,'2000-01-01'),
('test4','test4','test4@admin.com',60,170,'2000-01-01');


INSERT INTO training_categories
(category,kcal_per_hour)
VALUES
('jazda na rowerze',500),
('jazda na rolkach',700),
('joga',175),
('jazda na nartach',500),
('skakanie na skakance',350),
('trekking',440),
('pływanie',750),
('bieganie',620)
;

INSERT INTO training_categories (category)
VALUES ('custom');

INSERT INTO single_excercises
    (excercise_name, excercise_duration,excercise_description)
    VALUES
    ('przysiady','00:00:02','opis'),
    ('przysiady z wyskokiem','00:00:02','opis')
    ('przysiady ze wspięciem na palce','00:00:02','opis')
    ('krzesełko','00:00:30','Opieramy plecy o ścianę, stopy rozstawione na szerokość bioder, kolana zgięte do 90 stopni, ręce wyciągnięte przed siebie. Utrzymujemy pozycję napinając mięśnie pośladkowe i brzucha')
    ('wykrok','00:00:05','opis'),
    ('pompki','00:00:02','opis'),
    ('pompki na pięściach','00:00:02','opis'),
    ('deska wysoka','00:01:00','opis'),
    ('deska na przedramionach','00:01:00','opis'),
    ('skręty tłowia','00:00:01','opis'),
    ('nożyce pionowe','00:00:02','opis'),
    ('nożyce poziome','00:00:02','opis'),
    ('brzuszki','00:00:01','opis'),
    ('brzuszki ze skrętem','00:00:01','opis'),
    ('brzuszki z unoszeniem nóg','00:00:01','opis'),
    ('skłony skośne w siadzie rozkrocznym','00:00:05','Pozycja wyjściowa: Siad rozkroczny , ręce w górze. Skłon do prawej nogi, do środka, do lewej nogi, powrót do pozycji wyjściowej')
    ('skłony w przód','00:00:05','Pozycja wyjściowa: Siad z nogami równolegle do siebie, złączonymi w stopach; stopy pionowo do góry. Pochylamy tułów w przód, ramiona wyprostowujemy w kierunku stóp (wytrzymujemy 5-10 sekund) , powrót do pozycji wyjściowej')
    ('ukłon japoński','00:00:10','opis'),
    ('przyciąganie nogi do pośladka','00:00:10','Pozycja wyjściowa: Stanie na jednej nodze (najlepiej z podparciem), druga noga ugięta w kolanie. Chwytamy ręką za stopę w kostce i przyciągamy ugiętą nogę maksymalnie do góry
zmieniamy nogę (lewa noga - lewa ręka, prawa noga - prawa ręka)'),
    ('skłony','00:00:01','opis'),
    ('skrętoskłony','00:00:01','opis'),
    ('motyl','00:00:01','opis'),
    ('pajacyki','00:00:01','opis'),
    ('krokodylki','00:00:03','Wyskakujemy z uniesieniem rąk do góry, a następnie kucamy i wyrzucamy ')
    ('burpeesy','00:00:03','Wyskakujemy z uniesieniem rąk do góry, a następnie kucamy i wyrzucamy oby dwie nogi w tył do pozycji wysokiej deski, wracamy nogami i ponowny wyskok w górę. Aby utrudnić ćwiczenie, robimy pompkę gdy znajdziemy się w pozycji deski.'),
    ('wymachy ramionami','00:00:01','opis');






    
    
INSERT INTO single_excercises
(excercise_name, excercise_duration,excercise_description,kcal_per_100)
VALUES
('brzuszki','00:00:01','opis',25);

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


UPDATE training_sets AS tr,
(SELECT set_excercise.set_id,SUM((single_excercises.kcal_per_100) /100 * set_excercise.excercise_repetiton ) AS kcal
FROM set_excercise
INNER JOIN single_excercises ON single_excercises.excercise_id = set_excercise.excercise_id
GROUP BY set_id) AS tr2
SET tr.kcal=tr2.kcal
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

UPDATE trainings
JOIN training_categories ON trainings.training_category=training_categories.category
SET trainings.kcal=(TIME_TO_SEC(trainings.training_duration))/3600*training_categories.kcal_per_hour;

UPDATE trainings
JOIN training_sets ON training_custom_id=set_id
SET trainings.kcal=training_sets.kcal
WHERE training_category='custom';
