CREATE TYPE public.rank AS ENUM('Boy Scout', 'Tenderfoot', 'Second Class', 'First Class', 'Star', 'Life', 'Eagle');

CREATE TABLE public.scouts
(
  id          serial primary key,
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

CREATE TYPE public.advancement_type AS ENUM('Rank', 'Merit Badge');

CREATE TABLE public.advancements
(
  id  serial primary key,
  name                  varchar(30),
  eagle_required     boolean,
  type                    advancement_type
);

CREATE TABLE public.scout_advancements
(
  scout_id    integer references scouts (id) ON UPDATE CASCADE ON DELETE CASCADE,
  advancement_id    integer references advancements (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE public.requirements
(
  id  serial primary key
);

CREATE TABLE public.advancement_requirements
(
  advancement_id    integer references advancements (id) ON UPDATE CASCADE ON DELETE CASCADE,
  requirement_id    integer references requirements (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE public.scout_requirements
(
  scout_id    integer references scouts (id) ON UPDATE CASCADE ON DELETE CASCADE,
  requirement_id    integer references requirements (id) ON UPDATE CASCADE ON DELETE CASCADE
);