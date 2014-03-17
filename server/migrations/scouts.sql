CREATE TYPE rank AS ENUM('Boy Scout', 'Tenderfoot', 'Second Class', 'First Class', 'Star', 'Life', 'Eagle');

CREATE TABLE scouts
(
  scout_id          serial primary key,
  first_name      varchar(75) NOT NULL,
  last_name       varchar(75) NOT NULL,
  rank              rank,
  email             varchar(75),
  password       varchar(75),
  address         varchar(75),
  city                varchar(50),
  state              char(2),
  zip                 varchar(10)
);

CREATE TYPE advancement_type AS ENUM('Rank', 'Merit Badge');

CREATE TABLE advancements
(
  advancement_id  serial primary key,
  name                  varchar(12),
  eagle_required     boolean,
  type                    advancement_type
);

CREATE TABLE scout_advancements
(
  scout_id    integer references scouts (scout_id) ON UPDATE CASCADE ON DELETE CASCADE,
  advancement_id    integer references advancements (advancement_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE requirements
(
  requirement_id  serial primary key
);

CREATE TABLE advancement_requirements
(
  advancement_id    integer references advancements (advancement_id) ON UPDATE CASCADE ON DELETE CASCADE,
  requirement_id    integer references requirements (requirement_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE scout_requirements
(
  scout_id    integer references scouts (scout_id) ON UPDATE CASCADE ON DELETE CASCADE,
  requirement_id    integer references requirements (requirement_id) ON UPDATE CASCADE ON DELETE CASCADE
);