# Les Aventuriers Numériques / Speedrun Satisfactory

Le tableau de bord utilisé lors du speedrun [Satisfactory](https://www.satisfactorygame.com/) pendant la
[LAN annuelle](https://team-lan.org/lan) 2024 de la team multigaming Les Aventuriers Numériques.

Il s'agit d'un site statique mono-page, sans backend ni générateur de site statique.

## Prérequis

  - Un navigateur web moderne
  - Un serveur web **simple** (par exemple [Static Web Server](https://static-web-server.net/) ou même le serveur HTTP natif de Python)
  - [Satisfactory](https://www.satisfactorygame.com/), avec les mods [Fiscit Remote Monitoring](https://ficsit.app/mod/FicsitRemoteMonitoring) et [Production Stats](https://ficsit.app/mod/3tsvcG3A6gqKX1)
  - Un rétroprojecteur (la page affiche un tableau de bord optimisé pour être affiché en plein écran)
  - Des hauts-parleurs (la page joue des sons rigolos à des moments précis)

Pour des raisons de simplicité, le serveur web simple fournissant les fichiers de ce projet ainsi que la partie
multijoueur Satisfactory **doivent** tourner sur la même machine.

## Installation

Clonez ce dépôt et utilisez [Satisfactory Mod Manager](https://docs.ficsit.app/satisfactory-modding/latest/ForUsers/SatisfactoryModManager.html)
pour installer les mods Satisfactory sus-cités.

## Configuration

Configurez votre serveur web afin qu'il fournisse la racine de ce projet sur le port 8080.

Configurez le mod Fiscit Remote Monitoring comme suit (voyez sa documentation pour les détails) :

  - WebSockets.cfg
    - WebSocket_Autostart = true
    - WebSocket_Port = 8181

## Usage

Lancez Satisfactory avec les mods sus-cités activés, chargez votre partie en multijoueur.

A côté, ouvrez votre navigateur web sur la page http://localhost:8080/. Mettez-le en plein écran sur un rétroprojecteur,
en vous assurant que les sons joués par la page seront audibles par tout le monde.