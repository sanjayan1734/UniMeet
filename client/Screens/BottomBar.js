import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, useTheme, Icons } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BOTTOM_APPBAR_HEIGHT = 60;

export default function BottomBar () {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <Appbar
      style={[
        styles.bottom,
        {
          height: BOTTOM_APPBAR_HEIGHT + bottom,
          backgroundColor: theme.colors.elevation.level2,
        },
      ]}

      safeAreaInsets={{ bottom }}
    >
      <Appbar.Action icon="abc" style = {styles.appbarItems} onPress={() => {}} />
      <Appbar.Action icon="account-multiple-outline" style = {styles.appbarItems} onPress={() => {}} />
      <Appbar.Action icon="clock-outline" style = {styles.appbarItems} onPress={() => {}} />
      {/* <Appbar.Action icon="delete" style = {styles.appbarItems} onPress={() => {}} /> */}
    </Appbar>
  );
};

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: 'aquamarine',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center'
  },
  appbarItems: {
    marginHorizontal: '10%'
  }
});
