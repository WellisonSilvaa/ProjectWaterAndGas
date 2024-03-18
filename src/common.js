import { Alert, Platform } from 'react-native'

// const server = 'http://192.168.10.7:3000'
const server = 'http://192.168.0.103:3000'

function showError(err) {
    if(err.response && err.response.data) {
        Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err.response.data}`)
        console.log(err.response.data)
    } else {
        Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err}`)
        console.log(err)
    }
}

function showSuccess(msg) {
    Alert.alert('Sucesso!', msg)
    console.log('Persistencia concluida')
}

export { server, showError, showSuccess }