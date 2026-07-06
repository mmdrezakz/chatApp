import AsideWrapper from "../ui/wrapper/AsideWrapper";
import ThemeToggle from "../theme/ThemeToggle";
import { Settings } from "lucide-react";

export default function SettingAsideHeader() {
  return (
    <AsideWrapper className={""} text="تنظیمات" logo={<Settings size={23} />}>
      <ThemeToggle />
    </AsideWrapper>
  );
}
