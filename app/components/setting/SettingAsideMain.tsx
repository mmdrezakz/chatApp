"use client";
import { useState } from "react";

import UploadImage from "./UploadImage";
import ModalUpdateInfo from "./ModalUpdateInfo";
import InfoItemsUpdate from "./InfoItemsUpdate";

export default function SettingAsideMain() {
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  return (
    <section className="space-y-6 p-6 overflow-y-auto scrollbar-custom">
      {/* upload */}
      <UploadImage />
      <div className="space-y-3">
        {/* InfoItemsUpdate */}
        <InfoItemsUpdate
          setEditField={setEditField}
          setEditValue={setEditValue}
        />
        {editField && (
          // InfoModal
          <ModalUpdateInfo
            setEditField={setEditField}
            setEditValue={setEditValue}
            editValue={editValue}
            editLoading={editLoading}
            setEditLoading={setEditLoading}
            editField={editField}
          />
        )}
      </div>
    </section>
  );
}
