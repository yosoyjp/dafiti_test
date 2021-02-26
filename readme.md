# Examen tecnico - Johnny Pacheco

1. Supone que en un repositorio GIT hiciste un commit y te olvidaste un archivo. Explicar como se soluciona si hiciste push, y como si aun no hiciste. De ser posible, buscar que quede solo un commit con los cambios.

    #
    La siguiente solución debe aplicarse si el commit que se hizo no ha sido jalado (pull) por otro programador. Si esto ya pasó lo mejor es crear otro commit para evitar conflictos.
    
    Lo que hay que hacer despues de modificar el o los archivos es:
    ```
        git add .
        git commit --amend
    ```
    Si se quiere modificar el mensaje del commit se puede añadir el flag -m y el mensaje o sin ella al ejecutarlo se abrirá nuestro editor definido por la terminal para confirmar si queremos dejar el mensaje original del commit o modificarlo.

    Si el commit ya habia sido "pusheado" hay que hacer lo siguiente:
    ```
        git push -f origin HEAD
    ```
    Lo que hacemos aqui en realidad es forzar al repositorio remoto a modificar el contenido del commit actual.

    Si el commit no habia sido "pusheado" se realiza un push normal:
    ```
        git push origin HEAD
    ```


2. Tenes un sitio en tu computadora de desarrollo, y cuando entras desde el navegador, en la consola te
aparece esto:
    ```
    https://site.local/favicon.ico Failed to load resource: net::ERR_INSECURE_RESPONSE
    ```
    #
    En este caso lo mas probable es que el recurso esté cargando con un certificado autofirmado, y posiblemente en el pc donde se esté desarrollando el sitio el certificado no está instalado. Lo que hace que por defecto los navegadores consideren este certificado como corrupto o inseguro.


3. Tenes un archivo comiteado en un repositorio GIT que deseas que quede ignorado. Que pasos debes
realizar?
    #
    Lo primero que debemos hacer en este caso es agregar la ruta del archivo a el archivo ```.gitignore```.
    Luego ejecutamos el comando:
    ```
        git rm -r --cached .
    ```
    Y luego
    ``` 
        git add .
    ```
    Esto se hace ya que git para optimizar almacena su registro de archivos por ignorar en caché y no basta con actualizar el .gitignore.


4. Explica las ventajas de cargar en tu sitio las librerias de terceros por GTM:
    #
    * Google Tag Manager nos permite administrar desde un solo lugar las librerias externas a cargar en nuestro sitio.
    * GTM hace que las librerias que se cargen a traves de el se carguen siempre de manera asincrona para evitar bloquear la interactividad del sitio web.
    * Algo que es particularmente ganador es que GTM carga estas librerias a traves de una unica peticion HTTP, por lo que el navegador solo debe leer, procesar y executar una unica ```Request``` por todas esas librerias, algo que mejora su velocidad de carga.


5. Escribir una funcion que determine si un conjunto de cartas de una lista representan una escalera de poker (5
cartas con valores consecutivos) o no.
```js
    const replaceInArray = (array, forReplace, toValue) =>
    array.map((item) => (item === forReplace ? toValue : item));

    const deleteDuplicates = (array) => [...new Set(array)];

    const consecutive = (array, consecutiveCount, index) => {
    return consecutiveCount !== 5 && array[index]
        ? consecutive(
            array,
            array[index] + 1 === array[index + 1] ? consecutiveCount + 1 : 1,
            index + 1
        )
        : consecutiveCount;
    };

    const isStraight = (cards) => {
    const realCards = deleteDuplicates(replaceInArray(cards, 14, 1));
    const orderedCards = realCards.sort((a, b) => a - b);
    return consecutive(orderedCards, 1, 0) === 5;
    };

    // example true
    isStraight([14, 5, 4, 2, 3]);

    // example false
    isStraight([7, 7, 12 ,11, 3, 4, 14]);

```


6. Ejecercisios MYSQL

* ¿Cuál es el jugador más viejo de cada equipo?
    ```sql
        SELECT
            equipos.nombre,
            jugadores.nombre,
            MIN(jugadores.fecha_nacimiento) 
        FROM equipos
            INNER JOIN jugadores on fk_equipos = id_equipos
        GROUP BY equipos.nombre;
    ```

* ¿Cuántos partidos jugó de visitante cada equipo? (nota: hay equipos no jugaron ningún partido):
    ```sql
    SELECT 
        equipos.nombre,
        COUNT(fk_equipo_visitante) AS partido_como_visitante
    FROM
        partidos
            RIGHT JOIN
        equipos ON id_equipos = fk_equipo_visitante
    GROUP BY equipos.nombre;
    ```

* ¿Qué equipos jugaron el 01/01/2016 y el 12/02/2016?

    ```sql
        SELECT 
            fk_equipo_local,
            fk_equipo_visitante,
            fecha_partido
        FROM
            partidos
        WHERE 
            partidos.fecha_partido = "2016-02-12"
        UNION ALL
        SELECT 
            fk_equipo_local,
            fk_equipo_visitante,
            fecha_partido
        FROM
            partidos
        WHERE 
            partidos.fecha_partido = "2016-01-01";
    ```

* Diga el total de goles que hizo el equipo “Chacarita” en su historia (como local o visitante):
    ```sql
        SELECT 
            SUM(goles_local) AS goles
        FROM
            partidos
                INNER JOIN
            equipos ON id_equipos = fk_equipo_local
        WHERE
            equipos.nombre = 'Chacarita'
        UNION ALL
        SELECT 
            SUM(goles_visitante) AS goles
        FROM
            partidos
                INNER JOIN
            equipos ON id_equipos = fk_equipo_visitante
        WHERE
            equipos.nombre = 'Chacarita';
    ```

#
7. EXTRA
    
    Contanos en pocas lineas cual crees que es la mayor innovacion en el mundo del desarrollo en los ultimos 5
    años, y por que:

    - Reconozco que no me habia hecho esta pregunta antes, pero despues de pensarlo no podria responder objetivamente por desconocimiento, pero si puedo responderla desde lo que me ha tocado vivir en estos 5 años de desarrollo que llevo.
    Diria que lo que mas ha impactado en estos 5 años para mi en el desarrollo es la **Inteligencia artificial como servicio cloud.**
    Esto debido a que la **IA** como servicio, por lo general por subscripción le ha puesto a disposicion a empresas sin importar el tamaño el poder tecnologico de la **IA**, por ejemplo ecommerces con modelos de recomendacion segun el comportamiento de sus usuarios para ofrecer a sus visitantes lo mas apropiado y personalizado; empresas de seguridad con sistemas de reconocimiento facial y de voz, empresas de transporte con sistemas de trackeo y un sin numero de opciones que tecnologicamente no es facil que una empresa lo haga, pero a traves de la exposicion de estos servicios ha mejorado en gran manera muchos servicios, optimizandolos y ampliando el abanico de posibilidades.

