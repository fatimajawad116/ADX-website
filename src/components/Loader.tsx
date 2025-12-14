import { Flex, Loader, Overlay } from "@mantine/core";
import useLoadingStore from "../store/useLoader";

function LoaderCustom() {
  const loading = useLoadingStore();

  if (loading.loading)
    return (
      <Overlay
        center
        fixed
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Flex justify="center" align="center" h="100vh">
          <Loader size="xl" color="#FF9B42" />
        </Flex>
      </Overlay>
    );
  return null;
}

export default LoaderCustom;
