function carregarIdeias() {
  arena.innerHTML = "";
  if (ideias.length === 0) {
    const vazio = document.createElement("div");
    vazio.style.gridColumn = "1 / -1";
    vazio.style.textAlign = "center";
    vazio.style.padding = "2rem";
    vazio.style.background = "rgba(30,0,0,0.8)";
    vazio.style.border = "2px dashed #a30000";
    vazio.style.borderRadius = "15px";
    vazio.style.color = "#ff8080";
    vazio.style.fontFamily = "'Cinzel', serif";
    vazio.style.fontSize = "1.3rem";
    vazio.textContent = "Nenhuma ideia foi registrada ainda... 🌑";
    arena.appendChild(vazio);
    return;
  }

  ideias.forEach((ideia, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${ideia.img || 'https://via.placeholder.com/300x150/550000/ffffff?text=Ideia'}" alt="imagem ideia">
      <h3>${ideia.titulo}</h3>
      <p>${ideia.descricao}</p>
      <button class="concluir-btn" onclick="abrirModal(${index})">Concluir</button>
    `;
    arena.appendChild(card);
  });
}

// Botões
const btnLogin = document.getElementById("btn-login");
const btnRegistrar = document.getElementById("btn-registrar");
const btnLogout = document.getElementById("btn-logout");
const nomeUsuario = document.getElementById("nome-usuario");
const fotoPerfil = document.getElementById("foto-perfil");

// Navegação
document.getElementById("btn-inicio").onclick = () => window.location.href = "index.html";
document.getElementById("btn-diario").onclick = () => window.location.href = "diario.html";

// Checar usuário logado
function atualizarHeader() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  
  if(usuarioLogado){
    // mostrar foto e nome
    nomeUsuario.textContent = usuarioLogado.nome;
    fotoPerfil.src = usuarioLogado.foto || "default.png";
    
    // esconder login/registro, mostrar logout
    btnLogin.style.display = "none";
    btnRegistrar.style.display = "none";
    btnLogout.style.display = "inline-block";
  } else {
    // usuário não logado
    nomeUsuario.textContent = "CyberMaker";
    fotoPerfil.src = "default.png";
    btnLogin.style.display = "inline-block";
    btnRegistrar.style.display = "inline-block";
    btnLogout.style.display = "none";
  }
}

// Logout
btnLogout.addEventListener("click", () => {
  localStorage.removeItem("usuarioLogado");
  atualizarHeader();
});

// Inicializa header
atualizarHeader();

// Redirecionar para login/registro
btnLogin.addEventListener("click", () => window.location.href = "login.html");
btnRegistrar.addEventListener("click", () => window.location.href = "registro.html");

document.getElementById("registro-form").addEventListener("submit", function(e){
  e.preventDefault();
  
  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;
  let fotoFile = document.getElementById("foto").files[0];

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // verifica se email já existe
  if(usuarios.some(u => u.email === email)){
    alert("Email já registrado!");
    return;
  }

  // se houver foto, converte para base64
  if(fotoFile){
    const reader = new FileReader();
    reader.onload = function(){
      const novoUsuario = {nome, email, senha, foto: reader.result};
      usuarios.push(novoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      alert("Registro concluído!");
      window.location.href = "login.html"; // redireciona pro login
    }
    reader.readAsDataURL(fotoFile);
  } else {
    const novoUsuario = {nome, email, senha, foto: null};
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Registro concluído!");
    window.location.href = "login.html"; // redireciona pro login
  }
});