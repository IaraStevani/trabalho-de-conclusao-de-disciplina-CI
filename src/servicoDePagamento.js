export default class ServicoDePagamento {
    #pagamentos;

    constructor() {
        this.#pagamentos = [];
    }

    pagar(codigoBarras, empresa, valor) {
        let categoriaCalculada = 'padrão';

        if (valor > 100.00) {
            categoriaCalculada = 'cara';
        }

        this.#pagamentos.push({
            codigoBarras: codigoBarras,
            empresa: empresa,
            valor: valor,
            categoria: categoriaCalculada
        });
    }

    consultarUltimoPagamento() {
        return this.#pagamentos.at(-1);
    }
}