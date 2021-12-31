import {MemoryHistory} from 'history';
import React from 'react';
import {Button, StyleProp, View, ViewStyle} from 'react-native';
import {NativeRouter, Route, useHistory} from 'react-router-native';
import {AnimatedSwitch} from './AnimatedSwitch';

const viewStyle: StyleProp<ViewStyle> = {
  alignItems: 'flex-start',
  backgroundColor: 'lightgrey',
  flex: 1,
  justifyContent: 'center',
};

function Home() {
  const {push} = useHistory();

  return (
    <View style={[viewStyle, {backgroundColor: 'pink'}]}>
      <Button onPress={() => push('/step-1')} title="Go to step 1" />
    </View>
  );
}

function Step1() {
  const {goBack, push} = useHistory();

  return (
    <View style={[viewStyle, {backgroundColor: 'lightblue'}]}>
      <Button onPress={goBack} title="Go back" />
      <Button onPress={() => push('/step-2')} title="Go to step 2" />
    </View>
  );
}

function Step2() {
  const {goBack, go, index} = useHistory() as MemoryHistory;

  return (
    <View style={viewStyle}>
      <Button onPress={goBack} title="Go back" />
      <Button onPress={() => go(-index)} title="Restart" />
    </View>
  );
}

export default function App() {
  return (
    <NativeRouter>
      <AnimatedSwitch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/step-1">
          <Step1 />
        </Route>

        <Route exact path="/step-2">
          <Step2 />
        </Route>
      </AnimatedSwitch>
    </NativeRouter>
  );
}
