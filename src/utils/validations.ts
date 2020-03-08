export function isValidNumber(val: any): boolean {
  return typeof val == 'number' && !Number.isNaN(val);
}
