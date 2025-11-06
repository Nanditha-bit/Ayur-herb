# 📱 Capacitor Native Mobile App Setup Guide

This guide will help you build and run your Ayur-Herb app as a native mobile application on Android and iOS devices.

## 🎯 What You Get

With Capacitor enabled, your app now has:
- ✅ **Native Camera Access** - Full device camera integration
- ✅ **Push Notifications** - Send alerts to users
- ✅ **Gallery Access** - Pick images from device storage
- ✅ **Offline Support** - Works without internet
- ✅ **Native Performance** - Optimized for mobile devices

## 📋 Prerequisites

### For Android Development:
- [Android Studio](https://developer.android.com/studio) installed
- Java Development Kit (JDK) 11 or higher

### For iOS Development (Mac only):
- [Xcode](https://developer.apple.com/xcode/) installed (Mac required)
- CocoaPods installed: `sudo gem install cocoapods`

## 🚀 Step-by-Step Setup

### 1. Export Your Project to GitHub

1. Click the **GitHub button** in the top right corner of Lovable
2. Follow the prompts to export your project to a new or existing GitHub repository

### 2. Clone Your Project Locally

\`\`\`bash
git clone <your-github-repo-url>
cd plant-gyan-offline
\`\`\`

### 3. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 4. Initialize Capacitor (Already Done!)

The Capacitor configuration is already set up in `capacitor.config.ts` with:
- App ID: `app.lovable.3ffa6a210b104a7293dea916930cbc01`
- App Name: `plant-gyan-offline`
- Hot-reload enabled for fast development

### 5. Add Mobile Platforms

Choose which platform(s) you want to build for:

**For Android:**
\`\`\`bash
npx cap add android
\`\`\`

**For iOS (Mac only):**
\`\`\`bash
npx cap add ios
cd ios/App
pod install
cd ../..
\`\`\`

### 6. Build Your Web App

\`\`\`bash
npm run build
\`\`\`

### 7. Sync Native Project

\`\`\`bash
npx cap sync
\`\`\`

### 8. Configure Native Permissions

#### Android Permissions
Edit `android/app/src/main/AndroidManifest.xml` and add:

\`\`\`xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
\`\`\`

#### iOS Permissions
Edit `ios/App/App/Info.plist` and add:

\`\`\`xml
<key>NSCameraUsageDescription</key>
<string>We need camera access to identify plants</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>We need photo library access to analyze plant images</string>
\`\`\`

### 9. Run Your App!

**On Android:**
\`\`\`bash
npx cap run android
\`\`\`

This will:
- Open Android Studio
- Build the app
- Launch it on a connected device or emulator

**On iOS (Mac only):**
\`\`\`bash
npx cap open ios
\`\`\`

Then in Xcode:
1. Select your target device or simulator
2. Click the Play button to build and run

## 🔄 Development Workflow

While developing, you can use hot-reload:

1. Start your development server:
   \`\`\`bash
   npm run dev
   \`\`\`

2. Your app will automatically reload changes as you code!

3. When ready to test new changes on device:
   \`\`\`bash
   git pull  # Pull latest changes from Lovable
   npm install  # Install any new dependencies
   npm run build  # Build the web app
   npx cap sync  # Sync to native platforms
   npx cap run android  # or iOS
   \`\`\`

## 📱 Testing Camera & Notifications

The app includes:
- **Camera Hook** (`src/hooks/useCamera.ts`) - Take photos or pick from gallery
- **Push Notifications Hook** (`src/hooks/usePushNotifications.ts`) - Send notifications

The CameraScanner component automatically uses native camera on mobile and web camera on desktop!

## 🚢 Publishing Your App

### Android (Google Play Store)
1. Generate a signed APK/Bundle in Android Studio
2. Create a Google Play Developer account ($25 one-time fee)
3. Upload your app bundle
4. Fill in store listing details
5. Submit for review

### iOS (Apple App Store)
1. Enroll in Apple Developer Program ($99/year)
2. Configure signing in Xcode
3. Archive and upload to App Store Connect
4. Fill in app information
5. Submit for review

## 🔧 Troubleshooting

**Issue:** Camera not working on device
- **Solution:** Check that permissions are added to manifest files and granted on device

**Issue:** Build fails on sync
- **Solution:** Run `npm run build` before `npx cap sync`

**Issue:** iOS build fails
- **Solution:** Run `cd ios/App && pod install && cd ../..`

**Issue:** Changes not showing up
- **Solution:** Always run `npx cap sync` after making code changes

## 📚 Learn More

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Camera Plugin](https://capacitorjs.com/docs/apis/camera)
- [Push Notifications Plugin](https://capacitorjs.com/docs/apis/push-notifications)

## 🎉 You're All Set!

Your Ayur-Herb app is now a native mobile application with full access to device features. Happy coding! 🌿
