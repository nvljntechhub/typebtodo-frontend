import { useEffect, useRef, useState } from "react";
import {
  LogoutButton,
  PageHeader,
  ProfileButton,
  ProfileDivider,
  ProfileEmail,
  ProfileMenu as ProfileMenuPanel,
  ProfileName,
} from "@/components/styled/dashboard";

type ProfileMenuProps = {
  name: string;
  email: string;
  pending: boolean;
  onLogout: () => void;
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const letters =
    parts.length === 1
      ? parts[0].slice(0, 2)
      : `${parts[0][0]}${parts[parts.length - 1][0]}`;
  return letters.toUpperCase();
}

export default function ProfileMenu({
  name,
  email,
  pending,
  onLogout,
}: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <PageHeader ref={rootRef}>
      <ProfileButton
        type="button"
        aria-label="Open profile menu"
        aria-expanded={open}
        aria-haspopup="menu"
        disabled={pending}
        onClick={() => setOpen((current) => !current)}
      >
        {initials(name)}
      </ProfileButton>
      {open ? (
        <ProfileMenuPanel role="menu">
          <ProfileName>{name}</ProfileName>
          {email ? <ProfileEmail>{email}</ProfileEmail> : null}
          <ProfileDivider />
          <LogoutButton
            type="button"
            role="menuitem"
            onClick={onLogout}
            disabled={pending}
          >
            {pending ? "Signing out..." : "Log out"}
          </LogoutButton>
        </ProfileMenuPanel>
      ) : null}
    </PageHeader>
  );
}
