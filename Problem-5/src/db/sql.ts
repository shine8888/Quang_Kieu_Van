import { Prisma } from '@prisma/client';

export const sqlQueryAllFlights = (limit: number, offset: number) =>
  Prisma.sql`SELECT p.*, (
    SELECT JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'from', c.from, 'to', c.to, 'timestamp', c.timestamp, 'ip_address', c.ip_address, 'flight_sequence_number', c.flight_sequence_number))
    FROM flight c
    WHERE c.parent_id = p.id
    ) AS children
FROM flight p
WHERE p.parent_id IS NULL
limit ${limit}
offset ${offset};`;

export const sqlQueryFlight = (id: string) => Prisma.sql`SELECT p.*, (
  SELECT JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'from', c.from, 'to', c.to, 'timestamp', c.timestamp, 'ip_address', c.ip_address, 'flight_sequence_number', c.flight_sequence_number))
  FROM flight c
  WHERE c.parent_id = p.id
  ) AS children
FROM flight p
WHERE p.id = ${id};`;
