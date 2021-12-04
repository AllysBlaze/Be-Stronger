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
    (excercise_name, kcal_per_100,excercise_duration,excercise_description)
    VALUES
    ('przysiady',32,'00:00:04','Stajemy w rozkroku i robimy przysiad, plecy trzymamy w pozycji prostej i uważamy, żeby kolana nie wyprzedzały lini stóp, napinamy mięsnie pośladków i brzucha'),
    ('przysiady z wyskokiem',40,'00:00:05','Stajemy w rozkroku i robimy przysiad, plecy utrzymamy w pozycji prostej i uważamy, żeby kolana nie wyprzedzały linii stóp, napinamy mięsnie pośladków i brzucha. Przy wyjściu do góry dodatkowo robimy wspięcie na palce'),
    ('przysiady ze wspięciem na palce',40,'00:00:04','Stajemy w rozkroku i robimy przysiad, plecy trzymamy w pozycji prostej i uważamy, żeby kolana nuie wyprzedzały lini stóp, napinamy mięsnie pośladków i brzucha. Przy wyjściu do góry robimy wyskok i lądujemy w przysiadzie'),
    ('krzesełko, czas: 0,5 min',100,'00:00:30','Opieramy plecy o ścianę, stopy rozstawione na szerokość bioder, kolana zgięte do 90 stopni, ręce wyciągnięte przed siebie. Utrzymujemy pozycję napinając mięśnie pośladkowe i brzucha'),
    ('wykrok do przodu',30,'00:00:05','Pozycja wyjściowa: Stanie w szerokim rozkroku, jedna noga zgięta w kolanie ustawiona do przodu; tułów wyprostowany, lekko pochylony do przodu. Kucamy raz na jedno kolano, raz na drugie'),
    ('pompki',30,'00:00:02','Ustawiamy się w pozycji deski wysokiej, czyli w podporze przodem, ręce są rozstawione na szerokość barków, a dłonie znajdują się dokładnie pod nimi. Uginamy ręce w łokciach, utrzymując napięte całe ciało. Następnie prostujemy ręce. Przy tym ćwiczeniu ważne jest, aby dłonie trzymać ułożone w kierunku głowy, a nie na skos'),
    ('pompki na pięściach',60,'00:00:02','Ustawiamy się w pozycji deski wysokiej, czyli w podporze przodem, ręce są rozstawione na szerokość barków, a dłonie zaciśnięte w pięści znajdują się dokładnie pod nimi. Uginamy ręce w łokciach utrzymując napięte całe ciało. Następnie prostujemy ręce. Przy tym ćwiczeniu ważne jest, aby dłonie trzymać ułożone w kierunku głowy, a nie na skos'),
    ('deska wysoka, czas: 1 min',600,'00:01:00','Ustawiamy się w podporze przodem, ręce wyprostowane rozstawione na szerokość barków tworzą z ciałem kąt 90 stopni, plecy wyprostowane, napięte mięśnie pleców i brzucha. Utrzymujemy ciało w tej pozycji określony czas'),
    ('deska na przedramionach, czas: 1 min',600,'00:01:00','Ustawiamy się w podporze przodem na przedramionach. Ręce rozstawione na szerokość barków tworzą z ciałem kąt 90 stopni, plecy wyprostowane, napięte mięśnie pleców i brzucha. Utrzymujemy ciało w tej pozycji określony czas'),
    ('skręty tułowia',25,'00:00:01','Ćwiczenie rozpocznij stojąc w rozkroku. Nogi na szerokość ramion. Unieś ręce do boku równolegle do podłoża. Wykonaj skręt tułowia w prawo i w lewo.'),
    ('nożyce pionowe',50,'00:00:02','Kładziemy się na plecach, nogi wyprostowane, ręce ukladamy wzdłóż ciała lub pod pośladkami. Unosimy głowę, spinamy brzuch, a nstępnie unosimy nogi kilka centymetrów nad ziemię, krzyżujemy je naprzeminnie w poziommie, utrzymując spięty brzuch i odcinek lędźwiowy kręgosłupa "przeklejony" do podłoża'),
    ('nożyce poziome',50,'00:00:02','Kładziemy się na plecach, nogi wyprostowane, ręce ukladamy wzdłóż ciała lub pod pośladkami. Unosimy głowę, spinamy brzuch, a nstępnie unosimy nogi kilka centymetrów nad ziemię, krzyżujemy je naprzeminnie w pionie utrzymując spięty brzuch i odcinek lędźwiowy kręgosłupa "przeklejony" do podłoża'),
    ('brzuszki',30,'00:00:01','Pozycja wyjściowa: kładziemy się na podłodze, nogi ugięte w kolanach, ręce zakładamy za głowę, patrzymy przed siebie. Unosimy głowę i barki kilka centymetrów nad ziemię, odcinek lędźwiowy kręgosłupa "przyklejony" do podłogi, opuszczamy głowę '),
    ('brzuszki ze skrętem',30,'00:00:01','Pozycja wyjściowa: kładziemy się na podłodze, nogi ugięte w kolanach, ręce zakładamy za głowę, patrzymy przed siebie. Unosimy głowę i barki kilka centymetrów nad ziemię, odcinek lędźwiowy kręgosłupa "przyklejony" do podłogi. Podnosimy jedną nowę i dotykamy ją przeciwległym łokciem. Opuszczamy głowę i ręce. To samo robimy z drugą nogą i ręką '),
    ('brzuszki z unoszeniem nóg',40,'00:00:01','Pozycja wyjściowa: kładziemy się na podłodze, nogi wyprostowane, ręce zakładamy za głowę, patrzymy przed siebie. Unosimy głowę, barki i nogi kilka centymetrów nad ziemię, odcinek lędźwiowy kręgosłupa "przyklejony" do podłogi, opuszczamy głowę, nogi utrzymujemy w powietrzu '),
    ('skłony skośne w siadzie rozkrocznym',15,'00:00:05','Pozycja wyjściowa: Siad rozkroczny , ręce w górze. Skłon do prawej nogi, do środka, do lewej nogi, powrót do pozycji wyjściowej'),
    ('skłony w przód',15,'00:00:05','Pozycja wyjściowa: Siad z nogami równolegle do siebie, złączonymi w stopach; stopy pionowo do góry. Pochylamy tułów w przód, ramiona wyprostowujemy w kierunku stóp (wytrzymujemy 5-10 sekund) , powrót do pozycji wyjściowej'),
    ('ukłon japoński, czas: 0,5 min',40,'00:00:30','Siadamy na piętach. Stopy są złączone, a kolana szeroko. Przechodzimy dłońmi do przodu. Wyciągamy wyprostowane ramiona w górę i odłóż czoło na macie. Zatrzymujemy się w tej pozycji głęboko oddychając'),
    ('przyciąganie nogi do pośladka',20,'00:00:10','Pozycja wyjściowa: Stanie na jednej nodze (najlepiej z podparciem), druga noga ugięta w kolanie. Chwytamy ręką za stopę w kostce i przyciągamy ugiętą nogę maksymalnie do góry zmieniamy nogę (lewa noga - lewa ręka, prawa noga - prawa ręka)'),
    ('skrętoskłony',15,'00:00:01','Stajemy w szerokim rozkroku, pochylamy się trzymając wyprostowane plecy i ręce wyciągnięte w bok. Sięgamy naprzemiennie do jednej i drugiej stopy, patrząc za ręką idącą ku górze'),
    ('motyl, czas: 1 min',20,'00:01:00','Pozycja wyjściowa: Nogi w „motylka” (stopa dotyka stopy, nogi ugięte w stawach kolanowych), dłonie na wewnętrznej stronie ud. dłońmi dociskamy kolana do podłoża i wytrzymujemy 5-10 sekund'),
    ('pajacyki',20,'00:00:01','Podskakujemy z rostawieniem nóg w rozkrok, razem z nogami robimy wymach oburącz ku górze z klaśniecięm nad głową'),
    ('burpeesy',50,'00:00:03','Wyskakujemy z uniesieniem rąk do góry, a następnie kucamy i wyrzucamy oby dwie nogi w tył do pozycji wysokiej deski, wracamy nogami i ponowny wyskok w górę. Aby utrudnić ćwiczenie, robimy pompkę gdy znajdziemy się w pozycji deski.'),
    ('wymachy ramionami w przód',15,'00:00:01','Stajemy w lekkim rozkroku i wykonujemy wymachy wyprostowanymi rękami w przód, oburącz lub naprzeminnie. Plecy trzymamy prosto, brzuch napięty'),
    ('wymachy ramionami w tył',15,'00:00:01','Stajemy w lekkim rozkroku i wykonujemy wymachy wyprostowanymi rękami w tył, oburącz lub naprzeminnie. Plecy trzymamy prosto, brzuch napięty');




    
    


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
