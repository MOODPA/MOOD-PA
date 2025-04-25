import { FC, useState, useEffect } from 'react';
import { ElementoGrafico, CategoriaElementos } from '@/utils/analiseRepresentacaoGrafica';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ChecklistRepresentacaoProps {
  elementosVerificados: CategoriaElementos[];
  conformidade: number;
  elementosFaltantes: ElementoGrafico[];
  onManualUpdate?: (elementoId: string, verificado: boolean) => void;
  readOnly?: boolean;
}

const ChecklistRepresentacao: FC<ChecklistRepresentacaoProps> = ({
  elementosVerificados,
  conformidade,
  elementosFaltantes,
  onManualUpdate,
  readOnly = false
}) => {
  const [categorias, setCategorias] = useState<CategoriaElementos[]>(elementosVerificados);
  
  // Atualizar categorias quando os elementosVerificados mudarem
  useEffect(() => {
    setCategorias(elementosVerificados);
  }, [elementosVerificados]);
  
  // Função para alternar o estado de verificação de um elemento
  const toggleElemento = (categoriaId: string, elementoId: string) => {
    if (readOnly) return;
    
    const novasCategorias = categorias.map(categoria => {
      if (categoria.id === categoriaId) {
        const novosElementos = categoria.elementos.map(elemento => {
          if (elemento.id === elementoId) {
            const novoEstado = !elemento.verificado;
            
            // Chamar callback se fornecido
            if (onManualUpdate) {
              onManualUpdate(elementoId, novoEstado);
            }
            
            return { ...elemento, verificado: novoEstado };
          }
          return elemento;
        });
        
        return { ...categoria, elementos: novosElementos };
      }
      return categoria;
    });
    
    setCategorias(novasCategorias);
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
        <h2 className="text-xl font-semibold">Checklist de Representação Gráfica</h2>
        <div className="flex flex-col items-end">
          <div className="text-lg font-bold mb-1">
            {conformidade.toFixed(1)}% Conforme
          </div>
          {renderConformidadeStatus()}
        </div>
      </div>
      
      {elementosFaltantes.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-md">
          <h3 className="text-md font-medium text-red-800 dark:text-red-300 mb-2">
            Elementos Obrigatórios Faltantes:
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {elementosFaltantes.map((elemento) => (
              <li key={elemento.id} className="text-sm text-red-700 dark:text-red-400">
                {elemento.nome}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="space-y-6">
        {categorias.map((categoria) => (
          <div key={categoria.id} className="border dark:border-gray-700 rounded-md p-4">
            <h3 className="font-medium mb-3">{categoria.nome}</h3>
            <div className="space-y-2">
              {categoria.elementos.map((elemento) => (
                <div 
                  key={elemento.id}
                  className={`flex items-start p-2 rounded-md ${
                    !readOnly ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' : ''
                  } ${elemento.verificado ? 'bg-green-50 dark:bg-green-900/20' : ''}`}
                  onClick={() => toggleElemento(categoria.id, elemento.id)}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {elemento.verificado ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className={`h-5 w-5 border-2 rounded-full ${
                        elemento.obrigatorio ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                      }`} />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">
                      {elemento.nome}
                      {elemento.obrigatorio && (
                        <span className="ml-1 text-red-500">*</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {elemento.descricao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {!readOnly && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          * Elementos obrigatórios. Clique nos itens para marcar manualmente caso a detecção automática não os tenha identificado.
        </p>
      )}
    </div>
  );
};

export default ChecklistRepresentacao;
