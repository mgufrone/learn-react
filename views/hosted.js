
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
export default class Hosted extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <View>
        <Text>Hosted By</Text>
        <TouchableHighlight onClick={()=>this.venueClick(this.props.venue)}>
          <Text>{this.props.venue.industry_entity.name}</Text>
        </TouchableHighlight>
        {this.renderDate(this.props.date)}
        {this.renderLocation(this.props.venue, this.props.city)}
      </View>
    );
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
      <TouchableHighlight>
        <Text>{dateString}</Text>
      </TouchableHighlight>
    );
  }
  renderLocation(venue, city){
    return(
      <TouchableHighlight onClick={()=>this.venueClick(this.props.venue)}>
        <Text>{venue.industry_entity.name}, {city.name}</Text>
      </TouchableHighlight>
    );
  }
}
