import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import StackNavigator from './navagition/StackNavigator'; // Corrected the typo in the file name
import AntDesign from '@expo/vector-icons/AntDesign';
import { Provider } from 'react-redux';
import zeroDeliveryStore from './store';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(AntDesign.font);
        // Artificially delay for two seconds to simulate a slow loading experience.
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null; // Render nothing while waiting
  }

  return (
   <Provider store={zeroDeliveryStore}>
    <StackNavigator />
    </Provider> 
  );
}
