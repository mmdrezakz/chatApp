import AsideWrapper from "../ui/wrapper/AsideWrapper";
import ThemeToggle from "../theme/ThemeToggle";

export default function SettingAsideHeader() {
  return (
    <AsideWrapper text="تنظیمات">
      <ThemeToggle />
    </AsideWrapper>
  );
}
