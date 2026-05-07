import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class VincularAcomodacao extends Processo {

    processar(): void {

        console.log("Iniciando vínculo de acomodação...")

        let armazem = Armazem.InstanciaUnica

        let nomeTitular = this.entrada.receberTexto(
            "Nome do titular:"
        )

        let titular = armazem.Clientes.find(
            c => c.Nome === nomeTitular
        )

        if (!titular) {
            console.log("Titular não encontrado")
            return
        }

        console.log("Acomodações disponíveis:")

        armazem.Acomodacoes.forEach((acomodacao, i) => {
            console.log(
                `${i + 1} - ${acomodacao.NomeAcomadacao}`
            )
        })

        let indice = this.entrada.receberNumero(
            "Escolha a acomodação:"
        )

        let acomodacao =
            armazem.Acomodacoes[indice - 1]

        if (!acomodacao) {
            console.log("Acomodação inválida")
            return
        }

        let titularVai = this.entrada.receberTexto(
            "Titular ficará hospedado? (S/N)"
        )

        if (titularVai.toUpperCase() === "S") {
            titular.Acomodacao = acomodacao
        }

        if (titular.Dependentes.length > 0) {

            console.log("Dependentes disponíveis:")

            titular.Dependentes.forEach((dep, i) => {
                console.log(`${i + 1} - ${dep.Nome}`)
            })

            let quantidade = this.entrada.receberNumero(
                "Quantos dependentes serão hospedados?"
            )

            for (let i = 0; i < quantidade; i++) {

                let indiceDependente = this.entrada.receberNumero(
                    `Escolha o dependente ${i + 1}:`
                )

                let dependente =
                    titular.Dependentes[indiceDependente - 1]

                if (dependente) {
                    dependente.Acomodacao = acomodacao
                }
            }
        }

        console.log("Acomodação vinculada com sucesso!")
    }
}