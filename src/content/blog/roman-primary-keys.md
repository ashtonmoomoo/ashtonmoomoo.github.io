---
pubDatetime: 2024-03-20T20:00:00Z
title: "Terrible Tech Ideas: Roman Numeral Primary Keys"
postSlug: roman-primary-keys
featured: false
draft: false
tags:
  - terrible-tech-ideas
  - dont-do-this
ogImage: ""
description: Ruin your database with this simple trick!
---

Are you tired of autoincrementing integer primary keys?
Are you sick of being able to store more than 3999 rows in your tables?
Try serialising your integer primary keys as Roman numerals!

Here is a guide on how to achieve such a terrible thing in Everyone's Favourite Database: PostgreSQL.

Assuming you are already in a `psql` shell, create a new sequence:

```sql
CREATE SEQUENCE serial START 1;
```

Now create a function that will return the values from this sequence, serialised as Roman numerals:

```sql
CREATE OR REPLACE FUNCTION roman_serial()
RETURNS TEXT AS $$
BEGIN
    RETURN to_char(nextval('serial'), 'RN');
END;
$$ LANGUAGE plpgsql;
```

Armed with this definition, we can create a table that uses it:

```sql
CREATE TABLE aqueducts (
    numeralis TEXT PRIMARY KEY DEFAULT roman_serial(),
    arcus_comitem TEXT
);
```

Insert some data...

```sql
INSERT INTO aqueducts (arcus_comitem) VALUES ('XII'), ('LVI'), ('XXIX');
```

And finally

```sql
SELECT * FROM aqueducts;
    numeralis    | arcus_comitem
-----------------+---------------
               I | XII
              II | LVI
             III | XXIX
(3 rows)
```

Obviously this is a terrible idea, and I hope no one does this.
I think the most interesting thing here is that PostgreSQL has out of the box support for Roman numerals (not that Postgres supporting something random is that surprising!)
Something I learned while researching this is that Roman numerals can only really encode numbers up to 3999 (`MMMCMXCIX`) -- this is because 'M' is the highest value symbol in the system, and there is a rule that there can be no more than three of the same symbol in a row.
Doing `SELECT to_char(4000, 'RN');` yields `###############`.
I wonder whether the Romans had more than 3999 aqueducts...
