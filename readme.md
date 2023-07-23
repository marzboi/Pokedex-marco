# Pokémon - Una Aplicación de TypeScript

![Logo Pokémon](pokemon-logo.svg)

## Descripción

Este proyecto es una aplicación web que permite a los usuarios explorar una colección de Pokémon utilizando la famosa PokéAPI. La aplicación se ha desarrollado utilizando TypeScript y sigue el patrón de diseño de clases y el patrón de repositorio para la gestión de datos.

## Características

Todos los Pokémon: Esta página muestra un listado de todos los Pokémon obtenidos de la PokéAPI. El listado incluye el nombre del Pokémon y su imagen. Además, se incluye una funcionalidad de paginación para avanzar y retroceder a través del listado. También se muestra el total de Pokémon mostrados versus el total de Pokémon que existen (por ejemplo, 10/1000). Esta permite al usuario mostrar entre 20, 40 o 60 pokemones por pagina.

Detalle de Pokémon: Al hacer clic en un Pokémon del listado, los usuarios abren una ventana de detalles donde se muestran más datos sobre el Pokémon seleccionado.

Mis Pokémon: Los usuarios pueden agregar Pokémon a su listado local y gestionarlos. Los datos del listado local se obtienen de una API local. Los usuarios pueden eliminar Pokémon de su listado y también modificar sus datos.

## Tecnologías utilizadas

TypeScript: La aplicación está construida completamente con TypeScript, utilizando un enfoque basado en clases para la estructura del código.
API Repositorio: Se ha implementado un patrón de repositorio para la gestión de las conexiones de la API, permitiendo una arquitectura limpia y una separación de responsabilidades.
