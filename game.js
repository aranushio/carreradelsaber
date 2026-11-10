// ==========================================================================
// CARRERA DEL SABER - MOTOR PRINCIPAL DEL JUEGO
// Rediseño Google Stitch 100% Interactivo:
// Física 3D de Dados, Efectos de Partículas, Síntesis de Audio Web,
// Tablero Perimetral Curricular y Banco Oficial de 600 Preguntas
// ==========================================================================

// --- SINTETIZADOR DE AUDIO WEB (Efectos Acústicos Sintetizados) ---
class AudioFX {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        return this.ctx;
    }

    playClack(freq = 320, duration = 0.04) {
        if (!this.enabled) return;
        try {
            const ctx = this.init();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq + Math.random() * 70 - 35, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + duration);
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {}
    }

    playDingSuccess() {
        if (!this.enabled) return;
        try {
            const ctx = this.init();
            if (!ctx) return;
            // Acorde alegre de tres notas (E5, G#5, B5)
            const notes = [659.25, 830.61, 987.77];
            notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                const startTime = ctx.currentTime + idx * 0.05;
                osc.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0.18, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 0.5);
            });
        } catch (e) {}
    }

    playPawnHop() {
        if (!this.enabled) return;
        try {
            const ctx = this.init();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(460, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.22, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.09);
        } catch (e) {}
    }

    playCorrect() {
        if (!this.enabled) return;
        try {
            const ctx = this.init();
            if (!ctx) return;
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                const startTime = ctx.currentTime + idx * 0.09;
                osc.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0.22, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 0.3);
            });
        } catch (e) {}
    }

    playWrong() {
        if (!this.enabled) return;
        try {
            const ctx = this.init();
            if (!ctx) return;
            [220, 164].forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                const startTime = ctx.currentTime + idx * 0.12;
                osc.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0.2, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 0.26);
            });
        } catch (e) {}
    }

    playBadgeWon() {
        if (!this.enabled) return;
        try {
            const ctx = this.init();
            if (!ctx) return;
            [523, 659, 784, 1046, 1318].forEach((f, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                const startTime = ctx.currentTime + i * 0.08;
                osc.frequency.setValueAtTime(f, startTime);
                gain.gain.setValueAtTime(0.25, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 0.38);
            });
        } catch (e) {}
    }

    playVictory() {
        if (!this.enabled) return;
        try {
            const ctx = this.init();
            if (!ctx) return;
            const melody = [523, 659, 784, 1046, 1046, 1046, 1318];
            melody.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                const startTime = ctx.currentTime + idx * 0.16;
                osc.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0.28, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 0.5);
            });
        } catch (e) {}
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

// --- GENERADOR DE CONFETI DE PANTALLA COMPLETA ---
class ConfettiCannon {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.animating = false;
            this.resize();
            window.addEventListener('resize', () => this.resize());
        }
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    fire() {
        if (!this.canvas) return;
        this.particles = [];
        const colors = ['#3B82F6', '#EF4444', '#22C55E', '#F97316', '#A855F7', '#FACC15', '#1D4ED8'];
        for (let i = 0; i < 150; i++) {
            this.particles.push({
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                vx: (Math.random() - 0.5) * 18,
                vy: (Math.random() - 0.8) * 18,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                vRot: (Math.random() - 0.5) * 10
            });
        }
        if (!this.animating) {
            this.animating = true;
            this.loop();
        }
    }

    loop() {
        if (!this.animating) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.35;
            p.rotation += p.vRot;

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate((p.rotation * Math.PI) / 180);
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            this.ctx.restore();
        }

        this.particles = this.particles.filter(p => p.y < this.canvas.height + 50);

        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.loop());
        } else {
            this.animating = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

// --- METADATOS DE CASILLEROS (1 AL 28 EN ORDEN DE PISTA) ---
const TILES_METADATA = [
    { id: 1, cat: 'matematica', label: 'Matemática', icon: '📐', star: false },
    { id: 2, cat: 'lengua', label: 'Lengua', icon: '📖', star: false },
    { id: 3, cat: 'matematica', label: 'Matemática', icon: '📐', star: true },
    { id: 4, cat: 'sociales', label: 'Ciencias Sociales', icon: '🌍', star: false },
    { id: 5, cat: 'ingenio', label: 'Ingenio y Cultura', icon: '💡', star: false },
    { id: 6, cat: 'matematica', label: 'Matemática', icon: '📐', star: false },
    { id: 7, cat: 'lengua', label: 'Lengua', icon: '📖', star: false },
    { id: 8, cat: 'naturales', label: 'Ciencias Naturales', icon: '🌿', star: false },
    { id: 9, cat: 'lengua', label: 'Lengua', icon: '📖', star: true },
    { id: 10, cat: 'ingenio', label: 'Ingenio y Cultura', icon: '💡', star: false },
    { id: 11, cat: 'matematica', label: 'Matemática', icon: '📐', star: false },
    { id: 12, cat: 'lengua', label: 'Lengua', icon: '📖', star: false },
    { id: 13, cat: 'naturales', label: 'Ciencias Naturales', icon: '🌿', star: false },
    { id: 14, cat: 'sociales', label: 'Ciencias Sociales', icon: '🌍', star: false },
    { id: 15, cat: 'naturales', label: 'Ciencias Naturales', icon: '🌿', star: true },
    { id: 16, cat: 'matematica', label: 'Matemática', icon: '📐', star: false },
    { id: 17, cat: 'lengua', label: 'Lengua', icon: '📖', star: false },
    { id: 18, cat: 'naturales', label: 'Ciencias Naturales', icon: '🌿', star: false },
    { id: 19, cat: 'sociales', label: 'Ciencias Sociales', icon: '🌍', star: false },
    { id: 20, cat: 'ingenio', label: 'Ingenio y Cultura', icon: '💡', star: false },
    { id: 21, cat: 'sociales', label: 'Ciencias Sociales', icon: '🌍', star: true },
    { id: 22, cat: 'lengua', label: 'Lengua', icon: '📖', star: false },
    { id: 23, cat: 'naturales', label: 'Ciencias Naturales', icon: '🌿', star: false },
    { id: 24, cat: 'sociales', label: 'Ciencias Sociales', icon: '🌍', star: false },
    { id: 25, cat: 'ingenio', label: 'Ingenio y Cultura', icon: '💡', star: false },
    { id: 26, cat: 'matematica', label: 'Matemática', icon: '📐', star: false },
    { id: 27, cat: 'ingenio', label: 'Ingenio y Cultura', icon: '💡', star: true },
    { id: 28, cat: 'naturales', label: 'Ciencias Naturales', icon: '🌿', star: false }
];

// Metadatos temáticos para materias y medallas
const SUBJECT_THEME = {
    matematica: {
        headerBg: '#2563eb',
        name: 'Matemática',
        short: 'Mat',
        icon: `<svg class="w-5 h-5 drop-shadow-xs" fill="none" viewBox="0 0 32 32"><path d="M4 27 L28 27 L4 3 Z" fill="url(#metal-bezel)" stroke="#1d4ed8" stroke-width="1.2"></path><path d="M8 24 L21 24 L8 11 Z" fill="#ffffff" fill-opacity="0.75" stroke="#3b82f6" stroke-width="0.8"></path></svg>`,
        activeRing: 'bg-gradient-to-b from-blue-50 to-blue-100/70 border border-blue-200 text-blue-700 shadow-2xs'
    },
    lengua: {
        headerBg: '#dc2626',
        name: 'Lengua',
        short: 'Len',
        icon: `<svg class="w-5 h-5 drop-shadow-xs" fill="none" viewBox="0 0 32 32"><path d="M3 24 C8 21 13 23 16 26 C19 23 24 21 29 24 L29 8 C24 5 19 7 16 10 C13 7 8 5 3 8 Z" fill="url(#book-leather)" stroke="#7f1d1d" stroke-width="1"></path></svg>`,
        activeRing: 'bg-gradient-to-b from-red-50 to-red-100 ring-1.5 ring-red-400 text-red-600 font-black shadow-2xs'
    },
    naturales: {
        headerBg: '#16a34a',
        name: 'Ciencias Naturales',
        short: 'Nat',
        icon: `<svg class="w-5 h-5 drop-shadow-xs" fill="none" viewBox="0 0 32 32"><path d="M16 28 C16 19 16 11 16 6 C16 6 22 7 24 13 C25.5 17.5 22 22 16 23" fill="url(#plant-leaf-3d)" stroke="#14532d" stroke-width="0.8"></path></svg>`,
        activeRing: 'bg-gradient-to-b from-emerald-50 to-emerald-100 ring-1.5 ring-emerald-500 text-emerald-700 font-black shadow-2xs'
    },
    sociales: {
        headerBg: '#ea580c',
        name: 'Ciencias Sociales',
        short: 'Soc',
        icon: `<svg class="w-5 h-5 drop-shadow-xs" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="14" fill="url(#globe-sphere-3d)" r="10" stroke="#9a3412" stroke-width="1"></circle></svg>`,
        activeRing: 'bg-gradient-to-b from-orange-50 to-orange-100 ring-1.5 ring-orange-400 text-orange-600 font-black shadow-2xs'
    },
    ingenio: {
        headerBg: '#9333ea',
        name: 'Ingenio y Cultura',
        short: 'Ing',
        icon: `<svg class="w-5 h-5 drop-shadow-xs" fill="none" viewBox="0 0 32 32"><path d="M11 14 C11 8 21 8 21 14 C21 17.5 18 19 18 22 L14 22 C14 19 11 17.5 11 14 Z" fill="url(#bulb-glow)" stroke="#a855f7" stroke-width="1.3"></path></svg>`,
        activeRing: 'bg-gradient-to-b from-purple-50 to-purple-100 ring-1.5 ring-purple-400 text-purple-700 font-black shadow-2xs'
    }
};

// --- CONTROLADOR PRINCIPAL DEL JUEGO ---
class CarreraDelSaberApp {
    constructor() {
        this.audio = new AudioFX();
        this.confetti = new ConfettiCannon('confetti-canvas');

        // Estado de Configuración
        this.grade = 6;
        this.mode = 'individual'; // 'individual' o 'teams'
        this.playerCount = 2;
        this.winGoal = 'badges'; // 'badges' (4) o 'fast' (2)

        // Estado de Partida
        this.players = [];
        this.currentPlayerIndex = 0;
        this.round = 1;
        this.isRolling = false;
        this.isMoving = false;
        this.currentTile = null;
        this.currentQuestion = null;
        this.timer = null;
        this.timerSeconds = 25;
        this.usedQuestions = new Set();

        // Referencias a los 9 puntos del dado
        this.diceDots = {
            tl: document.getElementById('dot-tl'),
            tc: document.getElementById('dot-tc'),
            tr: document.getElementById('dot-tr'),
            ml: document.getElementById('dot-ml'),
            mc: document.getElementById('dot-mc'),
            mr: document.getElementById('dot-mr'),
            bl: document.getElementById('dot-bl'),
            bc: document.getElementById('dot-bc'),
            br: document.getElementById('dot-br'),
        };

        this.dicePatterns = {
            1: ['mc'],
            2: ['tr', 'bl'],
            3: ['tr', 'mc', 'bl'],
            4: ['tl', 'tr', 'bl', 'br'],
            5: ['tl', 'tr', 'mc', 'bl', 'br'],
            6: ['tl', 'tr', 'ml', 'mr', 'bl', 'br']
        };

        this.bindEvents();
        this.renderSetupPlayers();
        this.renderDiceFace(5);
        this.showSetupScreen();
    }

    bindEvents() {
        // 1. Selector de Grado
        document.querySelectorAll('.grade-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.grade-btn').forEach(b => {
                    b.classList.remove('active', 'border-blue-500', 'bg-blue-50/50', 'shadow-sm');
                    b.classList.add('border-slate-200', 'bg-slate-50/60');
                    const icon = b.querySelector('.grade-icon');
                    if (icon) {
                        icon.className = 'grade-icon text-xs bg-slate-300 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0';
                        icon.textContent = '+';
                    }
                    const num = b.querySelector('span:first-child');
                    if (num) {
                        num.classList.remove('text-blue-600');
                        num.classList.add('text-slate-700');
                    }
                });

                btn.classList.add('active', 'border-blue-500', 'bg-blue-50/50', 'shadow-sm');
                btn.classList.remove('border-slate-200', 'bg-slate-50/60');
                const activeIcon = btn.querySelector('.grade-icon');
                if (activeIcon) {
                    activeIcon.className = 'grade-icon text-xs bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center';
                    activeIcon.textContent = '✓';
                }
                const activeNum = btn.querySelector('span:first-child');
                if (activeNum) {
                    activeNum.classList.add('text-blue-600');
                    activeNum.classList.remove('text-slate-700');
                }

                this.grade = parseInt(btn.dataset.grade);
                this.updateGradeLabels();
            });
        });

        // 2. Selector de Modo
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.mode-btn').forEach(b => {
                    b.classList.remove('active', 'border-blue-500', 'bg-blue-50/50', 'shadow-sm');
                    b.classList.add('border-slate-200', 'bg-slate-50/60');
                    const t = b.querySelector('span.font-black');
                    if (t) {
                        t.classList.remove('text-blue-700');
                        t.classList.add('text-slate-800');
                    }
                });

                btn.classList.add('active', 'border-blue-500', 'bg-blue-50/50', 'shadow-sm');
                btn.classList.remove('border-slate-200', 'bg-slate-50/60');
                const activeT = btn.querySelector('span.font-black');
                if (activeT) {
                    activeT.classList.add('text-blue-700');
                    activeT.classList.remove('text-slate-800');
                }

                this.mode = btn.dataset.mode;
                this.renderSetupPlayers();
            });
        });

        // 3. Cantidad de Participantes
        document.querySelectorAll('.count-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.count-btn').forEach(b => {
                    b.classList.remove('active', 'border-2', 'border-blue-600', 'bg-blue-600', 'text-white', 'shadow-sm');
                    b.classList.add('border', 'border-slate-200', 'bg-white', 'text-slate-700');
                });

                btn.classList.add('active', 'border-2', 'border-blue-600', 'bg-blue-600', 'text-white', 'shadow-sm');
                btn.classList.remove('border', 'border-slate-200', 'bg-white', 'text-slate-700');

                this.playerCount = parseInt(btn.dataset.count);
                const infoLabel = document.getElementById('count-info-label');
                if (infoLabel) {
                    infoLabel.textContent = `${this.playerCount} ${this.mode === 'teams' ? 'Equipos' : 'Participantes'} en circuito`;
                }
                const regTag = document.getElementById('registered-badge-tag');
                if (regTag) {
                    regTag.textContent = `${this.playerCount} Registrados`;
                }
                const sideCount = document.getElementById('sidebar-players-count');
                if (sideCount) {
                    sideCount.textContent = `${this.playerCount} Jugadores`;
                }
                this.renderSetupPlayers();
            });
        });

        // 4. Selector de Objetivo
        document.querySelectorAll('.goal-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.goal-btn').forEach(b => {
                    b.classList.remove('active', 'border-blue-500', 'bg-blue-50/50', 'shadow-sm');
                    b.classList.add('border-slate-200', 'bg-slate-50/60');
                    const c = b.querySelector('.goal-check');
                    if (c) {
                        c.className = 'goal-check text-xs bg-slate-300 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0';
                        c.textContent = '+';
                    }
                    const title = b.querySelector('span.font-black');
                    if (title) {
                        title.classList.remove('text-blue-700');
                        title.classList.add('text-slate-800');
                    }
                });

                btn.classList.add('active', 'border-blue-500', 'bg-blue-50/50', 'shadow-sm');
                btn.classList.remove('border-slate-200', 'bg-slate-50/60');
                const activeC = btn.querySelector('.goal-check');
                if (activeC) {
                    activeC.className = 'goal-check text-xs bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center';
                    activeC.textContent = '✓';
                }
                const activeTitle = btn.querySelector('span.font-black');
                if (activeTitle) {
                    activeTitle.classList.add('text-blue-700');
                    activeTitle.classList.remove('text-slate-800');
                }

                this.winGoal = btn.dataset.goal;
            });
        });

        // Botón Iniciar Carrera
        const startBtn = document.getElementById('btn-start-game');
        if (startBtn) startBtn.addEventListener('click', () => this.startGame());

        // Atajo Enter
        window.addEventListener('keydown', (e) => {
            const setup = document.getElementById('setup-screen');
            if (e.key === 'Enter' && setup && !setup.classList.contains('hidden')) {
                this.startGame();
            }
        });

        // Dado y tirada interactiva
        const rollBtn = document.getElementById('rollDiceBtn');
        if (rollBtn) rollBtn.addEventListener('click', () => this.rollDice());

        const diceClick = document.getElementById('diceClickArea');
        if (diceClick) diceClick.addEventListener('click', () => this.rollDice());

        // Botón Siguiente Turno
        const nextTurnBtn = document.getElementById('btn-next-turn');
        if (nextTurnBtn) nextTurnBtn.addEventListener('click', () => this.nextTurn());

        // Alternar Sonido
        const soundBtn = document.getElementById('soundToggleBtn');
        if (soundBtn) {
            soundBtn.addEventListener('click', () => {
                const active = this.audio.toggle();
                soundBtn.textContent = active ? '🔊' : '🔇';
                soundBtn.setAttribute('title', active ? 'Sonido activado' : 'Sonido silenciado');
            });
        }

        // Modales de Reglas
        const rulesBtn = document.getElementById('rulesToggleBtn');
        if (rulesBtn) {
            rulesBtn.addEventListener('click', () => {
                const modal = document.getElementById('rules-modal');
                if (modal) modal.classList.remove('hidden'), modal.classList.add('flex');
            });
        }

        const closeRulesBtns = [document.getElementById('btn-close-rules'), document.getElementById('btn-rules-got-it')];
        closeRulesBtns.forEach(b => {
            if (b) b.addEventListener('click', () => {
                const modal = document.getElementById('rules-modal');
                if (modal) modal.classList.add('hidden'), modal.classList.remove('flex');
            });
        });

        // Salir / Reiniciar Partida con Modal
        const btnExitGame = document.getElementById('btn-exit-game');
        const modalConfirmExit = document.getElementById('modal-confirm-exit');
        const btnCancelExit = document.getElementById('btn-cancel-exit');
        const btnConfirmExit = document.getElementById('btn-confirm-exit');

        if (btnExitGame && modalConfirmExit) {
            btnExitGame.addEventListener('click', () => {
                modalConfirmExit.classList.remove('hidden');
                modalConfirmExit.classList.add('flex');
            });
        }
        if (btnCancelExit && modalConfirmExit) {
            btnCancelExit.addEventListener('click', () => {
                modalConfirmExit.classList.add('hidden');
                modalConfirmExit.classList.remove('flex');
            });
        }
        if (btnConfirmExit && modalConfirmExit) {
            btnConfirmExit.addEventListener('click', () => {
                modalConfirmExit.classList.add('hidden');
                modalConfirmExit.classList.remove('flex');
                if (window.multiplayer && (window.multiplayer.isOnlineGameActive || window.multiplayer.roomCode)) {
                    window.multiplayer.leaveRoom();
                }
                this.showSetupScreen();
            });
        }

        const footerRestart = document.getElementById('footer-restart');
        if (footerRestart && modalConfirmExit) {
            footerRestart.addEventListener('click', () => {
                modalConfirmExit.classList.remove('hidden');
                modalConfirmExit.classList.add('flex');
            });
        }

        const playAgainBtn = document.getElementById('btn-play-again');
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => {
                const victory = document.getElementById('victory-modal');
                if (victory) victory.classList.add('hidden'), victory.classList.remove('flex');
                this.showSetupScreen();
            });
        }

        // Pantalla Completa
        const fsBtn = document.getElementById('footer-fullscreen');
        if (fsBtn) {
            fsBtn.addEventListener('click', () => {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(() => {});
                } else {
                    if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
                }
            });
        }

        const brandLink = document.getElementById('header-brand-link');
        if (brandLink) {
            brandLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSetupScreen();
            });
        }
    }

    updateGradeLabels() {
        const gradePill = document.getElementById('header-grade-pill');
        if (gradePill) gradePill.textContent = `${this.grade}.° Grado`;

        const legendLabel = document.getElementById('legend-grade-label');
        if (legendLabel) legendLabel.textContent = `${this.grade}.° Grado`;

        const winnerSub = document.getElementById('winner-grade-sub');
        if (winnerSub) winnerSub.textContent = `¡Conquistó las preguntas de ${this.grade}.° Grado!`;
    }

    renderSetupPlayers() {
        const container = document.getElementById('players-config-list');
        if (!container) return;
        container.innerHTML = '';

        const defaultTeams = [
            { name: "Escuela San Martín", avatar: "🦁", bg: "bg-amber-100", border: "border-amber-300" },
            { name: "Colegio Sarmiento", avatar: "🐬", bg: "bg-cyan-100", border: "border-cyan-300" },
            { name: "Escuela Belgrano", avatar: "🚀", bg: "bg-red-100", border: "border-red-300" },
            { name: "Instituto Alberdi", avatar: "🦉", bg: "bg-purple-100", border: "border-purple-300" }
        ];

        const defaultIndividuals = [
            { name: "Ger", avatar: "🐻", bg: "bg-amber-100", border: "border-amber-300" },
            { name: "Cami", avatar: "🐬", bg: "bg-cyan-100", border: "border-cyan-300" },
            { name: "Santi", avatar: "⚡", bg: "bg-yellow-100", border: "border-yellow-300" },
            { name: "Valen", avatar: "🦄", bg: "bg-pink-100", border: "border-pink-300" }
        ];

        const defaults = this.mode === 'teams' ? defaultTeams : defaultIndividuals;

        for (let i = 0; i < this.playerCount; i++) {
            const row = document.createElement('div');
            row.className = 'flex items-center gap-2.5 bg-slate-50 p-2 rounded-2xl border border-slate-200/80 shadow-xs focus-within:ring-2 focus-within:ring-blue-500';
            row.innerHTML = `
                <div class="w-10 h-10 rounded-xl ${defaults[i].bg} border ${defaults[i].border} flex items-center justify-center text-xl shrink-0 shadow-xs">
                    ${defaults[i].avatar}
                </div>
                <div class="flex-1 min-w-0">
                    <input type="text" id="player-input-${i}" class="w-full bg-white px-3 py-1.5 rounded-xl font-bold text-sm text-slate-800 border border-slate-200 focus:outline-none shadow-inner" 
                           value="${defaults[i].name}" maxlength="24" 
                           placeholder="Nombre de ${this.mode === 'teams' ? 'escuela' : 'alumno'}">
                </div>
                <div class="hidden sm:flex items-center pr-2 text-slate-400">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span class="text-[10px] font-extrabold ml-1 uppercase text-emerald-700">Listo</span>
                </div>
            `;
            container.appendChild(row);
        }
    }

    showSetupScreen() {
        const setup = document.getElementById('setup-screen');
        const game = document.getElementById('game-screen');
        const btnExit = document.getElementById('btn-exit-game');
        if (setup) {
            setup.classList.remove('screen-hidden', 'hidden');
            setup.style.display = 'flex';
        }
        if (game) {
            game.classList.add('screen-hidden', 'hidden');
            game.style.display = 'none';
        }
        if (btnExit) {
            btnExit.classList.add('hidden');
            btnExit.classList.remove('flex');
        }
    }

    showGameScreen() {
        const setup = document.getElementById('setup-screen');
        const game = document.getElementById('game-screen');
        const btnExit = document.getElementById('btn-exit-game');
        if (setup) {
            setup.classList.add('screen-hidden', 'hidden');
            setup.style.display = 'none';
        }
        if (game) {
            game.classList.remove('screen-hidden', 'hidden');
            game.style.display = '';
        }
        if (btnExit) {
            btnExit.classList.remove('hidden');
            btnExit.classList.add('flex');
        }
    }

    renderDiceFace(val) {
        const activeKeys = this.dicePatterns[val] || this.dicePatterns[1];
        Object.keys(this.diceDots).forEach(key => {
            const el = this.diceDots[key];
            if (el) {
                if (activeKeys.includes(key)) {
                    el.classList.remove('opacity-0');
                    el.classList.add('opacity-100');
                } else {
                    el.classList.add('opacity-0');
                    el.classList.remove('opacity-100');
                }
            }
        });
    }

    createBurst() {
        const container = document.getElementById('particlesLayer');
        const ring = document.getElementById('shockwaveRing');
        if (!container) return;

        container.innerHTML = '';
        const colors = ['#F59E0B', '#3B82F6', '#10B981', '#EC4899', '#8B5CF6', '#F97316'];
        const icons = ['⭐', '✨', '🎉', '🌟', '•'];
        const count = 18;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'burst-particle text-sm select-none font-black';
            const isIcon = Math.random() > 0.45;
            if (isIcon) {
                particle.textContent = icons[Math.floor(Math.random() * icons.length)];
            } else {
                particle.style.width = `${Math.floor(Math.random() * 8 + 6)}px`;
                particle.style.height = `${Math.floor(Math.random() * 8 + 6)}px`;
                particle.style.borderRadius = '999px';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            }

            const angle = (i / count) * 2 * Math.PI + (Math.random() * 0.3 - 0.15);
            const distance = Math.random() * 110 + 60;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            const rot = (Math.random() * 360 - 180) + 'deg';

            particle.style.setProperty('--dx', `${dx}px`);
            particle.style.setProperty('--dy', `${dy}px`);
            particle.style.setProperty('--rot', rot);
            particle.style.left = '50%';
            particle.style.top = '45%';
            container.appendChild(particle);
        }

        if (ring) {
            ring.classList.remove('opacity-0', 'shockwave-effect');
            void ring.offsetWidth;
            ring.classList.add('shockwave-effect');
        }

        setTimeout(() => {
            if (container) container.innerHTML = '';
        }, 1000);
    }

    startGame() {
        this.players = [];
        const avatars = this.mode === 'teams' ? ['🦁', '🐬', '🚀', '🦉'] : ['🐻', '🐬', '⚡', '🦄'];
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

        for (let i = 0; i < this.playerCount; i++) {
            const input = document.getElementById(`player-input-${i}`);
            const name = input && input.value.trim() ? input.value.trim() : (this.mode === 'teams' ? `Escuela ${i + 1}` : `Jugador ${i + 1}`);
            this.players.push({
                id: i,
                name: name,
                avatar: avatars[i],
                avatarBg: avatarBgs[i],
                tokenGradient: tokenGradients[i],
                position: 0,
                badges: new Set(),
                score: 0
            });
        }

        this.currentPlayerIndex = 0;
        this.round = 1;
        this.usedQuestions.clear();

        this.updateGradeLabels();

        const sideCount = document.getElementById('sidebar-players-count');
        if (sideCount) sideCount.textContent = `${this.players.length} Jugadores`;

        this.showGameScreen();
        this.renderScoreboard();
        this.updateTurnDisplay();
        this.updatePawnPositions();
        this.renderDiceFace(5);

        const helperMsg = document.getElementById('helperMessage');
        const helperIcon = document.getElementById('helperIcon');
        if (helperMsg) {
            helperMsg.textContent = `Turno de ${this.players[0].name}. ¡Tirá el dado para avanzar por el tablero!`;
        }
        if (helperIcon) helperIcon.textContent = '🎯';
    }

    renderScoreboard() {
        const desktopContainer = document.getElementById('scoreboard-list');
        const mobileContainer = document.getElementById('mobile-players-hud');
        if (!desktopContainer && !mobileContainer) return;

        if (desktopContainer) desktopContainer.innerHTML = '';
        if (mobileContainer) {
            mobileContainer.innerHTML = '';
            if (this.players.length === 2) {
                mobileContainer.className = 'lg:hidden w-full max-w-md mx-auto grid grid-cols-2 gap-2 shrink-0';
            } else if (this.players.length === 3) {
                mobileContainer.className = 'lg:hidden w-full max-w-md mx-auto grid grid-cols-3 gap-1.5 shrink-0';
            } else {
                mobileContainer.className = 'lg:hidden w-full max-w-md mx-auto grid grid-cols-2 sm:grid-cols-4 gap-1.5 shrink-0';
            }
        }

        const badgeKeys = ['matematica', 'lengua', 'naturales', 'sociales', 'ingenio'];

        this.players.forEach(p => {
            const isActive = p.id === this.currentPlayerIndex;

            // 1. Desktop card
            if (desktopContainer) {
                const article = document.createElement('article');
                article.className = isActive
                    ? 'p-3 rounded-2xl border-2 border-blue-500 bg-blue-50/60 relative shadow-md transition-all'
                    : 'p-3 rounded-2xl border border-slate-200 bg-white shadow-xs transition-all';

                let badgesHtml = '';
                badgeKeys.forEach(k => {
                    const meta = SUBJECT_THEME[k];
                    const has = p.badges.has(k);

                    if (has) {
                        badgesHtml += `
                            <div class="flex-1 flex flex-col items-center p-1 rounded-lg ${meta.activeRing} font-black shadow-2xs relative" title="${meta.name} lograda">
                                ${meta.icon}
                                <span class="text-[8px] font-extrabold mt-0.5">${meta.short}</span>
                                <span class="absolute -top-1 -right-1 text-[9px]">✨</span>
                            </div>
                        `;
                    } else {
                        badgesHtml += `
                            <div class="flex-1 flex flex-col items-center p-1 rounded-lg opacity-35 grayscale bg-slate-100" title="${meta.name} pendiente">
                                ${meta.icon}
                                <span class="text-[8px] font-medium mt-0.5">${meta.short}</span>
                            </div>
                        `;
                    }
                });

                article.innerHTML = `
                    ${isActive ? `
                    <div class="absolute -top-2 right-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-[9px] tracking-wider px-2 py-0.2 rounded-full uppercase turn-glow shadow-xs">
                        Turno
                    </div>` : ''}

                    <div class="flex items-center gap-2 mb-1.5">
                        <div class="w-11 h-11 rounded-full ${p.avatarBg} border-2 border-white shadow-md flex items-center justify-center text-2xl relative shrink-0">
                            ${p.avatar}
                            ${isActive ? '<span class="absolute -bottom-1 -right-1 text-xs">⭐</span>' : ''}
                        </div>
                        <div class="min-w-0">
                            <div class="flex items-center gap-1.5">
                                <h3 class="font-extrabold text-slate-900 text-xs truncate max-w-[110px]">${p.name}</h3>
                                <span class="text-[9px] ${isActive ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'} font-bold px-1 rounded" id="player-tile-tag-${p.id}">
                                    Casilla #${p.position + 1}
                                </span>
                            </div>
                            <p class="text-[10px] ${isActive ? 'text-blue-700 font-bold' : 'text-slate-500 font-semibold'} mt-0.5">
                                ${p.badges.size} / 5 Insignias maestras
                            </p>
                        </div>
                    </div>

                    <div class="${isActive ? 'bg-white/90 border-blue-100' : 'bg-slate-50 border-slate-100'} p-1 rounded-lg border flex items-center justify-between gap-0.5 shadow-2xs">
                        ${badgesHtml}
                    </div>
                `;
                desktopContainer.appendChild(article);
            }

            // 2. Mobile HUD Card
            if (mobileContainer) {
                const mobArticle = document.createElement('article');
                mobArticle.className = isActive
                    ? 'p-2 rounded-2xl border-2 border-blue-500 bg-blue-50/50 shadow-xs relative flex flex-col justify-between'
                    : 'p-2 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between';

                let miniBadges = '';
                badgeKeys.forEach(k => {
                    const meta = SUBJECT_THEME[k];
                    const has = p.badges.has(k);
                    if (has) {
                        miniBadges += `<span title="${meta.name}">⭐</span>`;
                    } else {
                        miniBadges += `<span class="opacity-25 grayscale" title="${meta.name}">${meta.icon}</span>`;
                    }
                });

                mobArticle.innerHTML = `
                    ${isActive ? `
                    <div class="absolute -top-2 right-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-[9px] tracking-wider px-2 py-0.5 rounded-full uppercase turn-glow shadow-xs">
                        Turno
                    </div>` : ''}
                    <div class="flex items-center gap-1.5 mb-1">
                        <div class="w-7 h-7 rounded-lg ${p.avatarBg} flex items-center justify-center text-sm shrink-0 shadow-inner">
                            ${p.avatar}
                        </div>
                        <div class="min-w-0">
                            <h3 class="font-extrabold text-[11px] text-slate-900 leading-none truncate">${p.name}</h3>
                            <span class="text-[9px] ${isActive ? 'text-blue-700 font-black' : 'text-slate-500 font-bold'}">Casilla #${p.position + 1}</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between ${isActive ? 'bg-white/95 border-blue-100' : 'bg-slate-50 border-slate-100'} px-1 py-0.5 rounded-lg border text-[11px]">
                        ${miniBadges}
                    </div>
                `;
                mobileContainer.appendChild(mobArticle);
            }
        });
    }

    updateTurnDisplay() {
        const player = this.players[this.currentPlayerIndex];
        const turnPill = document.getElementById('turnPill');
        if (turnPill) {
            turnPill.innerHTML = `
                <span class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                Es el turno de <span class="text-blue-600 font-extrabold">${player.name}</span> (${player.avatar})
            `;
        }

        const roundInd = document.getElementById('round-indicator');
        if (roundInd) roundInd.textContent = `${this.round} / 10`;

        const helperMsg = document.getElementById('helperMessage');
        const helperIcon = document.getElementById('helperIcon');
        if (helperMsg) {
            helperMsg.textContent = `Turno de ${player.name}. ¡Tirá el dado para avanzar por el tablero!`;
        }
        if (helperIcon) helperIcon.textContent = '🎯';

        this.renderScoreboard();
    }

    updatePawnPositions() {
        // Limpiar todas las ranuras de fichas en los 28 casilleros
        for (let i = 1; i <= 28; i++) {
            const slot = document.getElementById(`pawns-tile-${i}`);
            if (slot) slot.innerHTML = '';
            const t = document.getElementById(`tile-${i}`);
            if (t) t.classList.remove('ring-4', 'ring-blue-500', 'scale-[1.03]');
        }

        // Colocar cada jugador en su casillero
        this.players.forEach(p => {
            const tileNum = p.position + 1;
            const slot = document.getElementById(`pawns-tile-${tileNum}`);
            if (slot) {
                const token = document.createElement('div');
                token.className = `bg-gradient-to-tr ${p.tokenGradient} text-white rounded-full p-0.5 md:p-1.5 shadow-token border md:border-2 border-white flex items-center justify-center text-[10px] md:text-sm transition-all`;
                token.textContent = p.avatar;
                token.title = `${p.name} (Casillero #${tileNum})`;
                slot.appendChild(token);
            }
        });

        // Resaltar casillero del jugador actual
        const activeTileNum = this.players[this.currentPlayerIndex].position + 1;
        const activeTileEl = document.getElementById(`tile-${activeTileNum}`);
        if (activeTileEl) {
            activeTileEl.classList.add('ring-4', 'ring-blue-500', 'scale-[1.03]');
        }
    }

    rollDice() {
        if (this.isRolling || this.isMoving) return;
        this.isRolling = true;

        this.audio.init();

        const rollBtn = document.getElementById('rollDiceBtn');
        const diceCube = document.getElementById('diceCubeFace');
        const diceShadow = document.getElementById('diceShadow');
        const btnText = document.getElementById('btnText');
        const btnIcon = document.getElementById('btnIcon');
        const turnPill = document.getElementById('turnPill');
        const helperMsg = document.getElementById('helperMessage');
        const helperIcon = document.getElementById('helperIcon');
        const resultToast = document.getElementById('resultFloatingToast');
        const toastValue = document.getElementById('toastValue');
        const lastRollLog = document.getElementById('lastRollLog');
        const lastRollStatus = document.getElementById('lastRollStatus');

        if (rollBtn) {
            rollBtn.disabled = true;
            rollBtn.classList.remove('shadow-3d-btn');
            rollBtn.classList.add('opacity-80', 'cursor-not-allowed', 'translate-y-1');
        }
        if (btnText) btnText.textContent = 'Tirando...';
        if (btnIcon) {
            btnIcon.innerHTML = `<svg class="animate-spin h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>`;
        }

        if (turnPill) {
            turnPill.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span> Rodando el dado de la suerte...`;
        }
        if (helperIcon) helperIcon.textContent = '🎲';
        if (helperMsg) helperMsg.textContent = '¡El dado está en el aire! Crucemos los dedos...';

        if (resultToast) {
            resultToast.classList.add('opacity-0', 'scale-90');
        }

        // Animación 3D del cubo y su sombra
        if (diceCube) {
            diceCube.classList.remove('dice-rolling');
            void diceCube.offsetWidth;
            diceCube.classList.add('dice-rolling');
        }
        if (diceShadow) {
            diceShadow.classList.remove('shadow-rolling');
            void diceShadow.offsetWidth;
            diceShadow.classList.add('shadow-rolling');
        }

        let rollStep = 0;
        const totalSteps = 12;
        const shuffleInterval = setInterval(() => {
            rollStep++;
            const randomFace = Math.floor(Math.random() * 6) + 1;
            this.renderDiceFace(randomFace);
            this.audio.playClack(300 + rollStep * 20, 0.035);

            if (rollStep >= totalSteps) {
                clearInterval(shuffleInterval);
            }
        }, 80);

        setTimeout(() => {
            const finalNumber = Math.floor(Math.random() * 6) + 1;
            this.renderDiceFace(finalNumber);

            this.audio.playDingSuccess();
            this.createBurst();

            const currPlayer = this.players[this.currentPlayerIndex];

            if (toastValue) {
                toastValue.textContent = `¡Sacaste un ${finalNumber}! Avanzas ${finalNumber} casillas`;
            }
            if (resultToast) {
                resultToast.classList.remove('opacity-0', 'scale-90');
                resultToast.classList.add('opacity-100', 'scale-100');
            }

            if (lastRollLog) {
                lastRollLog.innerHTML = `Último tiro: <strong>${currPlayer.name} sacó ${finalNumber}</strong>`;
            }
            if (lastRollStatus) {
                lastRollStatus.textContent = '¡Avanzando por la pista!';
            }

            if (this.isOnline && this.onlineManager) {
                this.onlineManager.sendDiceRoll(finalNumber);
            }

            setTimeout(() => {
                this.isRolling = false;
                this.movePlayer(finalNumber);
            }, 600);

        }, 1150);
    }

    movePlayer(steps) {
        this.isMoving = true;
        const player = this.players[this.currentPlayerIndex];
        let remainingSteps = steps;

        const helperMsg = document.getElementById('helperMessage');
        const helperIcon = document.getElementById('helperIcon');
        if (helperMsg) {
            helperMsg.textContent = `${player.name} avanza ${steps} casilleros hacia su destino...`;
        }
        if (helperIcon) helperIcon.textContent = '🏃';

        const stepInterval = setInterval(() => {
            player.position = (player.position + 1) % 28;
            this.updatePawnPositions();
            this.audio.playPawnHop();
            remainingSteps--;

            const tag = document.getElementById(`player-tile-tag-${player.id}`);
            if (tag) tag.textContent = `Casillero #${player.position + 1}`;

            if (remainingSteps <= 0) {
                clearInterval(stepInterval);
                this.isMoving = false;
                this.onPlayerLanded();
            }
        }, 220);
    }

    onPlayerLanded() {
        const player = this.players[this.currentPlayerIndex];
        const tile = TILES_METADATA[player.position];
        this.currentTile = tile;

        const turnPill = document.getElementById('turnPill');
        if (turnPill) {
            turnPill.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> ¡${player.name} cayó en <strong class="text-blue-600 font-black text-sm ml-1">${tile.label}</strong> (Casilla #${tile.id})!`;
        }

        const helperMsg = document.getElementById('helperMessage');
        const helperIcon = document.getElementById('helperIcon');
        if (helperMsg) {
            helperMsg.textContent = `¡Llegaste a la casilla #${tile.id}! Respondé la pregunta para sumar puntos y medallas.`;
        }
        if (helperIcon) helperIcon.textContent = '✨';

        const lastRollStatus = document.getElementById('lastRollStatus');
        if (lastRollStatus) {
            lastRollStatus.textContent = `¡En Casillero #${tile.id}!`;
        }

        setTimeout(() => {
            this.openQuestionModal(tile);
        }, 750);
    }

    openQuestionModal(tile) {
        const player = this.players[this.currentPlayerIndex];
        const theme = SUBJECT_THEME[tile.cat];

        // Filtrar preguntas del banco curricular según grado y materia
        const totalCategoryQuestions = QUESTIONS_DATA.filter(q => 
            q.grade === this.grade && q.category === tile.cat
        );

        let availableQuestions = totalCategoryQuestions.filter(q => 
            !this.usedQuestions.has(q.id || q.question)
        );

        if (availableQuestions.length === 0) {
            totalCategoryQuestions.forEach(q => this.usedQuestions.delete(q.id || q.question));
            availableQuestions = [...totalCategoryQuestions];
        }

        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const question = availableQuestions[randomIndex];

        this.usedQuestions.add(question.id || question.question);
        this.currentQuestion = question;

        const remainingCount = availableQuestions.length - 1;

        // Header del modal
        const modalHeader = document.getElementById('modal-header');
        if (modalHeader) modalHeader.style.backgroundColor = theme.headerBg;

        const catIcon = document.getElementById('q-category-icon');
        if (catIcon) catIcon.textContent = tile.icon;

        const catName = document.getElementById('q-category-name');
        if (catName) catName.textContent = tile.label.toUpperCase();

        const badgeTag = document.getElementById('q-badge-indicator');
        if (badgeTag) {
            if (tile.star && !player.badges.has(tile.cat)) {
                badgeTag.style.display = 'inline-block';
                badgeTag.textContent = `⭐ ¡CASILLERO DE MEDALLA DE ${tile.label.toUpperCase()}!`;
            } else {
                badgeTag.style.display = 'none';
            }
        }

        const turnTag = document.getElementById('q-player-turn');
        if (turnTag) turnTag.innerHTML = `Turno de: <strong>${player.avatar} ${player.name}</strong>`;

        const gradeTag = document.getElementById('q-grade-tag');
        if (gradeTag) {
            gradeTag.textContent = `${this.grade}.° Grado · ${remainingCount} restantes`;
        }

        const questionText = document.getElementById('question-text');
        if (questionText) questionText.textContent = question.question;

        // Opciones interactivas
        const optionsGrid = document.getElementById('options-grid');
        if (optionsGrid) {
            optionsGrid.innerHTML = '';
            const letters = ['A', 'B', 'C', 'D'];

            question.options.forEach((optText, idx) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 font-bold text-sm text-left border-2 border-slate-200 transition-all cursor-pointer shadow-xs active:translate-y-0.5 text-slate-800';
                btn.innerHTML = `
                    <span class="w-8 h-8 rounded-xl bg-white shadow-xs flex items-center justify-center font-black text-xs text-slate-700 shrink-0 border border-slate-200">${letters[idx]}</span>
                    <span class="flex-1">${optText}</span>
                `;
                btn.addEventListener('click', () => this.handleAnswer(idx));
                optionsGrid.appendChild(btn);
            });
        }

        const feedbackBox = document.getElementById('feedback-box');
        if (feedbackBox) {
            feedbackBox.classList.add('hidden');
            feedbackBox.className = 'hidden p-4 rounded-2xl border flex flex-col gap-2 mt-2';
        }

        const modal = document.getElementById('question-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        this.startQuestionTimer();
    }

    startQuestionTimer() {
        this.timerSeconds = 25;
        const timerNum = document.getElementById('timer-number');
        const timerBar = document.getElementById('timer-bar');

        if (timerNum) timerNum.textContent = this.timerSeconds;
        if (timerBar) {
            timerBar.style.width = '100%';
            timerBar.style.backgroundColor = '#10b981';
        }

        if (this.timer) clearInterval(this.timer);

        this.timer = setInterval(() => {
            this.timerSeconds--;
            if (timerNum) timerNum.textContent = this.timerSeconds;

            const percentage = (this.timerSeconds / 25) * 100;
            if (timerBar) {
                timerBar.style.width = `${percentage}%`;

                if (this.timerSeconds <= 8) {
                    timerBar.style.backgroundColor = '#ef4444';
                } else if (this.timerSeconds <= 15) {
                    timerBar.style.backgroundColor = '#f59e0b';
                }
            }

            if (this.timerSeconds <= 0) {
                clearInterval(this.timer);
                this.handleAnswer(-1);
            }
        }, 1000);
    }

    handleAnswer(selectedIndex) {
        clearInterval(this.timer);

        const optionsBtns = document.querySelectorAll('.option-btn');
        optionsBtns.forEach(b => b.disabled = true);

        const isCorrect = selectedIndex === this.currentQuestion.correct;
        const player = this.players[this.currentPlayerIndex];
        const tile = this.currentTile;

        if (selectedIndex >= 0 && optionsBtns[selectedIndex]) {
            if (isCorrect) {
                optionsBtns[selectedIndex].className = 'option-btn flex items-center gap-3 p-3.5 rounded-2xl bg-green-100 border-2 border-emerald-500 font-bold text-sm text-emerald-900';
            } else {
                optionsBtns[selectedIndex].className = 'option-btn flex items-center gap-3 p-3.5 rounded-2xl bg-red-100 border-2 border-red-500 font-bold text-sm text-red-900';
            }
        }

        if (optionsBtns[this.currentQuestion.correct]) {
            optionsBtns[this.currentQuestion.correct].className = 'option-btn flex items-center gap-3 p-3.5 rounded-2xl bg-green-100 border-2 border-emerald-500 font-bold text-sm text-emerald-900';
        }

        const feedbackBox = document.getElementById('feedback-box');
        const feedbackTitle = document.getElementById('feedback-title');
        const feedbackExp = document.getElementById('feedback-explanation');

        if (feedbackBox) {
            feedbackBox.classList.remove('hidden');

            if (isCorrect) {
                this.audio.playCorrect();
                player.score += 100;

                let extraMsg = '';
                if (tile.star && !player.badges.has(tile.cat)) {
                    player.badges.add(tile.cat);
                    extraMsg = ` ¡Ganaste la medalla de ${tile.label}! 🎖️`;
                    this.audio.playBadgeWon();
                    this.confetti.fire();
                }

                feedbackBox.className = 'p-4 rounded-2xl border-2 border-emerald-300 bg-emerald-50 text-emerald-900 flex flex-col gap-2 mt-2';
                if (feedbackTitle) feedbackTitle.textContent = `¡CORRECTO! 🎉${extraMsg}`;
            } else {
                this.audio.playWrong();
                feedbackBox.className = 'p-4 rounded-2xl border-2 border-red-300 bg-red-50 text-red-900 flex flex-col gap-2 mt-2';
                if (feedbackTitle) {
                    feedbackTitle.textContent = selectedIndex === -1 ? '¡TIEMPO AGOTADO! ⏰' : '¡INCORRECTO! ❌';
                }
            }

            if (feedbackExp) feedbackExp.textContent = this.currentQuestion.explanation;
        }

        this.renderScoreboard();

        if (this.isOnline && this.onlineManager) {
            this.onlineManager.sendAnswer(isCorrect, player.position, Array.from(player.badges));
        }

        const requiredBadges = this.winGoal === 'fast' ? 2 : 4;
        if (player.badges.size >= requiredBadges) {
            setTimeout(() => {
                const modal = document.getElementById('question-modal');
                if (modal) modal.classList.add('hidden'), modal.classList.remove('flex');
                this.triggerVictory(player);
            }, 2500);
        }
    }

    nextTurn() {
        const modal = document.getElementById('question-modal');
        if (modal) modal.classList.add('hidden'), modal.classList.remove('flex');

        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        if (this.currentPlayerIndex === 0) {
            this.round++;
        }

        this.updateTurnDisplay();
        this.updatePawnPositions();

        const rollBtn = document.getElementById('rollDiceBtn');
        const btnText = document.getElementById('btnText');
        const btnIcon = document.getElementById('btnIcon');

        if (rollBtn) {
            rollBtn.disabled = false;
            rollBtn.classList.add('shadow-3d-btn');
            rollBtn.classList.remove('opacity-80', 'cursor-not-allowed', 'translate-y-1');
        }
        if (btnText) btnText.textContent = '¡TIRAR DADO!';
        if (btnIcon) btnIcon.textContent = '🎲';

        const nextPlayer = this.players[this.currentPlayerIndex];
        const helperMsg = document.getElementById('helperMessage');
        const helperIcon = document.getElementById('helperIcon');
        if (helperMsg) {
            helperMsg.textContent = `Turno de ${nextPlayer.name}. ¡Tirá el dado para avanzar!`;
        }
        if (helperIcon) helperIcon.textContent = '🎯';

        const lastRollStatus = document.getElementById('lastRollStatus');
        if (lastRollStatus) {
            lastRollStatus.textContent = '¡Listo para tirar!';
        }
    }

    triggerVictory(player) {
        this.audio.playVictory();
        this.confetti.fire();

        const winnerAvatar = document.getElementById('winner-avatar');
        if (winnerAvatar) winnerAvatar.textContent = player.avatar;

        const winnerName = document.getElementById('winner-name');
        if (winnerName) winnerName.textContent = player.name;

        const badgesContainer = document.getElementById('winner-badges-show');
        if (badgesContainer) {
            badgesContainer.innerHTML = '';
            player.badges.forEach(catKey => {
                const theme = SUBJECT_THEME[catKey];
                const span = document.createElement('span');
                span.className = `w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-sm border-2 ${theme.activeRing}`;
                span.textContent = theme.icon;
                span.title = theme.name;
                badgesContainer.appendChild(span);
            });
        }

        const victoryModal = document.getElementById('victory-modal');
        if (victoryModal) {
            victoryModal.classList.remove('hidden');
            victoryModal.classList.add('flex');
        }
    }
}

// Inicialización cuando carga la ventana
window.addEventListener('DOMContentLoaded', () => {
    window.game = new CarreraDelSaberApp();
});
