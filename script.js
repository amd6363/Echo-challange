document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Chargé. Initialisation du jeu Éco-Challenge...");

    // --- Sélection des Éléments DOM ---
    // (Utilisation de constantes pour les éléments fréquemment utilisés)
    const screens = {
        start: document.getElementById('start-screen'),
        game: document.getElementById('game-screen'),
        gameOver: document.getElementById('game-over-screen'),
        history: document.getElementById('history-screen'),
    };
    // Écran Démarrage
    const difficultySlider = document.getElementById('difficulty-slider');
    const difficultyLabel = document.getElementById('difficulty-label');
    const numProductsInput = document.getElementById('num-products');
    const numPlayersInput = document.getElementById('num-players');
    const playerNamesContainer = document.getElementById('player-names-container');
    const timerCheckbox = document.getElementById('timer-checkbox');
    const startGameBtn = document.getElementById('start-game-btn');
    const duelRapideBtn = document.getElementById('duel-rapide-btn');
    const showHistoryBtn = document.getElementById('show-history-btn');
    // Écran Jeu
    const playerTurnDisplay = document.getElementById('current-player-name');
    const scoreDisplay = document.getElementById('current-score');
    const timerDisplay = document.getElementById('timer-display');
    const timerValueSpan = document.getElementById('timer-value');
    const roundInfoDisplay = document.getElementById('current-round');
    const totalRoundsDisplay = document.getElementById('total-rounds');
    const progressBarsContainer = document.getElementById('progress-bars');
    const ecoCharacterMessage = document.getElementById('eco-message');
    const productsToRankContainer = document.getElementById('products-to-rank');
    const rankingArea = document.getElementById('ranking-area');
    const rankingPlaceholder = document.querySelector('.ranking-placeholder');
    const submitRankingBtn = document.getElementById('submit-ranking-btn');
    const feedbackArea = document.getElementById('feedback-area');
    const explanationArea = document.getElementById('explanation-area');
    const nextStepBtn = document.getElementById('next-step-btn');
    // Quiz
    const miniQuizArea = document.getElementById('mini-quiz-area');
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptionsContainer = document.getElementById('quiz-options');
    const quizFeedback = document.getElementById('quiz-feedback');
    // Écran Fin
    const finalScoresContainer = document.getElementById('final-scores');
    const ecoSummaryDescription = document.getElementById('danger-description');
    const restartGameBtn = document.getElementById('restart-game-btn');
    const backToMenuBtn = document.getElementById('back-to-menu-btn');
    const showReviewBtn = document.getElementById('show-review-btn');
    const rankingReviewArea = document.getElementById('ranking-review');
    const reviewPlayerRankingDiv = document.getElementById('review-player-ranking');
    const reviewCorrectRankingDiv = document.getElementById('review-correct-ranking');
    const hideReviewBtn = document.getElementById('hide-review-btn');
    // Écran Historique
    const historyListContainer = document.getElementById('history-list');
    const highScoresContainer = document.getElementById('high-scores');
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    const backToMenuFromHistoryBtn = document.getElementById('back-to-menu-from-history-btn');

    // --- Vérification Initiale des Éléments Clés ---
    if (!screens.start || !screens.game || !screens.gameOver || !screens.history || !startGameBtn) {
        console.error("ERREUR CRITIQUE : Un ou plusieurs éléments d'écran principaux ou le bouton de démarrage sont introuvables. Vérifiez les IDs dans index.html.");
        alert("Erreur critique lors de l'initialisation du jeu. Vérifiez la console (F12).");
        return; // Bloque l'exécution
    }

    // --- Configuration et Données ---
    const allProducts = [
        { id: 1, name: "Pomme locale bio", impact: 1, category: "alimentaire", cost: 1, brand: "Ferme locale", img: "img/apple.png", explanation: "Très faible empreinte carbone, agriculture biologique, transport court." },
        { id: 2, name: "Tote bag coton bio", impact: 2, category: "vetement", cost: 8, brand: "EcoBrand", img: "img/tote_bag_bio.png", explanation: "Coton bio (moins d'eau/pesticides que conventionnel), réutilisable, mais production textile a un impact." },
        { id: 3, name: "Gourde inox", impact: 2, category: "maison", cost: 15, brand: "DurableCo", img: "img/gourde.png", explanation: "Production initiale énergivore mais évite des centaines de bouteilles plastiques sur sa durée de vie." },
        { id: 4, name: "Vélo classique", impact: 2, category: "transport", cost: 300, brand: "CyclePro", img: "img/velo.png", explanation: "Fabrication (métal, pneus) a un impact, mais utilisation sans émission directe et bénéfique pour la santé." },
        { id: 5, name: "Ampoule LED", impact: 3, category: "maison", cost: 5, brand: "LightUp", img: "img/led.png", explanation: "Faible consommation électrique, longue durée de vie, mais contient des composants électroniques." },
        { id: 6, name: "Papier recyclé", impact: 3, category: "recycle", cost: 4, brand: "RePaper", img: "img/papier_recycle.png", explanation: "Réduit la déforestation, consomme moins d'eau/énergie que papier vierge, mais processus de recyclage existe." },
        { id: 7, name: "T-shirt coton conventionnel", impact: 6, category: "vetement", cost: 15, brand: "FastFashion", img: "img/tshirt_coton.png", explanation: "Culture du coton TRES gourmande en eau et pesticides, souvent fabriqué loin (transport)." },
        { id: 8, name: "Smartphone reconditionné", impact: 5, category: "electronique", cost: 300, brand: "ReTech", img: "img/smartphone_reco.png", explanation: "Évite la production neuve (extraction terres rares, énergie), mais reste un déchet électronique en fin de vie." },
        { id: 9, name: "Bouteille eau plastique 1.5L", impact: 7, category: "alimentaire", cost: 0.5, brand: "AquaPure", img: "img/bouteille_plastique.png", explanation: "Production de plastique (pétrole), transport, pollution plastique massive (très faible taux de recyclage réel)." },
        { id: 10, name: "Voiture essence neuve (citadine)", impact: 8, category: "transport", cost: 15000, brand: "AutoCorp", img: "img/voiture_petite.png", explanation: "Fabrication complexe (métaux, plastiques, énergie), émissions de CO2/polluants à l'usage, infrastructure routière." },
        { id: 11, name: "Smartphone neuf (haut de gamme)", impact: 9, category: "hightech", cost: 800, brand: "TechGiant", img: "img/smartphone_neuf.png", explanation: "Extraction de minerais rares (conditions sociales/env. difficiles), fabrication énergivore, transport, obsolescence rapide." },
        { id: 12, name: "Steak de boeuf (150g, élevage intensif)", impact: 10, category: "alimentaire", cost: 5, brand: "BoucherieMax", img: "img/steak.png", explanation: "Émissions massives de méthane (GES puissant), déforestation pour pâturages/soja, consommation d'eau énorme." },
        { id: 13, name: "Voyage avion A/R Paris-New York", impact: 10, category: "transport", cost: 800, brand: "AirFly", img: "img/avion.png", explanation: "Émissions très élevées de CO2 par passager, directement en haute altitude, impact climatique majeur pour une seule activité." },
        { id: 14, name: "Jean neuf", impact: 7, category: "vetement", cost: 60, brand: "DenimCo", img: "img/jean.png", explanation: "Culture du coton (eau/pesticides), procédés de teinture/délavage polluants, transport." },
        { id: 15, name: "Ordinateur portable neuf", impact: 8, category: "hightech", cost: 1000, brand: "LapTech", img: "img/laptop.png", explanation: "Similaire au smartphone neuf : minerais, énergie de fabrication, transport, fin de vie problématique." },
        { id: 16, name: "Fraises d'Espagne en hiver", impact: 6, category: "alimentaire", cost: 4, brand: "FruiSud", img: "img/fraises_hiver.png", explanation: "Culture sous serres chauffées (énergie), transport réfrigéré longue distance, hors saison locale." },
        { id: 17, name: "Sac plastique unique", impact: 6, category: "maison", cost: 0, brand: "SuperShop", img: "img/sac_plastique.png", explanation: "Très courte durée d'utilisation, pollution plastique persistante, dérivé du pétrole." },
        { id: 18, name: "Thon rouge en boîte", impact: 8, category: "alimentaire", cost: 3, brand: "Pescador", img: "img/thon_boite.png", explanation: "Surpêche menaçant l'espèce, pêche industrielle énergivore (carburant), transformation/conservation." },
        { id: 19, name: "Meuble en bois exotique non certifié", impact: 9, category: "maison", cost: 500, brand: "ExoticWood", img: "img/meuble_bois_exotique.png", explanation: "Risque élevé de déforestation illégale de forêts primaires, transport longue distance." },
        { id: 20, name: "Légumes locaux de saison", impact: 1, category: "alimentaire", cost: 2, brand: "MarchéLocal", img: "img/legumes_saison.png", explanation: "Circuit court, pas de transport longue distance ni de culture sous serre chauffée, faible impact." }
    ];

    const miniQuizzes = [
        { question: "Quel est le principal gaz à effet de serre émis par la digestion des ruminants (vaches, moutons) ?", options: ["Dioxyde de carbone (CO2)", "Méthane (CH4)", "Protoxyde d'azote (N2O)"], answer: 1, explanation: "Le méthane (CH4) est un gaz à effet de serre beaucoup plus puissant que le CO2 à court terme, émis lors de la digestion des ruminants." },
        { question: "Que signifie l'acronyme 'ACV' dans le contexte environnemental ?", options: ["Action Citoyenne Volontaire", "Analyse du Cycle de Vie", "Association Contre la Vitesse"], answer: 1, explanation: "L'Analyse du Cycle de Vie (ACV) est une méthode d'évaluation des impacts environnementaux d'un produit ou service, de l'extraction des matières premières à sa fin de vie." },
        { question: "Quel secteur est responsable de la majorité de la déforestation en Amazonie ?", options: ["L'exploitation minière", "L'élevage bovin et la culture du soja", "L'urbanisation"], answer: 1, explanation: "L'expansion des pâturages pour l'élevage bovin et des cultures de soja (souvent pour nourrir ce bétail) sont les causes majeures de la déforestation amazonienne." },
        { question: "Qu'appelle-t-on l' 'énergie grise' d'un produit ?", options: ["L'énergie consommée lors de son utilisation", "L'énergie nucléaire cachée", "L'énergie nécessaire à sa fabrication, transport et fin de vie"], answer: 2, explanation: "L'énergie grise est toute l'énergie consommée par le cycle de vie d'un produit, HORS sa phase d'utilisation (extraction, fabrication, transport, recyclage/élimination)." },
        { question: "Parmi ces labels, lequel garantit une gestion durable des forêts ?", options: ["Label Rouge", "FSC ou PEFC", "AB (Agriculture Biologique)"], answer: 1, explanation: "Les labels FSC (Forest Stewardship Council) et PEFC (Programme for the Endorsement of Forest Certification) assurent que le bois provient de forêts gérées durablement." }
    ];

    const difficultyLevels = ["👶 Jeune", "🧑 Adulte", "👨‍💼 Pro", "🧠 Expert", "🌟 Rare"];
    const initialScore = 100;
    const scorePenalty = 10; // Pénalité de base pour erreur
    const timerDuration = 60; // secondes
    const basePointsWin = 15; // Points de base si correct
    const quizPoints = 5; // Points pour bonne réponse quiz
    const MAX_ROUNDS = 5; // Nombre maximum de manches par partie

    // --- État du Jeu (Game State) ---
    let gameState = {
        players: [],
        currentPlayerIndex: 0,
        currentRound: 1,
        maxRounds: MAX_ROUNDS,
        productsInRound: [],
        correctOrder: [],
        timerInterval: null,
        timeLeft: timerDuration,
        difficulty: 1,
        numProductsToCompare: 5,
        useTimer: false,
        gameMode: 'normal',
        history: [], // Sera chargé depuis localStorage
        lastPlayerRanking: [],
        lastCorrectRanking: [],
        currentQuiz: null,
        proceedFrom: null, // D'où vient le clic "Suivant" ('ranking', 'quiz', 'timeout')
    };

    // --- Fonctions Utilitaires ---
    function switchScreen(screenId) {
        console.log(`Switching to screen: ${screenId}`);
        if (!screens[screenId]) {
            console.error(`Tentative de passage à un écran inconnu: ${screenId}`);
            return;
        }
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        screens[screenId].classList.add('active');
    }

    function shuffleArray(array) {
        // Algorithme Fisher-Yates
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // **** Fonction qui manquait précédemment ****
    function selectProductsForRound() {
        // Sélectionne N produits aléatoires depuis la liste complète
        // TODO: Pourrait être amélioré pour prendre en compte la difficulté
        console.log(`Sélection de ${gameState.numProductsToCompare} produits.`);
        const availableProducts = allProducts.filter(p => p.impact > 0); // Exclure items sans impact défini?
        if (availableProducts.length < gameState.numProductsToCompare) {
            console.warn(`Pas assez de produits disponibles (${availableProducts.length}) pour en sélectionner ${gameState.numProductsToCompare}. Ajustement...`);
            gameState.numProductsToCompare = availableProducts.length;
        }
        if (gameState.numProductsToCompare <= 0) {
             console.error("Aucun produit à sélectionner!");
             return []; // Retourne tableau vide si aucun produit
        }
        const shuffled = shuffleArray([...availableProducts]); // Crée une copie mélangée
        return shuffled.slice(0, gameState.numProductsToCompare); // Prend les N premiers
    }
    // ********************************************

    function loadHistoryFromStorage() {
        try {
            const storedHistory = localStorage.getItem('ecoChallengeHistory');
            console.log("Historique chargé depuis localStorage:", storedHistory ? "Oui" : "Non");
            return storedHistory ? JSON.parse(storedHistory) : [];
        } catch (e) {
            console.error("Erreur lors du chargement de l'historique depuis localStorage:", e);
            return [];
        }
    }

    function saveHistoryToStorage() {
        try {
            localStorage.setItem('ecoChallengeHistory', JSON.stringify(gameState.history));
            console.log("Historique sauvegardé.");
        } catch (e) {
            console.error("Erreur lors de la sauvegarde de l'historique dans localStorage:", e);
            alert("Impossible de sauvegarder l'historique. Le stockage local est peut-être plein ou désactivé.");
        }
    }

     function clearHistory() {
         if (confirm("Êtes-vous sûr de vouloir effacer tout l'historique et les meilleurs scores ? Cette action est irréversible.")) {
             gameState.history = [];
             try {
                 localStorage.removeItem('ecoChallengeHistory');
                 console.log("Historique effacé.");
                 displayHistoryAndScores(); // Rafraîchir l'affichage vide
             } catch (e) {
                 console.error("Erreur lors de la suppression de l'historique:", e);
                 alert("Impossible d'effacer l'historique.");
             }
         }
     }

    // --- Fonctions de Mise à Jour de l'Interface ---

    function updateDifficultyLabel() {
        if (!difficultySlider || !difficultyLabel) return;
        gameState.difficulty = parseInt(difficultySlider.value);
        difficultyLabel.textContent = difficultyLevels[gameState.difficulty];
    }

    function updatePlayerNameInputs() {
        if (!numPlayersInput || !playerNamesContainer) return;
        const numPlayers = parseInt(numPlayersInput.value) || 1;
        playerNamesContainer.innerHTML = ''; // Clear previous inputs
        for (let i = 0; i < numPlayers; i++) {
            const inputId = `player-name-${i}`;
            const label = document.createElement('label');
            label.htmlFor = inputId;
            label.textContent = `Nom Joueur ${i + 1}:`;
            label.style.display = 'block';
            label.style.marginLeft = '15px';
            label.style.marginTop = '5px';
            label.style.fontWeight = 'normal';
            label.style.color = '#333';

            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Joueur ${i + 1}`;
            input.id = inputId;
            input.maxLength = 20;

             playerNamesContainer.appendChild(label);
            playerNamesContainer.appendChild(input);
        }
    }

    function updatePlayerTurnDisplay() {
         if (!playerTurnDisplay || !scoreDisplay) return;
         if (gameState.players.length > 0 && gameState.players[gameState.currentPlayerIndex]) {
            const currentPlayer = gameState.players[gameState.currentPlayerIndex];
            playerTurnDisplay.textContent = currentPlayer.name;
            scoreDisplay.textContent = currentPlayer.score;
         } else {
            console.warn("Impossible de mettre à jour l'affichage du joueur - aucun joueur trouvé.");
            playerTurnDisplay.textContent = "N/A";
            scoreDisplay.textContent = "N/A";
         }
    }

    function setupProgressBars() {
        if (!progressBarsContainer) return;
        progressBarsContainer.innerHTML = '';
        gameState.players.forEach((player, index) => {
            const playerProgressDiv = document.createElement('div');
            playerProgressDiv.classList.add('player-progress');

            const label = document.createElement('label');
            label.setAttribute('for', `progress-${index}`);
            label.textContent = player.name;
            playerProgressDiv.appendChild(label);

            const container = document.createElement('div');
            container.classList.add('progress-bar-container');

            const bar = document.createElement('div');
            bar.classList.add('progress-bar');
            bar.id = `progress-${index}`;
            container.appendChild(bar);
            playerProgressDiv.appendChild(container);

            progressBarsContainer.appendChild(playerProgressDiv);
            player.progressBar = bar;
            updateProgressBar(index);
        });
    }

    function updateProgressBar(playerIndex) {
        const player = gameState.players[playerIndex];
        if (!player || !player.progressBar) return;

        const score = Math.max(0, player.score);
        const percentage = Math.min(100, (score / initialScore) * 100);
        player.progressBar.style.width = `${percentage}%`;
        player.progressBar.textContent = `${player.score}`;

        player.progressBar.classList.remove('low', 'critical');
        if (percentage < 50 && percentage >= 20) {
            player.progressBar.classList.add('low');
        } else if (percentage < 20) {
             player.progressBar.classList.add('critical');
        }
    }

    function displayProducts(products) {
        if (!productsToRankContainer || !rankingArea || !rankingPlaceholder) return;
        productsToRankContainer.innerHTML = '';
        rankingArea.innerHTML = '';
        rankingArea.appendChild(rankingPlaceholder);
        rankingPlaceholder.classList.remove('hidden');

        if (!products || products.length === 0) {
             console.warn("Aucun produit à afficher pour cette manche.");
             // Afficher un message à l'utilisateur?
             productsToRankContainer.innerHTML = "<p>Erreur: Aucun produit à classer.</p>";
             return;
         }

        products.forEach(product => {
            const elem = createProductElement(product);
            productsToRankContainer.appendChild(elem);
        });
        console.log(`${products.length} produits affichés pour classement.`);
    }

    function createProductElement(product, draggable = true) {
        const div = document.createElement('div');
        div.classList.add('product-item');
        div.dataset.id = product.id;
        div.dataset.name = product.name;
        if (draggable) {
            div.draggable = true;
            div.addEventListener('dragstart', handleDragStart);
            div.addEventListener('dragend', handleDragEnd);
        }
        const img = document.createElement('img');
        img.src = product.img || 'img/placeholder_product.png';
        img.alt = product.name;
        img.loading = 'lazy';
        img.onerror = () => { img.src = 'img/placeholder_product.png'; console.warn(`Image non trouvée: ${product.img}`); };
        div.appendChild(img);

        const nameSpan = document.createElement('span');
        nameSpan.textContent = product.name;
        div.appendChild(nameSpan);
        return div;
    }

     function displayHistoryAndScores() {
         gameState.history = loadHistoryFromStorage();
         if (!historyListContainer || !highScoresContainer) return;

         // Affichage Historique
         historyListContainer.innerHTML = '<ul></ul>';
         const historyUl = historyListContainer.querySelector('ul');
         if (!historyUl) return;
         const sortedHistory = [...gameState.history].sort((a, b) => new Date(b.date) - new Date(a.date));
         sortedHistory.slice(0, 30).forEach(game => {
             const li = document.createElement('li');
             const playersStr = game.players.map(p => `${p.name} (${p.score})`).join(', ');
             const gameDate = new Date(game.date).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short'});
             li.innerHTML = `<span>📅 ${gameDate} (${game.difficulty}, ${game.mode === 'duel' ? 'Duel' : 'Normal'})</span>
                             <span>👥 ${playersStr}</span>`;
             historyUl.appendChild(li);
         });
          if (gameState.history.length === 0) {
              historyListContainer.innerHTML = "<p>Aucune partie enregistrée.</p>";
          }

          // Affichage Meilleurs Scores
          highScoresContainer.innerHTML = '<ul></ul>';
          const scoresUl = highScoresContainer.querySelector('ul');
           if (!scoresUl) return;
          const allScores = gameState.history.flatMap(game =>
               game.players.map(player => ({ name: player.name, score: player.score, date: game.date }))
          );
          allScores.sort((a, b) => b.score - a.score);
          const topScores = allScores.slice(0, 10);

          if (topScores.length > 0) {
              topScores.forEach(score => {
                  const li = document.createElement('li');
                  const scoreDate = new Date(score.date).toLocaleDateString('fr-FR');
                  li.innerHTML = `<span>🏆 ${score.score} pts</span>
                                  <span>👤 ${score.name}</span>
                                  <span style="font-size: 0.85em; color: #757575;">(${scoreDate})</span>`;
                  scoresUl.appendChild(li);
              });
          } else {
              highScoresContainer.innerHTML = "<p>Pas encore de meilleurs scores.</p>";
          }
      }

      function displayReview() {
         if (!rankingReviewArea || !reviewPlayerRankingDiv || !reviewCorrectRankingDiv) return;
         reviewPlayerRankingDiv.innerHTML = '';
         gameState.lastPlayerRanking.forEach(item => {
            const elem = document.createElement('div');
            elem.classList.add('review-item');
            elem.textContent = item.name;
            reviewPlayerRankingDiv.appendChild(elem);
         });

         reviewCorrectRankingDiv.innerHTML = '';
          gameState.lastCorrectRanking.forEach(item => {
             const elem = document.createElement('div');
             elem.classList.add('review-item');
             elem.textContent = item.name;
             reviewCorrectRankingDiv.appendChild(elem);
         });
         rankingReviewArea.classList.remove('hidden');
         if(hideReviewBtn) hideReviewBtn.focus();
     }


    // --- Fonctions Logique de Jeu ---

    function startTimer() {
        clearInterval(gameState.timerInterval);
        if (!gameState.useTimer) {
            timerDisplay.classList.add('hidden');
            return;
        };
        timerDisplay.classList.remove('hidden');
        gameState.timeLeft = timerDuration;
        timerValueSpan.textContent = gameState.timeLeft;
        timerDisplay.classList.remove('active');

        gameState.timerInterval = setInterval(() => {
            gameState.timeLeft--;
            timerValueSpan.textContent = gameState.timeLeft;
            if (gameState.timeLeft <= 10 && gameState.timeLeft > 0) {
                 timerDisplay.classList.add('active');
            }
            if (gameState.timeLeft <= 0) {
                // Géré par handleTimeUp maintenant pour éviter double appel
                handleTimeUp();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(gameState.timerInterval);
    }

    function handleTimeUp() {
         // Vérifie si le timer doit effectivement déclencher une action
         // (pas déjà en cours de validation, pas sur un autre écran)
         if (!screens.game.classList.contains('active') || (submitRankingBtn && submitRankingBtn.disabled)) {
             // console.log("handleTimeUp ignoré: jeu non actif ou action déjà soumise.");
             stopTimer(); // Assure l'arrêt du timer même s'il est ignoré
             return;
         }

        stopTimer(); // Arrête le timer pour éviter répétition
        console.log("Temps écoulé !");
        ecoCharacterMessage.textContent = "Oh non, le temps est écoulé ! ⌛";
        feedbackArea.textContent = "Temps écoulé ! Pénalité appliquée.";
        feedbackArea.className = 'incorrect';

        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        // Vérification que currentPlayer existe
        if (!currentPlayer) {
            console.error("Erreur handleTimeUp: currentPlayer non trouvé.");
            return;
        }
        currentPlayer.score = Math.max(0, currentPlayer.score - scorePenalty * 2);
        updateProgressBar(gameState.currentPlayerIndex);

        if(submitRankingBtn) {
            submitRankingBtn.disabled = true;
            submitRankingBtn.classList.add('hidden');
        }

        gameState.proceedFrom = 'timeout';
        if (!checkGameOver()) { // Vérifie si la pénalité a terminé le jeu
            if(nextStepBtn) {
                 nextStepBtn.classList.remove('hidden');
                 nextStepBtn.focus();
            }
         }
    }

    function startGame(mode = 'normal') {
        console.log(`Lancement du jeu en mode: ${mode}`);
        // 1. Lecture et validation des paramètres
        gameState.numProductsToCompare = parseInt(numProductsInput.value) || 5;
        gameState.useTimer = timerCheckbox.checked;
        gameState.gameMode = mode;
        gameState.difficulty = parseInt(difficultySlider.value);
        const numPlayers = parseInt(numPlayersInput.value) || 1;

        // 2. Configuration des joueurs
        gameState.players = [];
        for (let i = 0; i < numPlayers; i++) {
            const nameInput = document.getElementById(`player-name-${i}`);
            const playerName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : `Joueur ${i + 1}`;
            gameState.players.push({ name: playerName, score: initialScore, progressBar: null });
        }
        console.log("Joueurs configurés:", gameState.players);

        // Ajustements mode Duel
        if (mode === 'duel') {
             if(gameState.players.length < 2) {
                 alert("Le mode Duel Rapide nécessite au moins 2 joueurs ! Lancement en mode Normal.");
                 gameState.gameMode = 'normal';
                 if(gameState.players.length === 0) gameState.players.push({ name: "Joueur 1", score: initialScore, progressBar: null });
                 gameState.maxRounds = MAX_ROUNDS; // Reset au max normal
             } else {
                  gameState.numProductsToCompare = 5;
                  gameState.useTimer = true;
                  gameState.maxRounds = 3; // Ex: 3 manches en duel
             }
        } else {
             gameState.maxRounds = MAX_ROUNDS;
             if (gameState.players.length === 0) gameState.players.push({ name: "Joueur 1", score: initialScore, progressBar: null });
        }
        if(totalRoundsDisplay) totalRoundsDisplay.textContent = gameState.maxRounds;


        gameState.currentPlayerIndex = 0;
        gameState.currentRound = 1;

        // 3. Mise en place UI Jeu
        setupProgressBars();
        updatePlayerTurnDisplay();
        if(roundInfoDisplay) roundInfoDisplay.textContent = gameState.currentRound;
        if(feedbackArea) feedbackArea.textContent = '';
        if(explanationArea) explanationArea.classList.add('hidden');
        if(miniQuizArea) miniQuizArea.classList.add('hidden');
        if(rankingReviewArea) rankingReviewArea.classList.add('hidden');
        if(showReviewBtn) showReviewBtn.classList.add('hidden');
        if(nextStepBtn) nextStepBtn.classList.add('hidden');
        if(submitRankingBtn) {
            submitRankingBtn.classList.remove('hidden');
            submitRankingBtn.disabled = false;
        }

        // 4. Préparation de la manche
        startNewRound();

        // 5. Affichage Écran Jeu
        switchScreen('game');
        if(ecoCharacterMessage && gameState.players[0]) ecoCharacterMessage.textContent = `C'est parti ${gameState.players[0].name} ! Classe les produits !`;
    }

     // Fonction pour démarrer une nouvelle manche (ou la première)
     function startNewRound() {
         console.log(`Début Manche ${gameState.currentRound}`);
         gameState.productsInRound = selectProductsForRound(); // Appel de la fonction corrigée
         // Gérer le cas où aucun produit n'est retourné
         if (!gameState.productsInRound || gameState.productsInRound.length === 0) {
             console.error("Impossible de démarrer la manche: aucun produit sélectionné.");
             alert("Erreur: Impossible de charger les produits pour cette manche.");
             switchScreen('start'); // Retour au menu
             return;
         }
         gameState.correctOrder = [...gameState.productsInRound].sort((a, b) => a.impact - b.impact);
         displayProducts(gameState.productsInRound);

         // Réinitialiser état boutons/feedbacks pour le tour
         if(feedbackArea) feedbackArea.textContent = '';
         if(explanationArea) explanationArea.classList.add('hidden');
         if(miniQuizArea) miniQuizArea.classList.add('hidden');
         if(nextStepBtn) nextStepBtn.classList.add('hidden');
         if(submitRankingBtn) {
            submitRankingBtn.classList.remove('hidden');
            submitRankingBtn.disabled = false;
         }

         startTimer(); // Démarre le timer pour le tour/joueur
     }


    function checkRanking() {
        stopTimer();
        if(!rankingArea || !feedbackArea || !submitRankingBtn) return; // Vérif éléments

        const rankedItems = Array.from(rankingArea.querySelectorAll('.product-item'));
        const rankedIds = rankedItems.map(item => parseInt(item.dataset.id));
        const correctIds = gameState.correctOrder.map(product => product.id);

        // --- Validation ---
        if (rankedIds.length !== correctIds.length) {
             feedbackArea.textContent = `Veuillez classer tous les ${correctIds.length} produits avant de valider.`;
             feedbackArea.className = 'incorrect';
             startTimer();
             return;
        }

        // --- Comparaison ---
        gameState.lastPlayerRanking = rankedItems.map(item => ({ id: parseInt(item.dataset.id), name: item.dataset.name }));
        gameState.lastCorrectRanking = gameState.correctOrder.map(product => ({ id: product.id, name: product.name }));

        let isCorrect = true;
        let correctPositions = 0;
        for (let i = 0; i < correctIds.length; i++) {
            if (rankedIds[i] === correctIds[i]) {
                correctPositions++;
            } else {
                isCorrect = false;
            }
        }

        // --- Attribution Score & Feedback ---
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        if(!currentPlayer) { console.error("Erreur checkRanking: currentPlayer non trouvé."); return; }

        if(explanationArea) {
            explanationArea.innerHTML = '';
            explanationArea.classList.add('hidden');
        }

        if (isCorrect) {
            feedbackArea.textContent = "Parfait ! Excellent classement ! 👍";
            feedbackArea.className = 'correct';
            if(ecoCharacterMessage) ecoCharacterMessage.textContent = "Bravo ! C'est la bonne approche !";
            let pointsEarned = basePointsWin + (gameState.difficulty * 5);
             if (gameState.useTimer && gameState.timeLeft > timerDuration * 0.6) {
                 pointsEarned += 5;
                 feedbackArea.textContent += " (+ Bonus rapidité !)";
             }
             currentPlayer.score += pointsEarned;
             if(showReviewBtn) showReviewBtn.classList.add('hidden');

        } else {
             const penalty = scorePenalty + (gameState.difficulty * 2);
             currentPlayer.score = Math.max(0, currentPlayer.score - penalty);

             feedbackArea.textContent = `Oups ! ${correctPositions}/${correctIds.length} bien placés. -${penalty} pts.`;
             feedbackArea.className = 'incorrect';
             if(ecoCharacterMessage) ecoCharacterMessage.textContent = "Hmm, regarde bien l'impact de chaque produit...";

             if(explanationArea) {
                 explanationArea.innerHTML = '<strong>Classement Correct (du - au + impactant) :</strong><ol>';
                 gameState.correctOrder.forEach(product => {
                     explanationArea.innerHTML += `<li><b>${product.name}</b> <small>(Impact: ${product.impact})</small>: ${product.explanation || ''}</li>`;
                 });
                 explanationArea.innerHTML += '</ol>';
                 explanationArea.classList.remove('hidden');
             }
             if(showReviewBtn) showReviewBtn.classList.remove('hidden');
        }

        updateProgressBar(gameState.currentPlayerIndex);
        submitRankingBtn.disabled = true;
        submitRankingBtn.classList.add('hidden');

        // --- Transition ---
        gameState.proceedFrom = 'ranking';
        if (!checkGameOver()) { // Vérifie si la partie est finie APRES modif score
             if(nextStepBtn) {
                 nextStepBtn.classList.remove('hidden');
                 nextStepBtn.focus();
            }
         }
    }

    function showMiniQuiz() {
        if (!miniQuizArea || miniQuizzes.length === 0) {
            console.warn("Pas de quiz disponible ou zone quiz non trouvée.");
            nextTurnOrRound();
            return;
        }
        console.log("Affichage Mini Quiz");
        if(feedbackArea) feedbackArea.textContent = '';
        if(explanationArea) explanationArea.classList.add('hidden');
        miniQuizArea.classList.remove('hidden');
        if(quizFeedback) quizFeedback.textContent = '';

        const quizIndex = Math.floor(Math.random() * miniQuizzes.length);
        gameState.currentQuiz = miniQuizzes[quizIndex];

        if(quizQuestion) quizQuestion.textContent = gameState.currentQuiz.question;
        if(quizOptionsContainer) {
            quizOptionsContainer.innerHTML = ''; // Vider anciennes options
            gameState.currentQuiz.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.onclick = () => handleQuizAnswer(index);
                quizOptionsContainer.appendChild(button);
            });
        }
        if(ecoCharacterMessage) ecoCharacterMessage.textContent = "Petite question bonus ! 🤔";
    }

    function handleQuizAnswer(selectedIndex) {
        if (!gameState.currentQuiz || !quizFeedback || !quizOptionsContainer) return;
        console.log(`Réponse Quiz sélectionnée: index ${selectedIndex}`);

        const correctAnswerIndex = gameState.currentQuiz.answer;
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        if(!currentPlayer) { console.error("Erreur handleQuizAnswer: currentPlayer non trouvé."); return; }


        Array.from(quizOptionsContainer.querySelectorAll('button')).forEach(btn => btn.disabled = true);

        if (selectedIndex === correctAnswerIndex) {
            quizFeedback.textContent = `✔️ Correct ! ${gameState.currentQuiz.explanation}`;
            quizFeedback.className = 'correct';
            let pointsEarned = quizPoints + gameState.difficulty;
            currentPlayer.score += pointsEarned;
             if(ecoCharacterMessage) ecoCharacterMessage.textContent = `Bien joué ! +${pointsEarned} points !`;
        } else {
            quizFeedback.textContent = `❌ Incorrect. La réponse était : ${gameState.currentQuiz.options[correctAnswerIndex]}. ${gameState.currentQuiz.explanation}`;
            quizFeedback.className = 'incorrect';
            if(ecoCharacterMessage) ecoCharacterMessage.textContent = "Dommage, ce n'était pas ça.";
        }

        updateProgressBar(gameState.currentPlayerIndex);

        gameState.proceedFrom = 'quiz';
        if (!checkGameOver()) {
            setTimeout(() => {
                 if(nextStepBtn) {
                     nextStepBtn.classList.remove('hidden');
                     nextStepBtn.focus();
                 }
            }, 2000);
         }
    }

    function handleNextStep() {
        console.log("Bouton 'Suivant' cliqué.");
        if(nextStepBtn) nextStepBtn.classList.add('hidden');
        if(feedbackArea) feedbackArea.textContent = '';
        if(explanationArea) explanationArea.classList.add('hidden');
        if(miniQuizArea) miniQuizArea.classList.add('hidden');
        if(quizFeedback) quizFeedback.textContent = '';
        if(rankingReviewArea) rankingReviewArea.classList.add('hidden');

        const cameFromRankingOrTimeout = (gameState.proceedFrom === 'ranking' || gameState.proceedFrom === 'timeout');
        const shouldShowQuiz = cameFromRankingOrTimeout && Math.random() < 0.35 && miniQuizzes.length > 0;

        if (shouldShowQuiz) {
            console.log("Décision: Afficher un quiz.");
            showMiniQuiz();
        } else {
            console.log("Décision: Passer au tour/manche suivant(e).");
            nextTurnOrRound();
        }
        gameState.proceedFrom = null;
    }

    function nextTurnOrRound() {
        // Nettoyage UI
        if(nextStepBtn) nextStepBtn.classList.add('hidden');
        if(feedbackArea) feedbackArea.textContent = '';
        if(explanationArea) explanationArea.classList.add('hidden');
        if(miniQuizArea) miniQuizArea.classList.add('hidden');
        if(rankingReviewArea) rankingReviewArea.classList.add('hidden');
        if(showReviewBtn) showReviewBtn.classList.add('hidden');

        // Logique passage joueur/manche
        gameState.currentPlayerIndex++;
        if (gameState.currentPlayerIndex >= gameState.players.length) {
            // Fin de round -> Nouvelle manche
            gameState.currentPlayerIndex = 0;
            gameState.currentRound++;

             if (gameState.currentRound > gameState.maxRounds) {
                 endGame(`Nombre maximum de ${gameState.maxRounds} manches atteint !`);
                 return;
             }

             if(roundInfoDisplay) roundInfoDisplay.textContent = gameState.currentRound;
             if(ecoCharacterMessage && gameState.players.length > 0) ecoCharacterMessage.textContent = `Manche ${gameState.currentRound} ! À toi, ${gameState.players[0].name} !`;
             startNewRound(); // Lance la nouvelle manche

        } else {
            // Joueur suivant dans la même manche
             if(ecoCharacterMessage) ecoCharacterMessage.textContent = `À toi, ${gameState.players[gameState.currentPlayerIndex].name} !`;
             displayProducts(gameState.productsInRound);
             updatePlayerTurnDisplay();
              // Réinitialiser état boutons/feedbacks pour ce joueur
             if(feedbackArea) feedbackArea.textContent = '';
             if(explanationArea) explanationArea.classList.add('hidden');
             if(miniQuizArea) miniQuizArea.classList.add('hidden');
             if(nextStepBtn) nextStepBtn.classList.add('hidden');
             if(submitRankingBtn) {
                submitRankingBtn.classList.remove('hidden');
                submitRankingBtn.disabled = false;
             }
             startTimer(); // Redémarre timer pour ce joueur
         }
    }

    function checkGameOver() {
        const losingPlayer = gameState.players.find(p => p.score <= 0);
        if (losingPlayer) {
            console.log(`Game Over: ${losingPlayer.name} a atteint 0 points.`);
            // endGame est appelé directement ici pour arrêter immédiatement
            endGame(`${losingPlayer.name} n'a plus de points ! La partie est terminée.`);
            return true; // Game over
        }
        return false; // Game continues
    }

    function endGame(reason) {
         console.log(`Fin de partie: ${reason}`);
         stopTimer();
         switchScreen('gameOver');

         if (finalScoresContainer) {
             finalScoresContainer.innerHTML = `<h3>${reason}</h3><ul></ul>`;
             const scoreListUl = finalScoresContainer.querySelector('ul');
             if (scoreListUl) {
                 const sortedPlayers = [...gameState.players].sort((a, b) => b.score - a.score);
                 sortedPlayers.forEach(player => {
                     const li = document.createElement('li');
                     li.textContent = `${player.name}: `;
                     const scoreSpan = document.createElement('span');
                     scoreSpan.textContent = `${player.score} points`;
                     li.appendChild(scoreSpan);
                     scoreListUl.appendChild(li);
                 });
                 saveGameResult(sortedPlayers); // Sauvegarde après affichage
             }
         } else {
             console.error("Element finalScoresContainer non trouvé pour afficher les scores.");
         }

         const summaries = [ /* ... (liste des messages) ... */ ];
          if(ecoSummaryDescription) ecoSummaryDescription.textContent = summaries[Math.floor(Math.random() * summaries.length)];

          if (showReviewBtn && rankingReviewArea) {
               // Afficher bouton revoir SEULEMENT si la dernière action était un classement incorrect
              const wasIncorrectRanking = (gameState.proceedFrom === 'ranking' && feedbackArea && feedbackArea.classList.contains('incorrect'));
              if (wasIncorrectRanking) {
                  showReviewBtn.classList.remove('hidden');
              } else {
                  showReviewBtn.classList.add('hidden');
                  rankingReviewArea.classList.add('hidden');
              }
          }
         if(restartGameBtn) restartGameBtn.focus();
    }

    function saveGameResult(sortedPlayers) {
         const gameResult = {
             date: new Date().toISOString(),
             difficulty: difficultyLevels[gameState.difficulty],
             players: sortedPlayers.map(p => ({ name: p.name, score: p.score })),
             mode: gameState.gameMode
         };
         gameState.history = loadHistoryFromStorage();
         gameState.history.push(gameResult);
         saveHistoryToStorage();
    }

    // --- Drag and Drop ---
    let draggedItem = null;

    function handleDragStart(e) {
        // if (!productsToRankContainer.contains(e.target)) { e.preventDefault(); return; } // Optionnel
        draggedItem = e.target;
        setTimeout(() => draggedItem.classList.add('dragging'), 0);
        try { // dataTransfer peut échouer dans certains contextes
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', draggedItem.dataset.id);
        } catch (error) {
             console.warn("Erreur DataTransfer:", error);
        }
        // console.log(`Drag Start: ${draggedItem.dataset.name}`);
    }

    function handleDragEnd(e) {
        // console.log("Drag End");
         if (draggedItem) {
             draggedItem.classList.remove('dragging');
         }
         if(rankingArea) rankingArea.classList.remove('drag-over');
         if(productsToRankContainer) productsToRankContainer.classList.remove('drag-over');
         draggedItem = null;
    }

    function handleDragOver(e) {
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'; // Vérifier si dataTransfer existe
        const targetZone = e.currentTarget;
        if (targetZone === rankingArea || targetZone === productsToRankContainer) {
            targetZone.classList.add('drag-over');
            if (targetZone === rankingArea && rankingPlaceholder) {
                rankingPlaceholder.classList.add('hidden');
            }
        }
    }

    function handleDragLeave(e) {
         const targetZone = e.currentTarget;
         if (targetZone === rankingArea || targetZone === productsToRankContainer) {
             targetZone.classList.remove('drag-over');
             if (targetZone === rankingArea && rankingPlaceholder && rankingArea.querySelectorAll('.product-item').length === 0) {
                 rankingPlaceholder.classList.remove('hidden');
             }
         }
    }

    function handleDrop(e) {
        e.preventDefault();
        // console.log("Drop event");
        const targetZone = e.currentTarget;
        if(targetZone) targetZone.classList.remove('drag-over');

        if (!draggedItem) { /* console.log("Drop annulé: no dragged item.");*/ return; }

        if ((targetZone === rankingArea || targetZone === productsToRankContainer) && targetZone !== draggedItem.parentNode) { // Vérifie qu'on ne drop pas dans la même zone
             // console.log(`Dropped ${draggedItem.dataset.name} onto ${targetZone.id}`);
             targetZone.appendChild(draggedItem);

             if (rankingPlaceholder && rankingArea) { // Gérer placeholder
                 if (rankingArea.querySelectorAll('.product-item').length > 0) {
                     rankingPlaceholder.classList.add('hidden');
                 } else {
                     rankingPlaceholder.classList.remove('hidden');
                 }
             }
        } else {
            // console.log("Drop invalide.");
        }
    }

    // --- Attachement des Écouteurs d'Événements ---
    function setupEventListeners() {
        console.log("Attachement des écouteurs d'événements...");
        // Utilisation de '??' (nullish coalescing) pour éviter erreurs si élément non trouvé
        // (même si on a vérifié les principaux au début)
        difficultySlider?.addEventListener('input', updateDifficultyLabel);
        numPlayersInput?.addEventListener('input', updatePlayerNameInputs);
        startGameBtn?.addEventListener('click', () => startGame('normal'));
        duelRapideBtn?.addEventListener('click', () => startGame('duel'));
        showHistoryBtn?.addEventListener('click', () => {
            displayHistoryAndScores();
            switchScreen('history');
        });
        submitRankingBtn?.addEventListener('click', checkRanking);
        nextStepBtn?.addEventListener('click', handleNextStep);
        restartGameBtn?.addEventListener('click', () => switchScreen('start'));
        backToMenuBtn?.addEventListener('click', () => switchScreen('start'));
        showReviewBtn?.addEventListener('click', displayReview);
        hideReviewBtn?.addEventListener('click', () => rankingReviewArea?.classList.add('hidden'));
        backToMenuFromHistoryBtn?.addEventListener('click', () => switchScreen('start'));
        clearHistoryBtn?.addEventListener('click', clearHistory);

        [productsToRankContainer, rankingArea].forEach(zone => {
            zone?.addEventListener('dragover', handleDragOver);
            zone?.addEventListener('dragleave', handleDragLeave);
            zone?.addEventListener('drop', handleDrop);
        });
        console.log("Écouteurs attachés.");
    }

    // --- Initialisation du Jeu ---
    function initializeGame() {
        console.log("Initialisation...");
        updateDifficultyLabel();
        updatePlayerNameInputs();
        displayHistoryAndScores(); // Charger sans forcément afficher l'écran historique
        setupEventListeners();
        switchScreen('start');
        submitRankingBtn?.classList.add('hidden');
        nextStepBtn?.classList.add('hidden');
        console.log("Jeu initialisé. Prêt.");
    }

    // --- Démarrage ---
    initializeGame();

}); // Fin de DOMContentLoaded