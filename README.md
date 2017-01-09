List App Example
================


### Ubuntu

```
$> sudo sysctl fs.inotify.max_user_watches=524288  
$> react-native run-android
```

### RUN
```
$> npm install -g ios-deploy
$> react-native run-ios --device 'xxx 的 iPhone' --configuration Release
```
```
$> react-native run-android --configuration Release
```
### Android Release

```
$> react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

In Android Studio: Build -> Generate Signed APK

./gradlew assembleRelease
