UTT-Stage-AppV2
===============

Prototype application de gestion des stages UTT (v2) (Backbone, Marionette, Node, Express, MongoDB, Grunt, Bower, Sonar...)

# Architecture

Le prototype est divisé en deux parties : 
•	app (front)
•	server (serveur)

##Front

**app** contient toute la partie front
- **images** comme son nom l’indique contient toutes les ressources graphiques de l’application.
- **js** contient tout le code JavaScript de l’application.
  *RQ : Dans notre cas il contient donc 90% de l’application puisqu’elle est entièrement développée en JavaScript !*
- **styles** contient les feuilles de styles (css) utilisées pour mettre en forme l’application.
- **index.html** est le point d’entrée de l’application. En chargeant cette page le navigateur chargera également tous les scripts JavaScript nécessaires à l’aide de Require.js


Le dossier **js** est subdivisé en 5 sous-dossiers :
- **common** : contient les éléments communs à tous les modules comme le menu, le fil d’Ariane, le « loader » etc… Ces éléments sont chargés au lancement de l’application mère et interagissent avec tous les modules.
- **entities** : les entités représentent les objets utilisés dans l’application. Au niveau technique, un fichier « entité » regroupe les modèles et collections Backbone ainsi que les fonctions permettant d’interagir avec les objets.
- **i18n** : contient les fichiers utilisés pour gérer l’internationalisation de l’application.
- **modules** : un module pour chaque « sous-application » ; en quelques sortes pour chaque fonctionnalité spécifique de l’application mère.
- **vendors** : les librairies et scripts tiers utilisés pour le fonctionnement de l’application. 

On retrouve également trois fichiers :
- **app.js** : Le point d’entrée de toute la partie JavaScript.
- **config.js** : pour configurer le chargement des scripts (chemins, ordre de lancement, dépendances etc.).
- **main.js** : chargement des entités et appel au fichier app.js pour lancer l’application mère.


**RQ:** Chaque module est structuré de la même façon :
- Un fichier principal **xxx_module.js** permettant de se déclarer et de déclarer ses routes (et leurs déclencheurs) à l’application mère.

- Plusieurs dossiers correspondant à diverses actions :
  - **Edit** : Pour éditer les objets du module.
  - **List** : Pour lister les collections du module.
  - **New** : Pour créer un nouvel objet.
  - **Root** : La racine du module.
  - **Show** : Pour afficher un objet.

- Chaque dossier d’action se base sur plusieurs fichiers :
  - Un contrôleur **xxx_controller.js** qui orchestre les différentes fonctions.
  - Une vue **xxx_view.js** qui affiche les données envoyées par le contrôleur dans les templates.
  - Un ou plusieurs templates **xxx.tpl** appelés par la vue en fonction des informations à afficher.

##Back
