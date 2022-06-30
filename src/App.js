import Reat, {useState, useEffect} from 'react';
import {View, StyleSheet,Image, TouchableOpacity, Alert} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
    const [toggle, setToggle] = useState(false);

    const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

    useEffect (() => {
    // liga a lanterna do celular
    Torch.switchState(toggle); 
}, [toggle]);

    useEffect(() => {
        //quando o celular for chacoalahado, rodaremos o toggle
        const subscription = RNShake.addListener(() => {
            setToggle(oldToggle => !oldToggle);
        });
        //essa função vai ser chamada quando o componente for desmontado
        return() => subscription.remove();
    },[]);
    
    return (
        <View style = {toggle ? style.containerLight : style.container}>
            <TouchableOpacity
            onPress = {handleChangeToggle}>
                <Image
                style={toggle ? style.lightingOn : style.lightingOff}
                source = {
                    toggle
                    ? require ('eco-light.png')
                    : require ('eco-light-off.png')
                }/>

                <Image
                style= {style.dialogo}
                source = {
                    toggle
                    ? require ('logo.dio.png')
                    : require ('logo-dio-white.png')
                }/>

                </TouchableOpacity>
        </View>
    );
};

export default App;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerLight: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lightingOn: {
        resizeMode: 'contain',
        alignSelf: 'center',
        width: 150,
        height: 150,
    },
    lightingOff: {
        resizeMode: 'contain',
        alignSelf: 'center',
        width: 150,
        height: 150,
    },
});

