// ==========================================================================
// CARRERA DEL SABER - MÓDULO MULTIJUGADOR ONLINE (FASE 2: FIREBASE REALTIME)
// ==========================================================================

class MultiplayerManager {
    constructor() {
        this.currentMode = 'local'; // 'local' | 'online'
        this.onlineTab = 'create';  // 'create' | 'join' | 'waiting'
        this.roomCode = '';
        this.myPlayerId = '';
        this.isHost = false;
        this.playerName = 'Cami';
        this.playerAvatar = '🐬';
        this.selectedGrade = 6;
        this.targetPlayers = 2;
        this.playersInRoom = [];
        this.roomRef = null;
        this.isOnlineGameActive = false;
        this.lastHandledRollTimestamp = 0;
        this.lastHandledQuestionTimestamp = 0;
        this.lastHandledAnswerTimestamp = 0;

        this.initDOM();
        this.bindEvents();
        this.checkURLParams();
        this.loadStoredFirebaseConfig();
    }

    initDOM() {
        // Mode buttons
        this.btnConnLocal = document.getElementById('btn-conn-local');
        this.btnConnOnline = document.getElementById('btn-conn-online');
        this.localContainer = document.getElementById('local-setup-container');
        this.onlineContainer = document.getElementById('online-setup-container');

        // Sub tabs
        this.tabCreateRoom = document.getElementById('tab-create-room');
        this.tabJoinRoom = document.getElementById('tab-join-room');
        this.panelCreateRoom = document.getElementById('panel-create-room');
        this.panelJoinRoom = document.getElementById('panel-join-room');
        this.panelWaitingRoom = document.getElementById('panel-waiting-room');

        // Host Inputs
        this.hostNameInput = document.getElementById('host-player-name');
        this.hostAvatarSelector = document.getElementById('host-avatar-selector');
        this.btnDoCreateRoom = document.getElementById('btn-do-create-room');

        // Guest Inputs
        this.joinCodeInput = document.getElementById('join-room-code-input');
        this.guestNameInput = document.getElementById('guest-player-name');
        this.guestAvatarSelector = document.getElementById('guest-avatar-selector');
        this.btnDoJoinRoom = document.getElementById('btn-do-join-room');

        // Waiting Room Elements
        this.displayRoomCode = document.getElementById('display-room-code');
        this.btnCopyLink = document.getElementById('btn-copy-room-link');
        this.copyBtnText = document.getElementById('copy-btn-text');
        this.btnShareWhatsApp = document.getElementById('btn-share-whatsapp');
        this.waitingCount = document.getElementById('waiting-count');
        this.waitingGradeBadge = document.getElementById('waiting-grade-badge');
        this.waitingPlayersGrid = document.getElementById('waiting-players-grid');
        this.btnStartOnlineGame = document.getElementById('btn-start-online-game');
        this.btnLeaveRoom = document.getElementById('btn-leave-room');
        this.waitingRoomNotice = document.getElementById('waiting-room-notice');

        // Firebase Config Modal Elements
        this.firebaseModal = document.getElementById('firebase-config-modal');
        this.btnOpenFirebaseModal = document.getElementById('btn-open-firebase-modal');
        this.btnCloseFirebaseModal = document.getElementById('btn-close-firebase-modal');
        this.btnSaveFirebaseConfig = document.getElementById('btn-save-firebase-config');
        this.firebaseInputApiKey = document.getElementById('firebase-input-api-key');
        this.firebaseInputDbUrl = document.getElementById('firebase-input-db-url');
        this.firebaseInputProjectId = document.getElementById('firebase-input-project-id');
        this.firebaseStatusBadge = document.getElementById('firebase-status-badge');
    }

    bindEvents() {
        if (!this.btnConnLocal || !this.btnConnOnline) return;

        // 1. Selector Local vs Online
        this.btnConnLocal.addEventListener('click', () => this.switchMode('local'));
        this.btnConnOnline.addEventListener('click', () => this.switchMode('online'));

        // 2. Sub tabs: Crear vs Unirse
        if (this.tabCreateRoom) {
            this.tabCreateRoom.addEventListener('click', () => this.switchOnlineTab('create'));
        }
        if (this.tabJoinRoom) {
            this.tabJoinRoom.addEventListener('click', () => this.switchOnlineTab('join'));
        }

        // 3. Avatar selector (Host)
        if (this.hostAvatarSelector) {
            this.hostAvatarSelector.querySelectorAll('.avatar-opt').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.hostAvatarSelector.querySelectorAll('.avatar-opt').forEach(b => {
                        b.classList.remove('active', 'border-2', 'border-indigo-600', 'bg-indigo-50', 'shadow-xs');
                        b.classList.add('border', 'border-slate-200', 'bg-white');
                    });
                    btn.classList.add('active', 'border-2', 'border-indigo-600', 'bg-indigo-50', 'shadow-xs');
                    btn.classList.remove('border-slate-200', 'bg-white');
                    this.playerAvatar = btn.dataset.avatar;
                });
            });
        }

        // 4. Avatar selector (Guest)
        if (this.guestAvatarSelector) {
            this.guestAvatarSelector.querySelectorAll('.avatar-opt').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.guestAvatarSelector.querySelectorAll('.avatar-opt').forEach(b => {
                        b.classList.remove('active', 'border-2', 'border-emerald-600', 'bg-emerald-50', 'shadow-xs');
                        b.classList.add('border', 'border-slate-200', 'bg-white');
                    });
                    btn.classList.add('active', 'border-2', 'border-emerald-600', 'bg-emerald-50', 'shadow-xs');
                    btn.classList.remove('border-slate-200', 'bg-white');
                    this.playerAvatar = btn.dataset.avatar;
                });
            });
        }

        // 5. Grado Online
        document.querySelectorAll('.online-grade-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.online-grade-btn').forEach(b => {
                    b.classList.remove('active', 'border-2', 'border-indigo-600', 'bg-indigo-50', 'text-indigo-700', 'font-black', 'shadow-xs');
                    b.classList.add('border', 'border-slate-200', 'bg-white', 'text-slate-700', 'font-bold');
                });
                btn.classList.add('active', 'border-2', 'border-indigo-600', 'bg-indigo-50', 'text-indigo-700', 'font-black', 'shadow-xs');
                btn.classList.remove('border-slate-200', 'bg-white', 'text-slate-700', 'font-bold');
                this.selectedGrade = parseInt(btn.dataset.grade);
            });
        });

        // 6. Botón Crear Sala
        if (this.btnDoCreateRoom) {
            this.btnDoCreateRoom.addEventListener('click', () => this.handleCreateRoom());
        }

        // 7. Botón Unirse a Sala
        if (this.btnDoJoinRoom) {
            this.btnDoJoinRoom.addEventListener('click', () => this.handleJoinRoom());
        }

        // Auto-uppercase en código de sala
        if (this.joinCodeInput) {
            this.joinCodeInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            });
            this.joinCodeInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') this.handleJoinRoom();
            });
        }

        // 8. Botón Copiar Enlace
        if (this.btnCopyLink) {
            this.btnCopyLink.addEventListener('click', () => this.copyInviteLink());
        }

        // 9. Salir de la sala
        if (this.btnLeaveRoom) {
            this.btnLeaveRoom.addEventListener('click', () => this.leaveRoom());
        }

        // 10. Comenzar Partida Online (Anfitriona)
        if (this.btnStartOnlineGame) {
            this.btnStartOnlineGame.addEventListener('click', () => this.startOnlineGame());
        }

        // 11. Modal de Configuración Firebase
        if (this.btnOpenFirebaseModal) {
            this.btnOpenFirebaseModal.addEventListener('click', () => this.openFirebaseModal());
        }
        if (this.btnCloseFirebaseModal) {
            this.btnCloseFirebaseModal.addEventListener('click', () => this.closeFirebaseModal());
        }
        if (this.btnSaveFirebaseConfig) {
            this.btnSaveFirebaseConfig.addEventListener('click', () => this.saveFirebaseConfig());
        }
    }

    loadStoredFirebaseConfig() {
        const stored = localStorage.getItem('carrera_firebase_config');
        if (stored) {
            try {
                const conf = JSON.parse(stored);
                if (conf.apiKey && conf.databaseURL) {
                    if (typeof firebase !== 'undefined' && (!window.realtimeDb || !isFirebaseConfigured())) {
                        try {
                            if (firebase.apps.length === 0) {
                                window.firebaseApp = firebase.initializeApp(conf);
                            }
                            window.realtimeDb = firebase.database();
                            console.log("🟢 Firebase cargado desde localStorage.");
                        } catch (e) {
                            console.warn("Error cargando config de localStorage:", e);
                        }
                    }
                }
            } catch (e) {}
        }
        this.updateFirebaseStatusBadge();
    }

    updateFirebaseStatusBadge() {
        if (!this.firebaseStatusBadge) return;
        const ready = typeof realtimeDb !== 'undefined' && realtimeDb !== null;
        if (ready) {
            this.firebaseStatusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black';
            this.firebaseStatusBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-500"></span> <span>Servidor Firebase: Conectado</span>';
        } else {
            this.firebaseStatusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-black cursor-pointer hover:bg-amber-200 transition-colors';
            this.firebaseStatusBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> <span>Configurar Firebase (Clic acá)</span>';
            this.firebaseStatusBadge.onclick = () => this.openFirebaseModal();
        }
    }

    openFirebaseModal() {
        if (!this.firebaseModal) return;
        this.firebaseModal.classList.remove('hidden');
        this.firebaseModal.classList.add('flex');

        // Prellenar si hay algo guardado
        const stored = localStorage.getItem('carrera_firebase_config');
        if (stored) {
            try {
                const conf = JSON.parse(stored);
                if (this.firebaseInputApiKey) this.firebaseInputApiKey.value = conf.apiKey || '';
                if (this.firebaseInputDbUrl) this.firebaseInputDbUrl.value = conf.databaseURL || '';
                if (this.firebaseInputProjectId) this.firebaseInputProjectId.value = conf.projectId || '';
            } catch (e) {}
        }
    }

    closeFirebaseModal() {
        if (!this.firebaseModal) return;
        this.firebaseModal.classList.add('hidden');
        this.firebaseModal.classList.remove('flex');
    }

    saveFirebaseConfig() {
        const apiKey = this.firebaseInputApiKey ? this.firebaseInputApiKey.value.trim() : '';
        const dbUrl = this.firebaseInputDbUrl ? this.firebaseInputDbUrl.value.trim() : '';
        const projId = this.firebaseInputProjectId ? this.firebaseInputProjectId.value.trim() : '';

        if (!apiKey || !dbUrl) {
            alert('Por favor ingresá al menos la API Key y la Database URL de tu proyecto de Firebase.');
            return;
        }

        const config = {
            apiKey: apiKey,
            authDomain: `${projId || 'carrera'}.firebaseapp.com`,
            databaseURL: dbUrl,
            projectId: projId || 'carrera-del-saber',
            storageBucket: `${projId || 'carrera'}.appspot.com`
        };

        localStorage.setItem('carrera_firebase_config', JSON.stringify(config));

        try {
            if (typeof firebase !== 'undefined') {
                if (firebase.apps.length > 0) {
                    firebase.app().delete().then(() => {
                        window.firebaseApp = firebase.initializeApp(config);
                        window.realtimeDb = firebase.database();
                        this.updateFirebaseStatusBadge();
                        this.closeFirebaseModal();
                        alert('¡Configuración guardada y Firebase conectado exitosamente! 🎉');
                    });
                    return;
                } else {
                    window.firebaseApp = firebase.initializeApp(config);
                    window.realtimeDb = firebase.database();
                    this.updateFirebaseStatusBadge();
                    this.closeFirebaseModal();
                    alert('¡Configuración guardada y Firebase conectado exitosamente! 🎉');
                    return;
                }
            }
        } catch (err) {
            alert('Error al conectar con Firebase: ' + err.message);
        }
    }

    switchMode(mode) {
        this.currentMode = mode;
        const titleLocal = document.getElementById('title-conn-local');
        const titleOnline = document.getElementById('title-conn-online');

        if (mode === 'local') {
            this.btnConnLocal.classList.add('active', 'border-2', 'border-blue-500', 'bg-blue-50/50', 'shadow-sm');
            this.btnConnLocal.classList.remove('border-slate-200', 'bg-slate-50/60');
            if (titleLocal) titleLocal.className = 'font-black text-blue-700 text-sm';

            this.btnConnOnline.classList.remove('active', 'border-2', 'border-emerald-500', 'bg-emerald-50/50', 'shadow-sm');
            this.btnConnOnline.classList.add('border-slate-200', 'bg-slate-50/60');
            if (titleOnline) titleOnline.className = 'font-black text-slate-800 text-sm';

            if (this.localContainer) this.localContainer.classList.remove('hidden');
            if (this.onlineContainer) {
                this.onlineContainer.classList.add('hidden');
                this.onlineContainer.classList.remove('flex');
            }
        } else {
            this.btnConnOnline.classList.add('active', 'border-2', 'border-emerald-500', 'bg-emerald-50/50', 'shadow-sm');
            this.btnConnOnline.classList.remove('border-slate-200', 'bg-slate-50/60');
            if (titleOnline) titleOnline.className = 'font-black text-emerald-700 text-sm';

            this.btnConnLocal.classList.remove('active', 'border-2', 'border-blue-500', 'bg-blue-50/50', 'shadow-sm');
            this.btnConnLocal.classList.add('border-slate-200', 'bg-slate-50/60');
            if (titleLocal) titleLocal.className = 'font-black text-slate-800 text-sm';

            if (this.localContainer) this.localContainer.classList.add('hidden');
            if (this.onlineContainer) {
                this.onlineContainer.classList.remove('hidden');
                this.onlineContainer.classList.add('flex');
            }
        }
    }

    switchOnlineTab(tab) {
        this.onlineTab = tab;
        const tabsGroup = document.getElementById('online-tabs-group');
        
        if (tab === 'waiting') {
            if (tabsGroup) tabsGroup.classList.add('hidden');
            this.panelCreateRoom.classList.add('hidden');
            this.panelJoinRoom.classList.add('hidden');
            this.panelWaitingRoom.classList.remove('hidden');
            this.panelWaitingRoom.classList.add('flex');
            return;
        }

        if (tabsGroup) tabsGroup.classList.remove('hidden');
        this.panelWaitingRoom.classList.add('hidden');
        this.panelWaitingRoom.classList.remove('flex');

        if (tab === 'create') {
            this.tabCreateRoom.className = 'online-tab-btn active py-3 rounded-xl bg-white text-indigo-700 font-black text-sm shadow-xs flex items-center justify-center gap-2 transition-all';
            this.tabJoinRoom.className = 'online-tab-btn py-3 rounded-xl text-slate-600 hover:text-slate-900 font-bold text-sm flex items-center justify-center gap-2 transition-all';
            this.panelCreateRoom.classList.remove('hidden');
            this.panelCreateRoom.classList.add('flex');
            this.panelJoinRoom.classList.add('hidden');
            this.panelJoinRoom.classList.remove('flex');
        } else {
            this.tabJoinRoom.className = 'online-tab-btn active py-3 rounded-xl bg-white text-emerald-700 font-black text-sm shadow-xs flex items-center justify-center gap-2 transition-all';
            this.tabCreateRoom.className = 'online-tab-btn py-3 rounded-xl text-slate-600 hover:text-slate-900 font-bold text-sm flex items-center justify-center gap-2 transition-all';
            this.panelJoinRoom.classList.remove('hidden');
            this.panelJoinRoom.classList.add('flex');
            this.panelCreateRoom.classList.add('hidden');
            this.panelCreateRoom.classList.remove('flex');
        }
    }

    generateRoomCode() {
        const words = ['AMIS', 'LUNA', 'SOLS', 'SABER', 'RAYO', 'ESTU', 'CLUB', 'TEAM', 'NUBE', 'ALFA', 'CHIC', 'DUEL'];
        return words[Math.floor(Math.random() * words.length)];
    }

    // =========================================================================
    // CREAR SALA (HOST)
    // =========================================================================
    async handleCreateRoom() {
        const name = this.hostNameInput ? this.hostNameInput.value.trim() || 'Cami' : 'Cami';
        this.playerName = name;
        this.isHost = true;
        this.myPlayerId = 'p_' + Math.random().toString(36).substring(2, 9);
        this.roomCode = this.generateRoomCode();

        // Verificar si Firebase está activo
        if (typeof realtimeDb !== 'undefined' && realtimeDb) {
            try {
                this.roomRef = realtimeDb.ref(`rooms/${this.roomCode}`);
                
                const roomData = {
                    code: this.roomCode,
                    grade: this.selectedGrade,
                    targetPlayers: this.targetPlayers || 2,
                    hostId: this.myPlayerId,
                    status: 'waiting',
                    createdAt: firebase.database.ServerValue.TIMESTAMP,
                    players: {
                        [this.myPlayerId]: {
                            id: this.myPlayerId,
                            name: this.playerName,
                            avatar: this.playerAvatar,
                            isHost: true,
                            position: 0,
                            badges: [],
                            score: 0,
                            online: true
                        }
                    }
                };

                await this.roomRef.set(roomData);

                // Configurar onDisconnect para que se elimine o marque offline
                this.roomRef.child(`players/${this.myPlayerId}`).onDisconnect().remove();

                // Escuchar cambios de la sala en tiempo real
                this.listenToRoom();

                console.log(`🟢 Sala ${this.roomCode} creada en Firebase.`);
            } catch (err) {
                console.error("Error creando sala en Firebase:", err);
                alert("Hubo un error con la conexión a Firebase. Revisa la configuración.");
                return;
            }
        } else {
            // Modo Demo / Simulación local si Firebase aún no fue configurado
            console.log("ℹ️ Creando sala en modo Demo (Firebase no configurado aún)");
            this.playersInRoom = [
                { id: this.myPlayerId, name: this.playerName, avatar: this.playerAvatar, isHost: true }
            ];
            this.showFirebaseNotice();
        }

        this.updateWaitingRoomUI();
        this.switchOnlineTab('waiting');
    }

    // =========================================================================
    // UNIRME A UNA SALA EXISTENTE (GUEST)
    // =========================================================================
    async handleJoinRoom() {
        const code = this.joinCodeInput ? this.joinCodeInput.value.trim().toUpperCase() : '';
        const name = this.guestNameInput ? this.guestNameInput.value.trim() || 'Amiga' : 'Amiga';
        
        if (!code || code.length < 3) {
            alert('Por favor ingresá un código de sala válido.');
            if (this.joinCodeInput) this.joinCodeInput.focus();
            return;
        }

        this.roomCode = code;
        this.playerName = name;
        this.isHost = false;
        this.myPlayerId = 'p_' + Math.random().toString(36).substring(2, 9);

        if (typeof realtimeDb !== 'undefined' && realtimeDb) {
            try {
                this.roomRef = realtimeDb.ref(`rooms/${this.roomCode}`);
                const snapshot = await this.roomRef.once('value');

                if (!snapshot.exists()) {
                    alert(`La sala "${this.roomCode}" no existe. Verificá el código con tu amiga.`);
                    return;
                }

                const room = snapshot.val();
                if (room.status !== 'waiting') {
                    alert('Esta partida ya comenzó o finalizó.');
                    return;
                }

                const currentPlayers = room.players ? Object.keys(room.players) : [];
                const maxAllowed = room.targetPlayers || 2;
                if (currentPlayers.length >= maxAllowed) {
                    alert(`La sala ya está completa (máximo ${maxAllowed} jugadoras).`);
                    return;
                }

                this.selectedGrade = room.grade || 6;

                // Agregar jugadora a la sala
                const playerData = {
                    id: this.myPlayerId,
                    name: this.playerName,
                    avatar: this.playerAvatar,
                    isHost: false,
                    position: 0,
                    badges: [],
                    score: 0,
                    online: true
                };

                await this.roomRef.child(`players/${this.myPlayerId}`).set(playerData);
                this.roomRef.child(`players/${this.myPlayerId}`).onDisconnect().remove();

                // Escuchar cambios de la sala en tiempo real
                this.listenToRoom();
                console.log(`🟢 Te uniste a la sala ${this.roomCode} en Firebase.`);
            } catch (err) {
                console.error("Error uniéndose a la sala:", err);
                alert("No se pudo conectar a la sala: " + err.message);
                return;
            }
        } else {
            // Modo Demo
            this.playersInRoom = [
                { id: 'p_host', name: 'Cami', avatar: '🐬', isHost: true },
                { id: this.myPlayerId, name: this.playerName, avatar: this.playerAvatar, isHost: false }
            ];
            this.showFirebaseNotice();
        }

        this.updateWaitingRoomUI();
        this.switchOnlineTab('waiting');
    }

    // =========================================================================
    // ESCUCHA EN TIEMPO REAL (LISTENERS)
    // =========================================================================
    listenToRoom() {
        if (!this.roomRef) return;

        this.roomRef.on('value', (snapshot) => {
            if (!snapshot.exists()) {
                alert('La sala fue cerrada por la anfitriona.');
                this.leaveRoom();
                return;
            }

            const room = snapshot.val();
            
            // 1. Actualizar lista de jugadoras
            if (room.players) {
                this.playersInRoom = Object.values(room.players);
                if (room.targetPlayers) this.roomTargetPlayers = room.targetPlayers;

                // Sincronizar jugadores de window.game en tiempo real durante la partida
                if (this.isOnlineGameActive && window.game && window.game.players) {
                    Object.values(room.players).forEach(rp => {
                        const localP = window.game.players.find(p => p.id === rp.id);
                        if (localP) {
                            if (rp.score !== undefined) localP.score = rp.score;
                            if (Array.isArray(rp.badges)) localP.badges = new Set(rp.badges);
                            if (rp.position !== undefined && !window.game.isMoving) {
                                localP.position = rp.position;
                            }
                        }
                    });
                    window.game.renderScoreboard();
                    if (!window.game.isMoving) {
                        window.game.updatePawnPositions();
                    }
                }
            } else {
                this.playersInRoom = [];
            }
            this.selectedGrade = room.grade || 6;
            this.updateWaitingRoomUI();

            // 2. Si el estado cambia a 'playing', iniciar el juego en todas las pantallas
            if (room.status === 'playing' && !this.isOnlineGameActive) {
                this.isOnlineGameActive = true;
                this.launchOnlineGame(room);
            }

            // 3. Si la partida está activa, sincronizar eventos en tiempo real
            if (this.isOnlineGameActive && room.gameState) {
                this.syncOnlineGameState(room.gameState);
            }
        });
    }

    // =========================================================================
    // INICIAR PARTIDA ONLINE (SOLO ANFITRIONA)
    // =========================================================================
    async startOnlineGame() {
        if (!this.isHost) return;

        if (this.playersInRoom.length < 2) {
            alert('¡Esperá a que se una al menos una amiga para comenzar la carrera!');
            return;
        }

        if (this.roomRef) {
            const playerOrder = this.playersInRoom.map(p => p.id);
            const initialGameState = {
                currentTurnIndex: 0,
                playerOrder: playerOrder,
                round: 1,
                diceValue: 5,
                isRolling: false,
                activeQuestion: null,
                lastAction: '¡Comienza la partida!'
            };

            await this.roomRef.update({
                status: 'playing',
                gameState: initialGameState
            });
        } else {
            // Modo local simulado
            this.isOnlineGameActive = true;
            this.launchOnlineGame({
                players: this.playersInRoom.reduce((acc, p) => ({ ...acc, [p.id]: p }), {}),
                gameState: { currentTurnIndex: 0, playerOrder: this.playersInRoom.map(p => p.id) }
            });
        }
    }

    // =========================================================================
    // LANZAR EL TABLERO Y ADAPTAR A MULTIJUGADOR ONLINE
    // =========================================================================
    launchOnlineGame(room) {
        console.log("🎮 Lanzando tablero en modo online...", room);

        if (!window.game) return;

        // Ocultar pantalla de setup
        const setup = document.getElementById('setup-screen');
        const game = document.getElementById('game-screen');
        if (setup) {
            setup.classList.add('screen-hidden', 'hidden');
            setup.style.display = 'none';
        }
        if (game) {
            game.classList.remove('screen-hidden', 'hidden');
            game.style.display = '';
        }
        const btnExit = document.getElementById('btn-exit-game');
        if (btnExit) {
            btnExit.classList.remove('hidden');
            btnExit.classList.add('flex');
        }

        // Configurar jugadores de CarreraDelSaberApp con las jugadoras online
        const avatarsList = ['🐬', '🐻', '🦄', '🦁'];
        const avatarBgs = [
            'bg-amber-100 border-2 border-amber-300',
            'bg-cyan-100 border-2 border-cyan-300',
            'bg-red-100 border-2 border-red-300',
            'bg-purple-100 border-2 border-purple-300'
        ];
        const tokenGradients = [
            'from-amber-500 to-yellow-400',
            'from-cyan-500 to-sky-400',
            'from-red-500 to-rose-400',
            'from-purple-500 to-indigo-400'
        ];

        window.game.players = this.playersInRoom.map((p, idx) => ({
            id: p.id,
            name: p.name,
            avatar: p.avatar || avatarsList[idx % avatarsList.length],
            avatarBg: avatarBgs[idx % avatarBgs.length],
            tokenGradient: tokenGradients[idx % tokenGradients.length],
            position: p.position || 0,
            badges: new Set(p.badges || []),
            score: p.score || 0
        }));

        window.game.currentPlayerIndex = 0;
        window.game.grade = this.selectedGrade;
        window.game.isOnline = true;
        window.game.myPlayerId = this.myPlayerId;
        window.game.onlineManager = this;

        window.game.updateGradeLabels();
        window.game.renderScoreboard();
        window.game.updateTurnDisplay();
        window.game.updatePawnPositions();
        window.game.renderDiceFace(5);

        this.applyTurnPermissions();
    }

    applyTurnPermissions() {
        if (!window.game || !window.game.isOnline) return;

        const currentTurnPlayer = window.game.players[window.game.currentPlayerIndex];
        const isMyTurn = currentTurnPlayer && currentTurnPlayer.id === this.myPlayerId;

        const rollBtn = document.getElementById('rollDiceBtn');
        const btnText = document.getElementById('btnText');
        const helperMsg = document.getElementById('helperMessage');

        if (rollBtn) {
            if (isMyTurn) {
                rollBtn.disabled = false;
                rollBtn.classList.remove('opacity-60', 'cursor-not-allowed');
                if (btnText) btnText.textContent = '¡TIRAR DADO!';
                if (helperMsg) helperMsg.textContent = `¡Es tu turno, ${this.playerName}! Tirá el dado para avanzar.`;
            } else {
                rollBtn.disabled = true;
                rollBtn.classList.add('opacity-60', 'cursor-not-allowed');
                if (btnText) btnText.textContent = `Turno de ${currentTurnPlayer ? currentTurnPlayer.name : 'amiga'}...`;
                if (helperMsg) helperMsg.textContent = `Esperando a que ${currentTurnPlayer ? currentTurnPlayer.name : 'tu amiga'} tire el dado...`;
            }
        }
    }

    // =========================================================================
    // ACCIONES SINCRONIZADAS CON FIREBASE (ONLINE REAL-TIME SYNC)
    // =========================================================================
    sendDiceRoll(diceValue) {
        if (!this.roomRef) return;
        const roller = window.game ? window.game.players[window.game.currentPlayerIndex] : null;
        this.roomRef.child('gameState').update({
            action: 'diceRoll',
            diceValue: diceValue,
            rollerId: roller ? roller.id : this.myPlayerId,
            rollerName: roller ? roller.name : this.playerName,
            rollTimestamp: firebase.database.ServerValue.TIMESTAMP
        });
    }

    sendQuestionOpened(tile, question) {
        if (!this.roomRef) return;
        const player = window.game ? window.game.players[window.game.currentPlayerIndex] : null;
        this.roomRef.child('gameState').update({
            action: 'questionActive',
            activeQuestion: {
                playerId: this.myPlayerId,
                playerName: player ? player.name : this.playerName,
                playerAvatar: player ? player.avatar : this.playerAvatar,
                category: tile.cat,
                categoryLabel: tile.label,
                categoryIcon: tile.icon,
                questionText: question.question,
                star: !!tile.star,
                status: 'answering',
                questionTimestamp: firebase.database.ServerValue.TIMESTAMP
            }
        });
    }

    sendAnswer(isCorrect, newPosition, badgesArray, score, categoryLabel, wonMedal, explanation) {
        if (!this.roomRef) return;
        
        // 1. Actualizar el jugador en la base de datos
        this.roomRef.child(`players/${this.myPlayerId}`).update({
            position: newPosition,
            badges: badgesArray,
            score: score
        });

        // 2. Notificar a todas las pantallas el resultado para el modo espectador
        this.roomRef.child('gameState').update({
            action: 'questionAnswered',
            lastResult: {
                playerId: this.myPlayerId,
                playerName: this.playerName,
                isCorrect: isCorrect,
                categoryLabel: categoryLabel || '',
                wonMedal: !!wonMedal,
                score: score,
                explanation: explanation || '',
                answerTimestamp: firebase.database.ServerValue.TIMESTAMP
            }
        });
    }

    advanceTurn() {
        if (!this.roomRef) return;
        const nextTurnIndex = (window.game.currentPlayerIndex + 1) % window.game.players.length;
        this.roomRef.child('gameState').update({
            action: 'turnAdvance',
            activeQuestion: null,
            lastResult: null,
            currentTurnIndex: nextTurnIndex,
            isRolling: false,
            turnTimestamp: firebase.database.ServerValue.TIMESTAMP
        });
    }

    syncOnlineGameState(gameState) {
        if (!window.game) return;

        // 1. EVENTO: Tirada remota de dado
        if (gameState.action === 'diceRoll' && gameState.rollTimestamp && gameState.rollTimestamp !== this.lastHandledRollTimestamp) {
            this.lastHandledRollTimestamp = gameState.rollTimestamp;
            if (gameState.rollerId !== this.myPlayerId) {
                console.log(`Jugadora remota (${gameState.rollerName}) tiró el dado: ${gameState.diceValue}`);
                window.game.showRemoteRoll(gameState.rollerId, gameState.diceValue);
            }
        }

        // 2. EVENTO: Pregunta abierta (Modo Espectador en vivo)
        if (gameState.action === 'questionActive' && gameState.activeQuestion) {
            if (gameState.activeQuestion.playerId !== this.myPlayerId && gameState.activeQuestion.questionTimestamp !== this.lastHandledQuestionTimestamp) {
                this.lastHandledQuestionTimestamp = gameState.activeQuestion.questionTimestamp;
                console.log("Modo Espectador activado: otra jugadora respondiendo pregunta");
                window.game.showSpectatorQuestion(gameState.activeQuestion);
            }
        }

        // 3. EVENTO: Pregunta respondida (Resultado en Modo Espectador)
        if (gameState.action === 'questionAnswered' && gameState.lastResult) {
            if (gameState.lastResult.playerId !== this.myPlayerId && gameState.lastResult.answerTimestamp !== this.lastHandledAnswerTimestamp) {
                this.lastHandledAnswerTimestamp = gameState.lastResult.answerTimestamp;
                console.log("Resultado de pregunta recibido:", gameState.lastResult);
                window.game.showSpectatorResult(gameState.lastResult);
            }
        }

        // 4. EVENTO: Cambio de turno
        if (gameState.currentTurnIndex !== undefined && gameState.currentTurnIndex !== window.game.currentPlayerIndex) {
            window.game.currentPlayerIndex = gameState.currentTurnIndex;
            window.game.hideSpectatorHUD();
            window.game.updateTurnDisplay();
            window.game.updatePawnPositions();
            this.applyTurnPermissions();
        }
    }

    leaveRoom() {
        if (this.roomRef && this.myPlayerId) {
            this.roomRef.child(`players/${this.myPlayerId}`).remove();
            this.roomRef.off();
            this.roomRef = null;
        }
        this.roomCode = '';
        this.isHost = false;
        this.playersInRoom = [];
        this.isOnlineGameActive = false;
        this.switchOnlineTab('create');
        if (window.game) {
            window.game.showSetupScreen();
        }
        const btnExit = document.getElementById('btn-exit-game');
        if (btnExit) {
            btnExit.classList.add('hidden');
            btnExit.classList.remove('flex');
        }
    }

    updateWaitingRoomUI() {
        if (this.displayRoomCode) this.displayRoomCode.textContent = this.roomCode;
        if (this.waitingCount) this.waitingCount.textContent = this.playersInRoom.length;
        if (this.waitingGradeBadge) this.waitingGradeBadge.textContent = `${this.selectedGrade}.° Grado`;

        // Update WhatsApp link
        if (this.btnShareWhatsApp) {
            const currentURL = window.location.origin + window.location.pathname;
            const inviteURL = `${currentURL}?sala=${this.roomCode}`;
            const msg = encodeURIComponent(`¡Hola! Te invito a jugar a Carrera del Saber 🎓\nUnite desde este link: ${inviteURL}\nO ingresá el código de sala: ${this.roomCode}`);
            this.btnShareWhatsApp.href = `https://api.whatsapp.com/send?text=${msg}`;
        }

        // Render slots in grid
        const maxSlots = this.roomTargetPlayers || this.targetPlayers || 2;
        const maxBadge = document.getElementById('waiting-max-count');
        if (maxBadge) maxBadge.textContent = maxSlots;

        if (this.waitingPlayersGrid) {
            let html = '';
            // Adapt grid columns according to maxSlots
            if (maxSlots === 2) {
                this.waitingPlayersGrid.className = 'grid grid-cols-1 sm:grid-cols-2 gap-3';
            } else if (maxSlots === 3) {
                this.waitingPlayersGrid.className = 'grid grid-cols-1 sm:grid-cols-3 gap-3';
            } else {
                this.waitingPlayersGrid.className = 'grid grid-cols-1 sm:grid-cols-2 gap-3';
            }

            for (let i = 0; i < maxSlots; i++) {
                const player = this.playersInRoom[i];
                if (player) {
                    html += `
                        <div class="p-3.5 rounded-2xl bg-indigo-50 border-2 border-indigo-300 flex items-center gap-3">
                            <div class="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-2xl shadow-xs">
                                ${player.avatar || '🐬'}
                            </div>
                            <div class="flex flex-col flex-1">
                                <div class="flex items-center gap-1.5">
                                    <span class="font-black text-slate-800 text-sm">${player.name}</span>
                                    ${player.isHost ? '<span class="text-[9px] font-black uppercase bg-indigo-200 text-indigo-800 px-1.5 py-0.5 rounded-md">Anfitriona</span>' : ''}
                                    ${player.id === this.myPlayerId ? '<span class="text-[9px] font-bold text-slate-500">(Vos)</span>' : ''}
                                </div>
                                <span class="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Conectada
                                </span>
                            </div>
                        </div>
                    `;
                } else {
                    html += `
                        <div class="p-3.5 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center gap-3 text-slate-400">
                            <div class="w-12 h-12 rounded-xl bg-slate-200 text-slate-400 flex items-center justify-center text-2xl">
                                ⏳
                            </div>
                            <div class="flex flex-col">
                                <span class="font-bold text-slate-500 text-sm">Esperando amiga...</span>
                                <span class="text-[11px] text-slate-400">Pasa el código '${this.roomCode}'</span>
                            </div>
                        </div>
                    `;
                }
            }
            this.waitingPlayersGrid.innerHTML = html;
        }

        // Toggle start button state according to host & player count
        if (this.btnStartOnlineGame) {
            if (this.isHost) {
                this.btnStartOnlineGame.classList.remove('hidden');
                if (this.playersInRoom.length >= 2) {
                    this.btnStartOnlineGame.disabled = false;
                    this.btnStartOnlineGame.className = 'w-full sm:w-auto px-10 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base md:text-lg shadow-3d-btn active:shadow-3d-btn-active active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase';
                    this.btnStartOnlineGame.innerHTML = `<span>🎮</span><span>¡Comenzar la Partida!</span>`;
                } else {
                    this.btnStartOnlineGame.disabled = true;
                    this.btnStartOnlineGame.className = 'w-full sm:w-auto px-10 py-3.5 rounded-2xl bg-slate-300 text-slate-500 font-black text-base md:text-lg flex items-center justify-center gap-2 cursor-not-allowed uppercase';
                    this.btnStartOnlineGame.innerHTML = `<span>⏳</span><span>Esperando al menos 1 amiga...</span>`;
                }
            } else {
                this.btnStartOnlineGame.classList.add('hidden');
            }
        }
    }

    showFirebaseNotice() {
        if (this.waitingRoomNotice) {
            this.waitingRoomNotice.classList.remove('hidden');
        }
    }

    copyInviteLink() {
        const currentURL = window.location.origin + window.location.pathname;
        const inviteURL = `${currentURL}?sala=${this.roomCode}`;
        
        navigator.clipboard.writeText(inviteURL).then(() => {
            if (this.copyBtnText) {
                const orig = this.copyBtnText.textContent;
                this.copyBtnText.textContent = '¡Copiado! ✅';
                setTimeout(() => {
                    this.copyBtnText.textContent = orig;
                }, 2000);
            }
        }).catch(() => {
            alert(`Enlace copiado: ${inviteURL}`);
        });
    }

    checkURLParams() {
        const params = new URLSearchParams(window.location.search);
        const sala = params.get('sala');
        if (sala) {
            this.switchMode('online');
            this.switchOnlineTab('join');
            if (this.joinCodeInput) {
                this.joinCodeInput.value = sala.toUpperCase();
            }
        }
    }
}

// Inicializar cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
    window.multiplayerManager = new MultiplayerManager();
});
