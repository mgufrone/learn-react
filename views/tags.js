
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

export default class MuseTags extends Component{
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state= {
      dataSource: ds.cloneWithRows(this.props.tags),
    };
  }
  render(){
    var content = this.props.tags.map((tag,key) =>{
      return <TouchableHighlight key={key} onPress={()=>this.tagClick(tag)}>
        <Text style={{
        fontSize: 13,
        marginLeft: 10,
        color: '#303030',}}>{tag.name}</Text>
      </TouchableHighlight>
    });
    return(
      <View style={{alignItems:'flex-start',flexDirection:'row',}}>
        {content}
      </View>
    );
  }
  tagClick(tag){
    alert(tag.name);
  }
}
