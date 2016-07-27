import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button,
  Image,
  ListView,
  TouchableHighlight
} from 'react-native';

export default class PerformingArtists extends Component{
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state= {
      dataSource: ds.cloneWithRows(this.props.artists),
    };
  }
  render(){
    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(artist) =>
          <TouchableHighlight onPress={()=>this.artistClick(artist)}>
            <Image source={{uri: artist.industry_entity.profile_photo.formats.micro}} style={{width:100,height:100}}/>
          </TouchableHighlight>
        }
      />
    );
  }
  artistClick(artist){
    alert(artist.industry_entity.name);
  }
}
