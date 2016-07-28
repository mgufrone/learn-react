
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
  TouchableOpacity
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
      var style = {
        borderColor:'#c0c0c0',
        borderWidth: 1,
        borderRadius: 20,
        paddingTop:5,
        paddingLeft:5,
        paddingBottom:5,
        paddingRight:5,
        marginLeft: key==0?0:10
      }
      return <TouchableOpacity style={style} key={key} onPress={()=>this.tagClick(tag)}>
        <Text style={{
        fontSize: 11,
        color: '#c0c0c0',}}>{tag.name}</Text>
      </TouchableOpacity>
    });
    return(
      <View style={{alignItems:'flex-start',flexDirection:'row',padding:10}}>
        {content}
      </View>
    );
  }
  tagClick(tag){
    alert(tag.name);
  }
}
