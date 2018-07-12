/**
 * Created by leezhihua on 2018/7/10
 * @flow
 * */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ActivityIndicator,
    WebView,
    ScrollView
} from 'react-native';
import HTMLView from 'react-native-htmlview';

export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{},
            loading: true,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = ()=> {
        let url = this.props.url.replace('http','https');
        console.log(url);
        BTFetch.fetchGET(url)
            .then(res=>{
                this.setState({data:res,loading:false});
            })
            .catch(err=>{
                console.log('热门请求失败'+err);
            })
    };

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.loading
                        ?
                        <ActivityIndicator size='large' color={'purple'} style={{marginTop:100}}/>
                        :
                        <ScrollView>
                            <View style={{alignItems:'center'}}>
                                <Image
                                    style={styles.img}
                                    source={{uri:this.state.data.image}}
                                />
                                <Text style={styles.txt}>{this.state.data.title}</Text>
                            </View>
                        </ScrollView>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    img: {
        height:320,
        width:SCREENWIDTH,
    },
    txt: {
        fontSize:20,
        color:'#fff',
        marginTop:-60,
        marginLeft:10,
        marginRight:10,
        letterSpacing:1,
        lineHeight:25,
    }


})