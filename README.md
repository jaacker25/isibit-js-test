# JS Developer - Test

## Prueba 1: Implementacion de VUE y manejo de API’s.

Isibit es una plataforma que ayuda a las empresas a mantenerse dentro de su budget, generar
reservaciones de viaje, reporte de gastos y proporcionar información sobre los destinos en
temas de seguridad e información para quienes no han viajado a dicho país.

Se considera importante la interacción con diferentes APIs y sus diferentes
endpoints. Para ello en esta prueba se plantea generar una SPA en VUE en la cual se consulte
una API del clima, donde nuestro traveler pueda ver las diferencias del clima entre su cuidad
actual y la ciudad a la que viajara. Considerando un forecast por hora en ambos casos.

Para ello el traveler deberá especificar o seleccionar:

● Ciudad Origen

● Ciudad Destino

Y deberá tener como resultado ambas proyecciones de clima. Para que el traveler pueda
compararlas. Y tomar una decisión sobre cosas debe llevar para su viaje.

La siguiente URL especifica la API que se debe utilizar, se debe crear un token y cuenta para obtener el ID y se puede realizar en la misma plataforma

URL: [Openweathermap](https://openweathermap.org/api/hourly-forecast) 


## Resultados:

<h3 align="center"> Vista PC </h3>

<p align="center">
  <img src="https://res.cloudinary.com/jaacker25/image/upload/c_scale,w_720/v1591196304/ISIBIT/Screenshot_from_2020-06-03_08-11-23_ap2iru.png">
</p>

<h3 align="center"> Vista Smartphone </h3>
<p align="center">
  <img src="https://res.cloudinary.com/jaacker25/image/upload/c_scale,h_520/v1591196364/ISIBIT/100792248_305468254176818_1799191877950373888_n_h32hud.png">
</p>
<h3 align="center"> Lighthouse Audit </h3>
<p align="center">
  <img src="https://res.cloudinary.com/jaacker25/image/upload/c_scale,w_500/v1591201951/ISIBIT/ligth_tcuwhb.png">
</p>
<hr>
<p align="center">
<a href="https://isibit-demo.netlify.app/"><h1 align="center">D E M O ∙ D E ∙ L A ∙ A P P</h1></a>
</p>
<hr>

### Sobre la implementación:

Se propuso manejar en vez de un dropdown con la lista de paises para elegir, implementar una entrada de texto que al dar 'enter' se hiciera la consulta para buscar coincidencias con las ciudades que tiene la API.

La entrada de texto solo permitira hacer consultas si se trata de un texto. Cadena de números o simbolos generaran un error desplegable.
El mismo error se genera si no se encontraron coincidencias en la busqueda.

Para ayudar al usuario a generar mejores busquedas se implemento un icono de ayuda donde se sugieren algunos tips.

Se propuso desplegar unicamente los primeros 12 resultados por cada ciudad buscada, entre cada elemento hay una diferencia horaria de una hora.

Se propuso desplegar de cada elemento las siguientes caracteristicas: La Hora en formato HH:MM, Temperatura en °C, Humedad Relativa en %, la descripcion informativa del panorama del cielo y la imagen correspondiente al estado de clima.

<p align="center">
  <img src="https://res.cloudinary.com/jaacker25/image/upload/v1591198351/ISIBIT/Screenshot_from_2020-06-03_10-32-06_c86t7z.png">
</p>

En total se hacen 3 peticiones a la API para obtener toda la información, hay manera de optimizarlo pero requiere contratar un plan de pago para tener acceso a esas directivas.


### Fallos que no se pudieron resolver:

En PC uno puede escribir en las barras de busqueda de dos maneras, ya sea escribiedo solo la ciudad o escribiendo la ciudad y el codigo del pais, es decir, poder escribir:

<b>Paris</b>

<b>Paris, fr</b>


y ambos arrojaran un resultado.

Desde el movil solo permite escribir ciudad y codigo de pais, es decir:

<b>Paris, fr</b>

Si escribimos solo:

<b>Paris</b>

Nos arroja el aviso de que no encontró coincidencia.

Es bastante extraño porque ambos dispositivos estan haciendo la misma consulta y deberian recibir la misma respuesta. 

### Puntos que pueden mejorar o ideas que faltaria implementar:

A nivel de diseño, si hacemos uso de la aplicacion desde PC nos encontramos que queda bastante espacio vacio, habria que buscar otra manera de organizar los elementos para darle mayor armonia.

Las busquedas son un poco confusas ya que no sabes realmente si es la ciudad que estabas buscando, a modo de propuesta se podria agregar algun boton que despliegue un mapa y nos ayude a corroborar que es el sitio que estabamos buscando, ya que la misma API te arroja resultados de paises, estados, ciudades, incluso colonias/barrios todos por igual y al parecer no hay manera de agregarle filtros.  

## Para hacer uso del codigo:

#### Forkearlo o descargarlo, dentro de la carpeta del proyecto ejecutar:
```
npm install
```

#### Abrir el proyecto en tu editor de codigo favorito, crear un archivo .env y crear la siguiente variable:
```
VUE_APP_KEY_APPI = ( aqui va la llave que generas cuando te registras en Openweathermap, sin los parentesis ) 
```

#### Teniendolo listo puedes abrir la terminal y ejecutar:
```
npm run serve
```

#### Ya deberias poder acceder a la aplicacion web desde el puerto 8080:


## Equipo de Trabajo
**Jorge Aguilar** - *Web Developer* - [contact](https://www.linkedin.com/in/jorge-aguilar-castillo/)<br>