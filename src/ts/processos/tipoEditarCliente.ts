import Processo from "../abstracoes/processo";
import MenuTipoEditarCliente from "../menus/menuTipoEditarCliente";
import editarClienteDependente from "./editarClienteDependente";
import editarClienteTitular from "./editarClienteTitular";


export default class TipoEditarCliente extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoEditarCliente()
    }
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        
        switch (this.opcao) {
            case 1:
                this.processo = new editarClienteTitular()
                this.processo.processar()
                break
            case 2:
                this.processo = new editarClienteDependente()
                this.processo.processar()
            default:
                console.log('Opção não entendida :(')
        }
    }
}