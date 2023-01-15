import * as Location from "expo-location";
import { useCallback, useRef } from "react";

const useLocation = () => {
  const [permissionLocation, permissionLocationFn] =
    Location.useForegroundPermissions();

  const getPermission = useCallback(async () => {
    if (permissionLocation?.granted) return;
    try {
      await permissionLocationFn();
    } catch (error) {}
  }, [permissionLocation]);

  const getLocation = useCallback(async () => {
    return await Location.getCurrentPositionAsync();
  }, []);

  return {
    permission: { permission: permissionLocation, getPermission },
    getLocation,
  };
};

export { useLocation };
