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
    var key = 0;
    var contents = this.props.artists.map((artist)=>{
      key+=1;
      return <TouchableHighlight key={key} onPress={()=>this.artistClick(artist)}>
        <Image source={{uri: artist.industry_entity.profile_photo.formats.micro}} style={{width:100,height:100}}/>
      </TouchableHighlight>
    });
    return(
      <View style={{alignItems: 'stretch',flexDirection:'row'}}>
        {contents}
      </View>
    );
  }
  artistClick(artist){
    alert(artist.industry_entity.name);
  }
}
