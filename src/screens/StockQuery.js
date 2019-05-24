import React, { Component } from 'react';
import { View, Text, StyleSheet,ActivityIndicator, FlatList } from 'react-native';
import {Container, Left, Body, Right, Title, Header, Button, Icon, ListItem, Content,Item, Input} from 'native-base';

import BpkSpinner from 'react-native-bpk-component-spinner';

import { connect } from 'react-redux';
import { stockFetch} from '../actions';

class StockQuery extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, text: '' , stock: [] };
        this.arrayholder = [];
    }

    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header searchBar rounded style={{backgroundColor: '#003f52'}}>
                <Left>
                    <Button icon transparent onPress={() => navigation.navigate('Home')} >
                        <Icon name="ios-arrow-back" style={{ fontSize: 30 }} />
                    </Button>
                </Left>
                <Body>
                <Title>Stok Sorgu</Title>
                </Body>
                <Right>
                    <Button icon transparent onPress={() => navigation.navigate('CarCreate')} >
                        <Icon name="ios-add" style={{ fontSize: 30 }} />
                    </Button>
                </Right>
            </Header>
        ),
    });

    componentWillMount() {
        this.props.stockFetch();
        console.log("Stock"+this.state.stock);
    }

    componentWillReceiveProps(nextProps) {
        const stock = nextProps.stock;
        this.setState(
            {
                isLoading: false,
                stock: stock
            },
            function() {
                this.arrayholder = stock;
            }
        );
    }

    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function(item) {
            //applying filter for the inserted text in search bar
            const itemData = item.STOK_ADI ? item.STOK_ADI.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            stock: newData,
            text: text,
        });
    }

    ListViewItemSeparator = () => {
        //Item sparator view
        return (
            <View
                style={{
                    height: 0.3,
                    width: '90%',
                    backgroundColor: '#080808',
                }}
            />
        );
    };

    render() {
        if (this.state.isLoading) {
            //Loading View while data is loading
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <Container>
                <Content>
                    <Item rounded style={{margin:5}}>

                        <Input
                            placeholder='Arama'
                            style={styles.textInputStyle}
                            onChangeText={text => this.SearchFilterFunction(text)}
                            value={this.state.text}
                            underlineColorAndroid="transparent"
                        />
                    </Item>
                    {this.props.loading ?
                        <BpkSpinner type="dark" />
                        :
                    <FlatList
                        data={this.state.stock}
                        renderItem={({ item }) => (

                            <ListItem icon>

                                <Body>
                                <Text style={styles.textStyle}>{item.STOK_KODU + ' ' + item.STOK_ADI}</Text>
                                </Body>
                                <Right>
                                    <Button transparent onPress={() => this.props.navigation.navigate('StockResult', { stok: item })} >
                                        <Icon name='chevron-circle-right' type='FontAwesome' style={{ color:'#003f52', fontSize: 30 }} />
                                    </Button>
                                </Right>
                            </ListItem>
                        )}
                        enableEmptySections={true}
                        style={{ marginTop: 10 }}
                       keyExtractor={(item) => item.STOK_KODU} />
                    }
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 40,
        padding: 16,
    },
    textStyle: {
        padding: 10,
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
    },
});
const mapStateToProps = (state) => {
    const { stock, loading } = state.stockState;

    return { stock, loading };
};


export default connect(mapStateToProps, { stockFetch })(StockQuery);
