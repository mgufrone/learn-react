
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
    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(tag) =>
          <TouchableHighlight onPress={()=>this.tagClick(tag)}>
            <Text style={{
            fontSize: 18,
            flexDirection: "column",
            flex: 1,
            color: '#303030',}}>{tag.name}</Text>
          </TouchableHighlight>
        }
      />
    );
  }
  tagClick(tag){
    alert(tag.name);
  }
}
