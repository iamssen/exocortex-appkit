import type { Iso8601 } from '@iamssen/exocortex';
import type { Column } from 'react-data-grid';
import type { SelectIso8601 } from '../selectors/selectIso8601.ts';
import { selectIso8601 } from '../selectors/selectIso8601.ts';

interface C<Row> extends Omit<Column<Row>, 'renderCell'> {
  format?: (date: Iso8601) => string;
  select: SelectIso8601<Row>;
}

export function iso8601Column<Row>({
  format,
  select,
  cellClass,
  ...options
}: C<Row>): Column<Row> {
  return {
    renderCell: ({ row }) => {
      const value = selectIso8601(row, select);
      return (
        value && <time dateTime={value}>{format ? format(value) : value}</time>
      );
    },
    ...options,
  };
}
