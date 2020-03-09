export function isValidString(val: any): boolean {
  return typeof val === 'string' && val !== '';
}

export function isValidNumber(val: any): boolean {
  return typeof val === 'number' && !Number.isNaN(val);
}