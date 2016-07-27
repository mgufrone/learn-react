
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
import MuseTags from './tags';
import Hosted from './hosted';
import PerformingArtists from './performing-artists';
class MuseTitle extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View>
        <Text style={{fontSize: 20}}>{this.props.title}</Text>
        <TouchableHighlight onPress={this.museClick} style={styles.button}
            underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Location</Text>
        </TouchableHighlight>
      </View>
    );
  }
  museClick(e){

  }
}
export default class Cover extends Component{
  constructor(props){
    super(props);
  }
  render(){
    var detail = this.props.detail;
    var cover = {
      uri: detail.profile_photo.resource
    }
    var venue = detail.industry_connections.filter((industry)=>{
      if(industry == null || !('industry_entity' in industry) || industry.industry_entity == null || !('type' in industry.industry_entity))
      return false;
      return industry.industry_entity.type == 'venue';
    })[0];
    var artists = detail.industry_connections.filter((industry)=>{
      if(industry == null || !('industry_entity' in industry) || industry.industry_entity == null || !('type' in industry.industry_entity))
      return false;
      return industry.industry_entity.type == 'artist';
    });
    var date = [detail.starts_at,detail.ends_at];
    var city = detail.city;
    return (
      <View>
        <Image source={cover} style={{resizeMode: 'contain','width':Dimensions.get('window').width,'height':155}}/>
        <MuseTitle title={detail.name}></MuseTitle>
        <MuseTags tags={detail.tags}></MuseTags>
        <Hosted venue={venue} date={date} city={city}/>
        <PerformingArtists artists={artists}/>
      </View>
    );
  }
};
var styles = StyleSheet.create({
  buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
})

// AppRegistry.registerComponent('Cover', () => Cover);
