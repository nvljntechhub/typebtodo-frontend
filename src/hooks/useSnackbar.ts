import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { createElement, useCallback } from "react";
import type { OptionsObject, VariantType } from "notistack";
import type { SnackbarKey } from "notistack";

const defaultAlertOptions: Partial<OptionsObject> = {
  anchorOrigin: {
    vertical: "top",
    horizontal: "center",
  },
};

export const useSnackbarAlert = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const enqueueAlert = useCallback(
    (
      message: string,
      variant: VariantType,
      options?: Partial<OptionsObject>,
    ) => {
      return enqueueSnackbar(message, {
        variant,
        ...defaultAlertOptions,
        ...options,
      });
    },
    [enqueueSnackbar],
  );

  const showSuccess = useCallback(
    (message: string, options?: Partial<OptionsObject>) =>
      enqueueAlert(message, "success", options),
    [enqueueAlert],
  );

  const showError = useCallback(
    (message: string, options?: Partial<OptionsObject>) =>
      enqueueAlert(message, "error", options),
    [enqueueAlert],
  );

  const showWarning = useCallback(
    (message: string, options?: Partial<OptionsObject>) =>
      enqueueAlert(message, "warning", options),
    [enqueueAlert],
  );

  const showInfo = useCallback(
    (message: string, options?: Partial<OptionsObject>) =>
      enqueueAlert(message, "info", options),
    [enqueueAlert],
  );

  const showLoading = useCallback(
    (message: string, options?: Partial<OptionsObject>): SnackbarKey =>
      enqueueSnackbar(
        createElement(
          "span",
          { style: { display: "inline-flex", alignItems: "center", gap: 12 } },
          createElement(CircularProgress, { size: 20, color: "inherit" }),
          message,
        ),
        {
          variant: "info",
          persist: true,
          hideIconVariant: true,
          ...defaultAlertOptions,
          ...options,
        },
      ),
    [enqueueSnackbar],
  );

  const closeAlert = useCallback(
    (key: SnackbarKey) => {
      closeSnackbar(key);
    },
    [closeSnackbar],
  );

  return {
    enqueueAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    closeAlert,
  };
};
