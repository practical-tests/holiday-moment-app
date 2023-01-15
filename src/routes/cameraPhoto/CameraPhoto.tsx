import { v4 as uuidv4 } from "uuid";
import * as FileSystem from "expo-file-system";
import { CameraType, Camera } from "expo-camera";
import { Box, Button, Center, Flex, Spinner } from "native-base";
import { useContext, useEffect, useCallback, useMemo } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { RootRoutesType } from "../types";
import { AppContext } from "../../context";
import { Loading } from "../../components/Loading";
import { useCamera, useLocation, usePromise } from "../../hooks";

interface CameraPhotoProps
  extends NativeStackScreenProps<RootRoutesType, "CameraPhoto"> {}

const CameraPhoto: React.FC<CameraPhotoProps> = ({ route, navigation }) => {
  const { holidayDb, setTitle } = useContext(AppContext);
  const { id } = route.params;

  const {
    permission: permissionCamera,
    refCamera,
    takePhoto: takePhotoFn,
  } = useCamera();

  const { permission: permissionLocation, getLocation } = useLocation();

  const { data, loading } = usePromise(async () => holidayDb.get(id), {
    callOnStart: true,
  });

  const callTakePhoto = useCallback(async () => {
    const photo = await takePhotoFn();
    let { coords } = await getLocation();

    const path = FileSystem.documentDirectory + uuidv4() + ".jpg";
    if (data.photo) await FileSystem.deleteAsync(data.photo);
    await FileSystem.moveAsync({
      from: photo.uri,
      to: path,
    });

    await holidayDb.insert(data.id, {
      ...data,
      photo: path,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });

    navigation.goBack();
  }, [refCamera, data, navigation]);

  const { loading: loadingPhoto, call: takePhoto } = usePromise(callTakePhoto);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setTitle("Registrar feriado");
      await permissionCamera.getPermission();
      await permissionLocation.getPermission();
    });
    return unsubscribe;
  }, []);

  const showScreenLoading = useMemo(() => {
    return (
      permissionCamera.permission?.granted !== true ||
      permissionLocation.permission?.granted !== true ||
      loading.isLoading
    );
  }, [
    loading.isLoading,
    permissionCamera.permission?.granted,
    permissionLocation.permission?.granted,
  ]);

  if (showScreenLoading)
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
          onPress={() => takePhoto()}
          disabled={loadingPhoto.isLoading}
        >
          {loadingPhoto.isLoading && (
            <Spinner accessibilityLabel="Loading" size={40} color="white" />
          )}
          {!loadingPhoto.isLoading && (
            <MaterialCommunityIcons color="white" name="camera" size={40} />
          )}
        </Button>
      </Box>
    </Flex>
  );
};

export { CameraPhoto };
