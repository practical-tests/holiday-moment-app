import { FormControl, ITextAreaProps, Stack, TextArea } from "native-base";

import { BaseControl } from "./types/baseControl";

interface TextAreaControlProps extends ITextAreaProps, BaseControl {
  autoCompleteType: any;
}

const TextAreaControl: React.FC<TextAreaControlProps> = ({
  label,
  error,
  isRequired,
  ...props
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={!!error}>
      <Stack>
        <FormControl.Label>{label}</FormControl.Label>
        <TextArea {...props} />
        <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
      </Stack>
    </FormControl>
  );
};

export { TextAreaControl };
