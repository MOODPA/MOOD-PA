import { FC, useState, useEffect } from 'react';
import { 
  CategoriaParametros, 
  ParametroUrbanistico, 
  analisarParametrosUrbanisticos 
} from '@/utils/calculoParametrosUrbanisticos';
import { CheckCircle, XCircle, AlertCircle, Edit2, Save } from 'lucide-react';

interface AnaliseParametrosProps {
  categoriasParametros: CategoriaParametros[];
  conformidade: number;
  parametrosNaoConformes: ParametroUrbanistico[];
  onParametroChange?: (categoriaId: string, parametroId: string, valor: number) => void;
  readOnly?: boolean;
}

const AnaliseParametros: FC<AnaliseParametrosProps> = ({
  categoriasParametros,
  conformidade,
  parametrosNaoConformes,
  onParametroChange,
  readOnly = false
}) => {
  const [categorias, setCategorias] = useState<CategoriaParametros[]>(categoriasParametros);
  const [editando, setEditando] = useState<{categoriaId: string, parametroId: string} | null>(null);
  const [valorEditado, setValorEditado] = useState<string>('');
  
  // Atualizar categorias quando os categoriasParametros mudarem
  useEffect(() => {
    setCategorias(categoriasParametros);
  }, [categoriasParametros]);
  
  // Função para iniciar a edição de um parâmetro
  const iniciarEdicao = (categoriaId: string, parametroId: string, valorAtual: number | null) => {
    if (readOnly) return;
    
    setEditando({ categoriaId, parametroId });
    setValorEditado(valorAtual !== null ? valorAtual.toString() : '');
  };
  
  // Função para salvar o valor editado
  const salvarEdicao = (categoriaId: string, parametroId: string) => {
    if (readOnly) return;
    
    const valor = parseFloat(valorEditado);
    if (!isNaN(valor) && onParametroChange) {
      onParametroChange(categoriaId, parametroId, valor);
    }
    
    setEditando(null);
  };
  
  // Função para renderizar o status de conformidade
  const renderConformidadeStatus = () => {
    let statusColor = '';
    let statusText = '';
    let statusIcon = null;
    
    if (conformidade >= 90) {
      statusColor = 'text-green-600';
      statusText = 'Alta Conformidade';
      statusIcon = <CheckCircle className="h-5 w-5 mr-1" />;
    } else if (conformidade >= 70) {
      statusColor = 'text-yellow-600';
      statusText = 'Conformidade Parcial';
      statusIcon = <AlertCircle className="h-5 w-5 mr-1" />;
    } else {
      statusColor = 'text-red-600';
      statusText = 'Baixa Conformidade';
      statusIcon = <XCircle className="h-5 w-5 mr-1" />;
    }
    
    return (
      <div className={`flex items-center ${statusColor} font-medium`}>
        {statusIcon}
        <span>{statusText}</span>
      </div>
    );
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Análise de Parâmetros Urbanísticos</h2>
        <div className="flex flex-col items-end">
          <div className="text-lg font-bold mb-1">
            {conformidade.toFixed(1)}% Conforme
          </div>
          {renderConformidadeStatus()}
        </div>
      </div>
      
      {parametrosNaoConformes.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-md">
          <h3 className="text-md font-medium text-red-800 dark:text-red-300 mb-2">
            Parâmetros Não Conformes:
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {parametrosNaoConformes.map((parametro) => (
              <li key={parametro.id} className="text-sm text-red-700 dark:text-red-400">
                {parametro.nome}: {parametro.valorProjeto} {parametro.unidade} 
                ({parametro.tipoComparacao === 'minimo' ? 'mínimo' : 'máximo'} permitido: {parametro.valorReferencia} {parametro.unidade})
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="space-y-6">
        {categorias.map((categoria) => (
          <div key={categoria.id} className="border dark:border-gray-700 rounded-md overflow-hidden">
            <h3 className="font-medium p-4 bg-gray-50 dark:bg-gray-700">{categoria.nome}</h3>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {categoria.parametros.map((parametro) => (
                <div 
                  key={parametro.id}
                  className={`p-4 ${
                    parametro.conforme === false ? 'bg-red-50 dark:bg-red-900/10' : 
                    parametro.conforme === true ? 'bg-green-50 dark:bg-green-900/10' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">{parametro.nome}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {parametro.descricao}
                      </p>
                    </div>
                    <div className="text-right">
                      {editando?.categoriaId === categoria.id && editando?.parametroId === parametro.id ? (
                        <div className="flex items-center">
                          <input
                            type="number"
                            className="w-20 px-2 py-1 border border-gray-300 rounded-md text-right dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={valorEditado}
                            onChange={(e) => setValorEditado(e.target.value)}
                            autoFocus
                            step="0.1"
                          />
                          <span className="ml-1 text-gray-500 dark:text-gray-400">{parametro.unidade}</span>
                          <button
                            onClick={() => salvarEdicao(categoria.id, parametro.id)}
                            className="ml-2 p-1 text-blue-600 hover:text-blue-500"
                          >
                            <Save size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span className="font-medium">
                            {parametro.valorProjeto !== null ? parametro.valorProjeto : '—'}
                          </span>
                          <span className="ml-1 text-gray-500 dark:text-gray-400">{parametro.unidade}</span>
                          {!readOnly && (
                            <button
                              onClick={() => iniciarEdicao(categoria.id, parametro.id, parametro.valorProjeto)}
                              className="ml-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              <Edit2 size={16} />
                            </button>
                          )}
                        </div>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {parametro.tipoComparacao === 'minimo' ? 'Mínimo' : 'Máximo'}: {parametro.valorReferencia} {parametro.unidade}
                      </p>
                    </div>
                  </div>
                  
                  {parametro.valorProjeto !== null && (
                    <div className="mt-2 flex items-center">
                      {parametro.conforme ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-xs ${parametro.conforme ? 'text-green-600' : 'text-red-600'}`}>
                        {parametro.conforme ? 'Conforme' : 'Não conforme'}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {!readOnly && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Clique no ícone de edição para inserir ou corrigir valores manualmente caso a detecção automática não os tenha identificado corretamente.
        </p>
      )}
    </div>
  );
};

export default AnaliseParametros;
