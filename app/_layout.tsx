import { Stack } from "expo-router";
import { ToastProvider } from "../Providers/ToastProvider";
import { Provider as PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return ( 
    <ToastProvider>
      <PaperProvider>
        <Stack screenOptions={{
          headerShown: false
        }}> 
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="signin" />
        
        </ Stack>
      </PaperProvider>
    </ToastProvider>
)}
