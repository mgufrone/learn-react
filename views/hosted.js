
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
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Hosted extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <View style={{padding:10}}>
        <View style={{flexDirection:'row',marginBottom:20}}>
          <Text style={{fontSize:15}}>Hosted By </Text>
          <TouchableOpacity onPress={()=>this.venueClick(this.props.venue)}>
            <Text style={{fontSize:15,color:'#EF4B4C',fontWeight:'bold'}}>{this.props.venue.industry_entity.name}</Text>
          </TouchableOpacity>
        </View>
        {this.renderDate(this.props.date)}
        {this.renderLocation(this.props.venue, this.props.city)}
      </View>
    );
  }
  venueClick(venue){
    alert(venue.industry_entity.name);
  }
  renderDate(date){
    var start = date[0];
    var end = date[1];
    var startSplit = start.split(" ");
    var endSplit = end.split(" ");
    var dateString = "";
    if(startSplit[0] == endSplit[0]){
      dateString = startSplit[0]+" "+startSplit[1]+"-"+endSplit[1];
    }
    else{
      dateString = start+"-"+end;
    }
    return (
      <TouchableOpacity style={{borderTopWidth:1,borderBottomWidth:1,borderColor:'#f0f0f0',paddingTop:10,paddingBottom:10}}>
        <View style={{flexDirection:'row',padding:5,justifyContent:'flex-start',alignItems:'center'}}>
          <Icon name="calendar" size={16} color="#EF4B4C" style={{marginRight:10}} />
          <Text>{dateString}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  renderLocation(venue, city){
    return(
      <TouchableOpacity style={{borderBottomWidth:1,borderColor:'#f0f0f0',paddingTop:10,paddingBottom:10}} onPress={()=>this.venueClick(this.props.venue)}>
        <View style={{flexDirection:'row',padding:5,justifyContent:'flex-start',alignItems:'center'}}>
          <Icon name="map-pin" size={16} color="#EF4B4C" style={{marginRight:10}} />
          <Text>{venue.industry_entity.name}, {city.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
