import { Location, MemoryHistory } from 'history';
import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { SlideInRight, SlideOutRight, useAnimatedStyle } from 'react-native-reanimated';
import { Switch, useHistory } from 'react-router-native';

const absolute: StyleProp<ViewStyle> = {
  bottom: 0,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
};

type Props = {
  children: ReactNode;
  entry: Location;
  gestureHandler: (event: PanGestureHandlerGestureEvent) => void;
  index: number;
  x: Animated.SharedValue<number>;
};

export function Entry({ children, entry, gestureHandler, index, x }: Props) {
  const history = useHistory() as MemoryHistory;

  const animating = x.value > 0;
  const isFirst = index === 0;
  const isLast = index === history.index;

  const animatedStyle = useAnimatedStyle(() => ({
    flex: 1,
    position: 'relative',
    transform: [{ translateX: isLast ? x.value : 0 }],
  }));

  const style: StyleProp<ViewStyle> = !isFirst && isLast ? animatedStyle : { flex: 1, position: 'relative' };

  return (
    <View style={[absolute, { zIndex: index }]}>
      <PanGestureHandler enabled={isLast && !isFirst} onGestureEvent={gestureHandler}>
        <Animated.View entering={SlideInRight} exiting={animating ? undefined : SlideOutRight} style={style}>
          <Switch location={entry}>{children}</Switch>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}
