import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class VincularAcomodacao extends Processo {

    processar(): void {

        console.log("Iniciando vínculo de hospedagem...")

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

        titular.Acomodacao = acomodacao

        console.log("Hospedagem vinculada com sucesso!")
    }
}