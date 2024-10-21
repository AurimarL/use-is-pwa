"use client";

import { useState, useEffect, useCallback } from "react";

// Helper function to check if the app is running as a PWA
const isPWA = () => {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (window.navigator as any).standalone ||
    document.referrer.includes("android-app://")
  );
};

export const useIsMobile = ({
  breakpoint = 768,
  width,
}: {
  breakpoint?: number;
  width?: number;
}) => {
  const [state, setState] = useState<{
    isMobile: boolean;
    width: number;
  }>({
    isMobile: false,
    width: typeof window !== "undefined" ? window.innerWidth : width || 0, // Default to 0 if width is not provided
  });

  useEffect(() => {
    const handleResize = () => {
      setState({
        isMobile: window.innerWidth < breakpoint,
        width: window.innerWidth,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return state;
};

export const useOrientation = () => {
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    typeof window !== "undefined"
      ? window.innerHeight > window.innerWidth
        ? "portrait"
        : "landscape"
      : "portrait"
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? "portrait" : "landscape"
      );
    };

    window.addEventListener("resize", handleOrientationChange);
    return () => window.removeEventListener("resize", handleOrientationChange);
  }, []);

  return orientation;
};

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};

export const useTouchOrClick = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const handleTouch = () => setIsTouch(true);
    const handleMouse = () => setIsTouch(false);

    window.addEventListener("touchstart", handleTouch, { once: true });
    window.addEventListener("mousemove", handleMouse, { once: true });

    return () => {
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return isTouch;
};

export const useBatteryStatus = () => {
  const [batteryStatus, setBatteryStatus] = useState({
    level: 1,
    charging: false,
  });

  useEffect(() => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const updateBatteryStatus = (battery: any) => {
      setBatteryStatus({
        level: battery.level,
        charging: battery.charging,
      });
    };

    if ("getBattery" in navigator) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (navigator as any).getBattery().then((battery: any) => {
        updateBatteryStatus(battery);
        battery.addEventListener("levelchange", () =>
          updateBatteryStatus(battery)
        );
        battery.addEventListener("chargingchange", () =>
          updateBatteryStatus(battery)
        );
      });
    }
  }, []);

  return batteryStatus;
};

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setLocation(position);
    };

    const handleError = (error: GeolocationPositionError) => {
      setError(error.message);
    };

    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { location, error };
};

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
};

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

export const useAccessibility = () => {
  const [isScreenReader, setIsScreenReader] = useState(false);

  useEffect(() => {
    const checkScreenReader = () => {
      setIsScreenReader(
        window.navigator.userAgent.indexOf("JAWS") !== -1 ||
          window.navigator.userAgent.indexOf("NVDA") !== -1 ||
          window.navigator.userAgent.indexOf("VoiceOver") !== -1
      );
    };

    checkScreenReader();
    window.addEventListener("focus", checkScreenReader);
    return () => window.removeEventListener("focus", checkScreenReader);
  }, []);

  return { isScreenReader };
};

export const useOrientationLock = () => {
  const lockOrientation = useCallback((orientation: ScreenOrientation) => {
    if ("orientation" in screen && "lock" in screen.orientation) {
      screen.orientation.lock(orientation).catch(() => {
        console.error("Orientation lock failed");
      });
    }
  }, []);

  const unlockOrientation = useCallback(() => {
    if ("orientation" in screen && "unlock" in screen.orientation) {
      screen.orientation.unlock();
    }
  }, []);

  return { lockOrientation, unlockOrientation };
};

export const useIsPWA = () => {
  const [isPWAState, setIsPWAState] = useState(false);

  useEffect(() => {
    setIsPWAState(isPWA());
  }, []);

  return isPWAState;
};

export default {
  useIsMobile,
  useOrientation,
  useNetworkStatus,
  useScreenSize,
  useTouchOrClick,
  useBatteryStatus,
  useGeolocation,
  useDeviceType,
  useMediaQuery,
  useAccessibility,
  useOrientationLock,
  useIsPWA,
};
