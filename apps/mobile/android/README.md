# EurekaKit

## Android

### Create key

```shell
$ sudo keytool -genkey -v -keystore eurekakit.keystore -alias eurekakit -keyalg RSA -keysize 2048 -validity 10000
```

- Keystore password: eurekakit
- alias: eurekakit

## Key Hash

### Play store(앱 서명키)

##### 스토어 서명키는 구글에서 직접 생성하기 때문에, 구글 콘솔에서 테스트 및 출시 => 설정 => 앱서명 에서 가져와야한다.

- TODO: add key

- SHA1: `TODO: add key`
- SHA256: `TODO: add key`

```shell
❯ echo "TODO: add key" | xxd -r -p | openssl base64

```

### Release

- 3oWiJOM+uYDpyGQtfrRArVQWo7g=

```
❯ keytool -exportcert -alias eurekakit -keystore eurekakit.keystore | openssl sha1 -binary | openssl base64
Enter keystore password:  eurekakit
3oWiJOM+uYDpyGQtfrRArVQWo7g=
```

- SHA1: DE:85:A2:24:E3:3E:B9:80:E9:C8:64:2D:7E:B4:40:AD:54:16:A3:B8
- SHA256: 46:9D:67:F4:B0:67:72:B6:8B:D0:E6:4A:7F:CF:CD:81:E4:E9:89:33:AF:2E:97:03:D9:70:33:6B:FE:85:F4:FE

```
❯ keytool -list -v -alias eurekakit -keystore eurekakit.keystore
Enter keystore password:  eurekakit
```

### Debug

- Xo8WBi6jzSxKDVR4drqm84yr9iU=

```bash
❯ keytool -exportcert -alias androiddebugkey -keystore ./app/debug.keystore | openssl sha1 -binary | openssl base64
Enter keystore password:  android

Warning:
The JKS keystore uses a proprietary format. It is recommended to migrate to PKCS12 which is an industry standard format using "keytool -importkeystore -srckeystore ./app/debug.keystore -destkeystore ./app/debug.keystore -deststoretype pkcs12".
Xo8WBi6jzSxKDVR4drqm84yr9iU=
```

- SHA1: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
- SHA256: FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C

```bash
$  keytool -list -v -alias androiddebugkey -keystore ./app/debug.keystore
Enter keystore password:  android
```
