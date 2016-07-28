
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import MuseTags from './tags';
import Hosted from './hosted';
import PerformingArtists from './performing-artists';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabbedContent from './tabbed-content';
class MuseTitle extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View style={{flexDirection:'row',padding:20,justifyContent:'center'}}>
        <Text style={{fontSize: 20,flex:0.8}}>{this.props.title}</Text>
        <TouchableOpacity onPress={this.museClick} style={styles.button}
            underlayColor='#EF4B4C'>
            <View style={{flexDirection:'row',padding:5,alignItems:'center',justifyContent:'center'}}>
              <Icon name="heart-o" size={16} color="#EF4B4C" style={{marginRight:5}} />
              <Text style={styles.buttonText}>Muse</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }
  museClick(e){

  }
}
class MuseAbout extends Component{
  constructor(props){
    super(props);
    this.state = {expanded: false};
  }
  render(){
    return(
      <View style={{paddingTop:10,paddingBottom:15,paddingLeft:20,paddingRight:20,borderBottomWidth:1,borderColor:'#f0f0f0'}}>
        <Text style={{fontSize: 15,color:'#000',marginBottom:5}}>About</Text>
        <Text style={{fontSize: 12,lineHeight:20}}>{this.state.expanded?this.props.about:this.props.about.substr(0,200)+'...'}</Text>
        <TouchableOpacity onPress={()=>this.moreClick()}>
          <Text>{!this.state.expanded?'Read more':"Less"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  moreClick(){
    this.setState({expanded:!this.state.expanded});
  }
}
export default class Cover extends Component{
  constructor(props){
    super(props);
  }
  render(){
    var {detail} = this.props;
    var cover = {
      uri: detail.profile_photo.formats['home-rectangle']
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
    var {city} = detail;
    return (
      <View style={{flexDirection:'column',backgroundColor:'#fff'}}>
        <Image source={cover} style={{resizeMode: 'stretch','flex':1,'height':200}}/>
        <MuseTitle title={detail.name}></MuseTitle>
        <MuseTags border={true} usePadding={true} tags={detail.tags}></MuseTags>
        <Hosted venue={venue} date={date} city={city}/>
        <MuseAbout about={detail.about}/>
        <PerformingArtists artists={artists}/>
      </View>
    );
  }
};
var styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: '#EF4B4C',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 0.2,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderColor: '#EF4B4C',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
})

// AppRegistry.registerComponent('Cover', () => Cover);
