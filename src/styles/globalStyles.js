import { theme } from './theme';
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        gap: 10,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 70,
        justifyContent: "center",
    },
    button: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.primary,
        borderRadius: 100
    }
})