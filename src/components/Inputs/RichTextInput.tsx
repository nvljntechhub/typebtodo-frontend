import { forwardRef, useEffect, useMemo, useRef } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { Box, FormHelperText } from "@mui/material";
import {
  fieldContainerClasses,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonStrikethrough,
  MenuButtonUnderline,
  MenuControlsContainer,
  MenuDivider,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";
import CustomFormLabel from "../CustomFormLabel";
import { StyledRequiredFieldIndicator } from "../styled";
import type { RichTextInputProps } from "@/types/components/inputs";
import { isEmptyRichText } from "@/utils/rich-text.utils";

const RichTextInput = forwardRef<RichTextEditorRef, RichTextInputProps>(
  (
    {
      label,
      required,
      otherHelperText,
      placeholder,
      value = "",
      onChange,
      onKeyDown,
      error,
      helperText,
      disabled,
      maxLength,
    },
    ref,
  ) => {
    const editorRef = useRef<RichTextEditorRef>(null);
    const onChangeRef = useRef(onChange);
    const onKeyDownRef = useRef(onKeyDown);
    const valueRef = useRef(value);
    const resolvedPlaceholder =
      placeholder ?? (label ? `Enter ${label}` : undefined);

    onChangeRef.current = onChange;
    onKeyDownRef.current = onKeyDown;
    valueRef.current = value;

    const extensions = useMemo(
      () => [
        StarterKit,
        Placeholder.configure({
          placeholder: resolvedPlaceholder ?? "",
        }),
      ],
      [resolvedPlaceholder],
    );

    const editorProps = useMemo(
      () => ({
        attributes: {
          "aria-label": resolvedPlaceholder ?? label,
        },
        handleKeyDown: (_view: unknown, event: KeyboardEvent) => {
          onKeyDownRef.current?.(event);
          return false;
        },
      }),
      [label, resolvedPlaceholder],
    );

    useEffect(() => {
      const editor = editorRef.current?.editor;
      if (!editor || editor.isDestroyed) return;
      const current = editor.getHTML();
      if (
        current === value ||
        (isEmptyRichText(current) && isEmptyRichText(value))
      ) {
        return;
      }
      if (editor.isFocused && !isEmptyRichText(value)) return;

      queueMicrotask(() => {
        if (editor.isDestroyed) return;
        const latest = editor.getHTML();
        if (
          latest === value ||
          (isEmptyRichText(latest) && isEmptyRichText(value))
        ) {
          return;
        }
        editor.commands.setContent(value, { emitUpdate: false });
      });
    }, [value]);

    return (
      <Box>
        {label && (
          <CustomFormLabel>
            {label} {required && <StyledRequiredFieldIndicator />}
          </CustomFormLabel>
        )}
        <RichTextEditor
          ref={(instance) => {
            editorRef.current = instance;
            if (typeof ref === "function") {
              ref(instance);
              return;
            }
            if (ref) ref.current = instance;
          }}
          extensions={extensions}
          content={value}
          editable={!disabled}
          immediatelyRender
          editorProps={editorProps}
          onUpdate={({ editor }) => {
            const html = editor.getHTML();
            if (maxLength != null && html.length > maxLength) {
              editor.commands.setContent(valueRef.current, {
                emitUpdate: false,
              });
              return;
            }
            onChangeRef.current?.(html);
          }}
          renderControls={() => (
            <MenuControlsContainer>
              <MenuButtonBold />
              <MenuButtonItalic />
              <MenuButtonUnderline />
              <MenuButtonStrikethrough />
              <MenuDivider />
              <MenuButtonBulletedList />
              <MenuButtonOrderedList />
            </MenuControlsContainer>
          )}
          RichTextFieldProps={{
            variant: "outlined",
            MenuBarProps: { disableSticky: true },
            RichTextContentProps: {
              disableDefaultStyles: true,
            },
          }}
          sx={{
            ...(error && {
              [`&& .${fieldContainerClasses.notchedOutline}`]: {
                borderColor: "error.main",
              },
            }),
            "& .ProseMirror": {
              minHeight: 72,
              outline: "none",
              "&:focus": { outline: "none" },
              "& p": { margin: 0 },
              "& ul, & ol": { margin: "4px 0", paddingLeft: "1.25rem" },
              "& p.is-editor-empty:first-of-type::before": {
                color: "text.disabled",
                content: "attr(data-placeholder)",
                float: "left",
                height: 0,
                pointerEvents: "none",
              },
            },
          }}
        />
        {helperText && (
          <FormHelperText error={error}>{helperText}</FormHelperText>
        )}
        {otherHelperText && <FormHelperText>{otherHelperText}</FormHelperText>}
      </Box>
    );
  },
);

export default RichTextInput;
