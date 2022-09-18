# OhMyCodeFront

En este repositorio se encuentra el proyecto de BackEnd de la prueba técnica de OhMyCode realizada por José Daniel Conejos Jiménez.

Se ha desarrollado utilizando AngularCLI. Para ejecutar será necesario descargar los archivos, instalar las dependencias con `npm install`, y ejecutar con `ng serve`.

En este repositorio se encuentran dos versiones de la prueba: en la rama *master* la web se conecta a `https://jsonplaceholder.typicode.com`, y se han implementado todas las funcionalidades, incluyendo las bonus. Tal y como se indica en el documento, se han creado tres usuarios diferentes (`user1`, `user2` y `user3`; todos con contraseña `admin`), que tienen acceso sólo a los TODOs asignados.

Dentro de la rama *integration* se encuentra la version de la web donde se conecta al BackEnd creado durante la prueba (https://github.com/jdconejos/OhMyCode_BackEnd). Para que funcione, se tendra que ejecutar esta versión conjuntamente al BackEnd. Debido a problemas relacionados con CORS (*Cross-origin resource sharing*), solo se han implementado las funcionalidades de consulta y creacion de TODOs. Del resto de funcionalidades no se asegura el funcionamiento.
