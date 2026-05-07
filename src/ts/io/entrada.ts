import promptSync from "prompt-sync";

const prompt = promptSync()

export default class Entrada {
    public receberNumero(mensagem: string): number {
        let valor = prompt(`${mensagem} `)
        return Number(valor)
    }

    public receberTexto(mensagem: string): string {
        let texto = prompt(`${mensagem} `)
        return texto
    }

    public receberData(mensagem: string): Date {
        let texto = prompt(`${mensagem}, no padrão dd/MM/yyyy: `)
        let partes = texto.split('/')
        let dia = Number(partes[0])
        let mes = Number(partes[1])
        let ano = Number(partes[2])
        return new Date(ano, mes - 1, dia)
    }
}