# ZPL Node Server

Servicio para imprimir etiquetas ZPL basdo en node.

## Como funciona

Las impresoras de tipo ZPL no reciben comandos directamente desde el navegador.Por esto generamos un servidor local que recibe vía peticion http la data a imprimir, la procesa y ejecuta el comando `print`

## Como usar

1. `yarn` (o `npm i`)
2. `yarn build` (o `npm run build`)
3. `yarn start` (o `npm start`)
4. Listo! Tendremos nuestro servicio corriendo.

Ejemplo:
Enviar a la ruta de impresion `/print`

```json
{
  "printData": "FA\n50\n91\n41"
}
```

La api se ocupa mediante diferentes funciones de tomar `printData: "FA\n50\n91\n41"` y transformarla para que se muestre en:

1. Texto: `FA-50-91-40`
2. Los codigos QR y barcode128 por otro lado imprimiran

```
FA
50
91
40
```

> Es importante utilizar como separador `\n` para que estas funciones se ejecuten correctamente

## TODO

- Generar ruta para recibir archivo zpl e impirmirlo.
- Generar ejecutable para evitar el uso de consola de comandos en local
- Testear en Windows
- Modificar mensajes de estado para mejorra el UX en front.
