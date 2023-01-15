import { Divider, Menu, Pressable, Text } from "native-base";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface FeedItemMenuProps {
  holidayId: string;
  navigate: Function;
  handleRemove: (holidayId: string) => any;
}

const FeedItemMenu: React.FC<FeedItemMenuProps> = ({
  holidayId,
  navigate,
  handleRemove,
}) => {
  return (
    <Menu
      trigger={(triggerProps) => {
        return (
          <Pressable
            accessibilityLabel="More options menu"
            {...triggerProps}
            px="3"
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              size={20}
              color="#73757d"
            />
          </Pressable>
        );
      }}
    >
      <Menu.Item onPress={() => navigate("EditHoliday", { id: holidayId })}>
        Editar
      </Menu.Item>
      <Menu.Item onPress={() => navigate("CameraPhoto", { id: holidayId })}>
        Registar Feriado
      </Menu.Item>
      <Divider />
      <Menu.Item onPress={() => handleRemove(holidayId)}>
        <Text color="red.500">Remover</Text>
      </Menu.Item>
    </Menu>
  );
};

export { FeedItemMenu };
