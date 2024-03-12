import React, { Component } from 'react'
import {
    ImageBackground,
    Text,
    StyleSheet,
    View,
    TextInput,
    Pressable,
    Platform,
    Alert
} from 'react-native'

import axios from 'axios';

import Icon from "react-native-vector-icons/FontAwesome";

import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import { server, showError, showSuccess } from '../common';

const initialState = {
    name: '',
    email: 'wonsilva100@gmail.com',
    password: '123456',
    confirmPassword: '',
    stageNew: false,
    showPassword: true,
    showConfirmPassword: true
}

export default class Auth extends Component {

    state = {
        ...initialState
    }

    signinOrSignup = () => {
        if (this.state.stageNew) {
            this.signup()
        } else {
            this.signin()
        }
    }

    signup = async () => {
        try {
            console.log('fase 1')
            console.log(
                'Name = ', this.state.name,
                'email: ', this.state.email,
                'password: ', this.state.password,
                'confirmPassword: ', this.state.confirmPassword,
                'Server = ', server
            )

            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            })
            console.log('Persistencia concluida')
            showSuccess('Usuário cadastrado')
            this.setState({ ...initialState })
        } catch (e) {
            showError(e)
        }
    }

    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            })

            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            this.props.navigation.navigate('Home')
        } catch (e) {
            showError(e)
        }
    }

    render() {

        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)

        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.confirmPasswordpassword === this.state.password)
        }

        const validForm = validations.reduce((t, a) => t && a)

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
                    <Text style={styles.subtitle}>
                        {
                            this.state.stageNew
                                ? 'Crie sua conta'
                                : 'Informe seus dados'
                        }
                    </Text>
                    {
                        this.state.stageNew &&
                        <TextInput
                            placeholder='Nome'
                            value={this.state.name}
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
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Senha'
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                            secureTextEntry={this.state.showPassword}
                            style={styles.inputPassword}
                        />
                        <Pressable
                            style={{
                                width: '10%',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                marginHorizontal: 'auto',
                                borderTopEndRadius: 25,
                                borderBottomEndRadius: 25
                            }}
                            onPress={() => this.setState({ showPassword: !this.state.showPassword })}
                        >
                            <Icon
                                name={this.state.showPassword
                                    ? 'eye-slash'
                                    : 'eye'
                                }
                                size={25}
                                color='black'
                            />
                        </Pressable>
                    </View>
                    {
                        this.state.stageNew &&
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder='Confirmar senhar'
                                value={this.state.confirmPassword}
                                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                secureTextEntry={this.state.showConfirmPassword}
                                style={styles.inputPassword}
                            />
                            <Pressable
                                style={{
                                    width: '10%',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    marginHorizontal: 'auto',
                                    borderTopEndRadius: 25,
                                    borderBottomEndRadius: 25
                                }}
                                onPress={() => this.setState({ showConfirmPassword: !this.state.showConfirmPassword })}
                            >
                                <Icon
                                    name={this.state.showConfirmPassword
                                        ? 'eye-slash'
                                        : 'eye'
                                    }
                                    size={25}
                                    color='black'
                                />
                            </Pressable>
                        </View>
                    }
                    {/* Botao Entrar ou Cadastrar */}
                    <Pressable
                        onPress={this.signinOrSignup}
                        disabled={!validForm}
                    >
                        <View style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' }]}>
                            <Text
                                style={styles.buttonText}
                            >
                                {
                                    this.state.stageNew
                                        ? 'Cadastrar'
                                        : 'Entrar'
                                }
                            </Text>
                        </View>
                    </Pressable>
                </View>
                {/* Botao que alterna o formulario, signin or signup */}
                <Pressable
                    style={styles.buttonSignup}
                    onPress={() => {
                        this.setState({ stageNew: !this.state.stageNew })
                    }}
                >
                    <Text style={styles.buttonText}>
                        {
                            this.state.stageNew
                                ? 'Login'
                                : 'Cadastrar'
                        }
                    </Text>
                </Pressable>
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
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        textAlign: 'center',
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
        borderRadius: 25,
        paddingLeft: 20,
        width: '100%',
        height: 40
    },
    inputPassword: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingLeft: 20,
        width: '100%',
        height: 40
    },
    button: {
        width: '100%',
        backgroundColor: commonStyles.colors.blueButtons,
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
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
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        marginTop: 10,
        borderRadius: 25,
        height: 40
    },
})