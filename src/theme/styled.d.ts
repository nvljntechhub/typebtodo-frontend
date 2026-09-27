import type { Theme } from "@mui/material/styles";

declare module "styled-components" {
  // Module augmentation requires an interface, so it has no members of its own.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
