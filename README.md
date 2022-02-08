# s3 server
para cargar los datos primero cambie el nombre de .initial.env por .env y complete los datos por los datos de acceso a s3 configurado en aws IAM access (creado una politica y luego un usuario para usar dicha politicia). Luego de esto puede configurar un PORT en el .env.
ponga a funcionar la aplicacion
```bash
npm run dev
```

luego de esto puede mandar archivos por medio de un formulario multipart fomr data y pasarlos por un file input llamado file.
luego de esto obtendra una respusta con la informacion de carga del archivo.
en un futuro ampliare esta documentacion.