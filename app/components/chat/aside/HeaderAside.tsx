import React from "react";
import ThemeToggle from "../../theme/ThemeToggle";
import AsideWrapper from "../../ui/wrapper/AsideWrapper";

export default function HeaderAside() {
  return (
    <AsideWrapper text="گفت و گو ها">
      <ThemeToggle />
    </AsideWrapper>
  );
}
