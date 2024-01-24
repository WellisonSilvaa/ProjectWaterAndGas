import React,{ Component } from 'react'
import { Modal, View, StyleSheet, Pressable, Text } from 'react-native'

export default  class addOrder extends Component {
    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'
            >
                <Pressable
                    onPress={this.props.onCancel}
                >
                    <View style={styles.background}>
                        <Text style={{
                            fontSize: 60,
                            color: 'black'
                        }}>Oláaaaaa</Text>
                    </View>
                </Pressable>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center'
    }
})