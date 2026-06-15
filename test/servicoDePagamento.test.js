import ServicoDePagamento from '../src/servicoDePagamento.js';
import assert from 'node:assert';

describe('Testes da Classe Serviço De Pagamento', () => {

    describe('Teste Realizar Pagamento', () => {
        it('Deve definir categoria como "cara" para pagamentos acima de 100.00', () => {
            // Arrange (Preparação)
            const servicoDePagamento = new ServicoDePagamento();
            const valorCaro = 100.01;
            const categoriaEsperada = 'cara';

            // Act (Ação)
            servicoDePagamento.pagar('0987-7656-3475', 'Samar', valorCaro);
            const resultado = servicoDePagamento.consultarUltimoPagamento();

            // Assert (Verificação)
            assert.equal(resultado.categoria, categoriaEsperada);
        });

        it('Deve definir categoria como "padrão" para pagamentos de 100.00 ou menos', () => {
            // Arrange (Preparação)
            const servicoDePagamento = new ServicoDePagamento();
            const valorPadrao = 100.00;
            const categoriaEsperada = 'padrão';

            // Act (Ação)
            servicoDePagamento.pagar('1111-2222-3333', 'CPFL', valorPadrao);
            const resultado = servicoDePagamento.consultarUltimoPagamento();

            // Assert (Verificação)
            assert.equal(resultado.categoria, categoriaEsperada);
        });
    });

    describe('Teste Consultar Último Pagamento', () => {
        it('Deve retornar o último pagamento realizado quando houver mais de um', () => {
            // Arrange (Preparação)
            const servicoDePagamento = new ServicoDePagamento();
            const primeiroPagamento = { codigoBarras: '1111-1111-1111', empresa: 'Empresa A', valor: 50.00 };
            const segundoPagamento = { codigoBarras: '2222-2222-2222', empresa: 'Empresa B', valor: 200.00 };

            // Act (Ação)
            servicoDePagamento.pagar(primeiroPagamento.codigoBarras, primeiroPagamento.empresa, primeiroPagamento.valor);
            servicoDePagamento.pagar(segundoPagamento.codigoBarras, segundoPagamento.empresa, segundoPagamento.valor);

            const resultado = servicoDePagamento.consultarUltimoPagamento();

            // Assert (Verificação)
            assert.equal(resultado.codigoBarras, segundoPagamento.codigoBarras);
            assert.equal(resultado.empresa, segundoPagamento.empresa);
        });
    });
});