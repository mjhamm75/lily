CREATE DATABASE lily;

CREATE TYPE public.rank AS ENUM('Boy Scout', 'Tenderfoot', 'Second Class', 'First Class', 'Star', 'Life', 'Eagle');

CREATE TABLE public.scouts
(
  id              serial primary key,
  first_name      varchar(75) NOT NULL,
  last_name       varchar(75) NOT NULL,
  rank            rank,
  email           varchar(75),
  password        varchar(75),
  address         varchar(75),
  city            varchar(50),
  state           char(2),
  zip             varchar(10)
);

CREATE TYPE public.advancement_type AS ENUM('Rank', 'Merit Badge');

CREATE TABLE public.advancements
(
  id              serial primary key,
  name            varchar(30),
  eagle_required  boolean,
  type            advancement_type
);

CREATE TABLE public.scout_advancements
(
  scout_id        integer references scouts (id) ON UPDATE CASCADE ON DELETE CASCADE,
  advancement_id  integer references advancements (id) ON UPDATE CASCADE ON DELETE CASCADE,
  date_complete   date
);

CREATE TABLE public.requirements
(
  id              serial primary key,
  description     varchar(645)
);

CREATE TABLE public.advancement_requirements
(
  advancement_id  integer references advancements (id) ON UPDATE CASCADE ON DELETE CASCADE,
  requirement_id  integer references requirements (id) ON UPDATE CASCADE ON DELETE CASCADE,
  -- Order shows how it is to be displayed on the page
  req_order       integer,
  -- Number shows the requirement number to be displayed
  req_number      varchar(3)
);

CREATE TABLE public.scout_requirements
(
  scout_id        integer references scouts (id) ON UPDATE CASCADE ON DELETE CASCADE,
  requirement_id  integer references requirements (id) ON UPDATE CASCADE ON DELETE CASCADE,
  initials        varchar(5),
  completed_date  date
);

-- select advancements.name from advancements, scout_advancements, scouts
-- where advancements.id = scout_advancements.advancement_id
-- and scouts.id = scout_advancements.scout_id
-- and scouts.id = 1;

-- select
-- r.description
-- from requirements r
-- inner join advancement_requirements ar on r.internal_id = ar.requirement_id
-- inner join advancements a on ar.advancement_id = a.id WHERE a.id = (select id from advancements where name = 'Boy Scout');
