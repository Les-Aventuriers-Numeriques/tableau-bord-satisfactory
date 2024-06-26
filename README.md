# Les Aventuriers Numériques / Speedrun Satisfactory

Le tableau de bord utilisé lors du speedrun [Satisfactory](https://www.satisfactorygame.com/) pendant la
[LAN annuelle](https://team-lan.org/lan) 2024 de la team multigaming Les Aventuriers Numériques.

Il s'agit d'un site statique purement frontend, sans backend ni générateur de site statique. Le trafic et l'audience
attendue étant très limités, les optimisations (et étapes supplémentaires) habituelles ne sont pas nécessaires.

## Prérequis

  - Un navigateur web moderne
  - Un serveur web **simple** (par exemple [Static Web Server](https://static-web-server.net/) ou même le serveur HTTP natif de Python)
  - [Satisfactory](https://www.satisfactorygame.com/), avec les mods [Fiscit Remote Monitoring](https://ficsit.app/mod/FicsitRemoteMonitoring) et [Production Stats](https://ficsit.app/mod/3tsvcG3A6gqKX1)

La configuration matérielle idéale est un ordinateur sur lequel la partie Satisfactory est hébergée, et un autre (par
exemple un laptop) sur lequel tourne le serveur web servant ce projet, lui-même branché à des hauts-parleurs (des sons
rigolos sont joués à des moments précis) et à un rétroprojecteur (le tableau de bord affiché est optimisé pour le plein
écran). Le laptop récupérerait les informations depuis l'ordinateur hébergeant la partie Satisfactory à travers le réseau
local.

## Installation

Clonez ce dépôt sur l'ordinateur devant héberger le serveur web simple.

Utilisez [Satisfactory Mod Manager](https://docs.ficsit.app/satisfactory-modding/latest/ForUsers/SatisfactoryModManager.html)
pour installer les mods Satisfactory sus-cités sur l'ordinateur devant héberger la partie.

## Configuration

Configurez le serveur web simple afin qu'il serve la racine de ce projet sur le port 8080.

> TODO Config nom ou IP hôte Satisfactory dans le JS

Configurez le mod Fiscit Remote Monitoring comme suit (voyez sa [documentation](https://docs.ficsit.app/ficsitremotemonitoring/latest/index.html)
pour les détails) :

  - WebServer.cfg
    - Web_Autostart = true
    - Listen_IP = "0.0.0.0"
    - Web_Port = 8181

Si le fichier n'existe pas à l'endroit attendu, lancez au moins une fois le jeu avec les mods sus-cités d'activés.

## Usage

Lancez Satisfactory avec les mods sus-cités activés, chargez votre partie en multijoueur.

À côté, ouvrez un navigateur web, sur l'ordinateur qui héberge le serveur web, pointant vers la page. Mettez-le en
plein écran sur le rétroprojecteur, en vous assurant que les sons joués par la page seront audibles par tout le monde.