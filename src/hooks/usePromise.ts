import { useState, useEffect, useCallback } from "react";

type Config = {
  callOnStart?: boolean;
};

const usePromise = <Data = any, Error = any>(
  fnPromise: () => Data | Promise<Data>,
  config?: Config
) => {
  const [isLoading, setLoading] = useState(config?.callOnStart || false);
  const [returnError, setReturnError] = useState<Error | undefined>(undefined);
  const [returnData, setReturnData] = useState<Data | undefined>(undefined);

  const callPromise = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fnPromise();
      setReturnData(data);
    } catch (error) {
      setReturnError(error);
    } finally {
      setLoading(false);
    }
  }, [fnPromise]);

  useEffect(() => {
    if (config?.callOnStart) callPromise();
  }, []);

  return {
    loading: { setIsLoading: setLoading, isLoading },
    error: returnError,
    data: returnData,
    call: callPromise,
  };
};

export { usePromise };
