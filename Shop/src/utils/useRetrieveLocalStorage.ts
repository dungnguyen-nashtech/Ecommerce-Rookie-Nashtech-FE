import { useLocalStorageValue } from "@react-hookz/web";

const useRetrieveLocalStorage = <T, >(key: string) => {
  const { value, fetch } = useLocalStorageValue<{ state: T }>(key, {
    initializeWithValue: true // Ensures the value is fetched on initial render
  });

  return {
    state: value?.state,
    fetch
  };
};

export default useRetrieveLocalStorage;
