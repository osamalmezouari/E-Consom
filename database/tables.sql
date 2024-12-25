-- create the annee table

create table annee
(
    ANNEE int not null primary key
);

-- create the operateur table
create table operateur
(
    ID_O int auto_increment primary key,
    OPERATEUR char(50) not null
);

-- create the trimestre table
create table p_tri
(
    ID_T int not null primary key,
    TRIMESTRE char(150) not null
);


-- create the month table
create table p_mois
(
    ID_M int not null primary key,
    ID_T int not null,
    MOIS char(50) not null,
    constraint p_mois_p_tri_ID_T_fk
        foreign key (ID_T) references p_tri (ID_T)
);


-- create produit table
create table produit
(
    ID_P int auto_increment primary key,
    PRODUIT char(50) null
);


-- create region table
create table region
(
    ID_R   int auto_increment primary key,
    REGION char(150) null
);


-- create a departements table
create table departement
(
    ID_D        int auto_increment
        primary key,
    ID_R        int       not null,
    DEPARTEMENT char(150) not null,
    constraint departement_region_ID_R_fk
        foreign key (ID_R) references region (ID_R)
);


-- create a donneconsom table
create table donneconsom
(
    ID_DC           int auto_increment
        primary key,
    ANNEE           int            not null,
    ID_R            int            not null,
    DEPAT_CREDIT    decimal(15, 2) not null,
    DOTA_DEFINITIVE decimal(15, 2) not null,
    COMISSION       decimal(15, 2) not null,
    ID_P            int            not null,
    constraint donneconsom_annee_ANNEE_fk
        foreign key (ANNEE) references annee (ANNEE),
    constraint donneconsom_produit_ID_P_fk
        foreign key (ID_P) references produit (ID_P),
    constraint donneconsom_region_ID_R_fk
        foreign key (ID_R) references region (ID_R)
);

-- create a users table
create table users
(
    user_id       int auto_increment
        primary key,
    email         varchar(200)         not null,
    password      varchar(200)         not null,
    delegate_par  varchar(80)          not null,
    nom_prenom    varchar(80)          not null,
    isAdmin       tinyint(1) default 0 not null,
    active_statue tinyint(1) default 0 not null,
    tele          varchar(50)          null,
    ID_D          int                  not null,
    constraint users_departement_ID_D_fk
        foreign key (ID_D) references departement (ID_D)
);

-- create a consommation table
create table consommation
(
    ID_D          int            not null,
    ID_P          int            not null,
    ID_M          int            not null,
    ID_O          int            not null,
    MNT_CONS      decimal(15, 2) not null,
    DATEEFFET     varchar(100)   not null,
    OBSERVATION   varchar(250)   null,
    USER_ID       int            null,
    ANNEE         int            not null,
    DEBUT_PERIODE varchar(100)   not null,
    FIN_PERIODE   varchar(100)   not null,
    primary key (ID_D, ID_O, ID_M, ID_P, ANNEE),
    constraint consommation_annee_ANNEE_fk
        foreign key (ANNEE) references annee (ANNEE),
    constraint consommation_departement_ID_D_fk
        foreign key (ID_D) references departement (ID_D),
    constraint consommation_operateur_ID_O_fk
        foreign key (ID_O) references operateur (ID_O),
    constraint consommation_p_mois_ID_M_fk
        foreign key (ID_M) references p_mois (ID_M),
    constraint consommation_produit_ID_P_fk
        foreign key (ID_P) references produit (ID_P),
    constraint consommation_users_user_id_fk
        foreign key (USER_ID) references users (user_id)
);



