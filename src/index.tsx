import { MemoryHistory } from 'history';
import React, { ReactNode, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Screen, ScreenStack } from 'react-native-screens';
import { Switch, useHistory } from 'react-router-native';

type Props = {
  children: ReactNode;
};

export function AnimatedSwitch({ children }: Props) {
  const history = useHistory() as MemoryHistory;
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    history.listen(() => {
      forceUpdate(history.index);
    });
  }, [history]);

  return (
    <ScreenStack style={{ flex: 1 }}>
      {history.entries.slice(0, history.index + 1).map(entry => (
        <Screen key={entry.key} onDismissed={history.goBack} style={{ flex: 1, position: 'absolute' }}>
          <View style={{ flex: 1, position: 'relative' }}>
            <Switch location={entry}>{children}</Switch>
          </View>
        </Screen>
      ))}
    </ScreenStack>
  );
}
