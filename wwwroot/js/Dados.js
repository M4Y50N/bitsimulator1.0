var ContadorDeValocidade = 0;
document.getElementById("regulador").addEventListener("input", function () {
	document.getElementById("delayContainer").textContent = this.value;
	ContadorDeValocidade += parseInt(this.value);
});

let Regist = [],
	IsRegistradorContar = 0,
	contadorDeEnderecosCompletos = 0,
	intervaloDeChamadaDeFuncao,
	ValorDeCadaTabela,
	contadorDePassos = 0,
	EnderoBusca = 1,
	IsEnderecoContar = 0,
	InputBox;

function DeixarMaiusculo() {
	document.getElementById("EntradaDeInstrucao").value = document
		.getElementById("EntradaDeInstrucao")
		.value.toUpperCase();
}

function AdicionarComando() {
	let valorDeInput = document.getElementById("EntradaDeInstrucao").value;
	let InstrucaoDecomposta = valorDeInput.split(" ");
	let contadorDeCond = 0;
	if (contadorDeEnderecosCompletos != 16) {
		for (let contador = 0; contador < Instrucoes.length; contador++) {
			contadorDeCond += 1;
			if (3 <= InstrucaoDecomposta.length <= 4) {
				if (InstrucaoDecomposta[0] == Instrucoes[contador]) {
					if (
						InstrucaoDecomposta.length == 4 &&
						(InstrucaoDecomposta[0] == "ADD" ||
							InstrucaoDecomposta[0] == "SUB" ||
							InstrucaoDecomposta[0] == "DIV" ||
							InstrucaoDecomposta[0] == "MULT")
					) {
						Regist = [];
						Regist.push(InstrucaoDecomposta[1]);
						Regist.push(InstrucaoDecomposta[2]);
						Regist.push(InstrucaoDecomposta[3]);

						for (
							let contador = 0;
							contador < Registradores.length;
							contador++
						) {
							for (
								let contadorRegistrador = 0;
								contadorRegistrador < Regist.length;
								contadorRegistrador++
							) {
								if (Registradores[contador] == Regist[contadorRegistrador]) {
									IsRegistradorContar += 1;
								}
							}
						}
						if (IsRegistradorContar == 3) {
							let AlertErrorColor = document.getElementById(
								"EntradaDeInstrucao"
							);
							AlertErrorColor.style = "border:2px solid green;";
							InstrucoesDeEntrada.push(valorDeInput);
							contadorDeEnderecosCompletos += 1;
							AdicionarComandoNaMemoria(
								contadorDeEnderecosCompletos,
								valorDeInput
							);
							IsRegistradorContar = 0;
							contadorDeCond = 0;
							break;
						} else {
							let AlertErrorColor = document.getElementById(
								"EntradaDeInstrucao"
							);
							AlertErrorColor.style = "border:2px solid red;";
							alert(
								"Ouve um erro na sua entrada, por favor revise o seu dado/instrução e adicione novamente!!"
							);
							contadorDeCond = 0;
							IsRegistradorContar = 0;
							break;
						}
					} else {
						if (
							InstrucaoDecomposta.length == 3 &&
							(InstrucaoDecomposta[0] == "LOAD" ||
								InstrucaoDecomposta[0] == "STO")
						) {
							for (
								let contador = 0;
								contador < EnderecoInstrucaoDado.length;
								contador++
							) {
								if (InstrucaoDecomposta[1] == EnderecoInstrucaoDado[contador]) {
									IsRegistradorContar += 1;
									Regist = [];
									Regist.push(InstrucaoDecomposta[1]);
									Regist.push(InstrucaoDecomposta[2]);

									for (
										let contador = 0;
										contador < Registradores.length;
										contador++
									) {
										if (Registradores[contador] == Regist[1]) {
											IsRegistradorContar += 1;
										}
									}
									if (IsRegistradorContar == 2) {
										let AlertErrorColor = document.getElementById(
											"EntradaDeInstrucao"
										);
										AlertErrorColor.style = "border:2px solid green;";
										InstrucoesDeEntrada.push(valorDeInput);
										contadorDeEnderecosCompletos += 1;
										AdicionarComandoNaMemoria(
											contadorDeEnderecosCompletos,
											valorDeInput
										);
										IsRegistradorContar = 0;
										contadorDeCond = 0;
										IsEnderecoContar = 0;
										break;
									} else {
										let AlertErrorColor = document.getElementById(
											"EntradaDeInstrucao"
										);
										AlertErrorColor.style = "border:2px solid red;";
										alert(
											"Ouve um erro na sua entrada, por favor revise o seu dado/instrução e adicione novamente!!"
										);
										contadorDeCond = 0;
										IsRegistradorContar = 0;
										IsEnderecoContar = 0;
										break;
									}
								} else {
									IsEnderecoContar += 1;
								}
							}
							if (IsEnderecoContar == EnderecoInstrucaoDado.length) {
								let AlertErrorColor = document.getElementById(
									"EntradaDeInstrucao"
								);
								AlertErrorColor.style = "border:2px solid red;";
								alert(
									"Ouve um erro na sua entrada, por favor revise o seu dado/instrução e adicione novamente!!"
								);
								contadorDeCond = 0;
								IsRegistradorContar = 0;
								IsEnderecoContar = 0;
								break;
							}
						} else {
							let AlertErrorColor = document.getElementById(
								"EntradaDeInstrucao"
							);
							AlertErrorColor.style = "border:2px solid red;";
							alert(
								"Ouve um erro na sua entrada, por favor revise o seu dado/instrução e adicione novamente!!"
							);
							contadorDeCond = 0;
							IsRegistradorContar = 0;
							IsEnderecoContar = 0;
							break;
						}
					}
				}
			}
		}
		if (contadorDeCond == Instrucoes.length) {
			if (
				parseInt(InstrucaoDecomposta[0]) == parseInt(InstrucaoDecomposta[0]) &&
				parseInt(InstrucaoDecomposta[0]) != NaN
			) {
				//adicionar e criar tag de dado
				let AlertErrorColor = document.getElementById("EntradaDeInstrucao");
				AlertErrorColor.style = "border:2px solid green;";
				DadosDeEntrada.push(valorDeInput);
				contadorDeEnderecosCompletos += 1;
				AdicionarComandoNaMemoria(contadorDeEnderecosCompletos, valorDeInput);
				contadorDeCond = 0;
				IsRegistradorContar = 0;
				IsEnderecoContar = 0;
			} else {
				let AlertErrorColor = document.getElementById("EntradaDeInstrucao");
				AlertErrorColor.style = "border:2px solid red;";
				alert(
					"Ouve um erro na sua entrada, por favor revise o seu dado/instrução e adicione novamente!!"
				);
				contadorDeCond = 0;
				IsRegistradorContar = 0;
				IsEnderecoContar = 0;
			}
		}
	} else {
		let AlertErrorColor = document.getElementById("EntradaDeInstrucao");
		AlertErrorColor.style = "border:2px solid red;";
		alert("Quantidade de dados/Instrucões excedeu o limite!!");
		contadorDeCond = 0;
		IsRegistradorContar = 0;
		IsEnderecoContar = 0;
	}
	InputBox = document.getElementById("EntradaDeInstrucao");
	InputBox.focus();
	InputBox.value = "";
}

// Contador de espaço na memoria
function AdicionarComandoNaMemoria(id, Entrada) {
	ValorDeCadaTabela = document.getElementById("td" + id).innerText;
	if (ValorDeCadaTabela == "") {
		document.getElementById("td" + id).innerText = Entrada;
	}
}

//Vai executar os dados coletados anteriormente
let EnderecoDaMemoriaTD,
	EnderecoDaMemoriaTH,
	InstrucaoRegister,
	NextLine,
	Endereco,
	Reg1,
	Reg2,
	Reg3;

//retagulos
const PC_Rect = document.getElementById("PC"),
	Reg1_Rect = document.getElementById("R1"),
	Reg2_Rect = document.getElementById("R2"),
	Reg3_Rect = document.getElementById("R3"),
	Reg4_Rect = document.getElementById("R4"),
	IR_Rect = document.getElementById("IR"),
	UC_Rect = document.getElementById("UC"),
	ULA_Rect = document.getElementById("ULA");
//inputs
let PC_Input = document.getElementById("input0"),
	Reg1_Input = document.getElementById("input1"),
	Reg2_Input = document.getElementById("input2"),
	Reg3_Input = document.getElementById("input3"),
	Reg4_Input = document.getElementById("input4"),
	IR_Input = document.getElementById("input5"),
	UC_Input = document.getElementById("input6"),
	ULA_Input1 = document.getElementById("input7_1"),
	ULA_Input2 = document.getElementById("input7_2");

function AdicionarCalculosNaView(DadosGeral) {
	VerificarSeEDadoOuInstrucao = +document.getElementById(
		"td" + ContadorDeInstrucoes
	).innerHTML;

	EnderecoDaMemoriaTD = document.getElementById("td" + ContadorDeInstrucoes);
	EnderecoDaMemoriaTH = document.getElementById("th" + ContadorDeInstrucoes);

	let ChangeColor = () => {
			if (EnderecoDaMemoriaTD.innerHTML == "") {
				return;
			}
			setTimeout(() => {
				PC_Input.innerHTML = ContadorDeInstrucoes;
				MudarCorRect(PC_Rect);
				ContadorDeInstrucoes++;
			}, 2000 + ContadorDeValocidade);
			setTimeout(() => {
				MudarCorRect(UC_Rect);
			}, 3000 + ContadorDeValocidade);
			setTimeout(() => {
				MudarCorTable(EnderecoDaMemoriaTD);
				MudarCorTable(EnderecoDaMemoriaTH);
				setTimeout(ChangeColorIfInstrucao, 1000 + ContadorDeValocidade);
			}, 4000 + ContadorDeValocidade);
		},
		ChangeColorIfInstrucao = () => {
			NextLine = DadosGeral[ContadorDeIndexDados];
			InstrucaoRegister = NextLine.instrucao;
			Endereco = NextLine.endereco;
			Reg1 = NextLine.registrador1;
			Reg2 = NextLine.registrador2;
			Reg3 = NextLine.registrador_armazenamento;

			ContadorDeIndexDados++;
			//Faz o IR e UC piscarem
			if (InstrucaoRegister != undefined) {
				IR_Input.innerHTML = InstrucaoRegister;
				MudarCorRect(IR_Rect);
				UC_Input.innerHTML = InstrucaoRegister;
				MudarCorRect(UC_Rect);
				ResolveInstructions(InstrucaoRegister, Endereco, Reg1, Reg2, Reg3);
			} else {
				AdicionarCalculosNaView(DadosGeral);
			}
		},
		ResolveInstructions = (Instrucao, Endereco, Reg1, Reg2, Reg3) => {
			setTimeout(function () {
				MudarCorRect(UC_Rect);
			}, 3000 + ContadorDeValocidade);
			if (Instrucao == "LOAD") {
				setTimeout(function () {
					MudarCorTable(document.getElementById("td" + Endereco));
					MudarCorTable(document.getElementById("th" + Endereco));
				}, 4000 + ContadorDeValocidade);

				setTimeout(function () {
					MudarCorRect(document.getElementById(Reg1));
					document.getElementById("input" + Reg1[1]).innerHTML =
						"0".repeat(
							4 - document.getElementById("td" + Endereco).innerHTML.length
						) + document.getElementById("td" + Endereco).innerHTML;
				}, 5000 + ContadorDeValocidade);
				setTimeout(() => {
					AdicionarCalculosNaView(DadosGeral);
				}, 6000 + ContadorDeValocidade);
			} else if (Instrucao == "STO") {
				setTimeout(function () {
					MudarCorRect(document.getElementById(Reg1));
				}, 4000 + ContadorDeValocidade);

				setTimeout(function () {
					MudarCorTable(document.getElementById("td" + Endereco));
					MudarCorTable(document.getElementById("th" + Endereco));
					document.getElementById(
						"td" + Endereco
					).innerHTML = document.getElementById("input" + Reg1[1]).innerHTML;
				}, 5000 + ContadorDeValocidade);
				setTimeout(() => {
					AdicionarCalculosNaView(DadosGeral);
				}, 6000 + ContadorDeValocidade);
			} else if (Instrucao == "ADD") {
				let Reg1_input = document.getElementById("input" + Reg1[1]),
					Reg2_input = document.getElementById("input" + Reg2[1]),
					Reg3_input = document.getElementById("input" + Reg3[1]);
				Reg1 = document.getElementById(Reg1);
				Reg2 = document.getElementById(Reg2);
				Reg3 = document.getElementById(Reg3);
				setTimeout(function () {
					MudarCorRect(Reg1);
					MudarCorRect(Reg2);
				}, 4000 + ContadorDeValocidade);
				setTimeout(function () {
					MudarCorRect(ULA_Rect);
					ULA_Input1.innerHTML = Reg1_input.innerHTML;
					ULA_Input2.innerHTML = Reg2_input.innerHTML;
				}, 5000 + ContadorDeValocidade);

				setTimeout(function () {
					MudarCorRect(Reg3);
					let sum = +Reg1_input.innerHTML + +Reg2_input.innerHTML;
					Reg3_input.innerHTML = "0".repeat(4 - sum.toString().length) + sum;
				}, 6000 + ContadorDeValocidade);
				setTimeout(() => {
					AdicionarCalculosNaView(DadosGeral);
				}, 7000 + ContadorDeValocidade);
			} else if (Instrucao == "SUB") {
				let Reg1_input = document.getElementById("input" + Reg1[1]),
					Reg2_input = document.getElementById("input" + Reg2[1]),
					Reg3_input = document.getElementById("input" + Reg3[1]);
				Reg1 = document.getElementById(Reg1);
				Reg2 = document.getElementById(Reg2);
				Reg3 = document.getElementById(Reg3);
				setTimeout(function () {
					MudarCorRect(Reg1);
					MudarCorRect(Reg2);
				}, 4000 + ContadorDeValocidade);
				setTimeout(function () {
					MudarCorRect(ULA_Rect);
					ULA_Input1.innerHTML = Reg1_input.innerHTML;
					ULA_Input2.innerHTML = Reg2_input.innerHTML;
				}, 5000 + ContadorDeValocidade);

				setTimeout(function () {
					MudarCorRect(Reg3);
					let sub = +Reg1_input.innerHTML - +Reg2_input.innerHTML;
					Reg3_input.innerHTML = "0".repeat(4 - sub.toString().length) + sub;
				}, 6000 + ContadorDeValocidade);
				setTimeout(() => {
					AdicionarCalculosNaView(DadosGeral);
				}, 7000 + ContadorDeValocidade);
			} else if (Instrucao == "DIV") {
				let Reg1_input = document.getElementById("input" + Reg1[1]),
					Reg2_input = document.getElementById("input" + Reg2[1]),
					Reg3_input = document.getElementById("input" + Reg3[1]);
				Reg1 = document.getElementById(Reg1);
				Reg2 = document.getElementById(Reg2);
				Reg3 = document.getElementById(Reg3);
				setTimeout(function () {
					MudarCorRect(Reg1);
					MudarCorRect(Reg2);
				}, 4000 + ContadorDeValocidade);
				setTimeout(function () {
					MudarCorRect(ULA_Rect);
					ULA_Input1.innerHTML = Reg1_input.innerHTML;
					ULA_Input2.innerHTML = Reg2_input.innerHTML;
				}, 5000 + ContadorDeValocidade);

				setTimeout(function () {
					MudarCorRect(Reg3);
					let div =
						+Reg2_input.innerHtml != 0
							? +Reg1_input.innerHTML / +Reg2_input.innerHTML
							: "Impossível Dividir";
					Reg3_input.innerHTML = "0".repeat(4 - div.toString().length) + div;
				}, 6000 + ContadorDeValocidade);
				setTimeout(() => {
					AdicionarCalculosNaView(DadosGeral);
				}, 7000 + ContadorDeValocidade);
			} else if (Instrucao == "MULT") {
				let Reg1_input = document.getElementById("input" + Reg1[1]),
					Reg2_input = document.getElementById("input" + Reg2[1]),
					Reg3_input = document.getElementById("input" + Reg3[1]);
				Reg1 = document.getElementById(Reg1);
				Reg2 = document.getElementById(Reg2);
				Reg3 = document.getElementById(Reg3);
				setTimeout(function () {
					MudarCorRect(Reg1);
					MudarCorRect(Reg2);
				}, 4000 + ContadorDeValocidade);
				setTimeout(function () {
					MudarCorRect(ULA_Rect);
					ULA_Input1.innerHTML = Reg1_input.innerHTML;
					ULA_Input2.innerHTML = Reg2_input.innerHTML;
				}, 5000 + ContadorDeValocidade);

				setTimeout(function () {
					MudarCorRect(Reg3);
					let mult = +Reg1_input.innerHTML * +Reg2_input.innerHTML;
					Reg3_input.innerHTML = "0".repeat(4 - mult.toString().length) + mult;
				}, 6000 + ContadorDeValocidade);
				setTimeout(() => {
					AdicionarCalculosNaView(DadosGeral);
				}, 7000 + ContadorDeValocidade);
			}
		};
	ChangeColor();
}

//Timer para chamar a função
function IniciarPercusoDeInstrucoes() {
	ColetarDadosDasFuncionalidades();
	AdicionarCalculosNaView(DadosGeral);
}

let containerHiddenShow = document.getElementById("Instrucoes");
function AlternarVisibilidade() {
	if (containerHiddenShow.classList.contains("classHidden")) {
		containerHiddenShow.classList.add("classShow");
		containerHiddenShow.classList.remove("classHidden");
	} else {
		containerHiddenShow.classList.add("classHidden");
		containerHiddenShow.classList.remove("classShow");
	}
}

function ResetarMemoria() {
	document.location.reload();
	let tdAtual;

	for (let index = 1; index < 16; index++) {
		tdAtual = document.getElementById("td" + index);
		tdAtual.innerHTML = "";
	}

	(Regist = []),
		(IsRegistradorContar = 0),
		(contadorDeEnderecosCompletos = 0),
		intervaloDeChamadaDeFuncao,
		ValorDeCadaTabela,
		(contadorDePassos = 0),
		(EnderoBusca = 1),
		(IsEnderecoContar = 0),
		InputBox,
		(ContadorDeInstrucoes = 1),
		(ContadorDeIndexDados = 0),
		(DadosGeral = []),
		(InstrucoesDeEntrada = []),
		(DadosDeEntrada = []);

	(PC_Input.innerHTML = 00),
		(Reg1_Input = 0000),
		(Reg2_Input = 0000),
		(Reg3_Input = 0000),
		(Reg4_Input = 0000),
		(IR_Input = "####"),
		(UC_Input = "####"),
		(ULA_Input1 = 0000),
		(ULA_Input2 = 0000);
}
