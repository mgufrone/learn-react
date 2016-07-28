/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import Cover from './views/detail';
import TabbedContent from './views/tabbed-content';
var data = require('./dummy/event.json');
class musejam_detail extends Component {
  render() {
    var {resource} = data;
    return (
      <ScrollView>
        <Cover detail={resource}></Cover>
        <TabbedContent></TabbedContent>
      </ScrollView>
    );
  }
}
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});AppRegistry.registerComponent('musejam_detail', () => musejam_detail);
