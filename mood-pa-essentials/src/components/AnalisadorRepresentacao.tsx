import { FC, useState, useEffect } from 'react';
import { Upload, FileText, AlertCircle, Info } from 'lucide-react';
import { simularDeteccaoElementos, analisarRepresentacaoGrafica } from '@/utils/analiseRepresentacaoGrafica';
import ChecklistRepresentacao from '@/components/ChecklistRepresentacao';

interface AnalisadorRepresentacaoProps {
  onAnaliseCompleta?: (resultado: any) => void;
}

const AnalisadorRepresentacao: FC<AnalisadorRepresentacaoProps> = ({ onAnaliseCompleta }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [tiposProjeto, setTiposProjeto] = useState<string[]>(['residencial']);
  const [analisando, setAnalisando] = useState(false);
  const [resultadoAnalise, setResultadoAnalise] = useState<any>(null);
  const [elementosDetectados, setElementosDetectados] = useState<string[]>([]);
  const [elementosManualmente, setElementosManualmente] = useState<string[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  // Efeito para combinar elementos detectados automaticamente e manualmente
  useEffect(() => {
    if (elementosDetectados.length > 0 || elementosManualmente.length > 0) {
      const todosElementos = [...new Set([...elementosDetectados, ...elementosManualmente])];
      const resultado = analisarRepresentacaoGrafica(todosElementos, tiposProjeto);
      setResultadoAnalise(resultado);
      
      if (onAnaliseCompleta) {
        onAnaliseCompleta(resultado);
      }
    }
  }, [elementosDetectados, elementosManualmente, tiposProjeto, onAnaliseCompleta]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      setErro(null);
    }
  };

  const handleTipoProjetoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTiposProjeto([e.target.value]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      setErro('Por favor, selecione pelo menos um arquivo para análise.');
      return;
    }
    
    try {
      setAnalisando(true);
      setErro(null);
      
      // Simular detecção de elementos nos arquivos
      const elementos = await simularDeteccaoElementos(files, tiposProjeto);
      setElementosDetectados(elementos);
      
      // A análise será feita automaticamente pelo useEffect
    } catch (error) {
      setErro('Ocorreu um erro durante a análise dos arquivos.');
      console.error('Erro na análise:', error);
    } finally {
      setAnalisando(false);
    }
  };

  const handleManualUpdate = (elementoId: string, verificado: boolean) => {
    if (verificado) {
      setElementosManualmente(prev => [...prev, elementoId]);
    } else {
      setElementosManualmente(prev => prev.filter(id => id !== elementoId));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Análise de Representação Gráfica</h2>
      
      {!resultadoAnalise && (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tipo de Projeto
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={tiposProjeto[0]}
              onChange={handleTipoProjetoChange}
            >
              <option value="residencial-unifamiliar">Residencial Unifamiliar</option>
              <option value="residencial-multifamiliar">Residencial Multifamiliar</option>
              <option value="comercial">Comercial</option>
              <option value="misto">Uso Misto</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Arquivos do Projeto
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Arraste e solte arquivos aqui ou
              </p>
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                multiple
                accept=".pdf,.dwg,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              <label
                htmlFor="fileUpload"
                className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-500"
              >
                Selecionar Arquivos
              </label>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Formatos aceitos: PDF, DWG, JPG, PNG
              </p>
            </div>
          </div>
          
          {files.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Arquivos Selecionados:
              </h3>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <FileText className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{file.name}</span>
                    <span className="ml-2 text-xs text-gray-500">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {erro && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{erro}</span>
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={analisando || files.length === 0}
              className={`${
                analisando || files.length === 0 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-500'
              } text-white px-4 py-2 rounded-md flex items-center`}
            >
              {analisando ? 'Analisando...' : 'Analisar Representação Gráfica'}
            </button>
          </div>
        </form>
      )}
      
      {analisando && (
        <div className="text-center py-8">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-blue-400 dark:bg-blue-600 rounded-full mb-4"></div>
            <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Analisando representação gráfica dos arquivos...
          </p>
        </div>
      )}
      
      {resultadoAnalise && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Resultado da Análise</h3>
            <button
              onClick={() => {
                setResultadoAnalise(null);
                setFiles([]);
                setElementosDetectados([]);
                setElementosManualmente([]);
              }}
              className="text-blue-600 hover:text-blue-500"
            >
              Nova Análise
            </button>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md flex items-start">
            <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p>
                A análise automática detectou {elementosDetectados.length} elementos nos arquivos enviados.
                Se algum elemento não foi detectado corretamente, você pode marcá-lo manualmente no checklist abaixo.
              </p>
            </div>
          </div>
          
          <ChecklistRepresentacao
            elementosVerificados={resultadoAnalise.elementosVerificados}
            conformidade={resultadoAnalise.conformidade}
            elementosFaltantes={resultadoAnalise.elementosFaltantes}
            onManualUpdate={handleManualUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default AnalisadorRepresentacao;
