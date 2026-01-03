let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];
let fixas = JSON.parse(localStorage.getItem("fixas")) || [];

const ano = document.getElementById("ano");
const mes = document.getElementById("mes");
const lista = document.getElementById("lista");
const listaFixas = document.getElementById("listaFixas");

function mostrarAba(nome) {
  document.getElementById("aba-lancamentos").classList.add("hidden");
  document.getElementById("aba-fixas").classList.add("hidden");
  document.getElementById(`aba-${nome}`).classList.remove("hidden");
}

function carregarAnos() {
  const atual = new Date().getFullYear();
  for (let i = 0; i < 6; i++) {
    let o = document.createElement("option");
    o.value = atual + i;
    o.textContent = atual + i;
    ano.appendChild(o);
  }
}

document.getElementById("formLancamento").onsubmit = e => {
  e.preventDefault();

  lancamentos.push({
    id: Date.now(),
    descricao: descricao.value,
    categoria: categoria.value,
    tipo: tipo.value,
    valor: Number(valor.value),
    ano: ano.value,
    mes: mes.value === "" ? new Date().getMonth() : mes.value
  });

  salvar();
  atualizar();
  e.target.reset();
};

document.getElementById("formFixa").onsubmit = e => {
  e.preventDefault();

  fixas.push({
    id: Date.now(),
    descricao: descFixa.value,
    categoria: catFixa.value,
    valor: Number(valorFixa.value)
  });

  salvar();
  atualizarFixas();
  e.target.reset();
};

function atualizar() {
  lista.innerHTML = "";

  lancamentos
    .filter(l => l.ano == ano.value && (mes.value === "" || l.mes == mes.value))
    .forEach(l => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${l.descricao} | ${l.categoria} | ${l.tipo} | R$ ${l.valor.toFixed(2)}
        <button onclick="excluirLanc(${l.id})">×</button>
      `;
      lista.appendChild(li);
    });
}

function atualizarFixas() {
  listaFixas.innerHTML = "";
  fixas.forEach(f => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${f.descricao} | ${f.categoria} | R$ ${f.valor.toFixed(2)}
      <button onclick="excluirFixa(${f.id})">×</button>
    `;
    listaFixas.appendChild(li);
  });
}

function excluirLanc(id) {
  lancamentos = lancamentos.filter(l => l.id !== id);
  salvar();
  atualizar();
}

function excluirFixa(id) {
  fixas = fixas.filter(f => f.id !== id);
  salvar();
  atualizarFixas();
}

function salvar() {
  localStorage.setItem("lancamentos", JSON.stringify(lancamentos));
  localStorage.setItem("fixas", JSON.stringify(fixas));
}

ano.onchange = atualizar;
mes.onchange = atualizar;

carregarAnos();
atualizar();
atualizarFixas();
