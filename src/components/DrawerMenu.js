/**
 * Created by leezhihua on 2018/7/9
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
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BTButton from "../Commons/BTButton";


const titles = ['收藏','消息','设置'];
const images = ['star-outline','bell-outline','settings-outline'];

export default class DrawerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu:[],
        };
    }

    componentDidMount() {
        BTStorage.load('menu',(data,error)=>{
            if (data) {
                this.setState({menu:data})
            } else {
                console.log('加载数据错误'+ error);
            }
        })
    }
    //自定义分割线
    renderSeparator = () => (
        <View style={{ height:1, backgroundColor:'white',opacity:0.3}}>{}</View>
    );
    //item
    renderItem = ({item,index}) => {
        let img = item.thumbnail?item.thumbnail.replace('http','https'):'http://';
        return (
            <TouchableOpacity onPress={()=>{
                if (index === 0) {
                    BTRouter.Home();
                } else {
                    BTRouter.News({id:item.id,title:item.name})
                }
            }}>
                <View style={styles.item}>
                    <Image
                        style={styles.itemImg}
                        resizeMode={'contain'}
                        source={{uri:img}}
                        defaultSource={require('../img/menu.png')}
                    />
                    <Text style={styles.itemTxt}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    {
                        titles.map((value, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.top}
                                    onPress={()=>{
                                        switch (index) {
                                            case 0:
                                                BTRouter.Collection();
                                                break;
                                            case 1:
                                                BTRouter.Message();
                                                break;
                                            case 2:
                                                BTRouter.Setting();
                                                break;
                                        }
                                    }}
                                >
                                    <Icon name={images[index]} size={20} color={'white'}/>
                                    <Text style={{fontSize:13,color:'white'}}>{value}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View style={styles.line}>{}</View>
                <FlatList
                    data={this.state.menu}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) =>index.toString()}
                    getItemLayout={(item, index) =>({length: 50, offset: (50 + 1) * index, index })}
                    ItemSeparatorComponent={this.renderSeparator}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(35,42,50)',
        paddingTop:30,
    },
    top: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    line: {
        height:5,
        backgroundColor:'white',
        opacity:0.3,
        marginTop:20,
    },
    item: {
        flexDirection:'row',
        alignItems:'center',
    },
    itemImg: {
        width:30,
        height:30,
        margin:10,
        borderRadius:15,
    },
    itemTxt: {
        fontSize:15,
        color:'#fff',
    }

})