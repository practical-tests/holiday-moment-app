import { v4 as uuidv4 } from "uuid";
import * as FileSystem from "expo-file-system";
import { CameraType, Camera } from "expo-camera";
import { Box, Button, Center, Flex } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Holiday } from "../../types";
import { usePromise } from "../../hooks";
import { RootRoutesType } from "../types";
import { AppContext } from "../../context";
import { Loading } from "../../components/Loading";

interface CameraPhotoProps
  extends NativeStackScreenProps<RootRoutesType, "CameraPhoto"> {}

const CameraPhoto: React.FC<CameraPhotoProps> = ({ route, navigation }) => {
  const { holidayDb, setTitle } = useContext(AppContext);
  const { id } = route.params;

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const refCamera = useRef<Camera>(null);

  const { data, loading } = usePromise(async () => holidayDb.get(id), {
    callOnStart: true,
  });

  const takePhoto = useCallback(
    async (data: Holiday) => {
      if (!refCamera.current) return;
      const path = FileSystem.documentDirectory + uuidv4() + ".jpg";

      const photo = await refCamera.current.takePictureAsync();
      if (data.photo) await FileSystem.deleteAsync(data.photo);

      await FileSystem.moveAsync({
        from: photo.uri,
        to: path,
      });

      await holidayDb.insert(data.id, {
        ...data,
        photo: path,
      });

      navigation.goBack();
    },
    [refCamera]
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setTitle("Registrar momento");
      if (permission?.granted !== true) {
        requestPermission()
          .then(({ granted }) => {
            if (!granted) navigation.goBack();
          })
          .catch(() => {
            navigation.goBack();
          });
      }
    });
    return unsubscribe;
  }, []);

  if (permission?.granted !== true || loading.isLoading)
    return (
      <Center height="full">
        <Loading />
      </Center>
    );

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      h="full"
      direction="column"
    >
      <Camera
        type={CameraType.back}
        style={{ aspectRatio: 1, width: "100%" }}
        ref={refCamera}
        useCamera2Api
        ratio="1:1"
      ></Camera>
      <Box marginTop="5" alignItems="center" justifyContent="center">
        <Button
          colorScheme="blue"
          rounded="full"
          w="16"
          onPress={() => takePhoto(data)}
          // disabled={loadingTake.isLoading}
        >
          <MaterialCommunityIcons color="white" name="camera" size={40} />
        </Button>
      </Box>
    </Flex>
  );
};

export { CameraPhoto };
