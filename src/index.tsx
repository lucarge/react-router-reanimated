import { MemoryHistory } from 'history';
import React, { ReactNode, useEffect, useState } from 'react';
import { Dimensions, StyleProp, View, ViewStyle } from 'react-native';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import {
  runOnJS,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated';
import { useHistory } from 'react-router-native';
import { Entry } from './Entry';

const fillTheAvailableSpace: StyleProp<ViewStyle> = { flexGrow: 1, flexShrink: 1 };
const springConfig: WithSpringConfig = {
  stiffness: 1000,
  damping: 500,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 10,
  restSpeedThreshold: 10,
};
const windowWidth = Dimensions.get('window').width;

type Props = {
  children: ReactNode;
};

export function AnimatedSwitch({ children }: Props) {
  const history = useHistory() as MemoryHistory;
  const [, forceUpdate] = useState(0);
  const x = useSharedValue(0);

  function onEnd() {
    history.goBack();

    x.value = 0;
  }

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { startX: number }>({
    onStart: (event, ctx) => {
      x.value = Math.max(event.translationX, 0);
      ctx.startX = x.value;
    },
    onActive: (event, ctx) => {
      x.value = Math.max(ctx.startX + event.translationX, 0);
    },
    onCancel: () => {
      x.value = withSpring(0, springConfig);
    },
    onEnd: event => {
      const target = event.velocityX > 0 && event.absoluteX > windowWidth / 2 ? windowWidth : 0;

      x.value = withSpring(target, springConfig, isFinished => {
        if (isFinished && target > 0) {
          runOnJS(onEnd)();
        }
      });
    },
  });

  useEffect(() => {
    history.listen(() => {
      forceUpdate(history.index);
    });
  }, [history]);

  return (
    <View style={fillTheAvailableSpace}>
      {history.entries.slice(0, history.index + 1).map((entry, index) => (
        <Entry key={entry.key} entry={entry} gestureHandler={gestureHandler} index={index} x={x}>
          {children}
        </Entry>
      ))}
    </View>
  );
}
