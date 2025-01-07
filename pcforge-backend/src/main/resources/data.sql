-- CPU

CREATE TEMP TABLE cpu_tabela
(
    Name        varchar(255),
    Price       varchar(255),
    Producer    varchar(255),
    MPN         varchar(255),
    EAN         varchar(255),
    UPC         varchar(255),
    Base_clock  varchar(255),
    Turbo_clock varchar(255),
    Unlocked    varchar(255),
    Cores       integer,
    Threads     integer,
    TDP         varchar(255),
    Socket      varchar(255),
    GPU         varchar(255),
    Product     varchar(255)
);

COPY cpu_tabela FROM '/data_csv/CPUData.csv' DELIMITER ',' CSV HEADER;

CREATE TEMP TABLE cpu_ben
(
    Type       varchar(255),
    PartNumber varchar(255),
    Brand      varchar(255),
    Model      varchar(255),
    Rank       integer,
    Benchmark  varchar(255),
    Samples    varchar(255),
    URL        varchar(255)
);

COPY cpu_ben FROM '/data_csv/UserBenchmark/CPU_UserBenchmarks.csv' DELIMITER ',' CSV HEADER;

INSERT INTO cpus (name, base_clock, cores, producer, socket, threads, integral_gpu, tdp, rank)
SELECT Name,
       regexp_replace(Base_clock, '[^\d.]+', '', 'g')::numeric,
       Cores,
       Producer,
       Socket,
       Threads,
       GPU,
       regexp_replace(TDP, '[^\d.]+', '', 'g')::numeric,
       (SELECT cpu_ben.rank FROM cpu_ben WHERE cpu_tabela.MPN like cpu_ben.partnumber)
FROM cpu_tabela
WHERE regexp_replace(Base_clock, '[^\d.]+', '', 'g') <> '';

DROP TABLE cpu_tabela;

DROP TABLE cpu_ben;
-- CASE

CREATE TEMP TABLE case_tabela
(
    Name                 varchar(255),
    Price                varchar(255),
    Producer             varchar(255),
    MPN                  varchar(255),
    EAN                  varchar(255),
    UPC                  varchar(255),
    Width                varchar(255),
    Depth                varchar(255),
    Height               varchar(255),
    Motherboard          varchar(255),
    Power                varchar(255),
    GPU                  varchar(255),
    Supported_CPU_Cooler varchar(255),
    Fans_80mm            varchar(255),
    Fans_120mm           varchar(255),
    Fans_140mm           varchar(255),
    Fans_200mm           varchar(255),
    Radiator_120mm       varchar(255),
    Radiator_140mm       varchar(255),
    Radiator_240mm       varchar(255),
    Radiator_280mm       varchar(255),
    Radiator_360mm       varchar(255),
    Disk_25              varchar(255),
    Disk_35              varchar(255),
    Disk_2535            varchar(255),
    Disk_525             varchar(255),
    Color                varchar(255),
    j2                   varchar(255),
    Filter               varchar(255),
    Cable                varchar(255),
    Noise_isolation      varchar(255),
    Product              varchar(255)
);

COPY case_tabela FROM '/data_csv/CaseData.csv' DELIMITER ',' CSV HEADER;

INSERT INTO cases (name, producer, motherboard, gpu_size, power_supply)
SELECT Name,
       Producer,
       Motherboard,
       regexp_replace(GPU, '[^\d.]+', '', 'g')::numeric,
       Power
FROM case_tabela
WHERE regexp_replace(GPU, '[^\d.]+', '', 'g') <> ''
  and Power <> '';

DROP TABLE case_tabela;

-- GPU

CREATE TEMP TABLE gpu_tabela
(
    Name        varchar(255),
    Price       varchar(255),
    Producer    varchar(255),
    MPN         varchar(255),
    EAN         varchar(255),
    UPC         varchar(255),
    Length      varchar(255),
    Slots       varchar(255),
    Pin8        varchar(255),
    Pin6        varchar(255),
    HDMI        varchar(255),
    DisplayPort varchar(255),
    DVI         varchar(255),
    VGA         varchar(255),
    BoostClock  varchar(255),
    Vram        varchar(255),
    Memory      varchar(255),
    TDP         varchar(255),
    Product     varchar(255)
);

select * from gpu_tabela;

COPY gpu_tabela FROM '/data_csv/GPUData.csv' DELIMITER ',' CSV HEADER;

CREATE TEMP TABLE gpu_ben
(
    Type       varchar(255),
    PartNumber varchar(255),
    Brand      varchar(255),
    Model      varchar(255),
    Rank       integer,
    Benchmark  varchar(255),
    Samples    varchar(255),
    URL        varchar(255)
);

COPY gpu_ben FROM '/data_csv/UserBenchmark/GPU_UserBenchmarks.csv' DELIMITER ',' CSV HEADER;

INSERT INTO gpus (name, producer, vram, gpu_size, tdp, rank)
SELECT Name,
       Producer,
       regexp_replace(Vram, '[^\d.]+', '', 'g')::numeric,
       regexp_replace(Length, '[^\d.]+', '', 'g')::numeric,
       regexp_replace(TDP, '[^\d.]+', '', 'g')::numeric,
       (SELECT gpu_ben.rank FROM gpu_ben WHERE gpu_tabela.MPN LIKE gpu_ben.partnumber AND gpu_ben.PartNumber <> '' LIMIT 1)
FROM gpu_tabela
WHERE regexp_replace(Length, '[^\d.]+', '', 'g') <> '';

DROP TABLE gpu_tabela;

DROP TABLE gpu_ben;

-- Motherboard

CREATE TEMP TABLE mb_tabela
(
    Name            varchar(255),
    Price           varchar(255),
    Producer        varchar(255),
    MPN             varchar(255),
    EAN             varchar(255),
    UPC             varchar(255),
    Socket          varchar(255),
    Chipset         varchar(255),
    Unlocked        varchar(255),
    Form_Factor     varchar(255),
    Memory_Type     varchar(255),
    Memory_Capacity varchar(255),
    RAM_Slots       integer,
    SATA            varchar,
    VGA             varchar(255),
    DVI             varchar(255),
    Display_Port    varchar(255),
    HDMI            varchar(255),
    WiFi            varchar(255),
    Graphic         varchar(255),
    Product         varchar(255)
);

COPY mb_tabela FROM '/data_csv/MotherboardData.csv' DELIMITER ',' CSV HEADER;

INSERT INTO motherboards (name, producer, socket, memory_type, memory_slots, memory_capacity, form_factor)
SELECT Name,
       Producer,
       Socket,
       Memory_Type,
       RAM_Slots,
       regexp_replace(Memory_Capacity, '[^\d.]+', '', 'g')::numeric,
       Form_Factor
FROM mb_tabela
WHERE regexp_replace(Memory_Capacity, '[^\d.]+', '', 'g') <> ''
  AND Form_Factor <> '';

DROP TABLE mb_tabela;

-- Power

CREATE TEMP TABLE p_tabela
(
    Name     varchar(255),
    Price    varchar(255),
    Producer varchar(255),
    MPN      varchar(255),
    EAN      varchar(255),
    UPC      varchar(255),
    Watt     varchar(255),
    Size     varchar(255),
    Rating   varchar(255),
    Product  varchar(255)
);

COPY p_tabela FROM '/data_csv/PSUData.csv' DELIMITER ',' CSV HEADER;

INSERT INTO power (name, watt, size)
SELECT Name,
       regexp_replace(Watt, '[^\d.]+', '', 'g')::numeric,
       Size
FROM p_tabela
WHERE regexp_replace(Watt, '[^\d.]+', '', 'g') <> ''
  and Size <> '';

DROP TABLE p_tabela;

-- RAM

CREATE TEMP TABLE ram_tabela
(
    Name     varchar(255),
    Price    varchar(255),
    Producer varchar(255),
    MPN      varchar(255),
    EAN      varchar(255),
    UPC      varchar(255),
    RAM_Type varchar(255),
    Size     varchar(255),
    Clock    integer,
    Timings  varchar(255),
    Sticks   integer,
    Product  varchar(255)
);

COPY ram_tabela FROM '/data_csv/RAMData.csv' DELIMITER ',' CSV HEADER;

CREATE TEMP TABLE ram_ben
(
    Type       varchar(255),
    PartNumber varchar(255),
    Brand      varchar(255),
    Model      varchar(255),
    Rank       integer,
    Benchmark  varchar(255),
    Samples    varchar(255),
    URL        varchar(255)
);

COPY ram_ben FROM '/data_csv/UserBenchmark/RAM_UserBenchmarks.csv' DELIMITER ',' CSV HEADER;

INSERT INTO RAM (name, ram_type, clock, size, sticks, rank)
SELECT Name,
       substring(RAM_Type, 1, 4),
       Clock,
       regexp_replace(Size, '[^\d.]+', '', 'g')::numeric,
       Sticks,
       (SELECT ram_ben.rank FROM ram_ben WHERE ram_tabela.MPN LIKE ram_ben.partnumber AND ram_ben.PartNumber <> '' LIMIT 1)
FROM ram_tabela
WHERE regexp_replace(Size, '[^\d.]+', '', 'g') <> '';

DROP TABLE ram_tabela;

DROP TABLE ram_ben;

--Storage

CREATE TEMP TABLE st_tabela
(
    Name        varchar(255),
    Price       varchar(255),
    Producer    varchar(255),
    MPN         varchar(255),
    EAN         varchar(255),
    UPC         varchar(255),
    Form_Factor varchar(255),
    Protocol    varchar(255),
    Size        varchar(255),
    NAND        varchar(255),
    Controller  varchar(255),
    Product     varchar(255)
);

COPY st_tabela FROM '/data_csv/SSDData.csv' DELIMITER ',' CSV HEADER;

CREATE TEMP TABLE st_ben
(
    Type       varchar(255),
    PartNumber varchar(255),
    Brand      varchar(255),
    Model      varchar(55255),
    Rank       integer,
    Benchmark  varchar(255),
    Samples    varchar(255),
    URL        varchar(255)
);

COPY st_ben FROM '/data_csv/UserBenchmark/SSD_UserBenchmarks.csv' DELIMITER ',' CSV HEADER;

INSERT INTO storage (name, producer, size, rank)
SELECT Name,
       Producer,
       regexp_replace(Size, '[^\d.]+', '', 'g')::numeric,
       (SELECT st_ben.rank FROM st_ben WHERE st_tabela.MPN LIKE st_ben.partnumber AND st_ben.PartNumber <> '' LIMIT 1)
FROM st_tabela
WHERE regexp_replace(Size, '[^\d.]+', '', 'g') <> '';

DROP TABLE st_tabela;

DROP TABLE st_ben;

-- Types
INSERT INTO types (name)
VALUES ('ADMIN'),
       ('USER');

-- Users

INSERT INTO users (email, username, password)
VALUES ('dawid.kubacki@gmail.com', 'DK', '$2a$10$DfdikuGE0AgXrecMgdmwj.5GVHZLyhz1XkAUJYSdo0SBUc7XaR2bC'),
       ('shadow.hunter@gmail.com', 'ShadowHunter', '$2a$10$DfdikuGE0AgXrecMgdmwj.5GVHZLyhz1XkAUJYSdo0SBUc7XaR2bC'),
       ('blaze.master@gmail.com', 'BlazeMaster', '$2a$10$DfdikuGE0AgXrecMgdmwj.5GVHZLyhz1XkAUJYSdo0SBUc7XaR2bC'),
       ('pixel.ninja@gmail.com', 'PixelNinja', '$2a$10$DfdikuGE0AgXrecMgdmwj.5GVHZLyhz1XkAUJYSdo0SBUc7XaR2bC'),
       ('star.gazer@gmail.com', 'StarGazer', '$2a$10$DfdikuGE0AgXrecMgdmwj.5GVHZLyhz1XkAUJYSdo0SBUc7XaR2bC'),
       ('thunder.strike@gmail.com', 'ThunderStrike', '$2a$10$DfdikuGE0AgXrecMgdmwj.5GVHZLyhz1XkAUJYSdo0SBUc7XaR2bC'),
       ('frost.byte@gmail.com', 'FrostByte', '$2a$10$DfdikuGE0AgXrecMgdmwj.5GVHZLyhz1XkAUJYSdo0SBUc7XaR2bC'),
       ('game.overlord@gmail.com', 'GameOverlord', '$2a$10$DfdikuGE0AgXrecMgdmwj.5GVHZLyhz1XkAUJYSdo0SBUc7XaR2bC'),
       ('cyber.knight@gmail.com', 'CyberKnight', '$2a$10$DfdikuGE0AgXrecMgdmwj.5GVHZLyhz1XkAUJYSdo0SBUc7XaR2bC'),
       ('dark.phoenix@gmail.com', 'DarkPhoenix', '$2a$10$DfdikuGE0AgXrecMgdmwj.5GVHZLyhz1XkAUJYSdo0SBUc7XaR2bC');
INSERT INTO user_types (type_id, user_id)
VALUES (1, 1),
       (2, 2),
       (2, 3),
       (2, 4),
       (2, 5),
       (2, 6),
       (2, 7),
       (2, 8),
       (2, 9),
       (2, 10);

INSERT INTO computer_setup (case_id, cpu_id, cs_id, gpu_id, mb_id, power_id, ram_id, st_id, user_id)
VALUES
    (760, 152, 1, 72, 215, 63, 424, 136, 1),
    (3, 25, 2, 442, 227, 63, 419, 330, 1),
    (695, 27, 3, 222, 225, 505, 423, 331, 2),
    (2, 194, 4, 201, 360, 402, 377, 103, 2),
    (83, 23, 5, 1321, 285, 297, 521, 310, 3),
    (300, 80, 6, 265, 2, 537, 415, 449, 3),
    (404, 266, 7, 449, 1259, 477, 591, 218, 4),
    (321, 66, 8, 382, 879, 512, 515, 118, 4),
    (1069, 73, 9, 1321, 1315, 336, 414, 180, 5),
    (1317, 5, 10, 72, 1157, 336, 175, 224, 5),
    (1126, 5, 11, 231, 1, 234, 427, 209, 6),
    (1238, 7, 12, 1092, 220, 4, 163, 348, 6),
    (604, 15, 13, 1092, 220, 602, 392, 310, 7),
    (203, 5, 14, 438, 201, 451, 427, 407, 7),
    (336, 5, 15, 60, 209, 143, 427, 379, 8),
    (186, 7, 16, 1092, 220, 147, 427, 401, 8),
    (902, 7, 17, 93, 220, 749, 799, 401, 9),
    (287, 13, 18, 43, 219, 66, 480, 431, 9),
    (275, 13, 19, 780, 8, 433, 1480, 237, 10),
    (89, 41, 20, 68, 461, 71, 426, 101, 10);

INSERT INTO rating_setup (cs_id, rating, user_id)
VALUES
    (1, 5, 1),
    (2, 5, 2),
    (1, 5, 3),
    (3, 5, 4),
    (5, 4, 5),
    (4, 4, 6),
    (7, 4, 7),
    (8, 4, 8),
    (9, 3, 9),
    (10, 3, 10),
    (11, 3, 1),
    (12, 3, 2),
    (13, 2, 3),
    (14, 2, 4),
    (20, 2, 5),
    (19, 2, 6),
    (18, 1, 7),
    (15, 1, 8),
    (16, 1, 9),
    (17, 1, 10),
    (13, 5, 1),
    (12, 5, 2),
    (11, 5, 3),
    (10, 5, 7),
    (3, 5, 1),
    (4, 5, 2),
    (5, 5, 3),
    (6, 5, 4),
    (7, 4, 5),
    (8, 4, 6),
    (9, 4, 7),
    (10, 4, 8),
    (1, 3, 9),
    (1, 3, 10),
    (14, 3, 1),
    (15, 3, 2),
    (16, 2, 3),
    (17, 2, 4),
    (20, 2, 5),
    (13, 2, 6),
    (12, 1, 7),
    (11, 1, 8),
    (12, 1, 9),
    (17, 1, 10),
    (13, 5, 1),
    (12, 5, 2),
    (11, 5, 3),
    (10, 5, 7);

INSERT INTO saved_setup (cs_id, user_id)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4),
       (5, 5),
       (6, 6),
       (7, 7),
       (8, 8),
       (9, 9),
       (10, 10),
       (11, 1),
       (12, 2),
       (13, 3),
       (14, 4),
       (15, 5),
       (16, 6),
       (17, 7),
       (18, 8),
       (19, 9),
       (20, 10);

INSERT INTO program_requirements (hdd_space, min_cpu_cores, min_cpu_speed, min_cpu_threads, min_gpu_vram, min_ram, name)
VALUES (10, 4, 2.5, 2, 4000, 2000, 'Adobe Photoshop CC'),
       (9, 4, 2.5, 2, 4000, 4000, '3ds Max'),
       (4, 2, 1.6, 2, 2000, 4000, 'Microsoft Office 365'),
       (1, 4, 3.3, 1, 4000, 4000, 'OBS Studio');

-- Game requirements

CREATE TEMP TABLE game_tabela
(
    Name                             varchar(255),
    Min_CPU_CPU_Speed                float,
    Min_CPU_Turbo_Speed              float,
    Min_CPU_Physical_Cores           float,
    Min_CPU_Threads                  float,
    Min_CPU_TDP                      varchar(255),
    Min_CPU_Lithography              varchar(255),
    Min_CPU_Bit_Width                varchar(255),
    Min_CPU_Max_Temp                 varchar(255),
    Min_CPU_Memory_Channel           varchar(255),
    Min_CPU_Maximum_Memory           varchar(255),
    Min_CPU_L1_Cache                 varchar(255),
    Min_CPU_L2_Cache                 varchar(255),
    Min_CPU_L3_Cache                 varchar(255),
    Min_CPU_GD_Rating                varchar(255),
    Min_CPU_Release_Price            varchar(255),

    Recom_CPU_CPU_Speed              float,
    Recom_CPU_Turbo_Speed            float,
    Recom_CPU_Physical_Cores         float,
    Recom_CPU_Threads                float,
    Recom_CPU_TDP                    varchar(255),
    Recom_CPU_Lithography            varchar(255),
    Recom_CPU_Bit_Width              varchar(255),
    Recom_CPU_Max_Temp               varchar(255),
    Recom_CPU_Memory_Channel         varchar(255),
    Recom_CPU_Maximum_Memory         varchar(255),
    Recom_CPU_L1_Cache               varchar(255),
    Recom_CPU_L2_Cache               varchar(255),
    Recom_CPU_L3_Cache               varchar(255),
    Recom_CPU_GD_Rating              varchar(255),
    Recom_CPU_Release_Price          varchar(255),

    Min_GPU_Process                  varchar(255),
    Min_GPU_TMUs                     varchar(255),
    Min_GPU_Texture_Rate             varchar(255),
    Min_GPU_ROPs                     varchar(255),
    Min_GPU_Pixel_Rate               varchar(255),
    Min_GPU_Tensor_Cores             varchar(255),
    Min_GPU_Release_Price            varchar(255),
    Min_GPU_Direct_X                 varchar(255),
    Min_GPU_Shader                   varchar(255),
    Min_GPU_Open_GL                  varchar(255),
    Min_GPU_Resolution               varchar(255),
    Min_GPU_Memory                   varchar(255),
    Min_GPU_Memory_Speed             varchar(255),
    Min_GPU_Memory_Type              varchar(255),
    Min_GPU_Memory_Bandwidth         varchar(255),
    Min_GPU_DVI_Connection           varchar(255),
    Min_GPU_HDMI_Connection          varchar(255),
    Min_GPU_DisplayPort_Connection   varchar(255),
    Min_GPU_Boost_Clock              varchar(255),
    Min_GPU_PSU                      varchar(255),
    Min_GPU_Power_Connector          varchar(255),
    Min_GPU_Best_RAM_Match           varchar(255),
    Min_GPU_Best_Resolution          varchar(255),
    Min_GPU_GD_RATING                varchar(255),

    Recom_GPU_Process                varchar(255),
    Recom_GPU_TMUs                   varchar(255),
    Recom_GPU_Texture_Rate           varchar(255),
    Recom_GPU_ROPs                   varchar(255),
    Recom_GPU_Pixel_Rate             varchar(255),
    Recom_GPU_Tensor_Cores           varchar(255),
    Recom_GPU_Release_Price          varchar(255),
    Recom_GPU_Direct_X               varchar(255),
    Recom_GPU_Shader                 varchar(255),
    Recom_GPU_Open_GL                varchar(255),
    Recom_GPU_Resolution             varchar(255),
    Recom_GPU_Memory                 varchar(255),
    Recom_GPU_Memory_Speed           varchar(255),
    Recom_GPU_Memory_Type            varchar(255),
    Recom_GPU_Memory_Bandwidth       varchar(255),
    Recom_GPU_DVI_Connection         varchar(255),
    Recom_GPU_HDMI_Connection        varchar(255),
    Recom_GPU_DisplayPort_Connection varchar(255),
    Recom_GPU_Boost_Clock            varchar(255),
    Recom_GPU_PSU                    varchar(255),
    Recom_GPU_Power_Connector        varchar(255),
    Recom_GPU_Best_RAM_Match         varchar(255),
    Recom_GPU_Best_Resolution        varchar(255),
    Recom_GPU_GD_RATING              varchar(255),

    Min_RAM                          varchar(255),
    Recom_RAM                        varchar(255),
    Min_VRAM                         varchar(255),
    Recom_VRAM                       varchar(255),
    Min_OS                           varchar(255),
    Recom_OS                         varchar(255),
    Min_Direct_X                     varchar(255),
    Recom_Direct_X                   varchar(255),
    Min_HDD_Space                    varchar(255),
    Recom_HDD_Space                  varchar(255),
    Release_Date                     varchar(255)
);

COPY game_tabela FROM '/data_csv/videogame_requirements.csv' DELIMITER ',' CSV HEADER;

CREATE OR REPLACE FUNCTION ConvertToMB(value TEXT)
    RETURNS FLOAT AS
$$
DECLARE
    number FLOAT;
    unit   TEXT;
BEGIN
    number := COALESCE(NULLIF(regexp_replace(value, '[^0-9.]', '', 'g'), '')::FLOAT, 0);
    unit := CASE
                WHEN upper(value) LIKE '%GB%' THEN 'GB'
                WHEN upper(value) LIKE '%MB%' THEN 'MB'
                ELSE NULL
        END;

    IF unit = 'GB' THEN
        RETURN number * 1024;
    ELSE
        RETURN number;
    END IF;
END;
$$ LANGUAGE plpgsql;

INSERT INTO game_requirements (name, Min_CPU_Speed, Recom_CPU_Speed, Min_CPU_Cores, Recom_CPU_Cores, Min_CPU_Threads, Recom_CPU_Threads,
                               Min_GPU_vram, Recom_GPU_vram, Min_Ram, Recom_Ram, HDD_Space)
SELECT Name,
       Min_CPU_CPU_Speed,
       Recom_CPU_CPU_Speed,
       Min_CPU_Physical_Cores,
       Recom_CPU_Physical_Cores,
       Min_CPU_Threads,
       Recom_CPU_Threads,
       ConvertToMB(Min_VRAM),
       ConvertToMB(Recom_VRAM),
       ConvertToMB(Min_RAM),
       ConvertToMB(Recom_RAM),
       ConvertToMB(Min_HDD_Space)
FROM game_tabela

WHERE Min_CPU_CPU_Speed is not null
  AND Min_CPU_CPU_Speed <> 0.0
  AND Recom_CPU_CPU_Speed is not null
  AND Recom_CPU_CPU_Speed <> 0.0
  AND Min_CPU_Physical_Cores is not null
  AND Min_CPU_Physical_Cores <> 0.0
  AND Recom_CPU_Physical_Cores is not null
  AND Recom_CPU_Physical_Cores <> 0.0
  AND Min_CPU_Threads is not null
  AND Min_CPU_Threads <> 0.0
  AND Recom_CPU_Threads is not null
  AND Recom_CPU_Threads <> 0.0
  AND ConvertToMB(Min_VRAM) is not null
  AND ConvertToMB(Min_VRAM) <> 0.0
  AND ConvertToMB(Recom_VRAM) is not null
  AND ConvertToMB(Recom_VRAM) <> 0.0
  AND ConvertToMB(Min_RAM) is not null
  AND ConvertToMB(Min_RAM) <> 0.0
  AND ConvertToMB(Recom_RAM) is not null
  AND ConvertToMB(Recom_RAM) <> 0.0
  AND ConvertToMB(Min_HDD_Space) is not null
  AND ConvertToMB(Min_HDD_Space) <> 0.0;

drop table game_tabela;

DELETE
FROM cpus
WHERE socket NOT IN (SELECT socket from motherboards);

DELETE
FROM motherboards
WHERE socket NOT IN (SELECT socket from cpus);

DELETE
FROM power
WHERE size NOT IN (SELECT power_supply from cases);
