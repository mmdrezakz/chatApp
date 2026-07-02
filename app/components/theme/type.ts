export type Theme = "light" | "dark";
export interface ThemeContextType {
  theme: Theme;
  Toggle: () => void;
  setTheme: (theme: Theme) => void;
}
