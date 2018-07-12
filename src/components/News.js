/**
 * Created by leezhihua on 2018/7/11
 * @flow
 * */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
} from 'react-native';

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{},
            loading: true,
            refreshing: false,
            scale:1,
        };
    }
    componentWillMount() {
        //动态修改导航栏标题
        BTRouter.refresh({title:this.props.title})
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData = ()=> {
        let url = `https://news-at.zhihu.com/api/4/theme/${this.props.id}`;
        console.log(url);
        BTFetch.fetchGET(url)
            .then(res=>{
                this.setState({data:res,loading:false,refreshing:false});
            })
            .catch(err=>{
                console.log('请求失败'+err);
            })
    };
    //下拉刷新
    refreshData = ()=> {
        this.setState({refreshing:true});
        this.fetchData();
    };
    //自定义分割线
    renderSeparator = () => (
        <View style={{ height:1, backgroundColor:'gray',opacity:0.3}}>{}</View>
    );
    //item
    renderItem = ({item}) => {
        let img = 'http://';
        if (item.images && item.images.length) {
            img = item.images[0].includes('https')?item.images[0]:item.images[0].replace('http','https');
        }
        return (
            <TouchableOpacity>
                <View style={styles.item}>
                    <Image
                        style={styles.itemImg}
                        resizeMode={'contain'}
                        source={{uri:img}}
                    />
                    <Text style={styles.itemTxt}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    };
    //header
    renderListHeader = ()=> {
        let image = this.state.data.image.includes('https')?this.state.data.image:this.state.data.image.replace('http','https');
        return (
            <View>
                <Image
                    style={{width:SCREENWIDTH*this.state.scale,height:200*this.state.scale}}
                    source={{uri:image}}
                />
                <View>
                    <Text style={{fontSize:20, fontWeight:'bold',margin:10}}>主编:</Text>
                    {
                        this.state.data.editors.map((value,index)=>{
                            let img = value.avatar.includes('https')?value.avatar:value.avatar.replace('http','https');
                            return (
                                <View style={{flexDirection:'row',margin:10}} key={index}>
                                    <Image
                                        style={styles.editAva}
                                        source={{uri:img}}
                                    />
                                    <View style={{marginLeft:10}}>
                                        <Text style={{fontSize:15}}>{value.name}</Text>
                                        <Text style={{fontSize:10,color:'gray',marginTop:5}}>{value.bio}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                    <View style={{height:1, backgroundColor:'gray',opacity:0.3}}>{}</View>
                </View>
            </View>
        )
    }
    render() {
        let scale = 1;
        return (
            <View style={styles.container}>
                {
                    this.state.loading
                        ?
                        <ActivityIndicator size={'large'} color={'rgb(69,199,251)'} style={{marginTop:100}}/>
                        :
                        <FlatList
                            data={this.state.data.stories}
                            refreshing={this.state.refreshing}
                            onRefresh={this.refreshData}
                            ListHeaderComponent={this.renderListHeader}
                            keyExtractor={(item, index) =>index.toString()}
                            getItemLayout={(item, index) =>({length: 100, offset: (100 + 1) * index, index })}
                            ItemSeparatorComponent={this.renderSeparator}
                            renderItem={this.renderItem}
                            onScroll={(e)=>{
                                let contentOffsetY = e.nativeEvent.contentOffset.y;
                                console.log(contentOffsetY);
                                if (contentOffsetY < 0 && contentOffsetY % (-2) && this.state.scale < 2.0) {
                                    this.setState({scale:this.state.scale+0.1})
                                }
                                if (contentOffsetY === 0) {
                                    this.setState({scale:1})
                                }
                            }}
                        />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    item: {
        flexDirection:'row',
        margin:10,
    },
    itemImg: {
        width:80,
        height:80,
        borderWidth:1,
        borderColor:'rgb(69,199,251)'
    },
    itemTxt: {
        flex:2,
        fontSize:15,
        color:'black',
        marginLeft:10,
        letterSpacing:1,
        lineHeight:25,
    },
    editAva: {
        width:30,
        height:30,
        borderRadius:15,
        marginLeft:10
    }


})