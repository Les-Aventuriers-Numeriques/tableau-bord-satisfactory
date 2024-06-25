# Les Aventuriers Numériques / Speedrun Satisfactory

Le tableau de bord utilisé lors du speedrun [Satisfactory](https://www.satisfactorygame.com/) pendant la
[LAN annuelle](https://team-lan.org/lan) 2024 de la team multigaming Les Aventuriers Numériques.

Il s'agit d'un site statique purement frontend, sans backend ni générateur de site statique. Le trafic et l'audience
attendue étant très limités, les optimisations (et étapes supplémentaires) habituelles ne sont pas nécessaires.

## Prérequis

  - Un navigateur web moderne
  - Un serveur web **simple** (par exemple [Static Web Server](https://static-web-server.net/) ou même le serveur HTTP natif de Python)
  - [Satisfactory](https://www.satisfactorygame.com/), avec les mods [Fiscit Remote Monitoring](https://ficsit.app/mod/FicsitRemoteMonitoring) et [Production Stats](https://ficsit.app/mod/3tsvcG3A6gqKX1)

La configuration idéale est un ordinateur sur lequel la partie Satisfactory est hébergée, et un autre (par exemple un
laptop) sur lequel tourne le serveur web, lui-même branché à des hauts-parleurs (des sons rigolos sont joués à des
moments précis) et à un rétroprojecteur (le tableau de bord affiché est optimisé pour le plein écran).

## Installation

Clonez ce dépôt. Utilisez [Satisfactory Mod Manager](https://docs.ficsit.app/satisfactory-modding/latest/ForUsers/SatisfactoryModManager.html)
pour installer les mods Satisfactory sus-cités.

## Configuration

Configurez le serveur web afin qu'il serve la racine de ce projet sur le port 8080.

Configurez le mod Fiscit Remote Monitoring comme suit (voyez sa documentation pour les détails) :

  - WebServer.cfg
    - Listen_IP = "0.0.0.0"
  - WebSockets.cfg
    - WebSocket_Autostart = true
    - WebSocket_Port = 8181

Si le fichier n'existe pas à l'endroit attendu, lancez au moins une fois le jeu avec les mods sus-cités d'activés.

## Usage

Lancez Satisfactory avec les mods sus-cités activés, chargez votre partie en multijoueur.

À côté, ouvrez un navigateur web sur la page `http://<nom de l'ordinateur hôte du serveur web>.local:8080/`. Mettez-le en
plein écran sur un rétroprojecteur, en vous assurant que les sons joués par la page seront audibles par tout le monde.