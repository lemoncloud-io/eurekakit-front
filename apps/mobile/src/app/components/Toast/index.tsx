import React from 'react';
import Toast, { BaseToast } from 'react-native-toast-message';

import { AppColors } from '../../theme';

export const toastConfig = {
    eureka: props => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: AppColors.main }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{ fontSize: 14 }}
            text2Style={{ fontSize: 13 }}
            onTrailingIconPress={() => Toast.hide()}
        />
    ),
    warning: props => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#B00020' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{ fontSize: 14 }}
            text2Style={{ fontSize: 13 }}
            onTrailingIconPress={() => Toast.hide()}
        />
    ),
};

export default Toast;
