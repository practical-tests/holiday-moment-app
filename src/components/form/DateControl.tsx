import dayjs from "dayjs";
import { useCallback, useState, useMemo } from "react";
import { FormControl, Input, Pressable, Stack } from "native-base";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import DateTimePicker, {
  AndroidNativeProps,
  IOSNativeProps,
  WindowsNativeProps,
} from "@react-native-community/datetimepicker";

import { str } from "../../helpers/str";
import { numbers } from "../../helpers";
import { BaseControl } from "./types/baseControl";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

type DateTimePickerProps = IOSNativeProps &
  AndroidNativeProps &
  WindowsNativeProps;

interface DateControlProps
  extends BaseControl,
    Omit<DateTimePickerProps, "onChange"> {
  format: string;
  onChange?: (value: Date) => void;
}

const DateControl: React.FC<DateControlProps> = ({
  label,
  error,
  isRequired,
  value,
  format,
  onChange,
  ...props
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [dateString, setDateString] = useState(dayjs(value).format(format));

  const setReturn = useCallback((dateString: string) => {
    if (!onChange) return;
    const date = dayjs(dateString, format);
    if (!date.isValid()) return;
    onChange(date.toDate());
  }, []);

  const typeDate = useCallback((value: string = "") => {
    const valueNumber = numbers.onlyNumbers(value);
    const dateString = str.fill(
      "X",
      str.replaceChars(format, "X"),
      valueNumber
    );
    setDateString(dateString);
    setReturn(dateString);
  }, []);

  const handleSelectDate = useCallback((date: Date) => {
    setShowPicker(false);
    const dateString = dayjs(date).format(format);
    setDateString(dateString);
    setReturn(dateString);
  }, []);

  const currentValueValid = useMemo(() => {
    const date = dayjs(dateString, format);
    if (date.isValid()) return date.toDate();
    return new Date();
  }, [dateString]);

  return (
    <>
      <FormControl isRequired={isRequired} isInvalid={!!error}>
        <Stack>
          <FormControl.Label>{label}</FormControl.Label>
          <Input
            keyboardType="decimal-pad"
            InputRightElement={
              <Pressable paddingRight={2} paddingLeft={2}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={20}
                  onPress={() => setShowPicker(true)}
                />
              </Pressable>
            }
            value={dateString}
            onChangeText={(e) => typeDate(e)}
          />
          <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
        </Stack>
      </FormControl>
      {showPicker && (
        <DateTimePicker
          {...props}
          value={currentValueValid}
          onChange={(_, date) => handleSelectDate(date)}
        />
      )}
    </>
  );
};

export { DateControl };
