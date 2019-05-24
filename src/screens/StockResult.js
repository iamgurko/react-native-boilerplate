import React, { Component } from 'react';
import { Text, StyleSheet,List, ActivityIndicator,Platform, FlatList } from 'react-native';
import {
    Container,
    Content,
    Left,
    Body,
    Right,
    Title,
    Header,
    Button,
    Icon,
    ListItem, Spinner,
} from 'native-base';
import { connect } from 'react-redux';
import { stockQueryFetch,stockFetch} from '../actions';
import colors from "../styles/colors";


class StockResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            STOK_KODU: this.props.navigation.getParam('stok').STOK_KODU,
            stocks:[]
        }
    }

    componentWillMount() {
        this.props.stockQueryFetch(this.state.STOK_KODU);
    }
    componentWillReceiveProps(nextProps) {
        const stocks = nextProps.stocks;
        this.setState(
            {
                isLoading: false,
                stocks: stocks
            });
        console.log("Stockss"+this.state.stocks);

    }


    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header style={{backgroundColor: '#003f52'}}>
                <Left>
                    <Button icon transparent onPress={() => navigation.navigate('StockQuery')} >
                        <Icon name="ios-arrow-back" style={{ fontSize: 30 }} />
                    </Button>
                </Left>
                <Body>
                <Title>Stok Sorgu</Title>
                </Body>
                <Right>
                    <Button icon transparent onPress={() => navigation.navigate('Home')} >
                        <Icon name="ios-home" style={{ fontSize: 30 }} />
                    </Button>
                </Right>
            </Header>
        ),
    });

    render() {
       return (
            <Container>
                <Content>
                    {this.props.loading ?
                        <Spinner color={colors.default}/>
                        :
                        <FlatList
                            data={this.state.stocks}
                            renderItem={({item}) => (
                                <ListItem icon>
                                    <Body>
                                        <Text style={styles.textStyle}>{item.DEPO_ISMI + ' ' + item.BAKIYE}</Text>
                                    </Body>
                                </ListItem>
                            )}
                            enableEmptySections={true}
                            style={{marginTop: 10}}
                            keyExtractor={(item) => item.DEPO_ISMI}
                        />
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
    const { stocks, loading } = state.stockState;

    return { stocks, loading };
};


export default connect(mapStateToProps, { stockFetch, stockQueryFetch })(StockResult);
