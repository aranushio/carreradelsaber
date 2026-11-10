// ==========================================================================
// CONFIGURACIÓN DE FIREBASE REALTIME DATABASE PARA MULTIJUGADOR ONLINE
// ==========================================================================
// Para que tu hija y sus amigas jueguen en diferentes dispositivos:
// 1. Entrá a https://console.firebase.google.com/ con tu cuenta de Google.
// 2. Creá un proyecto gratuito (ej: "carrera-del-saber").
// 3. Andá a "Compilación" > "Realtime Database" > "Crear base de datos" (Modo prueba).
// 4. Andá a Configuración del proyecto (el engranaje ⚙️) > "Tus apps" > Web </> y copiá tus datos acá:

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCrnGW3MmHetN1iw3UF-FbWR0H4r0-BdfE",
    authDomain: "carrera-del-saber.firebaseapp.com",
    databaseURL: "https://carrera-del-saber-default-rtdb.firebaseio.com",
    projectId: "carrera-del-saber",
    storageBucket: "carrera-del-saber.firebasestorage.app",
    messagingSenderId: "485785049181",
    appId: "1:485785049181:web:01be04e4a8cb3ffdad15b4"
};

// Función para verificar si Firebase está configurado con claves reales
function isFirebaseConfigured() {
    return FIREBASE_CONFIG && 
           FIREBASE_CONFIG.apiKey && 
           FIREBASE_CONFIG.apiKey !== "TU_API_KEY_AQUI" &&
           FIREBASE_CONFIG.databaseURL && 
           !FIREBASE_CONFIG.databaseURL.includes("TU_PROJECT_ID");
}

// Inicializar Firebase
let firebaseApp = null;
let realtimeDb = null;

try {
    if (typeof firebase !== 'undefined' && isFirebaseConfigured()) {
        firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
        realtimeDb = firebase.database();
        console.log("🟢 Firebase Realtime Database inicializado correctamente.");
    } else {
        console.warn("⚠️ Firebase no está configurado aún o está usando valores por defecto.");
    }
} catch (err) {
    console.error("Error al inicializar Firebase:", err);
}
