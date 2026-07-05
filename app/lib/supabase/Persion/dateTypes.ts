declare module "date-fns-jalali" {
  export function toPersianDigits(input: string): string;
  export function format(date: Date | number, format: string): string;
  export function formatDistance(
    date: Date | number,
    baseDate: Date | number,
    options?: {
      includeSeconds?: boolean;
      addSuffix?: boolean;
    },
  ): string;
  export function parseISO(dateString: string): Date;
  export function isValid(date: any): boolean;
}
