# EurekaPage

## Android

### Create key

```shell
$ sudo keytool -genkey -v -keystore eurekapage.keystore -alias eurekapage -keyalg RSA -keysize 2048 -validity 10000
```

-   Keystore password: eurekapage
-   alias: eurekapage

## Key Hash

### Play store(앱 서명키)

##### 스토어 서명키는 구글에서 직접 생성하기 때문에, 구글 콘솔에서 테스트 및 출시 => 설정 => 앱서명 에서 가져와야한다.

-   TODO: add key

-   SHA1: `TODO: add key`
-   SHA256: `TODO: add key`

```shell
❯ echo "TODO: add key" | xxd -r -p | openssl base64

```

### Release

-   qjaVdMWyOMMCqqKlQAHd2xpIRyU=

```
❯ keytool -exportcert -alias eurekapage -keystore eurekapage.keystore | openssl sha1 -binary | openssl base64
Enter keystore password:  eurekapage
Jsy5r9dhap87HSSdClTY3kgifqE=
```

-   SHA1: 26:CC:B9:AF:D7:61:6A:9F:3B:1D:24:9D:0A:54:D8:DE:48:22:7E:A1
-   SHA256: B6:16:E8:FB:64:2D:20:D5:B9:5A:0E:83:33:D7:85:15:46:70:E7:E5:39:37:64:33:63:30:57:30:B7:27:69:3F

```
❯ keytool -list -v -alias eurekapage -keystore eurekapage.keystore
Enter keystore password:  eurekapage
```

### Debug

-   Xo8WBi6jzSxKDVR4drqm84yr9iU=

```bash
❯ keytool -exportcert -alias androiddebugkey -keystore ./app/debug.keystore | openssl sha1 -binary | openssl base64
Enter keystore password:  android

Warning:
The JKS keystore uses a proprietary format. It is recommended to migrate to PKCS12 which is an industry standard format using "keytool -importkeystore -srckeystore ./app/debug.keystore -destkeystore ./app/debug.keystore -deststoretype pkcs12".
Xo8WBi6jzSxKDVR4drqm84yr9iU=
```

-   SHA1: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
-   SHA256: FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C

```bash
$  keytool -list -v -alias androiddebugkey -keystore ./app/debug.keystore
Enter keystore password:  android
```
