import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button,
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import MuseTags from './tags'
var video = require('./../dummy/video.json')['collection'];
var photo = require('./../dummy/photo.json')['collection'];
var songs = require('./../dummy/audio.json')['collection'];
export default class TabbedContent extends Component{
  constructor(props){
    super(props);
    this.state = {selectedTab: "all"};
  }
  render(){
    return (
      <ScrollableTabView
      style={{marginTop: 120, marginBottom: 40}}
      initialPage={0}
      tabBarUnderlineColor="white"
      renderTabBar={() => <ScrollableTabBar />}
    >
      {this.renderAll()}
      {this.renderSongs(songs)}
      {/*{this.renderPhotos(photos)}
      {this.renderVideos(videos)}*/}
    </ScrollableTabView>
    );
  }
  renderAll(){
    return (
      <ScrollView style={styles.tabView} tabLabel="All">
        {this.renderSong(songs[0])}
      </ScrollView>
    );
  }
  renderSongs(songs){
    var i = 0;
    var content = songs.map((song)=>{
      i+=1;
      return this.renderSong(song,i)
    })
    return (
      <ScrollView style={styles.tabView} tabLabel="Songs">{content}</ScrollView>
    );
  }
  renderPhotos(photos){
    return (
      <View tabLabel="Photos">

        <Text>Here is songs</Text>
      </View>
    );
  }
  renderVideos(videos){
    return (
      <View tabLabel="Videos"></View>
    );
  }

  renderSong(song,key=0){
    return (
      <View style={styles.card} key={key}>
        <View style={{alignItems:'stretch',flexDirection:'row'}}>
          <TouchableHighlight>
              <Image source={require('./../assets/audio.png')} style={{width:100,height:100}}/>
          </TouchableHighlight>
          <View>
            <Text>{song.name}</Text>
            <MuseTags tags={song.tags}/>
          </View>
        </View>
        <View style={{alignItems:'stretch',flexDirection:'row'}}>
          <TouchableHighlight>
            <Text>{song.musers} Musers</Text>
          </TouchableHighlight>
          <TouchableHighlight>
            <Text>Share</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabView: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 160,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
