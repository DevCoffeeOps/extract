PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
INSERT INTO _prisma_migrations VALUES('4022517c-a5d0-4081-8c8f-f9093c5facaf','27c3b916d4edccf50852817b2cded1b7df837904fb7a6e45371db63396c1a872',1722807432080,'20240804213712_init',NULL,NULL,1722807432061,1);
CREATE TABLE IF NOT EXISTS "RunningShoeStore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "lng" REAL NOT NULL,
    "lat" REAL NOT NULL
);
INSERT INTO RunningShoeStore VALUES(1,'The Sneaker Shop','704 Asbury Ave #1, Ocean City, NJ 08226, USA',-74.573795599999996852,39.281078200000003164);
INSERT INTO RunningShoeStore VALUES(2,'Allen''s Shoes','331 Tilton Rd, Northfield, NJ 08225, USA',-74.556014599999997473,39.385536999999999352);
INSERT INTO RunningShoeStore VALUES(3,'adidas Outlet Store Atlantic City','101 Arkansas Ave Suite 330, Atlantic City, NJ 08401, USA',-74.438105800000002433,39.360282099999999161);
INSERT INTO RunningShoeStore VALUES(4,'Sports City','1 Atlantic Ocean #208, Atlantic City, NJ 08401, USA',-74.434590999999997507,39.354165999999999314);
INSERT INTO RunningShoeStore VALUES(5,'Road Runner Sports','921 Haddonfield Rd, Cherry Hill, NJ 08002, USA',-75.03483640000000321,39.925524500000001636);
INSERT INTO RunningShoeStore VALUES(6,'Famous Footwear Outlet','TANGER OUTLETS THE WALK, 112 N Michigan Ave, Atlantic City, NJ 08401, USA',-74.437755799999990812,39.360933000000002834);
INSERT INTO RunningShoeStore VALUES(7,'The Shoe Stop','1303 Boardwalk, Atlantic City, NJ 08401, USA',-74.423816700000003264,39.35766050000000149);
INSERT INTO RunningShoeStore VALUES(8,'Alyse''s Shoes','951 Asbury Ave, Ocean City, NJ 08226, USA',-74.577117999999998688,39.277842300000003206);
INSERT INTO RunningShoeStore VALUES(9,'Cruise Control Gear','744 Asbury Ave, Ocean City, NJ 08226, USA',-74.574616300000002412,39.28046330000000097);
INSERT INTO RunningShoeStore VALUES(10,'Sole Purpose','3143 Fire Rd d, Egg Harbor Township, NJ 08234, USA',-74.565946499999995467,39.389754099999997548);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('RunningShoeStore',10);
COMMIT;
