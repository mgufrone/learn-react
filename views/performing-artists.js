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
  ScrollView,
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
    var contents = this.props.artists.map((artist,key)=>{
      return <TouchableHighlight key={key} onPress={()=>this.artistClick(artist)}>
        <Image source={{uri: artist.industry_entity.profile_photo.formats.micro}} style={{width:80,height:80,marginLeft:key==0?0:10}}/>
      </TouchableHighlight>
    });
    return(
      <View style={{padding:20}}>
        <Text style={{color:'#000',fontSize:14,marginBottom:10}}>Performing Artists</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection:'row'}}>
          {contents}
        </ScrollView>
      </View>
    );
  }
  artistClick(artist){
    alert(artist.industry_entity.name);
  }
}
