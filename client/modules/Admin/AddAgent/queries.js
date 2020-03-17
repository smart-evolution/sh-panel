// @flow
export const validateID = (id: string): boolean => !isNaN(id);
export const validateName = (name: string): boolean => name.trim() !== '';
export const validateType = (type: string): boolean => type.trim() !== '';
export const validateIP = (ip: string): boolean =>
  RegExp(
    /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/
  ).test(ip);
