/* tslint:disable:naming-convention */

import { Transform } from 'class-transformer';

/**
 * @description convert string or number to integer
 * @example
 * @IsNumber()
 * @ToInt()
 * name: number;
 * @returns {(target: any, key: string) => void}
 * @constructor
 */
export function ToInt({ each = false }: { each?: boolean } = {}) {
  if (!each) {
    return Transform(
      ({ value }) => {
        if (value === undefined) return undefined;
        return parseInt(value, 10);
      },
      { toClassOnly: true }
    );
  } else {
    return Transform(
      ({ value }) => {
        if (value === undefined) return undefined;
        if (!Array.isArray(value)) {
          value = [parseInt(value, 10)];
        }
        return value.map((it) => parseInt(it, 10));
      },
      {
        toClassOnly: true,
      }
    );
  }
}
