import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";

export default class editarClienteDependente extends Processo {
    processar(): void {
        let armazem = Armazem.InstanciaUnica

        let nomeTitular = this.entrada.receberTexto("Nome do titular:")
        let titular = armazem.Clientes.find(c => c.Nome === nomeTitular)

        if (!titular) {
            console.log("Titular não encontrado")
            return
        }

        let nomeDependente = this.entrada.receberTexto("Nome do dependente:")
        let dependente = titular.Dependentes.find(d => d.Nome === nomeDependente)

        if (!dependente) {
            console.log("Dependente não encontrado")
            return
        }

        let novoNome = this.entrada.receberTexto("Novo nome:")
        if (novoNome) dependente.Nome = novoNome

        let novoNomeSocial = this.entrada.receberTexto("Novo nome social:")
        if (novoNomeSocial) dependente.NomeSocial = novoNomeSocial

        let alterarEndereco = this.entrada.receberTexto("Deseja alterar o endereço? (S/N)")
        if (alterarEndereco.toUpperCase() === "S") {
            let rua = this.entrada.receberTexto("Nova rua:")
            let bairro = this.entrada.receberTexto("Novo bairro:")
            let cidade = this.entrada.receberTexto("Nova cidade:")
            let estado = this.entrada.receberTexto("Novo estado:")
            let pais = this.entrada.receberTexto("Novo país:")
            let cep = this.entrada.receberTexto("Novo CEP:")

            let novoEndereco = new Endereco(rua, bairro, cidade, estado, pais, cep)

            dependente.Endereco = novoEndereco
        }

        let alterarTelefone = this.entrada.receberTexto("Deseja alterar o telefone? (S/N)")
        if (alterarTelefone.toUpperCase() === "S"){

            console.log("Telefones:")
            dependente.Telefones.forEach((t, i) => {
                console.log(`${i + 1} - (${t.Ddd}) ${t.Numero}`)
            })

            let indice = this.entrada.receberNumero("Qual telefone deseja editar?")

            if (indice < 1 || indice > dependente.Telefones.length) {
                console.log("Opção inválida")
                return
            }

            let ddd = this.entrada.receberTexto("Novo ddd:")
            let numero = this.entrada.receberTexto("Novo número de telefone:")
            let novoTelefone = new Telefone(ddd, numero)
            dependente.Telefones[indice - 1] = novoTelefone

        }
        console.log("Dependente atualizado")
    }
}