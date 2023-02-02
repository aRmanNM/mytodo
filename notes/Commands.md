### create key store and alias
```
keytool -genkey -v -keystore <store_name>.keystore   -alias <alias_name>   -keyalg RSA   -keysize 2048   -validity 10000 -keypass <alias_password>
```

### build command
```
ns build android --release --bundle --copy-to ../path/to/dist/app.apk --key-store-path /path/to/store.keystore --key-store-alias <alias_name> --key-store-password <store_password> --key-store-alias-password <alias_password>
```
