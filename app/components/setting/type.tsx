export interface SettingIconProps {
  ShowSetting: any;
  handleShowSetting: () => void;
}
export interface ModalUpdateInfoProps {
  setEditField: (field: string) => void;
  setEditValue: (value: string) => void;
  editValue: string;
  editLoading: boolean;
  setEditLoading: (s: boolean) => void;
  editField: string | number | any;
}
export interface InfoItemsUpdateProps {
  setEditField: (field: string) => void;
  setEditValue: (value: string) => void; // این رو هم اضافه کن
}
