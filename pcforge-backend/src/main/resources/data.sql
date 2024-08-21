-- CPU

CREATE TEMP TABLE cpu_tabela (
                                 Name varchar(255),
                                 Price varchar(255),
                                 Producer varchar(255),
                                 MPN varchar(255),
                                 EAN varchar(255),
                                 UPC varchar(255),
                                 Base_clock varchar(255),
                                 Turbo_clock varchar(255),
                                 Unlocked varchar(255),
                                 Cores integer,
                                 Threads integer,
                                 TDP varchar(255),
                                 Socket varchar(255),
                                 GPU varchar(255),
                                 Product varchar(255)
);

COPY cpu_tabela FROM '/data_csv/CPUData.csv' DELIMITER ',' CSV HEADER;

INSERT INTO
    cpus (name,  base_clock, cores, producer, socket)
SELECT
    Name,
    regexp_replace(Base_clock, '[^\d.]+', '', 'g')::numeric,
    Cores,
    Producer,
    Socket
FROM
    cpu_tabela
WHERE
    regexp_replace(Base_clock, '[^\d.]+', '', 'g') <> '';

DROP TABLE cpu_tabela;

-- CASE

CREATE TEMP TABLE case_tabela (
                                  Name varchar(255),
                                  Price varchar(255),
                                  Producer varchar(255),
                                  MPN varchar(255),
                                  EAN varchar(255),
                                  UPC varchar(255),
                                  Width varchar(255),
                                  Depth varchar(255),
                                  Height varchar(255),
                                  Case_type varchar(255),
                                  Power varchar(255),
                                  GPU varchar(255),
                                  a1 varchar(255),
                                  b1 varchar(255),
                                  c1 varchar(255),
                                  d1 varchar(255),
                                  e1 varchar(255),
                                  f1 varchar(255),
                                  g1 varchar(255),
                                  h1 varchar(255),
                                  i1 varchar(255),
                                  j1 varchar(255),
                                  a2 varchar(255),
                                  b2 varchar(255),
                                  c2 varchar(255),
                                  d2 varchar(255),
                                  e2 varchar(255),
                                  f2 varchar(255),
                                  g2 varchar(255),
                                  h2 varchar(255),
                                  i2 varchar(255),
                                  j2 varchar(255)
);

COPY case_tabela FROM '/data_csv/CaseData.csv' DELIMITER ',' CSV HEADER;

INSERT INTO
    cases (name, producer, case_type, gpu_size)
SELECT
    Name,
    Producer,
    Case_type,
    regexp_replace(GPU, '[^\d.]+', '', 'g')::numeric
FROM
    case_tabela
WHERE
    regexp_replace(GPU, '[^\d.]+', '', 'g') <> '';

DROP TABLE case_tabela;

-- GPU

CREATE TEMP TABLE gpu_tabela (
                                 Name varchar(255),
                                 Price varchar(255),
                                 Producer varchar(255),
                                 MPN varchar(255),
                                 EAN varchar(255),
                                 UPC varchar(255),
                                 Length varchar(255),
                                 Slots varchar(255),
                                 Pin8 varchar(255),
                                 Pin6 varchar(255),
                                 HDMI varchar(255),
                                 DisplayPort varchar(255),
                                 DVI varchar(255),
                                 VGA varchar(255),
                                 BoostClock varchar(255),
                                 Vram varchar(255),
                                 Memory varchar(255),
                                 TDP varchar(255),
                                 Product varchar(255)
);

COPY gpu_tabela FROM '/data_csv/GPUData.csv' DELIMITER ',' CSV HEADER;

INSERT INTO
    gpus (name, producer, vram, length)
SELECT
    Name,
    Producer,
    regexp_replace(Vram, '[^\d.]+', '', 'g')::numeric,
    regexp_replace(Length, '[^\d.]+', '', 'g')::numeric
FROM
    gpu_tabela
WHERE
    regexp_replace(Length, '[^\d.]+', '', 'g') <> '';

DROP TABLE gpu_tabela;

-- Motherboard

CREATE TEMP TABLE mb_tabela (
                                Name varchar(255),
                                Price varchar(255),
                                Producer varchar(255),
                                MPN varchar(255),
                                EAN varchar(255),
                                UPC varchar(255),
                                Socket varchar(255),
                                Chipset varchar(255),
                                Unlocked varchar(255),
                                Form_Factor varchar(255),
                                Memory_Type varchar(255),
                                Memory_Capacity varchar(255),
                                RAM_Slots integer,
                                SATA varchar,
                                VGA varchar(255),
                                DVI varchar(255),
                                Display_Port varchar(255),
                                HDMI varchar(255),
                                WiFi varchar(255),
                                Graphic varchar(255),
                                Product varchar(255)
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
                               Name varchar(255),
                               Price varchar(255),
                               Producer varchar(255),
                               MPN varchar(255),
                               EAN varchar(255),
                               UPC varchar(255),
                               Watt varchar(255),
                               Size varchar(255),
                               Rating varchar(255),
                               Product varchar(255)
);

COPY p_tabela FROM '/data_csv/PSUData.csv' DELIMITER ',' CSV HEADER;

INSERT INTO
    power (name, watt)
SELECT
    Name,
    regexp_replace(Watt, '[^\d.]+', '', 'g')::numeric
FROM
    p_tabela
WHERE
    regexp_replace(Watt, '[^\d.]+', '', 'g') <> '';

DROP TABLE p_tabela;

-- RAM

CREATE TEMP TABLE ram_tabela (
                                 Name varchar(255),
                                 Price varchar(255),
                                 Producer varchar(255),
                                 MPN varchar(255),
                                 EAN varchar(255),
                                 UPC varchar(255),
                                 RAM_Type varchar(255),
                                 Size varchar(255),
                                 Clock integer,
                                 Timings varchar(255),
                                 Sticks varchar(255),
                                 Product varchar(255)
);

COPY ram_tabela FROM '/data_csv/RAMData.csv' DELIMITER ',' CSV HEADER;

INSERT INTO
    RAM (name, producer, ram_type, clock, size)
SELECT
    Name,
    Producer,
    substring(RAM_Type, 1, 4),
    Clock,
    regexp_replace(Size, '[^\d.]+', '', 'g')::numeric
FROM
    ram_tabela
WHERE
    regexp_replace(Size, '[^\d.]+', '', 'g') <> '';

DROP TABLE ram_tabela;

--Storage

CREATE TEMP TABLE st_tabela (
                                Name varchar(255),
                                Price varchar(255),
                                Producer varchar(255),
                                MPN varchar(255),
                                EAN varchar(255),
                                UPC varchar(255),
                                Form_Factor varchar(255),
                                Protocol varchar(255),
                                Size varchar(255),
                                NAND varchar(255),
                                Controller varchar(255),
                                Product varchar(255)
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