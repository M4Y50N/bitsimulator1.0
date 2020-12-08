
//Percorre o endereço de memoria
let ContadorDeInstrucoes = 1,
	ContadorDeIndexDados = 0;

//Vai armazenar todos os valores para realizar as operações
let DadosGeral = [];
const ColetarDadosDasFuncionalidades = () => {
	let ValorDoEndereco = "",
		Instrucao = "";
	for (let pos = 1; pos <= 17; pos++) {
		(ValorDoEndereco = document
			.getElementById("td" + pos)
			.innerHTML.split(" ")),
			(Instrucao = ValorDoEndereco[0]);
		//LOAD ou STO
		if (Instrucao == "LOAD" || Instrucao == "STO") {
			let Endereco = ValorDoEndereco[1],
				Registrador = ValorDoEndereco[2];
			DadosGeral.push({
				instrucao: Instrucao,
				endereco: Endereco,
				registrador1: Registrador,
			});
		} else if (
			Instrucao == "ADD" ||
			Instrucao == "SUB" ||
			Instrucao == "DIV" ||
			Instrucao == "MULT"
		) {
			let Registrador1 = ValorDoEndereco[1],
				Registrador2 = ValorDoEndereco[2],
				RegistradorArmazenamento = ValorDoEndereco[3];

			DadosGeral.push({
				instrucao: Instrucao,
				registrador1: Registrador1,
				registrador2: Registrador2,
				registrador_armazenamento: RegistradorArmazenamento,
			});
		} else if (!isNaN(parseInt(Instrucao)) || Instrucao == "") {
			let Dado = Instrucao;
			DadosGeral.push({ dado: Dado });
		}
	}
};

//muda a cor
function MudarCorRect(elemento) {
	elemento.classList.add("MudarCorRect");
	setTimeout(() => {
		elemento.classList.remove("MudarCorRect");
	}, 750);
}

function MudarCorTable(elemento) {
	elemento.classList.add("MudarCorTable");
	setTimeout(() => {
		elemento.classList.remove("MudarCorTable");
	}, 750);
}
