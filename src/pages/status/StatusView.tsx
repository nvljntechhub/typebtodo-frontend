import type { ReactNode } from "react";
import {
  Card,
  SignInContainer,
  SignInLede,
  SignInTitle,
} from "@/components/styled/auth";
import { StatusActions, StatusBadge } from "@/components/styled/status";

type StatusViewProps = {
  badge: string;
  title: string;
  description: string;
  children?: ReactNode;
};

const StatusView = ({
  badge,
  title,
  description,
  children,
}: StatusViewProps) => {
  return (
    <SignInContainer direction="column">
      <Card variant="outlined">
        <StatusBadge>{badge}</StatusBadge>
        <SignInTitle component="h1" variant="h4">
          {title}
        </SignInTitle>
        <SignInLede>{description}</SignInLede>
        {children && <StatusActions>{children}</StatusActions>}
      </Card>
    </SignInContainer>
  );
};

export default StatusView;
