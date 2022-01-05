# React Router Reanimated

Easily bring animations and gesture-enabled navigation to your React Native app built with React Router.

https://user-images.githubusercontent.com/25553165/147833063-f6f73ab4-b24d-464c-9e9c-ee7f8738f0db.mp4

## Usage

This library is built on top of [`react-native-screens`](https://github.com/software-mansion/react-native-screens). When you're done [setting it up](https://github.com/software-mansion/react-native-screens#installation) in your app (if you're not using it already), replace the `Switch` you're using from `react-router-native` with the `AnimatedSwitch` provided by this library, and you're all set!

```diff
- import { NativeRouter, Route, Switch } from 'react-router-native';
+ import { NativeRouter, Route } from 'react-router-native';
+ import { AnimatedSwitch } from 'react-router-reanimated';

export default function App() {
  return (
    <NativeRouter>
-      <Switch>
+      <AnimatedSwitch>
        <Route exact path="/">{/* ... */}</Route>
        <Route exact path="/another-path">{/* ... */}</Route>
+      </AnimatedSwitch>
-      </Switch>
    </NativeRouter>
  )
}
```

## Limitations

This library is incompatible with `react-router` at version `6` or higher, since from that version accessing the router's history is not possible anymore, and behind the curtains this library is using it to stack screens one on top of the other.

## Motivation

Building apps on top of React Router on the web and React Router Native on mobile has proved to be very efficient from a product perspective in my experience.
The ecosystem around React Router Native has never matured though, and so building basic features like Tab/Stack navigations or supporting gesture-based navigation is way more complex that with alternative solutions, like React Navigation.
I'm publishing this library in the hope of easing the development of mobile apps on top of React Router Native.
