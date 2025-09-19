const form = document.getElementById("form-registro");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const fotoInput = document.getElementById("foto");

  let fotoPerfil = null;

  // Se o usuário enviou foto, converter para Base64
  if (fotoInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = () => {
      fotoPerfil = reader.result;
      salvarUsuario(nome, email, senha, fotoPerfil);
    };
    reader.readAsDataURL(fotoInput.files[0]);
  } else {
    salvarUsuario(nome, email, senha, fotoPerfil);
  }
});

function salvarUsuario(nome, email, senha, fotoPerfil) {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verifica se já existe email cadastrado
  if (usuarios.some(u => u.email === email)) {
    alert("Este email já está registrado!");
    return;
  }

  usuarios.push({ nome, email, senha, fotoPerfil });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Registro concluído com sucesso!");
  window.location.href = "login.html";
}
   document.getElementById("registro-form").addEventListener("submit", e => {
      e.preventDefault();

      const usuario = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        foto: document.getElementById("foto").value || null
      };

      // salvar lista de usuários
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      usuarios.push(usuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert("Registro concluído! Agora faça login.");
      window.location.href = "login.html";
    });