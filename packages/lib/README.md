# use-is-pwa

A comprehensive collection of React hooks for building Progressive Web Apps (PWAs). Easily detect device types, network status, battery levels, geolocation, and more to enhance your web applications.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Available Hooks](#available-hooks)
  - [useIsMobile](#useismobile)
  - [useNetworkStatus](#usenetworkstatus)
  - [useBatteryStatus](#usebatterystatus)
  - [useGeolocation](#usegeolocation)
  - [useDeviceType](#usedevicetype)
  - [useOrientation](#useorientation)
  - [useScreenSize](#usescreensize)
  - [useTouchOrClick](#usetouchorclick)
  - [useMediaQuery](#usemediaquery)
  - [useAccessibility](#useaccessibility)
  - [useOrientationLock](#useorientationlock)
  - [useIsPWA](#useispwa)
- [Contributing](#contributing)

## Installation

Install `use-is-pwa` using npm or yarn:

```bash
npm install use-is-pwa
# or
yarn add use-is-pwa
```

## Usage

Import the hooks you need in your React component:

```jsx
import { useIsMobile, useNetworkStatus, useBatteryStatus } from 'use-is-pwa';

function MyComponent() {
  const { isMobile } = useIsMobile();
  const isOnline = useNetworkStatus();
  const { level, charging } = useBatteryStatus();

  return (
    <div>
      <h1>{isMobile ? 'Mobile View' : 'Desktop View'}</h1>
      <p>{isOnline ? 'Online' : 'Offline'}</p>
      <p>Battery Level: {Math.round(level * 100)}%</p>
      <p>{charging ? 'Charging' : 'Not Charging'}</p>
    </div>
  );
}
```

## Available Hooks

### useIsMobile

Detects if the device is mobile based on screen width.

```jsx
const { isMobile, width } = useIsMobile(768);
```

- `breakpoint` (optional): Width threshold for mobile detection (default: 768px)
- Returns: `{ isMobile: boolean, width: number }`

### useNetworkStatus

Monitors the device's online/offline status.

```jsx
const isOnline = useNetworkStatus();
```

- Returns: `boolean`

### useBatteryStatus

Provides real-time battery information.

```jsx
const { level, charging } = useBatteryStatus();
```

- Returns: `{ level: number, charging: boolean }`

### useGeolocation

Tracks the user's current location.

```jsx
const { location, error } = useGeolocation();
```

- Returns: `{ location: { latitude: number, longitude: number } | null, error: string | null }`

### useDeviceType

Determines the type of device being used.

```jsx
const deviceType = useDeviceType();
```

- Returns: `'mobile' | 'tablet' | 'desktop'`

### useOrientation

Detects the current screen orientation.

```jsx
const orientation = useOrientation();
```

- Returns: `'portrait' | 'landscape'`

### useScreenSize

Provides current screen dimensions.

```jsx
const { width, height } = useScreenSize();
```

- Returns: `{ width: number, height: number }`

### useTouchOrClick

Determines if the device supports touch input.

```jsx
const isTouchDevice = useTouchOrClick();
```

- Returns: `boolean`

### useMediaQuery

Checks if a media query matches the current environment.

```jsx
const matches = useMediaQuery('(min-width: 768px)');
```

- `query`: CSS media query string
- Returns: `boolean`

### useAccessibility

Detects if a screen reader is active.

```jsx
const { isScreenReader } = useAccessibility();
```

- Returns: `{ isScreenReader: boolean }`

### useOrientationLock

Provides methods to lock and unlock screen orientation.

```jsx
const { lockOrientation, unlockOrientation } = useOrientationLock();
```

- Returns: `{ lockOrientation: () => void, unlockOrientation: () => void }`

### useIsPWA

Detects if the app is running as a Progressive Web App.

```jsx
const isPWA = useIsPWA();
```

- Returns: `boolean`

## Contributing

We welcome contributions to `use-is-pwa`! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

For major changes, please open an issue first to discuss what you would like to change.