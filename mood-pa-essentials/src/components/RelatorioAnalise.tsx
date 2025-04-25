import { FC, useState } from 'react';
import { CategoriaElementos } from '@/utils/analiseRepresentacaoGrafica';
import { CategoriaParametros } from '@/utils/calculoParametrosUrbanisticos';
import { FileText, Download, Printer, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import ChecklistRepresentacao from '@/components/ChecklistRepresentacao';
import AnaliseParametros from '@/components/AnaliseParametros';

interface RelatorioAnaliseProps {
  projeto: {
    id: string;
    nome: string;
    tipo: string;
    area: string;
    dataAnalise: string;
  };
  resultadoRepresentacao?: {
    elementosVerificados: CategoriaElementos[];
    conformidade: number;
    elementosFaltantes: any[];
  };
  resultadoParametros?: {
    categoriasAnalisadas: CategoriaParametros[];
    conformidade: number;
    parametrosNaoConformes: any[];
  };
  onExportPDF?: () => void;
  onPrint?: () => void;
}

const RelatorioAnalise: FC<RelatorioAnaliseProps> = ({
  projeto,
  resultadoRepresentacao,
  resultadoParametros,
  onExportPDF,
  onPrint
}) => {
  const [activeTab, setActiveTab] = useState<'resumo' | 'representacao' | 'parametros'>('resumo');
  
  // Calcular conformidade geral
  const conformidadeGeral = (() => {
    let total = 0;
    let count = 0;
    
    if (resultadoRepresentacao) {
      total += resultadoRepresentacao.conformidade;
      count++;
    }
    
    if (resultadoParametros) {
      total += resultadoParametros.conformidade;
      count++;
    }
    
    return count > 0 ? total / count : 0;
  })();
  
  // Determinar status geral
  const statusGeral = (() => {
    if (conformidadeGeral >= 90) {
      return { texto: 'Aprovado', cor: 'text-green-600', icone: <CheckCircle className="h-6 w-6 mr-2" /> };
    } else if (conformidadeGeral >= 70) {
      return { texto: 'Aprovado com Ressalvas', cor: 'text-yellow-600', icone: <AlertCircle className="h-6 w-6 mr-2" /> };
    } else {
      return { texto: 'Reprovado', cor: 'text-red-600', icone: <XCircle className="h-6 w-6 mr-2" /> };
    }
  })();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Cabeçalho do relatório */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">{projeto.nome}</h1>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Tipo:</strong> {projeto.tipo}</p>
              <p><strong>Área:</strong> {projeto.area} m²</p>
              <p><strong>Data da Análise:</strong> {projeto.dataAnalise}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className={`flex items-center ${statusGeral.cor} text-lg font-bold mb-2`}>
              {statusGeral.icone}
              {statusGeral.texto}
            </div>
            <div className="text-sm">
              Conformidade Geral: {conformidadeGeral.toFixed(1)}%
            </div>
          </div>
        </div>
        
        {/* Botões de ação */}
        <div className="flex mt-4 space-x-2">
          <button
            onClick={onExportPDF}
            className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-500 text-sm"
          >
            <Download className="h-4 w-4 mr-1" />
            Exportar PDF
          </button>
          <button
            onClick={onPrint}
            className="flex items-center px-3 py-1.5 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
          >
            <Printer className="h-4 w-4 mr-1" />
            Imprimir
          </button>
        </div>
      </div>
      
      {/* Navegação por abas */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex">
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'resumo'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('resumo')}
          >
            Resumo
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'representacao'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('representacao')}
          >
            Representação Gráfica
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'parametros'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('parametros')}
          >
            Parâmetros Urbanísticos
          </button>
        </nav>
      </div>
      
      {/* Conteúdo da aba */}
      <div className="p-6">
        {activeTab === 'resumo' && (
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <h2 className="text-lg font-medium mb-3">Resumo da Análise</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Este relatório apresenta os resultados da análise técnica do projeto "{projeto.nome}" 
                realizada pela plataforma MOOD.PA em {projeto.dataAnalise}.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="border dark:border-gray-600 rounded-md p-3">
                  <h3 className="font-medium mb-2">Representação Gráfica</h3>
                  {resultadoRepresentacao ? (
                    <div>
                      <div className="flex items-center mb-1">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              resultadoRepresentacao.conformidade >= 90 ? 'bg-green-500' :
                              resultadoRepresentacao.conformidade >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${resultadoRepresentacao.conformidade}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">{resultadoRepresentacao.conformidade.toFixed(1)}%</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {resultadoRepresentacao.elementosFaltantes.length > 0 
                          ? `${resultadoRepresentacao.elementosFaltantes.length} elementos obrigatórios faltantes`
                          : 'Todos os elementos obrigatórios presentes'}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">Não analisado</p>
                  )}
                </div>
                
                <div className="border dark:border-gray-600 rounded-md p-3">
                  <h3 className="font-medium mb-2">Parâmetros Urbanísticos</h3>
                  {resultadoParametros ? (
                    <div>
                      <div className="flex items-center mb-1">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              resultadoParametros.conformidade >= 90 ? 'bg-green-500' :
                              resultadoParametros.conformidade >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${resultadoParametros.conformidade}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">{resultadoParametros.conformidade.toFixed(1)}%</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {resultadoParametros.parametrosNaoConformes.length > 0 
                          ? `${resultadoParametros.parametrosNaoConformes.length} parâmetros não conformes`
                          : 'Todos os parâmetros conformes'}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">Não analisado</p>
                  )}
                </div>
              </div>
              
              <h3 className="font-medium mb-2">Resultado Final</h3>
              <div className={`flex items-center ${statusGeral.cor} mb-2`}>
                {statusGeral.icone}
                <span className="font-medium">{statusGeral.texto}</span>
              </div>
              
              <div className="mt-4 p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700">
                <h4 className="font-medium mb-1">Próximos Passos</h4>
                {statusGeral.texto === 'Aprovado' && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Seu projeto está em conformidade com a legislação municipal. Você pode prosseguir 
                    com a submissão formal à Prefeitura.
                  </p>
                )}
                {statusGeral.texto === 'Aprovado com Ressalvas' && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Seu projeto apresenta algumas não conformidades que precisam ser corrigidas antes 
                    da submissão formal. Verifique os detalhes nas abas específicas.
                  </p>
                )}
                {statusGeral.texto === 'Reprovado' && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Seu projeto apresenta várias não conformidades que precisam ser corrigidas. 
                    Recomendamos revisar o projeto com base nas análises detalhadas.
                  </p>
                )}
              </div>
            </div>
            
            {/* Recomendações */}
            <div>
              <h2 className="text-lg font-medium mb-3">Recomendações</h2>
              
              {resultadoRepresentacao && resultadoRepresentacao.elementosFaltantes.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-md font-medium mb-2">Representação Gráfica</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {resultadoRepresentacao.elementosFaltantes.slice(0, 3).map((elemento) => (
                      <li key={elemento.id} className="text-sm text-gray-600 dark:text-gray-400">
                        Adicionar {elemento.nome} ao projeto
                      </li>
                    ))}
                    {resultadoRepresentacao.elementosFaltantes.length > 3 && (
                      <li className="text-sm text-gray-600 dark:text-gray-400">
                        E mais {resultadoRepresentacao.elementosFaltantes.length - 3} elementos (ver aba Representação Gráfica)
                      </li>
                    )}
                  </ul>
                </div>
              )}
              
              {resultadoParametros && resultadoParametros.parametrosNaoConformes.length > 0 && (
                <div>
                  <h3 className="text-md font-medium mb-2">Parâmetros Urbanísticos</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {resultadoParametros.parametrosNaoConformes.slice(0, 3).map((parametro) => (
                      <li key={parametro.id} className="text-sm text-gray-600 dark:text-gray-400">
                        {parametro.tipoComparacao === 'minimo' 
                          ? `Aumentar ${parametro.nome.split(' - ')[1]} para pelo menos ${parametro.valorReferencia} ${parametro.unidade}`
                          : `Reduzir ${parametro.nome.split(' - ')[1]} para no máximo ${parametro.valorReferencia} ${parametro.unidade}`}
                      </li>
                    ))}
                    {resultadoParametros.parametrosNaoConformes.length > 3 && (
                      <li className="text-sm text-gray-600 dark:text-gray-400">
                        E mais {resultadoParametros.parametrosNaoConformes.length - 3} parâmetros (ver aba Parâmetros Urbanísticos)
                      </li>
                    )}
                  </ul>
                </div>
              )}
              
              {(!resultadoRepresentacao || resultadoRepresentacao.elementosFaltantes.length === 0) && 
               (!resultadoParametros || resultadoParametros.parametrosNaoConformes.length === 0) && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Não há recomendações específicas. O projeto está em conformidade com os requisitos analisados.
                </p>
              )}
            </div>
            
            {/* Documentos necessários */}
            <div>
              <h2 className="text-lg font-medium mb-3">Documentos Necessários para Submissão</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li className="text-sm text-gray-600 dark:text-gray-400">
                  Projeto Arquitetônico completo (plantas, cortes, fachadas, implantação)
                </li>
                <li className="text-sm text-gray-600 dark:text-gray-400">
                  ART/RRT de projeto e execução
                </li>
                <li className="text-sm text-gray-600 dark:text-gray-400">
                  Documento de propriedade do imóvel
                </li>
                <li className="text-sm text-gray-600 dark:text-gray-400">
                  Formulário de caracterização do empreendimento
                </li>
                <li className="text-sm text-gray-600 dark:text-gray-400">
                  Comprovante de pagamento da taxa de análise
                </li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'representacao' && resultadoRepresentacao && (
          <ChecklistRepresentacao
            elementosVerificados={resultadoRepresentacao.elementosVerificados}
            conformidade={resultadoRepresentacao.conformidade}
            elementosFaltantes={resultadoRepresentacao.elementosFaltantes}
            readOnly={true}
          />
        )}
        
        {activeTab === 'parametros' && resultadoParametros && (
          <AnaliseParametros
            categoriasParametros={resultadoParametros.categoriasAnalisadas}
            conformidade={resultadoParametros.conformidade}
            parametrosNaoConformes={resultadoParametros.parametrosNaoConformes}
            readOnly={true}
          />
        )}
      </div>
    </div>
  );
};

export default RelatorioAnalise;
