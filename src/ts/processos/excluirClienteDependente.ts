import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class excluirClienteDependente extends Processo {
    processar(): void {
        let armazem = Armazem.InstanciaUnica

        let nomeTitular = this.entrada.receberTexto("Nome do titular:")
        let titular = armazem.Clientes.find(c => c.Nome === nomeTitular)

        if (!titular) {
            console.log("Titular não encontrado")
            return
        }

        if (titular.Dependentes.length === 0){
            console.log("Cliente titular sem Dependentes, adicione um para conseguir excluir!")
            return
        }

        console.log("Dependentes:")
        titular.Dependentes.forEach((d, i) => {
            console.log(`${i + 1} - ${d.Nome}`)
        })
    }
}