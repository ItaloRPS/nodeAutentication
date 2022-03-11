CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
CREATE EXTENSION IF NOT EXISTS "pgcrypto"

create table if not exists aplicantion_user(
    uuid:uuid DEFAULT uuid_generated_v4(),
    username varchar NOT NULL
    password varchar NOT NULL
    PRIMARY KEY id
)

INSERT INTO aplicantion_user (username ,password ) VALUES ('admin',crypt('admin','my_salt'))