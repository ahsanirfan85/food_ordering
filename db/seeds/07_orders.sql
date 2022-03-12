-- orders table seeds here

INSERT INTO orders (status, name, phone, postal_code, province, credit_card, credit_card_expiry, Credit_card_cvv, street, city)
VALUES ('delivered','John','1111111111','A1A1A1','Alberta','1111111111111111','1900-01-01','111','111 John Avenue','Calgary'),
('in preparation','Jacob','2222222222','A2A2A2','British Columbia','2222222222222222','1900-01-02','222','222 Jacob Street','Vancouver'),
('unpaid','David','3333333333','A3A3A3','Manitoba','3333333333333333','1900-01-03','333','333 David Parkway','Winnpeg'),
('delivered','Isabel','4444444444','A4A4A4','Ontario','4444444444444444','1900-01-04','444','444 Isabel Road','Toronto'),
('delivered','Jennifer','5555555555','A5A5A5','Quebec','5555555555555555','1900-01-05','555','555 Jennifer Crescent','Montreal'),
('in preparation','Alicia','6666666666','A6A6A6','Saskatchewan','6666666666666666','1900-01-06','666','666 Alicia Boulevard','Saskatoon'),
('in preparation','Nicholas','7777777777','A7A7A7','Nova Scotia','7777777777777777','1900-01-07','777','777 Nicholas Drive','Halifax'),
('unpaid','Gordon','8888888888','A8A8A8','Prince Edward Island','8888888888888888','1900-01-08','888','888 Gordon Street','Charlottetown'),
('unpaid','Andrew','9999999999','A9A9A9','New Brunswick','9999999999999999','1900-01-09','999','999 Andrew Parkway','Fredericton'),
('unpaid','Murdoch','1112223344','B1B1B1','Newfoundland & Labrador','1111222233334444','1900-01-10','123','123 Murdoch Road','St. Johns');
