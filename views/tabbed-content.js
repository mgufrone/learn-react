'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View,
  ListView,
  Button,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ViewPagerAndroid,
  ScrollView
} from 'react-native';
import type { ViewPagerScrollState } from 'ViewPagerAndroid';

import MuseTags from './tags';
var video = require('./../dummy/video.json')['collection'];
var photo = require('./../dummy/photo.json')['collection'];
var songs = require('./../dummy/audio.json')['collection'];
export default class TabbedContent extends Component{
  constructor(props){
    super(props);
    this.state = {
      page: 0,
      animationsAreEnabled: true,
      scrollEnabled: true,
      progress: {
        position: 0,
        offset: 0,
      }
    };
  }
  onPageSelected(e){
    this.setState({page: e.nativeEvent.position});
  }
  onPageScroll(e) {
    this.setState({progress: e.nativeEvent});
  }
  onPageScrollStateChanged(state : ViewPagerScrollState) {
    this.setState({scrollState: state});
  }
  move(delta) {
    var page = this.state.page + delta;
    this.go(page);
  }
  go(page) {
    if (this.state.animationsAreEnabled) {
      this.viewPager.setPage(page);
    } else {
      this.viewPager.setPageWithoutAnimation(page);
    }

    this.setState({page});
  }
  onLayout(e){
    console.log(e.nativeEvent.layout);
  }
  render(){
    var tabs = ['All',"Songs","Photos","Videos"].map((tab,key)=>{
      // console.log(this.state.page);
      var color = this.state.page==key?'#ff0000':'#ffffff';
      return (
        <View key={key} style={{borderBottomWidth:1,borderBottomColor:color}}>
          <TouchableOpacity style={{padding:10}} onPress={()=>this.go(key)}>
            <Text style={{fontSize:15}}>{tab}</Text>
          </TouchableOpacity>
        </View>
      );
    });
    return (
      <View
        style={{height:500}}
         onLayout={this.onLayout}
        >
        <ScrollView horizontal={true} style={{flex:1}}>
          {tabs}
        </ScrollView>
        <ViewPagerAndroid
          style={{flex:15}}
          initialPage={0}
          scrollEnabled={true}
          onPageScroll={this.onPageScroll.bind(this)}
          onPageSelected={this.onPageSelected.bind(this)}
          onPageScrollStateChanged={this.onPageScrollStateChanged.bind(this)}
          pageMargin={10}
          ref={viewPager => { this.viewPager = viewPager; }}>
          {this.viewAll()}
          {this.viewSongs(songs)}
        </ViewPagerAndroid>
      </View>
    );
  }
  viewAll(){
    return (
      <View key={0} style={styles.tabView}>
        {this.viewSong(songs[0])}
      </View>
    );
  }
  viewSongs(songs){
    var content = songs.map((song,key)=>{
      return this.viewSong(song,key)
    })
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(content);
    return (
      <View key={1}>
        <ListView style={styles.tabView} dataSource={dataSource}
          renderRow={(row)=>row}
        />
      </View>
    );
  }
  viewPhotos(photos){
    return (
      <View tabLabel="Photos">

        <Text>Here is songs</Text>
      </View>
    );
  }
  viewVideos(videos){
    return (
      <View tabLabel="Videos"></View>
    );
  }

  viewSong(song,key=0){
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
  buttons: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    width: 0,
    margin: 5,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'gray',
  },
  buttonDisabled: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
  },
  scrollStateText: {
    color: '#99d1b7',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 200,
    padding: 20,
  },
  likeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    margin: 8,
    padding: 8,
  },
  likeContainer: {
    flexDirection: 'row',
  },
  likesText: {
    flex: 1,
    fontSize: 18,
    alignSelf: 'center',
  },
  progressBarContainer: {
    height: 10,
    margin: 10,
    borderColor: '#eeeeee',
    borderWidth: 2,
  },
  progressBar: {
    alignSelf: 'flex-start',
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  viewPager: {
    flex: 1,
  },
});
