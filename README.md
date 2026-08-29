# Dayli
A modern daily task management and productivity web app.

# 📋 Dayli

**Dayli** est une application web de productivité conçue pour aider à organiser simplement ses tâches quotidiennes et suivre sa progression au fil de la journée.

L'application permet de créer, modifier, terminer et supprimer des tâches, tout en les organisant par **priorité**, **catégorie** et **date d'échéance**.

Dayli a été développée avec une approche **simple, intuitive et responsive**, afin d'offrir une expérience agréable aussi bien sur ordinateur que sur mobile.

L'application est également disponible sous forme de **Progressive Web App (PWA)**, permettant de l'installer directement sur un smartphone depuis le navigateur.

🔗 **[Tester Dayli](https://dayli-task.netlify.app/)**
##  Fonctionnalités

* 📝 **Gestion des tâches** — créer, modifier et supprimer des tâches.
* 🎯 **Priorités** — attribuer un niveau de priorité : faible, moyenne ou haute.
* 🏷️ **Catégories** — organiser les tâches par type : personnel, études, travail, sport ou autre.
* 📅 **Dates d'échéance** — associer une date à chaque tâche et identifier les tâches en retard.
* 🔍 **Recherche** — retrouver rapidement une tâche grâce à la barre de recherche.
* 🔎 **Filtres** — afficher toutes les tâches, les tâches en cours, terminées ou en retard.
* 📊 **Suivi de progression** — visualiser le nombre de tâches et l'avancement de la journée.
* 🌙 **Mode sombre** — basculer entre une interface claire et sombre.
* 💾 **Sauvegarde locale** — conserver les tâches grâce au stockage local du navigateur (`localStorage`).
* 📱 **Design responsive** — interface adaptée aux ordinateurs, tablettes et smartphones.
* 📲 **Progressive Web App (PWA)** — possibilité d'installer Dayli sur un appareil mobile depuis le navigateur.
* 🧪 **Tests et gestion des cas limites** — vérification du comportement de l'application avec différents scénarios et entrées utilisateur.
* 
* ## 🛠️ Technologies utilisées

### Front-end

* **HTML5** — structure et organisation de l'interface.
* **CSS3** — mise en page, design, animations et responsive design.
* **JavaScript** — logique de l'application, gestion des tâches, filtres, recherche, statistiques et interactions utilisateur.

### Stockage

* **LocalStorage** — sauvegarde des tâches directement dans le navigateur afin de conserver les données après fermeture ou actualisation de l'application.

### Progressive Web App

* **Web App Manifest** — configuration de Dayli comme application installable sur mobile.
* **Responsive Web Design** — adaptation de l'interface aux différentes tailles d'écran.
* **Netlify** — déploiement et hébergement de la version web de Dayli.

### Outils

* **Visual Studio Code** — développement et organisation du projet.
* **GitHub** — gestion et présentation du code source.

## 📱 Aperçu & expérience mobile

Dayli a été conçue avec une approche **responsive**, afin de s'adapter aux différentes tailles d'écran et de rester simple à utiliser sur ordinateur comme sur smartphone.

L'application a été testée sur **ordinateur et iPhone** afin de vérifier notamment :

* l'adaptation de l'interface aux écrans mobiles ;
* la navigation et le défilement ;
* l'utilisation des boutons et formulaires au tactile ;
* l'affichage des tâches et des statistiques ;
* le fonctionnement de la recherche et des filtres ;
* le mode sombre ;
* la création, modification et suppression des tâches.

### 📲 Installation sur mobile

Grâce à son fonctionnement en **Progressive Web App (PWA)**, Dayli peut être ajoutée directement à l'écran d'accueil d'un smartphone depuis un navigateur compatible.

Une fois installée, l'application peut être lancée depuis son icône et s'affiche dans une interface dédiée, sans l'interface classique du navigateur.

## 🧪 Tests & validation

Une phase de tests a été réalisée afin de vérifier la stabilité, la fiabilité et l'expérience utilisateur de Dayli.

### 🔍 Tests fonctionnels

Les principales fonctionnalités ont été testées :

* Création, modification et suppression de tâches.
* Validation et changement du statut des tâches.
* Gestion des priorités, catégories et dates d'échéance.
* Recherche et filtrage des tâches.
* Calcul de la progression et des statistiques.
* Activation et désactivation du mode sombre.
* Conservation des données après actualisation de la page.

### 🧨 Tests de résistance

Plusieurs scénarios ont également été utilisés pour tenter de provoquer des erreurs :

* Création d'une tâche sans contenu.
* Utilisation de textes très longs.
* Utilisation de caractères spéciaux et d'emojis.
* Création d'un grand nombre de tâches.
* Utilisation de recherches ne retournant aucun résultat.
* Manipulation successive des différents filtres.
* Utilisation de dates passées, actuelles et futures.
* Annulation et confirmation de suppressions.
* Actualisation et fermeture de l'application.
* Clics répétés sur les boutons.
* Test d'une entrée HTML potentiellement malveillante.
* Test de l'affichage sur écran mobile.

### ✅ Résultat

Les tests réalisés sur ordinateur et iPhone n'ont révélé **aucun problème bloquant**.

Dayli a ainsi été validée comme une **version 1.0 stable**, avant son intégration au portfolio.

## 🚀 Déploiement & démonstration

Dayli est actuellement déployée en ligne afin de permettre une utilisation et une démonstration directe de l'application.

### 🌐 Démo en ligne

👉 **[Tester Dayli](https://dayli-task.netlify.app/)**

L'application peut également être installée sur un smartphone compatible en tant que **Progressive Web App (PWA)**.

### 📦 Déploiement

Le projet est hébergé avec **Netlify** et son code source est disponible sur **GitHub**.

L'objectif est de permettre à toute personne intéressée de consulter le code, comprendre la structure du projet et tester directement l'application.

## 🔮 Évolutions prévues — Dayli V2

Dayli V1 constitue une première version fonctionnelle de l'application. Plusieurs évolutions sont envisagées afin d'enrichir l'expérience utilisateur et de faire évoluer le projet vers une application de productivité plus complète.

### Fonctionnalités envisagées

* 🔐 **Comptes utilisateurs** — permettre à chaque utilisateur de créer et gérer son propre compte.
* ☁️ **Synchronisation des données** — retrouver ses tâches sur plusieurs appareils.
* 🔔 **Notifications et rappels** — recevoir des rappels pour les tâches importantes ou les échéances.
* 📅 **Vue calendrier** — visualiser les tâches directement dans un calendrier.
* 📊 **Statistiques avancées** — analyser sa productivité et son évolution dans le temps.
* 🎯 **Objectifs quotidiens** — définir des objectifs et suivre leur progression.
* 🗄️ **Base de données** — remplacer progressivement le stockage local par une solution permettant la synchronisation des données.
* 🎨 **Personnalisation** — développer davantage les options d'apparence et de personnalisation de l'application.
* 📱 **Application mobile dédiée** — étudier une véritable version mobile distribuable sur les plateformes d'applications.

---

## 📚 Objectif du projet

Dayli a été réalisé dans le cadre d'un projet personnel afin de mettre en pratique mes connaissances en **développement web**, notamment en HTML5, CSS3 et JavaScript.

Ce projet me permet également d'expérimenter différentes étapes d'un projet informatique : **conception, développement, responsive design, stockage des données, tests, déploiement et mise à disposition d'une application web**.

---

## 👩‍💻 Auteur

**Rania Amouri**

Projet personnel — 2026

---

⭐ Si vous trouvez le projet intéressant, n'hésitez pas à consulter le code source et à tester l'application.
