import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class ListagemAcomodados extends Processo {

    processar(): void {

        console.clear()

        console.log("Listando hóspedes acomodados...")
        console.log("----------------------------------")

        let armazem = Armazem.InstanciaUnica

        let acomodados = armazem.Clientes.filter(
            cliente => cliente.Acomodacao
        )

        if (acomodados.length === 0) {
            console.log("Nenhum cliente está acomodado")
            return
        }

        acomodados.forEach(cliente => {

            console.log(`Titular: ${cliente.Nome}`)

            console.log(
                `Acomodação: ${cliente.Acomodacao?.NomeAcomadacao}`
            )

            if (cliente.Dependentes.length > 0) {

                console.log("Dependentes:")

                cliente.Dependentes.forEach(dep => {
                    console.log(`- ${dep.Nome}`)
                })
            }

            console.log("----------------------------------")
        })
    }
}