import { styled } from "@mui/material/styles";
import { MaterialDesignContent } from "notistack";

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  ({ theme }) => ({
    "&.notistack-MuiContent-success": {
      backgroundColor: theme.palette.success.main,
    },
    "&.notistack-MuiContent-error": {
      backgroundColor: theme.palette.error.main,
    },
    "&.notistack-MuiContent-warning": {
      backgroundColor: theme.palette.warning.main,
    },
    "&.notistack-MuiContent-info": {
      backgroundColor: theme.palette.info.main,
    },
  }),
);
