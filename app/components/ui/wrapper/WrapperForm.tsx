import React from "react";
import BackgroundWrapper from "../../register/backgroundWrapper";

export default function WrapperForm({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BackgroundWrapper>
      <div className="top-1/2 left-1/2 absolute mx-auto p-6 w-full max-w-md -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </BackgroundWrapper>
  );
}
