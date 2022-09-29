### Dappy default website

Website that is displayed by default when a domain name is purchased

Generate a wildcard certificate

```
openssl req \
  -x509 \
  -newkey rsa:2048 \
  -sha256 \
  -days 3000 \
  -nodes \
  -keyout wildcard.key \
  -out wildcard.crt \
  -outform PEM \
  -subj '/CN=default.dappy.d'\
  -extensions san \
  -config <( \
    echo '[req]'; \
    echo 'distinguished_name=req'; \
    echo '[san]'; \
    echo 'subjectAltName=DNS.1:localhost,DNS.2:default.dappy.d,DNS.2:default.dappy.gamma')
```

utf8 -> base64

```
```