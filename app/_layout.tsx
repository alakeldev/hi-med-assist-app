import { Stack } from "expo-router";
import { ToastProvider } from "../Providers/ToastProvider";

export default function RootLayout() {
  return ( 
    <ToastProvider>
      <Stack screenOptions={{
        headerShown: false
      }}> 
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="signin" />
      
      </ Stack>
    </ToastProvider>
)}
