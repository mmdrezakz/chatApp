import ThemeToggle from "../../theme/ThemeToggle";
import AsideWrapper from "../../ui/wrapper/AsideWrapper";

export default function HeaderAside() {
  return (
    <AsideWrapper className={""} text="گفت و گو ">
      <ThemeToggle />
    </AsideWrapper>
  );
}
