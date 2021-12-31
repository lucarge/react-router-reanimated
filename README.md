# React Router Reanimated

Easily bring animations and gesture-enabled navigation to your React Native app built with React Router.

https://user-images.githubusercontent.com/25553165/147833063-f6f73ab4-b24d-464c-9e9c-ee7f8738f0db.mp4

## Usage

This library is built on top of [`react-native-reanimated`](https://github.com/software-mansion/react-native-reanimated) and [`react-native-gesture-handler`](https://github.com/software-mansion/react-native-gesture-handler). When you're done setting up these dependencies in your app (if you're not using them already), replace the `Switch` you're using from `react-router-native` with the `AnimatedSwitch` provided by this library, and you're all set!

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

This library requires `react-native-reanimated` at version `2.3.0` or higher, since under the hood it's using the [Layout Animation API](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/layout_animations) introduced in that minor version.

This library is also incompatible with `react-router` at version `6` or higher, since from that version accessing the router's history is not possible anymore, and behind the curtains this library is using it to stack screens one on top of the other.

## Motivation

Building apps on top of React Router on the web and React Router Native on mobile has proved to be very efficient from a product perspective in my experience.
The ecosystem around React Router Native has never matured though, and so building basic features like Tab/Stack navigations or supporting gesture-based navigation is way more complex that with alternative solutions, like React Navigation.
I'm publishing this library in the hope of easing the development of mobile apps on top of React Router Native.
