import React, {Component} from 'react';
import {
    StyleSheet,
    DeviceEventEmitter,
} from 'react-native';
import {
    Scene,
    Router,
    Modal,
    Drawer,
} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerMenu from '../components/DrawerMenu';
import Collection from '../components/Collection';
import Message from '../components/Message';
import Setting from '../components/Setting';

import Home from '../components/Home';
import News from '../components/News';
import Detail from '../components/Detail';


const keys = ['News', 'Collection', 'Message', 'Setting', 'Detail'];
const titles = ['新闻', '收藏', '消息', '设置', ''];
const components = [News, Collection, Message, Setting, Detail];

export default class BTRouter extends Component {
    render() {
        return (
            <Router style={styles.container}>
                <Modal>
                    <Drawer
                        key={'drawer'}
                        contentComponent={DrawerMenu}
                        drawerPosition={'left'}
                        drawerWidth={200}
                        drawerIcon={<Icon name={'format-list-bulleted'} size={30} color={'white'}/>}
                        hideNavBar
                    >
                        <Scene key='Home'
                               title='热门'
                               component={Home}
                               navigationBarStyle={{backgroundColor: 'rgb(69,199,251)'}}
                               titleStyle={{color: 'white'}}
                               // navTransparent={true}
                               hideNavBar
                        />
                    </Drawer>
                    {
                        keys.map((value, index) => {
                            return (
                                <Scene
                                    key={value}
                                    title={titles[index]}
                                    component={components[index]}
                                    gesturesEnabled={true}
                                    navigationBarStyle={{backgroundColor: 'rgb(69,199,251)'}}
                                    titleStyle={{color: 'white'}}
                                    backButtonTintColor={'red'}
                                />
                            )
                        })
                    }
                </Modal>
            </Router>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});