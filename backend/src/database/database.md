ALTER TABLE users
ADD username varchar(255);

ALTER TABLE users
ADD type tinyint default 1;

<!-- type == 1   ==> admin
	type == 2 ===> pub 
-->

CREATE TABLE user_roles
(
    id SERIAL,
    user_id BIGINT NOT NULL  DEFAULT 0,
	role_id INTEGER NOT NULL  DEFAULT 0,
    
    created_at timestamp(6) NOT NULL DEFAULT now(),
    updated_at timestamp(6) NOT NULL DEFAULT now(),
    CONSTRAINT user_roles_pkey PRIMARY KEY (id)
);
ALTER TABLE user_roles ADD CONSTRAINT user_roles_unique UNIQUE (id);



CREATE TABLE role_has_permissions
(
    id SERIAL,
    role_id BIGINT NOT NULL  DEFAULT 0,
	permission_id INTEGER NOT NULL  DEFAULT 0,
    created_at timestamp(6) NOT NULL DEFAULT now(),
    updated_at timestamp(6) NOT NULL DEFAULT now(),
    CONSTRAINT role_has_permissions_pkey PRIMARY KEY (id)
);
ALTER TABLE role_has_permissions ADD CONSTRAINT role_has_permissions_unique UNIQUE (id);

CREATE TABLE votes
(
    id SERIAL,
    content varchar(255) ,
	number INTEGER NOT NULL  DEFAULT 0,
	user_id INTEGER NOT NULL  DEFAULT 0,
	product_id INTEGER NOT NULL  DEFAULT 0,
    created_at timestamp(6) NOT NULL DEFAULT now(),
    updated_at timestamp(6) NOT NULL DEFAULT now(),
    CONSTRAINT votes_pkey PRIMARY KEY (id)
);
ALTER TABLE votes ADD CONSTRAINT votes_unique UNIQUE (id);


ALTER TABLE orders
ADD quantity int default 0;

ALTER TABLE orders
ADD product_id int default 0;

ALTER TABLE orders
ADD product_price int default 0;