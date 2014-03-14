CREATE TYPE rank AS ENUM('Boy Scout', 'Tenderfoot', 'Second Class', 'First Class', 'Star', 'Life', 'Eagle');

CREATE TABLE scouts
(
  user_id          serial primary key,
  firstName      varchar(75) NOT NULL,
  lastName       varchar(75) NOT NULL,
  rank              rank,
  email             varchar(75),
  password       varchar(75),
  address         varchar(75),
  city                varchar(50),
  state              char(2),
  zip                 varchar(10)
);