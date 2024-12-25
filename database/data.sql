-- insert the annees into table
insert into annee values
(2002),
(2020),
(2023),
(2024),
(2025);

-- insert the operteur into table
insert into operateur (OPERATEUR)
values ('redal'),
       ('lydec');


-- Inserting trimestres into the table
INSERT INTO p_tri
VALUES
    (1,'Premier Trimestre'),
    (2,'Deuxième Trimestre'),
    (3,'Troisième Trimestre'),
    (4,'Quatrième Trimestre');

-- Inserting month into the table
INSERT INTO p_mois (ID_M,ID_T, MOIS) VALUES
(1,1, 'January'),
(2,1, 'February'),
(3,1, 'March'),
(4,2, 'April'),
(5,2, 'May'),
(6,2, 'June'),
(7,3, 'July'),
(8,3, 'August'),
(9,3, 'September'),
(10,4, 'October'),
(11,4, 'November'),
(12,4, 'December');


-- Inserting prodiuts into the table
    insert into produit values
    (2,'eau'),
    (4,'électricité');

-- Inserting regions into the table
INSERT INTO region (REGION) VALUES
('Tanger-Tétouan-Al Hoceïma'),
('Oriental'),
('Fès-Meknès'),
('Rabat-Salé-Kénitra'),
('Béni Mellal-Khénifra'),
('Casablanca-Settat'),
('Marrakech-Safi'),
('Drâa-Tafilalet'),
('Souss-Massa'),
('Guelmim-Oued Noun'),
('Laâyoune-Sakia El Hamra'),
('Dakhla-Oued Ed-Dahab');


-- Inserting departements into the table
INSERT INTO departement (ID_D, ID_R, DEPARTEMENT) VALUES
(1, 2, 'Tangier'),
(2, 2, 'Al Hoceima'),
(3, 3, 'Oujda'),
(4, 3, 'Nador'),
(5, 4, 'Fes'),
(6, 4, 'Meknes'),
(7, 5, 'Rabat'),
(8, 5, 'Sale'),
(9, 5, 'Kenitra'),
(10, 6, 'Beni Mellal'),
(11, 6, 'Khouribga'),
(12, 7, 'Casablanca'),
(13, 7, 'Settat'),
(14, 7, 'Mohammedia'),
(15, 8, 'Marrakech'),
(16, 8, 'Safi'),
(17, 9, 'Ouarzazate'),
(18, 9, 'Zagora'),
(19, 9, 'Errachidia'),
(20, 10, 'Agadir'),
(21, 10, 'Essaouira'),
(22, 11, 'Guelmim'),
(23, 11, 'Tan Tan'),
(24, 12, 'Laayoune');


-- insert into users tables
INSERT INTO users (user_id, email, password, delegate_par, nom_prenom, isAdmin, active_statue, tele, ID_D)
VALUES
(1, 'admin@gmail.com', 'hashed_password1', 'admin', 'Admin User', true, true, '0000000000', 8),
(2, 'dpcirabat@gmail.com', 'hashed_password2', 'driss', 'Filal Driss', false, true, '0000000000', 8),
(3, 'dpcialhoceima@gmail.com', 'hashed_password3', 'delegate2', 'User Two', false, true, '987654321', 3),
(4, 'dpcioujda@gmail.com', 'hashed_password4', 'delegate3', 'User Three', false, true, '555555555', 4);


-- insert same data to consommation table
    -- Queries with ID_P = 2 and ID_D = 2
INSERT INTO consommation (ID_D, ID_P, ID_M, ID_O, MNT_CONS, DATEEFFET, OBSERVATION, USER_ID, ANNEE, DEBUT_PERIODE, FIN_PERIODE)
VALUES
  (2, 2, 1, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 1', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 2, 2, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 2', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 2, 3, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 3', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 2, 4, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 4', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 2, 5, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 5', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 2, 6, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 6', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 2, 7, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 7', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 2, 8, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 8', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 2, 9, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 9', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 2, 10, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 10', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 2, 11, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 11', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 2, 12, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 12', 3, 2024, '24/04/2024', '24/04/2024');

  -- Queries with ID_P = 4
INSERT INTO consommation (ID_D, ID_P, ID_M, ID_O, MNT_CONS, DATEEFFET, OBSERVATION, USER_ID, ANNEE, DEBUT_PERIODE, FIN_PERIODE)
VALUES
  (2, 4, 1, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 1', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 4, 2, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 2', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 4, 3, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 3', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 4, 4, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 4', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 4, 5, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 5', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 4, 6, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 6', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 4, 7, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 7', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 4, 8, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 8', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 4, 9, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 9', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 4, 10, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 10', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 4, 11, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 11', 3, 2024, '24/04/2024', '24/04/2024'),
  (2, 4, 12, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 12', 3, 2024, '24/04/2024', '24/04/2024');


  -- Queries with ID_P = 2 ID_D = 1

INSERT INTO consommation (ID_D, ID_P, ID_M, ID_O, MNT_CONS, DATEEFFET, OBSERVATION, USER_ID, ANNEE, DEBUT_PERIODE, FIN_PERIODE)
VALUES
  (1, 2, 1, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 1', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 2, 2, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 2', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 2, 3, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 3', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 2, 4, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 4', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 2, 5, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 5', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 2, 6, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 6', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 2, 7, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 7', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 2, 8, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 8', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 2, 9, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 9', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 2, 10, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 10', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 2, 11, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 11', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 2, 12, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 12', 3, 2024, '24/04/2024', '24/04/2024');

  -- Queries with ID_P = 4 ID_D = 1
INSERT INTO consommation (ID_D, ID_P, ID_M, ID_O, MNT_CONS, DATEEFFET, OBSERVATION, USER_ID, ANNEE, DEBUT_PERIODE, FIN_PERIODE)
VALUES
  (1, 4, 1, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 1', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 4, 2, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 2', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 4, 3, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 3', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 4, 4, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 4', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 4, 5, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 5', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 4, 6, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 6', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 4, 7, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 7', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 4, 8, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 8', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 4, 9, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 9', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 4, 10, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 10', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 4, 11, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 11', 3, 2024, '24/04/2024', '24/04/2024'),
  (1, 4, 12, 1, ROUND(RAND() * (2500000 - 500000) + 500000, 2), '2024-01-30', 'Observation 12', 3, 2024, '24/04/2024', '24/04/2024');


