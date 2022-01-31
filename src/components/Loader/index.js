import React from 'react';
import {View, Modal, ActivityIndicator, StyleSheet} from 'react-native';
import {R} from '@root/res';

function Loader({loading}) {
  return (
    <Modal
      supportedOrientations={[
        'portrait',
        'landscape',
        'landscape-left',
        'landscape-right',
        'portrait-upside-down',
      ]}
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground} visible={loading}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            size="large"
            color={R.colors.green}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: R.colors.black40,
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loader;
