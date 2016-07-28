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

import Icon from 'react-native-vector-icons/FontAwesome';
import MuseTags from './tags';
var videos = require('./../dummy/video.json')['collection'];
var photos = require('./../dummy/photo.json')['collection'];
var songs = require('./../dummy/audio.json')['collection'];
class MuseAction extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <View style={{alignItems:'stretch',marginTop:10,borderTopWidth:1,borderColor:'#f0f0f0',justifyContent:'center',flexDirection:'row'}}>
        <TouchableHighlight style={{flex:0.5,alignItems:'center',padding:10}}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <View style={{padding:5,borderRadius:16,borderColor:'#EF4B4C',borderWidth:1,marginRight:10}}>
              <Image source={require('./../assets/muse-icon.png')} style={{width:16,height:16}}/>
            </View>
            <Text>{this.props.musers} Musers</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={{flex:0.5,alignItems:'center',padding:10}}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <View style={{padding:5,borderRadius:16,borderColor:'#000',borderWidth:1,marginRight:10}}>
              <Icon name="share" size={13} color="#000" />
            </View>
            <Text>Share</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
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
  render(){
    var tabs = ['All',"Songs","Photos","Videos"].map((tab,key)=>{
      // console.log(this.state.page);
      var color = this.state.page==key?'#000':'#c0c0c0';
      return (
        <View key={key}>
          <TouchableOpacity style={{padding:10}} onPress={()=>this.go(key)}>
            <Text style={{fontSize:15,color:color}}>{tab}</Text>
          </TouchableOpacity>
        </View>
      );
    });
    return (
      <View
        style={{height:800,borderTopWidth:10,borderColor:'rgba(0,0,0,0.01)'}}
        >
        <ScrollView horizontal={true} style={{flex:1,backgroundColor:'#fff',paddingLeft:10,paddingRight:10}}>
          {tabs}
        </ScrollView>
        <ViewPagerAndroid
          style={{flex:15}}
          initialPage={0}
          scrollEnabled={true}
          onPageScroll={this.onPageScroll.bind(this)}
          onPageSelected={this.onPageSelected.bind(this)}
          onPageScrollStateChanged={this.onPageScrollStateChanged.bind(this)}
          ref={viewPager => { this.viewPager = viewPager; }}>
          {this.viewAll()}
          {this.viewSongs(songs)}
          {this.viewPhotos(photos)}
          {this.viewVideos(videos)}
        </ViewPagerAndroid>
      </View>
    );
  }
  viewAll(){
    return (
      <View key={0} style={styles.tabView}>
        {this.viewSong(songs[0],0)}
        {this.viewPhoto(photos[0],1)}
        {this.viewVideo(videos[0],2)}
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
    var content = photos.map((photo,key)=>{
      return this.viewPhoto(photo,key)
    })
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(content);
    return (
      <View key={2}>
        <ListView style={styles.tabView} dataSource={dataSource}
          renderRow={(row)=>row}
        />
      </View>
    );
  }
  viewVideos(videos){
    var content = videos.map((video,key)=>{
      return this.viewVideo(video,key)
    })
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(content);
    return (
      <View key={3}>
        <ListView style={styles.tabView} dataSource={dataSource}
          renderRow={(row)=>row}
        />
      </View>
    );
  }

  viewVideo(video, key){
    return <View style={styles.card} key={key}>
      <View style={{marginBottom:20}}>
        <View style={{flexDirection:'row'}}>
          <TouchableHighlight>
            <Text style={{color:'#EF4B4C'}}>A.R Rehman </Text>
          </TouchableHighlight>
          <Text>posted a video in album </Text>
          <TouchableHighlight>
            <Text style={{color:'#EF4B4C'}}>Kadal</Text>
          </TouchableHighlight>
        </View>
        <Text style={{fontSize:12,color:'#c0c0c0'}}>21 Jun, 5:34 PM</Text>
      </View>
      <View style={{alignItems:'stretch',flexDirection:'row'}}>
        <TouchableHighlight style={{flex:0.3}}>
            <View>
              <Image source={{uri:video.profile_photo.formats.micro}} style={{width:100,height:100}}/>
              <View style={{position:'absolute',top:0,left:0,width:100,height:100,alignItems:'center',justifyContent:'center'}}>
                <Icon name="play-circle-o" size={40} color="rgba(255,255,255,0.8)"/>
              </View>
            </View>
        </TouchableHighlight>
        <View style={{flex:0.7}}>
          <View style={{flex:0.8}}>
            <Text>{video.name}</Text>
            <View style={{marginTop:5}}>
              <MuseTags usePadding={false} border={false} tags={video.tags}/>
            </View>
          </View>
          <View style={{flex:0.2}}>
            <TouchableOpacity>
              <Text>View all videos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <MuseAction musers={video.musers}/>
    </View>
  }
  viewPhoto(photo, key){
    return <View style={styles.card} key={key}>
      <View style={{marginBottom:20}}>
        <View style={{flexDirection:'row'}}>
          <TouchableHighlight>
            <Text style={{color:'#EF4B4C'}}>A.R Rehman </Text>
          </TouchableHighlight>
          <Text>posted a photo in album </Text>
          <TouchableHighlight>
            <Text style={{color:'#EF4B4C'}}>Kadal</Text>
          </TouchableHighlight>
        </View>
        <Text style={{fontSize:12,color:'#c0c0c0'}}>21 Jun, 5:34 PM</Text>
      </View>
      <View style={{alignItems:'stretch',flexDirection:'row'}}>
        <TouchableHighlight style={{flex:1}}>
            <Image source={{uri:photo.formats['feed-rectangle']}} style={{alignSelf:'stretch',height:150}}/>
        </TouchableHighlight>
      </View>
      <MuseAction musers={photo.musers}/>
    </View>
  }

  viewSong(song,key=0){
    return (
      <View style={styles.card} key={key}>
        <View style={{marginBottom:20}}>
          <View style={{flexDirection:'row'}}>
            <TouchableHighlight>
              <Text style={{color:'#EF4B4C'}}>A.R Rehman </Text>
            </TouchableHighlight>
            <Text>posted a song in album </Text>
            <TouchableHighlight>
              <Text style={{color:'#EF4B4C'}}>Kadal</Text>
            </TouchableHighlight>
          </View>
          <Text style={{fontSize:12,color:'#c0c0c0'}}>21 Jun, 5:34 PM</Text>
        </View>
        <View style={{alignItems:'stretch',flexDirection:'row'}}>
          <TouchableHighlight style={{flex:0.3}}>
              <Image source={require('./../assets/audio.png')} style={{width:100,height:100}}/>
          </TouchableHighlight>
          <View style={{flex:0.7}}>
            <View style={{flex:0.8}}>
              <Text>{song.name}</Text>
              <View style={{marginTop:5}}>
                <MuseTags usePadding={false} border={false} tags={song.tags}/>
              </View>
            </View>
            <View style={{flex:0.2}}>
              <TouchableOpacity>
                <Text>View all songs</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <MuseAction musers={song.musers}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabView: {
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom:10,
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
