import { Platform } from 'react-native';

import { ENV, PROJECT } from '../../envs/env.json';

export const EUREKA_DEVICE_ID = `@EUREKA_DEVICE_ID_${ENV.toUpperCase()}`;
export const EUREKA_DEVICE_TOKEN = `@EUREKA_DEVICE_TOKEN_${ENV.toUpperCase()}`;
export const EUREKA_DEVICE_INFO = `@EUREKA_DEVICE_INFO_${ENV.toUpperCase()}`;
export const REDIRECT_URL = `@EUREKA_REDIRECT_URL_${ENV.toUpperCase()}`;
export const REDIRECT_URL_EXTRA_DATA = `@EUREKA_REDIRECT_URL_EXTRA_DATA_${ENV.toUpperCase()}`;
export const HAS_LAUNCHED = `@EUREKA_HAS_LAUNCHED_${ENV.toUpperCase()}`;
export const EUREKA_BASE_URL = `@EUREKA_BASE_URL_${ENV.toUpperCase()}`;
export const USER_PROFILE = `@EUREKA_USER_PROFILE_${ENV.toUpperCase()}`;
export const EUREKA_OAUTH_TOKEN = `@EUREKA_EUREKA_OAUTH_TOKEN_${ENV.toUpperCase()}`;
export const EUREKA_LANGUAGE = `@EUREKA_LANGUAGE_${ENV.toUpperCase()}`;

export const syncLocalStorageJS = `
    (function(window) {
      const originalSetItem = localStorage.setItem;
      const originalRemoveItem = localStorage.removeItem;
      const originalClear = localStorage.clear;

      localStorage.setItem = function(key, value) {
        originalSetItem.apply(this, arguments);
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'AutoSyncLocalStorage',
          data: {
            operation: 'set',
            key: key,
            value: value
          }
        }));
      };

      localStorage.removeItem = function(key) {
        originalRemoveItem.apply(this, arguments);
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'AutoSyncLocalStorage',
          data: {
            operation: 'remove',
            key: key
          }
        }));
      };

      localStorage.clear = function() {
        originalClear.apply(this);
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'AutoSyncLocalStorage',
          data: {
            operation: 'clear'
          }
        }));
      };
    })(window);
`;

export const historyStateWrapperJS = `
    (function(window) {
        function wrap(fn) {
            return function wrapper() {
                var res = fn.apply(this, arguments);
                window.ReactNativeWebView.postMessage('{"type":"NavigationStateChange","data":{}}');
                return res;
            }
        }
        history.pushState = wrap(history.pushState);
        history.replaceState = wrap(history.replaceState);
        window.addEventListener('popstate', function() {
            window.ReactNativeWebView.postMessage('{"type":"NavigationStateChange","data":{}}');
        });
    })(window);
    true;
`;

export const DEFAULT_DEVICE_INFO = `
    (function(window) {
        window.EUREKA_APP_PLATFORM = '${Platform.OS === 'android' ? 'android' : 'ios'}';
        window.EUREKA_APP_APPLICATION = '${PROJECT}';
        window.EUREKA_APP_STAGE = '${ENV === 'prod' ? 'prod' : 'dev'}';
        window.EUREKA_APP_DEVICE_TOKEN = '';
        window.EUREKA_APP_DEVICE_ID = '';
        window.EUREKA_APP_CURRENT_VERSION = '';
        window.EUREKA_APP_LATEST_VERSION = '';
        window.EUREKA_APP_SHOULD_UPDATE = false;
        window.EUREKA_APP_USER_AGENT = '';
        // App Information
        window.EUREKA_APP_VERSION = '';
        window.EUREKA_APP_BUILD_NUMBER = '';
        window.EUREKA_APP_BUNDLE_ID = '';
        window.EUREKA_APP_UNIQUE_ID = '';
        window.EUREKA_APP_DEVICE_MODEL = '';
        window.EUREKA_APP_DEVICE_BRAND = '';
        window.EUREKA_APP_SYSTEM_NAME = '';
        window.EUREKA_APP_SYSTEM_VERSION = '';
        window.EUREKA_APP_DEVICE_TYPE = '';
    })(window);
`;
