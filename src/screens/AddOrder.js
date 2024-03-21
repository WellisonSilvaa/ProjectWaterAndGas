import React, { Component } from 'react'
import { Modal, View, StyleSheet, Pressable, Text, TextInput } from 'react-native'
import commonStyles from '../commonStyles'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';


import Icon from "react-native-vector-icons/FontAwesome";
import IconIonic from "react-native-vector-icons/Ionicons"

const initialState = {
    showFormPayment: false,
    client: '',
    product: 'Galão 20L',
    product2: '',
    quantity: '',
    quantity2: '',
    orderTime: new Date(),
    formPayment: 'Dinheiro',
    change: '',
    creditOrDebit: 'Crédito',
    customerAddress: '',
    moreRequests: false,
    additionalInfo: ''
}


export default class addOrder extends Component {

    state = {
        ...initialState
    }

    verifyOrder = () => {
        if (this.props.order) {
            const order = this.props.order
            this.setState({ initialState: order })
        }
    }

    save = () => {
        const newOrder = {
            ...this.state
        }

        this.props.onSave && this.props.onSave(newOrder)
        this.setState({ ...initialState })
    }

    changeState = () => {
        // console.log("Dinheiro = " + this.state.showFormPayment)
        if (this.state.formPayment != 'Pix') {
            this.setState({ showFormPayment: !this.state.showFormPayment })
        }
        // console.log(" " + this.state.showFormPayment)
    }



    moreRequestsState = () => {
        this.setState({ moreRequests: !this.state.moreRequests }, () => {
            if (this.state.moreRequests == false) {
                this.resetValues();
            } else {
                this.setState({ product2: 'Gás' })
            }
        });
    }

    resetValues() {
        this.setState({ product2: '', quantity2: '' });
    }

    paymentPix = () => {
        if (this.state.formPayment == 'Pix') {
            this.setState({ creditOrDebit: '' })
        }
    }

    render() {


        return (
            <Modal
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'
            >
                <Pressable
                    style={styles.background}
                    onPress={this.props.onCancelOutModal}
                >
                    <View
                        // onPress={this.props.onCancel}
                        style={styles.modalView}
                    >
                        <Text style={styles.header}>Novo Pedido</Text>
                        <View style={styles.ModalContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder='Nome do Cliente'
                                onChangeText={client => this.setState({ client })}
                                value={this.state.client}
                            />
                            <View style={styles.modalItens}>
                                <TextInput
                                    style={[styles.input, styles.inputQuant]}
                                    placeholder='Quantidade'
                                    onChangeText={quantity => this.setState({ quantity })}
                                    value={this.state.quantity}
                                    keyboardType='numeric'
                                />
                                <RadioButton.Group 
                                    onValueChange={product => this.setState(product)} 
                                    value={this.state.product}>
                                    <View>
                                        <Text>First</Text>
                                        <RadioButton value="first" />
                                    </View>
                                    <View>
                                        <Text>Second</Text>
                                        <RadioButton value="second" />
                                    </View>
                                </RadioButton.Group>
                                {/* <Picker
                                    style={styles.inputPicker}
                                    selectedValue={this.state.product}
                                    onValueChange={product => this.setState({ product })}
                                >
                                    <Picker.Item label='Galão 20L' value='Galão 20L' />
                                    <Picker.Item label='Gás' value='Gás' />
                                    <Picker.Item label='Água c/ gás 510ml' value='Água c/ gás 510ml' />
                                    <Picker.Item label='Água s/ gás 510ml' value='Água s/ gás 510ml' />
                                    <Picker.Item label='Água c/ gás 1L' value='Água c/ gás 1L' />
                                    <Picker.Item label='Água c/ gás 1L' value='Água s/ gás 1L' />
                                </Picker> */}
                                <Pressable
                                    style={{
                                        // backgroundColor: "red",
                                        width: '10%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onPress={() => this.moreRequestsState()}
                                >
                                    <IconIonic
                                        name={this.state.moreRequests == false
                                            ? 'add-outline'
                                            : 'remove-outline'
                                        }
                                        size={30}
                                        color={commonStyles.colors.blueButtons}
                                    />
                                </Pressable>
                            </View>
                            <View style={styles.modalItens}>
                                {
                                    this.state.moreRequests == true
                                        ?
                                        (<View style={styles.modalItens}>
                                            <TextInput
                                                style={[styles.input, styles.inputQuant]}
                                                placeholder='Quantidade'
                                                onChangeText={quantity2 => this.setState({ quantity2 })}
                                                value={this.state.quantity2}
                                                keyboardType='numeric'
                                            />
                                            <Picker
                                                style={styles.inputPicker}
                                                selectedValue={this.state.product2}
                                                onValueChange={product2 => this.setState({ product2 })}
                                            >
                                                <Picker.Item label='Gás' value='Gás' />
                                                <Picker.Item label='Galão 20L' value='Galão 20L' />
                                                <Picker.Item label='Água c/ gás 510ml' value='Água c/ gás 510ml' />
                                                <Picker.Item label='Água s/ gás 510ml' value='Água s/ gás 510ml' />
                                                <Picker.Item label='Água c/ gás 1L' value='Água c/ gás 1L' />
                                                <Picker.Item label='Água c/ gás 1L' value='Água s/ gás 1L' />
                                            </Picker>
                                        </View>)
                                        : (
                                            <View>
                                                {/* {this.resetValues()} */}
                                            </View>
                                        )
                                }
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder='Endereço do cliente'
                                onChangeText={customerAddress => this.setState({ customerAddress })}
                                value={this.state.customerAddress}
                            />
                            <View style={styles.modalItens}>
                                <Picker
                                    style={styles.inputPicker}
                                    onValueChange={formPayment => this.setState({ formPayment }, this.changeState())}
                                    selectedValue={this.state.formPayment}
                                >
                                    <Picker.Item label='Dinheiro' value='Dinheiro' />
                                    <Picker.Item label='Cartão' value='Cartão' />
                                    <Picker.Item label='Pix' value='Pix' />
                                </Picker>
                                <View style={{
                                    // backgroundColor: 'red',
                                    width: '50%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    {this.state.formPayment === 'Cartão'
                                        ? (
                                            <Picker
                                                style={styles.inputPickerChange}
                                                selectedValue={this.state.creditOrDebit}
                                                onValueChange={creditOrDebit => this.setState({ creditOrDebit })}
                                            >
                                                <Picker.Item label='Crédito' value='credito' />
                                                <Picker.Item label='Débito' value='debito' />
                                            </Picker>
                                        )

                                        : (
                                            this.state.formPayment === 'Dinheiro'
                                                ? (
                                                    <TextInput
                                                        style={styles.inputChange}
                                                        placeholder='Troco'
                                                        onChangeText={change => this.setState({ change })}
                                                        value={this.state.change}
                                                        keyboardType='numeric'
                                                    />
                                                )
                                                : (
                                                    this.state.formPayment === 'Pix'
                                                        ? (
                                                            <View></View>
                                                        )
                                                        : null
                                                )
                                        )
                                    }
                                </View>
                            </View>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder='informacões adicionais'
                                    onChangeText={additionalInfo => this.setState({ additionalInfo })}
                                    value={this.state.additionalInfo}
                                />
                            </View>
                            {/* <GooglePlacesAutocomplete
                                placeholder="Pesquisar endereço"
                                onPress={(data, details = null) => {
                                // 'details' contém informações adicionais sobre o local selecionado
                                console.log(data, details);
                                }}
                                query={{
                                    key: 'SUA_CHAVE_DA_API_DO_GOOGLE',
                                    language: 'pt', // Defina o idioma desejado
                                }}
                                nearbyPlacesAPI="GooglePlacesSearch"
                                debounce={400} // Controla atrasos na pesquisa para evitar chamadas excessivas à API
                                styles={{
                                    container: {
                                        flex: 0,
                                    },
                                    textInputContainer: {
                                        width: '100%',
                                    },
                                    description: {
                                        fontWeight: 'bold',
                                    },
                                    predefinedPlacesDescription: {
                                        color: '#1faadb',
                                    },
                                }}
                            /> */}
                            <View style={styles.buttons}>
                                <Pressable
                                    onPress={this.props.onCancel}
                                >
                                    <Text style={styles.button}>Cancelar</Text>
                                </Pressable>
                                <Pressable
                                    onPress={this.save}
                                >
                                    <Text style={styles.button}>Salvar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        )
    }
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        // padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    ModalContainer: {
        width: '100%',
        paddingLeft: 15,
        // alignItems: 'center'
    },
    header: {
        width: '100%',
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.blueButtons,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    input: {
        height: 40,
        borderBottomWidth: 1, // Adiciona a linha na parte inferior
        borderColor: 'gray',
        margin: 15, // Adicione espaço abaixo do input se necessário
        paddingHorizontal: 10,
        width: '90%'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.blueButtons
    },
    modalItens: {
        flexDirection: 'row',
        width: '100%'
    },
    inputProd: {
        width: '64%'
    },
    inputQuant: {
        width: '20%'
    },
    inputPicker: {
        width: '40%',
        borderColor: "black",
        borderWidth: 5
    },
    inputPickerChange: {
        width: '50%',
    },
    inputChange: {
        height: 40,
        borderBottomWidth: 1, // Adiciona a linha na parte inferior
        borderColor: 'gray',
        margin: 15, // Adicione espaço abaixo do input se necessário
        paddingHorizontal: 10,
        width: '70%'
    }
})