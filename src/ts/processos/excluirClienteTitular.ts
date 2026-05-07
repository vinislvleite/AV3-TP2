import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class ExcluirClienteTitular extends Processo {
    processar(): void {
        console.clear()
        let armazem = Armazem.InstanciaUnica

        let nomeTitular = this.entrada.receberTexto("Nome do titular que deseja excluir:")
        let index = armazem.Clientes.findIndex(c => c.Nome === nomeTitular)

        if (index === -1) {
            console.log("Titular não encontrado.")
            this.entrada.receberTexto("Pressione Enter para voltar...");
            return
        }

        let confirmacao = this.entrada.receberTexto(`Tem certeza que deseja excluir ${nomeTitular} e todos os seus dependentes? (S/N)`)

        if (confirmacao.toUpperCase() === "S") {
            armazem.Clientes.splice(index, 1)
            console.log("Cliente e dependentes excluídos com sucesso!")
        } else {
            console.log("Operação cancelada.")
        }

        this.entrada.receberTexto("\nPressione Enter para voltar ao menu principal...")
    }
}