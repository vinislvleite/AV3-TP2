import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class CancelarAcomodacao extends Processo {

    processar(): void {

        console.log("Cancelando acomodação...")

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

        if (!titular.Acomodacao) {
            console.log("Cliente não possui acomodação vinculada")
            return
        }

        titular.Acomodacao = undefined

        console.log("Acomodação cancelada com sucesso!")
    }
}