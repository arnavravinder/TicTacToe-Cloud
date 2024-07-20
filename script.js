const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let gameData = Array(9).fill(null);
let currentPlayer = 'X';

const gameRef = database.ref('game');

gameRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        gameData = data.board;
        currentPlayer = data.currentPlayer;
        updateUI();
    }
});

function makeMove(index) {
    if (!gameData[index]) {
        gameData[index] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameRef.set({ board: gameData, currentPlayer });
    }
}

function updateUI() {
    gameData.forEach((cell, index) => {
        document.getElementById(`cell-${index}`).textContent = cell;
    });
}

function resetGame() {
    gameData = Array(9).fill(null);
    currentPlayer = 'X';
    gameRef.set({ board: gameData, currentPlayer });
    updateUI();
}

resetGame();
