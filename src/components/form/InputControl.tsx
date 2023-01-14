import { FormControl, Input, Stack } from "native-base";
import { IInputProps } from "native-base/lib/typescript/components/primitives/Input/types";

import { BaseControl } from "./types/baseControl";

interface InputControlProps extends IInputProps, BaseControl {}

const InputControl: React.FC<InputControlProps> = ({
  label,
  error,
  isRequired,
  ...props
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={!!error}>
      <Stack>
        <FormControl.Label>{label}</FormControl.Label>
        <Input {...props} />
        <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
      </Stack>
    </FormControl>
  );
};

export { InputControl };
