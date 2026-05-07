import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import Telefone from "../modelos/telefone";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastroEndereco from "./cadastroEndereco";

export default class CadastroClienteTitular extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de um novo cliente...')
        let armazem = Armazem.InstanciaUnica
        let nome = this.entrada.receberTexto('Qual o nome do novo cliente?')
        let existe = armazem.Clientes.find(c => c.Nome === nome)
        
        if (existe) {
            console.log("Cliente já cadastrado com esse nome!")
            return
        }

        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?')
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')
        let cliente = new Cliente(nome, nomeSocial, dataNascimento)

        this.processo = new CadastroEndereco(cliente)
        this.processo.processar()

        this.processo = new CadastrarDocumentosCliente(cliente)
        this.processo.processar()

        console.log("Adicionando telefone:")
        let ddd = this.entrada.receberTexto("DDD:")
        let numero = this.entrada.receberTexto("Número de telefone:")
        let telefone = new Telefone(ddd, numero)
        cliente.Telefones.push(telefone)

        armazem.Clientes.push(cliente)

        console.log('Finalizando o cadastro do cliente...')
    }
}