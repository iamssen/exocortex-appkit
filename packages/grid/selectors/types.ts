import type { Iso8601 } from '@iamssen/exocortex';

export type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number | undefined | null ? K : never;
}[keyof T];

export type Iso8601Keys<T> = {
  [K in keyof T]: T[K] extends Iso8601 | undefined | null ? K : never;
}[keyof T];
