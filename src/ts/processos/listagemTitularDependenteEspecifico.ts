import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ListagemTitularPorDependente extends Processo {
    private impressor!: Impressor

    processar(): void {
        console.clear()
        let armazem = Armazem.InstanciaUnica
        let dependentes: Cliente[] = []

        armazem.Clientes.forEach(cliente => {
            cliente.Dependentes.forEach(dep => {
                dependentes.push(dep)
            })
        })

        if (dependentes.length === 0) {
            console.log("Não há dependentes cadastrados.")
            this.entrada.receberTexto("Pressione Enter para voltar...")
            return
        }

        console.log("--- Lista de Dependentes ---")
        dependentes.forEach((d, i) => {
            console.log(`${i + 1} - ${d.Nome}`)
        })

        let indice = this.entrada.receberNumero("Escolha o número do dependente para ver o titular:")

        if (indice < 1 || indice > dependentes.length) {
            console.log("Opção inválida.")
            this.entrada.receberTexto("Pressione Enter para voltar...")
            return
        }

        let dependenteSelecionado = dependentes[indice - 1]

        let titularEncontrado = armazem.Clientes.find(cliente => 
            cliente.Dependentes.some(d => d.Nome === dependenteSelecionado.Nome)
        )

        if (titularEncontrado) {
            console.log(`Titular encontrado para o dependente: ${dependenteSelecionado.Nome}`)
            this.impressor = new ImpressaorCliente(titularEncontrado)
            console.log(this.impressor.imprimir())
        } else {
            console.log("Erro: Não foi possível localizar o titular deste dependente no sistema.")
        }

        this.entrada.receberTexto("\nPressione Enter para voltar ao menu principal...")
    }
}