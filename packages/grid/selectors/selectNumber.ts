import type { NumericKeys } from './types.ts';

export type SelectNumber<Row> =
  | NumericKeys<Row>
  | ((row: Row) => number | undefined);

export function selectNumber<Row>(
  row: Row,
  select: SelectNumber<Row>,
): number | undefined {
  return typeof select === 'function'
    ? select(row)
    : (row[select] as number | undefined);
}
