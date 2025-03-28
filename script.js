// Configuração do Firebase (Substitua com suas credenciais!)
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Dados do Sistema
const pericias = [
    { nome: "Parrudão", atributo: "forca" },
    { nome: "Courudo", atributo: "forca" },
    { nome: "Bógue", atributo: "forca" },
    // Adicione todas as perícias aqui
];

const armas = [
    { nome: "PORRETE DE AÇO FUNDIDO", dano: "4d8+forca", critico: 18 },
    // Adicione todas as armas aqui
];

// Sistema de Autenticação
async function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    await auth.signInWithEmailAndPassword(email, senha);
}

async function cadastrar() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    await auth.createUserWithEmailAndPassword(email, senha);
}

// Sistema Lombra
function usarLombra() {
    const percentual = document.getElementById('lombraInput').value;
    const bonus = percentual.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    alert(`Bônus de +${bonus} aplicado!`);
}

// Gerar Perícias
function gerarPericias() {
    const divPericias = document.getElementById('pericias');
    pericias.forEach(pericia => {
        divPericias.innerHTML += `
            <div class="col-md-4 skill-card">
                <h5>${pericia.nome}</h5>
                <p>Atributo: ${pericia.atributo}</p>
                <button onclick="rolarTeste('${pericia.nome}')" class="btn btn-sm btn-dark">Rolar D20</button>
            </div>
        `;
    });
}

// Monitorar Autenticação
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('auth').classList.add('d-none');
        document.getElementById('dashboard').classList.remove('d-none');
        gerarPericias();
    }
});