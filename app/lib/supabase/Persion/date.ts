import { toJalaali } from "jalaali-js";

/**
 * تاریخ میلادی را به رشته شمسی تبدیل می‌کند.
 * @param dateString - رشته تاریخ میلادی (مثلاً '2026-07-05')
 * @param formatPattern - الگوی خروجی (اختیاری، فعلاً فقط 'yyyy/mm/dd' پشتیبانی می‌شود)
 * @returns تاریخ شمسی به صورت رشته
 */
export const convertToPersianDate = (
  dateString: string | Date | null | undefined,
  formatPattern: "short" | "full" | "time" = "short",
): string => {
  if (!dateString) return "";

  try {
    const date =
      typeof dateString === "string" ? new Date(dateString) : dateString;

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "";
    }

    const gy = date.getFullYear();
    const gm = date.getMonth() + 1; // ماه در شیء Date از 0 شروع می‌شود
    const gd = date.getDate();

    const jalaaliDate = toJalaali(gy, gm, gd);

    // اعداد فارسی
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const toPersian = (num: number) =>
      num.toString().replace(/\d/g, (d) => persianDigits[parseInt(d)]);

    if (formatPattern === "time") {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${toPersian(parseInt(hours))}:${toPersian(parseInt(minutes))}`;
    }

    const result = `${jalaaliDate.jy}/${String(jalaaliDate.jm).padStart(2, "0")}/${String(jalaaliDate.jd).padStart(2, "0")}`;
    return toPersian(parseInt(result.replace(/\//g, "")))
      ? result.replace(/\d/g, (d) => persianDigits[parseInt(d)])
      : result; // fallback
  } catch (error) {
    console.error("Error converting date:", error);
    return "";
  }
};

// فرمت‌های مختلف (برای استفاده در جاهای دیگر)
export const persianDateFormats = {
  full: "yyyy/mm/dd HH:MM",
  short: "yyyy/mm/dd",
  time: "HH:MM",
} as const;
