/**
 * Created by leezhihua on 2018/7/9
 * @flow
 * */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BTCarousel from '../Commons/BTCarousel';

const banners = [
    'https://pic3.zhimg.com/v2-0b35811a052f485d598ca0f722c6745a.jpg',
    'https://pic1.zhimg.com/v2-725c7a00c4287acc8c7952d8b1411e18.jpg',
    'https://pic2.zhimg.com/v2-d73c675f25c8a892f8d74c09cd93dab9.jpg',
    'https://pic1.zhimg.com/v2-95ad6126453bf39fecbd28b5dcb59c24.jpg',
    'https://pic2.zhimg.com/v2-3384c680807f776bf760516c0232dae5.jpg',
    'https://pic1.zhimg.com/v2-1ad9073ccf7034cb57943c5b4d00fd58.jpg'
];
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            loading: true,
            refreshing: false,
        };
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData = ()=> {
        let url = 'https://news-at.zhihu.com/api/3/news/hot';
        console.log(url);
        BTFetch.fetchGET(url)
            .then(res=>{
                this.setState({data:res.recent,loading:false,refreshing:false});
            })
            .catch(err=>{
                console.log('热门请求失败'+err);
            })
    };
    //下拉刷新
    refreshData = ()=> {
        this.setState({refreshing:true})
        this.fetchData();
    };
    //自定义分割线
    renderSeparator = () => (
        <View style={{ height:1, backgroundColor:'gray',opacity:0.3}}>{}</View>
    );
    //item
    renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={()=>BTRouter.Detail({url:item.url})}>
                <View style={styles.item}>
                    <Image
                        style={styles.itemImg}
                        resizeMode={'contain'}
                        source={{uri:item.thumbnail}}
                        defaultSource={require('../img/menu.png')}
                    />
                    <Text style={styles.itemTxt}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    };
    //header
    renderListHeader = ()=> {
        return (
            <BTCarousel
                imageData={banners}
                swiperHeight={200}
            />
        )
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View ref={(e) => this.refNav = e} style={styles.nav}>
                    <TouchableOpacity style={styles.navMenu} onPress={()=>BTRouter.drawerOpen()}>
                        <Icon name={'format-list-bulleted'} size={30} color={'white'}/>
                    </TouchableOpacity>
                    <Text style={styles.navTitle}>首页</Text>
                </View>
                {this.state.loading
                    ? <ActivityIndicator size={'large'} color={'rgb(69,199,251)'} style={{marginTop:100}}/>
                    : <FlatList
                        data={this.state.data}
                        refreshing={this.state.refreshing}
                        onRefresh={this.refreshData}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) =>index.toString()}
                        getItemLayout={(item, index) =>({length: 100, offset: (100 + 1) * index, index })}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListHeaderComponent={this.renderListHeader}
                        renderItem={this.renderItem}
                        onScroll={(e)=>{
                            let contentOffsetY = e.nativeEvent.contentOffset.y;
                            console.log(contentOffsetY);
                            let a = 0;
                            if (contentOffsetY < 100) {
                                a = contentOffsetY * 0.01;
                            } else {
                                a = 1;
                            }
                            this.refNav.setNativeProps({
                                backgroundColor:`rgba(69,199,251,${a})`
                            })

                        }}
                        
                    />
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    nav: {
        backgroundColor: 'rgba(69,199,251,0)',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 64,
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 2
    },
    navMenu: {
        flex:1,
        marginLeft:20,
        marginTop:20,
    },
    navTitle: {
        flex:1.5,
        marginTop:20,
        fontSize:20,
        fontWeight:'bold',
        color:'#fff',
    },
    item: {
        flexDirection:'row',
        margin:10,
    },
    itemImg: {
        width:80,
        height:80,
    },
    itemTxt: {
        flex:2,
        fontSize:15,
        color:'black',
        marginLeft:10,
        letterSpacing:1,
        lineHeight:25,
    }

})