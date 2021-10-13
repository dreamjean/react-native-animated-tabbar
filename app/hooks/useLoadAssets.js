import { Asset } from "expo-asset";
import { useEffect, useState } from "react";

const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const useLoadAssets = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  const loadAssetsAsync = async () => {
    const imageAssets = cacheImages([]);

    await Promise.all([...imageAssets]);
    setAssetsLoaded(true);
  };

  useEffect(() => {
    loadAssetsAsync();
  });

  return { assetsLoaded, setAssetsLoaded, loadAssetsAsync };
};

export default useLoadAssets;
