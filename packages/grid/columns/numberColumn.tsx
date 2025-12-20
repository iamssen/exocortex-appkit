import clsx from 'clsx/lite';
import type { Column } from 'react-data-grid';
import { Format } from '../../format/components.tsx';
import type { ValueSelector } from '../select.ts';
import { selectValue } from '../select.ts';
import cellClasses from './cellClasses.module.css';

interface FormatColumn<Row> extends Omit<Column<Row>, 'renderCell'> {
  format: string;
  select: ValueSelector<Row, number>;
  subFormat?: never;
  subSelect?: never;
}

interface SubFormatColumn<Row> extends Omit<Column<Row>, 'renderCell'> {
  format: string;
  select: ValueSelector<Row, number>;
  subFormat: string;
  subSelect: ValueSelector<Row, number>;
}

type C<Row> = FormatColumn<Row> | SubFormatColumn<Row>;

export function numberColumn<Row>({
  format,
  select,
  subFormat,
  subSelect,
  cellClass,
  ...options
}: C<Row>): Column<Row> {
  return {
    renderCell: ({ row }) => {
      const value = selectValue(row, select);
      const subValue = subSelect ? selectValue(row, subSelect) : undefined;
      return (
        <>
          <sub>{subValue && <Format format={subFormat} n={subValue} />}</sub>
          <Format format={format} n={value} replacer="-" />
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
