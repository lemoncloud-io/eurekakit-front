import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import { AppColors } from '../../theme';

const Button = ({ children, ...props }) => (
    <TouchableOpacity style={styles.button} {...props}>
        <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
);

const NoInternetModal = ({ show, onClose }) => {
    const { t } = useTranslation();

    const renderModal = () => {
        return (
            <Modal isVisible={show} style={styles.modal} animationInTiming={600}>
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>{t('error.network.title')}</Text>
                        <Text style={styles.modalText}>{t('error.network.message')}</Text>
                        <Button onPress={onClose} style={styles.retryButton}>
                            {t('common.retry')}
                        </Button>
                    </View>
                </View>
            </Modal>
        );
    };
    return renderModal();
};

const styles = StyleSheet.create({
    retryButton: {
        backgroundColor: AppColors.main,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 40,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    modalText: {
        color: '#555',
        marginVertical: 10,
        textAlign: 'center',
    },
    button: {
        backgroundColor: AppColors.main,
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: AppColors.white,
        fontSize: 14,
    },
});

export default NoInternetModal;
