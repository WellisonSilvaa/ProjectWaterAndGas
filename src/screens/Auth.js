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
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        stageNew: true,
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
                    Déposito
                </Text>
                <Text
                    style={styles.title}
                >
                    Água e Gás
                </Text>
                <View style={styles.formContainer}>
                    {
                        this.state.stageNew &&
                        <TextInput
                        placeholder='Nome'
                        value={this.state.namel}
                        onChangeText={name => this.setState({ name })}
                        style={styles.input}
                    />
                    }
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
                    {
                        this.state.stageNew &&
                        <TextInput
                        placeholder='Confirmar senha'
                        value={this.state.confirmPassword}
                        onChangeText={confirmPassword => this.setState({ confirmPassword })}
                        secureTextEntry={true}
                        style={styles.input}
                    />
                    }
                    <Pressable
                        onPress={() => {
                            console.log('teste')
                        }}
                    >
                        <View style={styles.button}>
                            <Text
                                style={styles.buttonText}
                            >
                                Entrar
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable
                        style={styles.buttonSignup}
                        onPress={() => {
                            console.log('Cadastro')
                        }}
                    >
                        <Text style={styles.buttonText}>Cadastrar</Text>
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
        backgroundColor: 'rgba(0,0,0, 0.4)',
        padding: 20,
        width: '90%',
        borderRadius: 25

    },
    input: {
        marginTop: 10,
        backgroundColor: '#fff',
        padding: Platform.OS === 'ios' ? 15 : 10,
        borderRadius: 25,
        paddingLeft: 20
    },
    button: {
        backgroundColor: commonStyles.colors.blueButtons,
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 25,
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20
    },
    buttonSignup: {
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
    }
})