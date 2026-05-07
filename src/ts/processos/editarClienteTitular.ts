import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";

export default class editarClienteTitular extends Processo {
    processar(): void {
        let armazem = Armazem.InstanciaUnica

        let nomeCliente = this.entrada.receberTexto("Qual nome do cliente que vc deseja atualizar os dados?")
        let cliente = armazem.Clientes.find(c => c.Nome === nomeCliente)

        if (!cliente) {
            console.log("Cliente não encontrado")
            return
        }

        let novoNome = this.entrada.receberTexto("Novo nome do cliente:")
        if (novoNome) cliente.Nome = novoNome

        let novoNomeSocial = this.entrada.receberTexto("Novo nome social do cliente:")
        if (novoNomeSocial) cliente.NomeSocial = novoNomeSocial

        let alterarEndereco = this.entrada.receberTexto("Deseja alterar o endereço? (S/N)")

        if (alterarEndereco.toUpperCase() === "S") {
            let rua = this.entrada.receberTexto("Nova rua:")
            let bairro = this.entrada.receberTexto("Novo bairro:")
            let cidade = this.entrada.receberTexto("Nova cidade:")
            let estado = this.entrada.receberTexto("Novo estado:")
            let pais = this.entrada.receberTexto("Novo país:")
            let cep = this.entrada.receberTexto("Novo CEP:")

            let novoEndereco = new Endereco(rua, bairro, cidade, estado, pais, cep)

            cliente.Endereco = novoEndereco
        }

        let alterarTelefone = this.entrada.receberTexto("Deseja alterar o telefone? (S/N)")
        if (alterarTelefone.toUpperCase() === "S"){
        
        console.log("Telefones:")
        cliente.Telefones.forEach((t, i) => {
        console.log(`${i + 1} - (${t.Ddd}) ${t.Numero}`)
        })
        
        let indice = this.entrada.receberNumero("Qual telefone deseja editar?")
        
        if (indice < 1 || indice > cliente.Telefones.length) {
            console.log("Opção inválida")
             return
        }
        
        let ddd = this.entrada.receberTexto("Novo ddd:")
        let numero = this.entrada.receberTexto("Novo número de telefone:")
        let novoTelefone = new Telefone(ddd, numero)
        cliente.Telefones[indice - 1] = novoTelefone
        }

        console.log('Cliente atualizado')
    }
}