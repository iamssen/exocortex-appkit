import clsx from 'clsx/lite';
import type { Column } from 'react-data-grid';
import { Format } from '../../format/components.tsx';
import type { SelectNumber } from '../selectors/selectNumber.ts';
import { selectNumber } from '../selectors/selectNumber.ts';
import cellClasses from './cellClasses.module.css';

interface FormatColumn<Row> extends Omit<Column<Row>, 'renderCell'> {
  format: string;
  select: SelectNumber<Row>;
  subFormat?: never;
  subSelect?: never;
}

interface SubFormatColumn<Row> extends Omit<Column<Row>, 'renderCell'> {
  format: string;
  select: SelectNumber<Row>;
  subFormat: string;
  subSelect: SelectNumber<Row>;
}

type C<Row> = FormatColumn<Row> | SubFormatColumn<Row>;

export function numberColumn<Row>({
  format: f,
  select,
  subFormat,
  subSelect,
  cellClass,
  ...options
}: C<Row>): Column<Row> {
  return {
    renderCell: ({ row }) => {
      const value = selectNumber(row, select);
      const subValue = subSelect ? selectNumber(row, subSelect) : undefined;
      return (
        <>
          <sub>{subValue && <Format format={subFormat} n={subValue} />}</sub>
          <Format format={f} n={value} replacer="-" />
        </>
      );
    },
    cellClass: (row) => {
      return clsx(
        subFormat ? cellClasses.cellSpaceBetween : cellClasses.cellRightAlign,
        typeof cellClass === 'function' ? cellClass(row) : cellClass,
      );
    },
    ...options,
  };
}
