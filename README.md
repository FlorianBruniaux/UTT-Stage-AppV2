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

La structure back est composée d’un fichier principal server.js instrumentant toute la partie serveur. Il se base sur différents paquets node.js mais aussi sur des outils maison. Ces outils sont inclus dans une 'API' fournissant un ensemble normalisé de classes, méthodes et fonctions etc. 

Cette API est configurée via config.js et contient plusieurs modules : 

- **auth** : les fonctions nécessaires pour gérer le système d’authentification.
- **db** : tout ce qui va permettre d’interagir avec la base de données (opérations CRUD : Create Read Update Delete etc.).
- **express** : configuration du serveur express.js
- **tools** : divers outils ou fonctions spécifiques mais communes à plusieurs actions.
- **upload** : tout le système permettant de gérer les mécanismes d’upload et de sauvegarde d’images (en fonction des formats, base64, png, jpg etc).


# Installation

Pour faire fonctionner l'application vous devez au préalable installer :
- [node.js](http://nodejs.org/)
- [mongodb](http://www.mongodb.com/)

Ensuite placez vous à la racine de l'application.

Pour installer les packages node.js utilisez la commande
```bash
npm install
```

puis pour installer les packages bower
```bash
bower install
```

et enfin pour copier uniquement les scripts nécéssaires dans le dossier vendors (cf [grunt-bower-task](https://github.com/yatskevich/grunt-bower-task))
```bash
grunt init:dev
```

# Lancement

Pour lancer l'application vous devez :

- Démarrer votre serveur local MongoDB
- Puis tapper la commande (toujours à la racine)
```bash
grunt server
```

Le démarrage prend entre 10 et 60 secondes.

Si tout se déroule sans erreur votre console devrait afficher un message similaire à la copie d'écran ci dessous :
![console](http://florian-bruniaux.fr/UTT/UTT-Stage-AppV2/console.PNG)

Une fenêtre s'ouvre sur votre navigateur (celui défini par défaut)

![login](http://florian-bruniaux.fr/UTT/UTT-Stage-AppV2/login.PNG)

Vous pouvez alors vous connecter de plusieurs façon
- Avec un login/mot de passe (nécessite une inscription au préalable)
- Avec votre compte LinkedIn 

Rq: La connexion via LinkedIn fera apparaitre l'écran ci dessous :

![login LinkedIn](http://florian-bruniaux.fr/UTT/UTT-Stage-AppV2/login%20linkedin.PNG)

# Démonstration

Une présentation de l'application avec de nombreuses explications est disponible en cliquant ici :
[screencast de présentation](http://florian-bruniaux.fr/projets/UTT/Screencast_Prototype_Application_stages_UTT.flv)
