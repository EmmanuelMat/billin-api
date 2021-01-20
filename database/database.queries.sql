CREATE DATABASE fgk_db;

--/c fgk_db
CREATE TABLE  providers(
    id SERIAL PRIMARY KEY,
    provider_name VARCHAR(255),
);

CREATE TABLE  tax_reciept(
    id SERIAL PRIMARY KEY,
    serie CHAR(1),
    tax_reciept_type VARCHAR(2),
    tax_sequence INT,
    is_used BOOLEAN NOT NULL
);

CREATE TABLE  product_list(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255),
    product_description VARCHAR(255),
    product_cost FLOAT,
    provider_id INT,
    product_quantity INT,
    product_unit VARCHAR(50),
    CONSTRAINT fk_provider
      FOREIGN KEY(provider_id)
	  REFERENCES providers(id)
);

CREATE TABLE  receipts(
    id SERIAL PRIMARY KEY,
    tax_reciept_id INT,
    total_price INT,
    is_credit BOOLEAN,
    create_date DATE,
    paid_date DATE,
    CONSTRAINT fk_tax_reciept
      FOREIGN KEY(tax_reciept_id)
	  REFERENCES tax_reciept(id)
);

CREATE TABLE  receipts_details(
    id SERIAL PRIMARY KEY,
    reciept_id INT,
    product_id INT,
    CONSTRAINT fk_reciept
      FOREIGN KEY(reciept_id)
	  REFERENCES receipts(id),
    CONSTRAINT fk_product
      FOREIGN KEY(product_id)
	  REFERENCES product_list(id)
);