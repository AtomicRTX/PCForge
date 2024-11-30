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
VALUES ('admin@gmail.com', 'Admin', '$2a$10$DfdikuGE0AgXrecMgdmwj.5GVHZLyhz1XkAUJYSdo0SBUc7XaR2bC'),
       ('white.black@gmail.com', 'WhiteBlackTV', '$2a$10$DfdikuGE0AgXrecMgdmwj.5GVHZLyhz1XkAUJYSdo0SBUc7XaR2bC'),
       ('tech.nestea@gmail.com', 'TechNestea', '$2a$10$DfdikuGE0AgXrecMgdmwj.5GVHZLyhz1XkAUJYSdo0SBUc7XaR2bC');
INSERT INTO user_types (type_id, user_id)
VALUES (1, 1),
       (2, 2),
       (2, 3);

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

INSERT INTO game_requirements (name, MinCPUSpeed, RecomCPUSpeed, MinCPUCore, RecomCPUCore, MinCPUThread, RecomCPUThread,
                               MinGPUvram, RecomGPUvram, Min_Ram, Recom_Ram, HDDSpace)
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

