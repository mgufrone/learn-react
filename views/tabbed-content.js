import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button,
  Image,
  TouchableHighlight
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

export default class TabbedContent extends Component{
  constructor(props){
    super(props);
    this.state = {selectedTab: "all"};
  }
  render(){
    return (
      <ScrollableTabView
      style={{marginTop: 20, marginBottom: 40}}
      initialPage={0}
      renderTabBar={() => <ScrollableTabBar />}
    >
      {this.renderAll()}
      {this.renderSongs()}
      {this.renderPhotos()}
      {this.renderVideos()}
    </ScrollableTabView>
    );
  }
  renderAll(){
    return (
      <View tabLabel="All">
        <Text>Here is All</Text>
      </View>
    );
  }
  renderSongs(){
    return (
      <View tabLabel="Songs">
        <Text>Here is songs</Text>
      </View>
    );
  }
  renderPhotos(){
    return (
      <View tabLabel="Photos">

        <Text>Here is songs</Text>
      </View>
    );
  }
  renderVideos(){
    return (
      <View tabLabel="Videos">

        <Text>Here is videos</Text>
      </View>
    );
  }
}
