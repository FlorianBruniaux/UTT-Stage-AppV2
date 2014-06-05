UTT-Stage-AppV2
===============

Prototype application de gestion des stages UTT (v2) (Backbone, Marionette, Node, Express, MongoDB, Grunt, Bower, Sonar...)

#Contexte 

Comme toutes les écoles du supérieur, l’UTT propose à ses étudiants de partir en stage en entreprise pour compléter leur formation. Elle dispose donc d’un outil interne permettant aux différents acteurs  d’intervenir dans ce processus.

Cet outil prend la forme d’une application disponible en ligne.

Le problème est que cette dernière n’est pas parfaite. Elle pourrait grandement être améliorée au niveau fonctionnel, technique et ergonomique

Durant un projet en groupe réalisé dans le cadre de l'UV IF10 nous avons donc analysé l’application existante et proposé notre vision d'une éventuelle nouvelle version. Pour cela nous sommes passés par un certains nombres d’étapes clés. 

Pour en savoir plus vous pouvez consulter les documents suivant : 
- [Le dossier complet](http://florian-bruniaux.fr/UTT/UTT-Stage-AppV2/Dossier.pdf)
- [Le diapo de soutenance](http://florian-bruniaux.fr/UTT/UTT-Stage-AppV2/Soutenance.pdf)
- [L'ensemble des maquettes basse-fidélité](http://florian-bruniaux.fr/UTT/UTT-Stage-AppV2/Maquettes.pdf)

#Le projet

Cette TX est réalisée dans la continuité du projet IF10 présenté ci dessus.

La TX consistera donc à réaliser un premier prototype à l'aide des différentes maquettes et spécifications fonctionnelles énoncées dans le [dossier](http://florian-bruniaux.fr/UTT/UTT-Stage-AppV2/Dossier.pdf). Le prototype sera basé sur des technologies web récentes : HTML5/CSS3/JavaScript (Backbone, Marionette, Node, Express, MongoDB, Grunt, Bower, Sonar...). Le fil rouge de la TX est de tenter de poser une structure stable qui pourra être reprise et poursuivie par la suite.

#Technologies

La plus grosse partie de ma recherche s’est focalisée sur la comparaison de Backbone.js et Angular.js, les 2 principales solutions JavaScript MVC actuelles. Je ne ferai pas de comparatif détaillé car il en existe déjà de très bons (comme celui-ci en Français : http://www.infoq.com/fr/articles/backbone-vs-angular). Pour faire simple, je souhaitais une solution assez malléable, permettant de gérer facilement un système de base de données local (cf. contraintes), avec une communauté active (afin de récupérer facilement des outils pour ne pas avoir à « réinventer la roue ») et de nombreux projets existants (pour m’inspirer des bonnes pratiques). Or, ces critères correspondaient tout à fait à Backbone. C’est donc la solution pour laquelle j’ai opté.

Backbone étant une solution MVC il semble intéressant de faire un rappel sur ce concept. 

###LA STRUCTURE MVC

La structure modèle-vue-contrôleur (MVC) est un découpage couramment utilisé pour développer des applications web. Pour générer une page, un contrôleur réalise des opérations basiques telles que lire des données ou les afficher. Avec un peu de capacité d'abstraction, on peut voir deux autres couches qui apparaissent : une pour gérer les données (notre modèle) et une autre pour gérer l'affichage des pages (notre vue).

Le modèle est une couche qui gère les données. Cela signifie qu'à chaque fois que nous voulons créer, modifier, supprimer ou lire une donnée (exemple, lire les informations d'un utilisateur depuis la base de données), nous ferons appel à une fonction spécifique qui nous retournera le résultat (sous forme d'un tableau généralement). Ainsi, nous n'aurons aucune requête dans notre contrôleur, juste des appels de fonctions s'occupant de gérer ces requêtes.

Enfin, la vue est une couche permettant d’afficher des pages. Cela signifie tout simplement que notre contrôleur n'affichera jamais de données directement. Il fera appel à une page qui s'occupera d'afficher ce que l'on veut. Cela permet de séparer complètement l'affichage HTML dans le code.

![L'architecture MVC](http://baptiste-wicht.developpez.com/tutoriels/conception/mvc/images/mvc.png)

###L’ENVIRONNEMENT CHOISI 

Voici l’environnement technologique avec lequel je travaille actuellement (il est susceptible d’évoluer par la suite) :

####[Backbones.js](http://backbonejs.org) : 

Backbone, écrit par Jeremy Ashkenas, est un framework JavaScript dédié à la création d’application web (WebApp) de type « single page application » (= une application web qui embarque tous les éléments nécessaires à son fonctionnement dans une seule page HTML). C’est une solution embarquant plusieurs composants aidant à structurer les applications basées sur le langage JavaScript selon les règles du modèle MVC. Il reproduit donc les mécanismes de frameworks coté serveur tels que CakePHP, Ruby On Rails etc.

Les principaux composants Backbone :

- Modèle : Backbone.Model
- Vue : le code HTML (les templates)
- Contrôleur (de vues) : Backbone.View
- Routeur : Backbone.Router, écoute les changements d'URL et fait le lien avec les Backbone.Model(s) et les Backbone.View(s).
- Collection : Backbone.Collection pour gérer les modèles de données 
-	Le composant de Synchronisation : Backbone.sync, que l'on peut comparer à une couche médiane permettant aux modèles de communiquer avec le serveur. C'est lui qui fait les requêtes Ajax au serveur et remonter les résultats aux modèles.

 
![Backbone : interactions entre les composants](http://addyosmani.github.io/backbone-fundamentals/img/backbone_mvc.png)

####[Marionette.js](http://marionettejs.com/):

C’est une bibliothèque d'applications composites pour Backbone.js permettant de simplifier la mise en place d’applications « SPA » (Single Page Application). Marionette.js se place au-dessus de Backbone et lui apporte un système d’architecture optimisant la gestion des vues et de la mémoire utilisée. C’est une librairie flexible composée de nombreux outils qui facilite grandement le développement d’applications évolutives.

Principaux avantages apportés par Marionette.js :

- Application évolutive : une application est divisée en module. Chaque module étant indépendant des autres.
- Architecture basée sur la gestion d’événements via Backbone.Wreqr.EventAggregator
- Gestion des vues optimisées via le système de templates d’Underscore.js
- Rendu en temps réels grâce aux  objets « Region » et « Layout »
- Mécanisme de gestion de la mémoire permettant de supprimer automatiquement les « zombies », c’est-à-dire les vues, regions et layouts qui ne sont plus utilisés
- Réduction du nombre de lignes de codes nécessaire
- Etc…

Pour en découvrir plus rendez-vous directement sur le site officiel ou le git:

- http://marionettejs.com 
- https://github.com/derickbailey/backbone.marionette 

Durant mon apprentissage de Marionette.js, je me suis principalement basé sur le travail de David Sulc. Et particulièrement de ses 2 livres que je recommande fortement :

- [Marionette.js : a gentle introduction](https://leanpub.com/marionette-gentle-introduction)
- [Structuring Backbone with Require.js et Marionette.js](https://leanpub.com/structuring-backbone-with-requirejs-and-marionette)


####[Node.js](http://nodejs.org) : 
	
Contrairement à ce que beaucoup peuvent penser, node.js n’est pas un serveur HTTP au même titre qu’Apache, nginx, lighthttpd etc… C’est un serveur web, mais il est aussi capable de répondre à toutes sortes de besoins client/serveur (FTP, mail etc..).

Nous sommes habitués à voir le JavaScript fonctionner côté client mais node.js nous prouve qu’il est également possible d’utiliser ce langage côté serveur, tout comme on le ferait avec du PHP, ASP, Java etc…

####[Require.js](http://requirejs.org) 

RequireJS est une librairie JavaScript fournissant les fonctionnalités nécessaires au développement d'une application JavaScript sous forme de modules. La force de cette librairie vient de sa compatibilité avec la majorité des environnements de développement, que ce soit node.js, rhino, ou les moteurs JavaScript des principaux navigateurs web du marché.

Un « module » correspond à un fichier JavaScript standard ou suivant la syntaxe préconisée par RequireJS (la différence surviendra dans la manière de faire appel au module). La librairie fournit également la possibilité d'utiliser des packages, regroupant chacun un nombre quelconque de modules, ainsi qu'un package 'main.js'.

####[Express.js](http://expressjs.com) : 

C’est un framework JavaScript destiné aux applications basées sur node.js. Il s’inspire en partie de Sinatra (Ruby) et permet de développer rapidement des services RESTful. C’est l’un des principaux paquets de node.js.

####[Yeoman](http://yeoman.io) : 

C’est un projet open-source géré par différents membres de l’équipe de développement de Chrome tels Paul Irish (JQuery, HTML5 Boilerplate etc.), Addy Osmani (JQuery, Backbone etc.) et Eric Bidelman (html5rocks). 

RQ : un « yeoman » était un paysan dans l’Angleterre médiévale qui était propriétaire de sa terre. Les Yeoman sont aujourd’hui les gardiens de la tour de Londres.

C’est un outil de workflow permettant d'initialiser, construire et maintenir les bases d'une application web (génération de squelette, exécution des tests, compilation…). Il fournit également des outils pour développer (server http de test, liveReload ...) et permet de 'build' l'application ou encore de créer une version optimisée pour le déploiement.

En réalité Yeoman est composé de 3 outils

- [Yo](https://github.com/yeoman/yo) : outil de scaffolding (ou « échafaudage » ; méthode de conception permettant de faciliter la gestion de la base de données) maintenu par Yeoman permettant de générer l’ossature de votre application

- [Bower](http://bower.io/) : un outil de gestion de dépendances

- [Grunt](http://gruntjs.com/) : lanceur de tâche (décrit dans la partie automatisation)
 
![Le "workflow" yeoman](https://lh4.googleusercontent.com/1uzky6bqzKv2laHxKHvVUrnLQdi6pWfFKS0eaBK3VW3yrDToKZAGKmfm8PCpnfAtEDZtZX1pcApIp3WvND4pbbJQekWYbojHmzG9HTDzu0DILkYQptjjAP_ZTQ)

####[Twitter Bootstrap](http://getbootstrap.com) + [JasnyBootstrap](http://jasny.github.io/bootstrap/) : 

Un framework front-end CSS/JavaScript puissant et simple d’utilisation, permettant la mise en place d’un design modulable et réactif. C’est le leader actuel du domaine…

JasnyBootstrap complète TB en lui rajoutant diverses fonctionnalités et composants

####[jQuery](http://jquery.com) :

Une librairie offrant de nombreuses fonctions utilitaires, et encapsulant des mécanismes “complexe” de JavaScript (et que l’on n’a plus besoin de présenter)

####[SonarCube](http://sonarqube.org/) :

SonarQube (anciennement Sonar) est un logiciel libre distribué sous licence LGPL v3 permettant de mesurer la qualité d'un code source, en continu.

Il permet de créer des compte rendus sur :
- l'identification des duplications de code
- la mesure du niveau de documentation
- Le respect des règles de programmation
- La détection des bugs potentiels
- L'évaluation de la couverture de code par les tests unitaires
- L'analyse de la répartition de la complexité
- L'analyse du design et de l'architecture d'une application

![Les 7 axes d'analyse](http://slauncha.dyndns.org/data/images/7axes.png)



