import type { CapacitorConfig } from "@capacitor/cli"; // Correct type import

const config: CapacitorConfig = {
  appId: "com.chukwudavid.omnicalc", // Replace with your actual App ID
  appName: "OmniCalc", // Replace with your actual App Name
  webDir: "public", // Points to the 'public' folder for local assets
  server: {
    // THIS IS THE CRUCIAL PART:
    // Replace with the URL of your DEPLOYED Next.js application; this time, the one hosted on vercel
    url: "https://omni-calc-app-chukwudavids-projects.vercel.app/",
    cleartext: false, // Should be false for HTTPS URLs. Set to true only if using HTTP for local dev.
  },
  // Optional: If you need to use Capacitor plugins that require specific Android permissions,
  // you might configure them here or directly in the AndroidManifest.xml later.
  // plugins: {
  //   SplashScreen: {
  //     launchShowDuration: 3000,
  //     launchAutoHide: true,
  //     backgroundColor: "#ffffffff",
  //     androidSplashResourceName: "splash",
  //     androidScaleType: "CENTER_CROP",
  //     showSpinner: true,
  //     androidSpinnerStyle: "large",
  //     iosSpinnerStyle: "small",
  //     spinnerColor: "#999999",
  //     splashFullScreen: true,
  //     splashImmersive: true,
  //   }
  // }
};

export default config;
