import { Camera } from "expo-camera";
import { useCallback, useRef } from "react";

const useCamera = () => {
  const [permissionCamera, permissionCameraFn] = Camera.useCameraPermissions();
  const refCamera = useRef<Camera>(null);

  const getPermission = useCallback(async () => {
    if (permissionCamera?.granted) return;
    try {
      await permissionCameraFn();
    } catch (error) {}
  }, [permissionCamera]);

  const takePhoto = useCallback(async () => {
    if (!refCamera.current) return;

    const photo = await refCamera.current.takePictureAsync();
    refCamera.current.pausePreview();

    return photo;
  }, [refCamera]);

  return {
    refCamera,
    permission: { permission: permissionCamera, getPermission },
    takePhoto,
  };
};

export { useCamera };
