import type { Iso8601 } from '@iamssen/exocortex';
import type { Iso8601Keys } from './types.ts';

export type SelectIso8601<Row> =
  | Iso8601Keys<Row>
  | ((row: Row) => Iso8601 | undefined);

export function selectIso8601<Row>(
  row: Row,
  select: SelectIso8601<Row>,
): Iso8601 | undefined {
  return typeof select === 'function'
    ? select(row)
    : (row[select] as Iso8601 | undefined);
}
