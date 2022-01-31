import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {BackHandler} from 'react-native';
import {U} from '@root/utility';
class HandleBack extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBack);
  }
  onBack = () => {
    if (this.props.onBack) {
      this.props.onBack();
    } else {
      U.NavigationService.goBack();
    }
    return true;
  };
  render() {
    return null;
  }
}
export default withNavigation(HandleBack);
