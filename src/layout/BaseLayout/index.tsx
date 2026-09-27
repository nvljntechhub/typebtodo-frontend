import { type FC, type ReactNode } from "react";
import { Outlet } from "react-router";
import { Box } from "@mui/material";

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",
      }}
    >
      {children || <Outlet />}
    </Box>
  );
};

export default BaseLayout;
