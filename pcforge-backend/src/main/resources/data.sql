-- CPU

CREATE TEMP TABLE cpu_tabela (
    Name            varchar(255),
    Price           varchar(255),
    Producer        varchar(255),
    MPN             varchar(255),
    EAN             varchar(255),
    UPC             varchar(255),
    Base_clock      varchar(255),
    Turbo_clock     varchar(255),
    Unlocked        varchar(255),
    Cores           integer,
    Threads         integer,
    TDP             varchar(255),
    Socket          varchar(255),
    GPU             varchar(255),
    Product         varchar(255)
);

COPY cpu_tabela FROM '/data_csv/CPUData.csv' DELIMITER ',' CSV HEADER;

INSERT INTO
    cpus (name,  base_clock, cores, producer, socket, threads, integral_gpu, tdp)
SELECT
    Name,
    regexp_replace(Base_clock, '[^\d.]+', '', 'g')::numeric,
    Cores,
    Producer,
    Socket,
    Threads,
    GPU,
    regexp_replace(TDP, '[^\d.]+', '', 'g')::numeric
FROM
    cpu_tabela
WHERE
    regexp_replace(Base_clock, '[^\d.]+', '', 'g') <> '';

DROP TABLE cpu_tabela;

-- CASE

CREATE TEMP TABLE case_tabela (
    Name                    varchar(255),
    Price                   varchar(255),
    Producer                varchar(255),
    MPN                     varchar(255),
    EAN                     varchar(255),
    UPC                     varchar(255),
    Width                   varchar(255),
    Depth                   varchar(255),
    Height                  varchar(255),
    Motherboard             varchar(255),
    Power                   varchar(255),
    GPU                     varchar(255),
    Supported_CPU_Cooler    varchar(255),
    Fans_80mm               varchar(255),
    Fans_120mm              varchar(255),
    Fans_140mm              varchar(255),
    Fans_200mm              varchar(255),
    Radiator_120mm          varchar(255),
    Radiator_140mm          varchar(255),
    Radiator_240mm          varchar(255),
    Radiator_280mm          varchar(255),
    Radiator_360mm          varchar(255),
    Disk_25                 varchar(255),
    Disk_35                 varchar(255),
    Disk_2535               varchar(255),
    Disk_525                varchar(255),
    Color                   varchar(255),
    j2                  varchar(255),
    Filter                  varchar(255),
    Cable                   varchar(255),
    Noise_isolation         varchar(255),
    Product                 varchar(255)
);

COPY case_tabela FROM '/data_csv/CaseData.csv' DELIMITER ',' CSV HEADER;

INSERT INTO
    cases (name, producer, motherboard, gpu_size, power_supply)
SELECT
    Name,
    Producer,
    Motherboard,
    regexp_replace(GPU, '[^\d.]+', '', 'g')::numeric,
    Power
FROM
    case_tabela
WHERE
    regexp_replace(GPU, '[^\d.]+', '', 'g') <> '' and Power <> '';

DROP TABLE case_tabela;

-- GPU

CREATE TEMP TABLE gpu_tabela (
    Name            varchar(255),
    Price           varchar(255),
    Producer        varchar(255),
    MPN             varchar(255),
    EAN             varchar(255),
    UPC             varchar(255),
    Length          varchar(255),
    Slots           varchar(255),
    Pin8            varchar(255),
    Pin6            varchar(255),
    HDMI            varchar(255),
    DisplayPort     varchar(255),
    DVI             varchar(255),
    VGA             varchar(255),
    BoostClock      varchar(255),
    Vram            varchar(255),
    Memory          varchar(255),
    TDP             varchar(255),
    Product         varchar(255)
);

COPY gpu_tabela FROM '/data_csv/GPUData.csv' DELIMITER ',' CSV HEADER;

INSERT INTO
    gpus (name, producer, vram, gpu_size, tdp)
SELECT
    Name,
    Producer,
    regexp_replace(Vram, '[^\d.]+', '', 'g')::numeric,
    regexp_replace(Length, '[^\d.]+', '', 'g')::numeric,
    regexp_replace(TDP, '[^\d.]+', '', 'g')::numeric
FROM
    gpu_tabela
WHERE
    regexp_replace(Length, '[^\d.]+', '', 'g') <> '';

DROP TABLE gpu_tabela;

-- Motherboard

CREATE TEMP TABLE mb_tabela (
    Name                varchar(255),
    Price               varchar(255),
    Producer            varchar(255),
    MPN                 varchar(255),
    EAN                 varchar(255),
    UPC                 varchar(255),
    Socket              varchar(255),
    Chipset             varchar(255),
    Unlocked            varchar(255),
    Form_Factor         varchar(255),
    Memory_Type         varchar(255),
    Memory_Capacity     varchar(255),
    RAM_Slots           integer,
    SATA                varchar,
    VGA                 varchar(255),
    DVI                 varchar(255),
    Display_Port        varchar(255),
    HDMI                varchar(255),
    WiFi                varchar(255),
    Graphic             varchar(255),
    Product             varchar(255)
);

COPY mb_tabela FROM '/data_csv/MotherboardData.csv' DELIMITER ',' CSV HEADER;

INSERT INTO
    motherboards (name, producer, socket, memory_type, memory_slots, memory_capacity, form_factor)
SELECT
    Name,
    Producer,
    Socket,
    Memory_Type,
    RAM_Slots,
    regexp_replace(Memory_Capacity, '[^\d.]+', '', 'g')::numeric,
    Form_Factor
FROM
    mb_tabela
WHERE
    regexp_replace(Memory_Capacity, '[^\d.]+', '', 'g') <> '' AND Form_Factor <> '';

DROP TABLE mb_tabela;

-- Power

CREATE TEMP TABLE p_tabela (
    Name            varchar(255),
    Price           varchar(255),
    Producer        varchar(255),
    MPN             varchar(255),
    EAN             varchar(255),
    UPC             varchar(255),
    Watt            varchar(255),
    Size            varchar(255),
    Rating          varchar(255),
    Product         varchar(255)
);

COPY p_tabela FROM '/data_csv/PSUData.csv' DELIMITER ',' CSV HEADER;

INSERT INTO
    power (name, watt, size)
SELECT
    Name,
    regexp_replace(Watt, '[^\d.]+', '', 'g')::numeric,
    Size
FROM
    p_tabela
WHERE
    regexp_replace(Watt, '[^\d.]+', '', 'g') <> '' and Size <> '';

DROP TABLE p_tabela;

-- RAM

CREATE TEMP TABLE ram_tabela (
    Name        varchar(255),
    Price       varchar(255),
    Producer    varchar(255),
    MPN         varchar(255),
    EAN         varchar(255),
    UPC         varchar(255),
    RAM_Type    varchar(255),
    Size        varchar(255),
    Clock       integer,
    Timings     varchar(255),
    Sticks      integer,
    Product     varchar(255)
);

COPY ram_tabela FROM '/data_csv/RAMData.csv' DELIMITER ',' CSV HEADER;

INSERT INTO
    RAM (name, ram_type, clock, size, sticks)
SELECT
    Name,
    substring(RAM_Type, 1, 4),
    Clock,
    regexp_replace(Size, '[^\d.]+', '', 'g')::numeric,
    Sticks
FROM
    ram_tabela
WHERE
    regexp_replace(Size, '[^\d.]+', '', 'g') <> '';

DROP TABLE ram_tabela;

--Storage

CREATE TEMP TABLE st_tabela (
    Name            varchar(255),
    Price           varchar(255),
    Producer        varchar(255),
    MPN             varchar(255),
    EAN             varchar(255),
    UPC             varchar(255),
    Form_Factor     varchar(255),
    Protocol        varchar(255),
    Size            varchar(255),
    NAND            varchar(255),
    Controller      varchar(255),
    Product         varchar(255)
);

COPY st_tabela FROM '/data_csv/SSDData.csv' DELIMITER ',' CSV HEADER;

INSERT INTO
    storage (name, producer, size)
SELECT
    Name,
    Producer,
    regexp_replace(Size, '[^\d.]+', '', 'g')::numeric
FROM
    st_tabela
WHERE
    regexp_replace(Size, '[^\d.]+', '', 'g') <> '';

DROP TABLE st_tabela;

-- Types
INSERT INTO types (name) VALUES
                             ('ADMIN'),
                             ('EXPERT'),
                             ('USER');

-- Users

INSERT INTO users (email, username, password) VALUES
                                                       ('admin@gmail.com', 'Admin', '$2a$10$DfdikuGE0AgXrecMgdmwj.5GVHZLyhz1XkAUJYSdo0SBUc7XaR2bC'),
                                                       ('white.black@gmail.com', 'WhiteBlackTV', '$2a$10$DfdikuGE0AgXrecMgdmwj.5GVHZLyhz1XkAUJYSdo0SBUc7XaR2bC'),
                                                       ('tech.nestea@gmail.com', 'TechNestea', '$2a$10$DfdikuGE0AgXrecMgdmwj.5GVHZLyhz1XkAUJYSdo0SBUc7XaR2bC');
INSERT INTO user_types (type_id, user_id) VALUES
                                              (1, 1),
                                              (2, 2),
                                              (3, 3);