import React, { Component } from 'react'
import {
    ImageBackground,
    Text,
    StyleSheet,
    View,
    TextInput,
    Pressable,
    Platform
} from 'react-native'

import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'

export default class Auth extends Component {

    state = {
        email: '',
        password: ''
    }

    render() {
        return (
            <ImageBackground
                source={backgroundImage}
                style={styles.background}
            >
                <Text
                    style={styles.title}
                >
                    Déposito Água e Gás
                </Text>
                <View style={styles.formContainer}>
                    <TextInput
                        placeholder='E-mail'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Senha'
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        style={styles.input}
                    />
                    <Pressable>
                        <View style={styles.button}>
                            <Text
                                style={styles.buttonText}
                            >
                                Entrar
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0, 0.8)',
        padding: 20,
        width: '90%',

    },
    input: {
        marginTop: 10,
        backgroundColor: '#fff',
        padding: Platform.OS === 'ios' ? 15 : 10,
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: "#fff",
        fontSize: 20
    }
})