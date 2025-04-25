import { FC, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatorioAnalise from '@/components/RelatorioAnalise';
import useReportExport from '@/hooks/useReportExport';

interface RelatorioPageProps {}

const RelatorioPage: FC<RelatorioPageProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const reportRef = useRef<HTMLDivElement>(null);
  
  // Estado para armazenar os dados do projeto e resultados da análise
  const [projeto, setProjeto] = useState({
    id: id as string || '1',
    nome: 'Residência Unifamiliar Silva',
    tipo: 'Residencial Unifamiliar',
    area: '120',
    dataAnalise: new Date().toLocaleDateString('pt-BR')
  });
  
  // Dados simulados para o relatório
  const [resultadoRepresentacao] = useState({
    elementosVerificados: [
      {
        id: 'planta_baixa',
        nome: 'Planta Baixa',
        elementos: [
          {
            id: 'pb_cotas',
            nome: 'Cotas',
            descricao: 'Dimensões dos ambientes, paredes e aberturas',
            obrigatorio: true,
            verificado: true
          },
          {
            id: 'pb_norte',
            nome: 'Indicação do Norte',
            descricao: 'Orientação do projeto em relação ao norte geográfico',
            obrigatorio: true,
            verificado: true
          },
          {
            id: 'pb_ambientes',
            nome: 'Nomenclatura dos Ambientes',
            descricao: 'Identificação de todos os ambientes do projeto',
            obrigatorio: true,
            verificado: true
          },
          {
            id: 'pb_areas',
            nome: 'Áreas dos Ambientes',
            descricao: 'Indicação da área de cada ambiente em m²',
            obrigatorio: true,
            verificado: false
          }
        ]
      },
      {
        id: 'cortes',
        nome: 'Cortes',
        elementos: [
          {
            id: 'corte_cotas_verticais',
            nome: 'Cotas Verticais',
            descricao: 'Dimensões de pé-direito e outros elementos verticais',
            obrigatorio: true,
            verificado: true
          },
          {
            id: 'corte_niveis',
            nome: 'Níveis',
            descricao: 'Indicação dos diferentes níveis do projeto',
            obrigatorio: true,
            verificado: true
          }
        ]
      }
    ],
    conformidade: 85.7,
    elementosFaltantes: [
      {
        id: 'pb_areas',
        nome: 'Planta Baixa - Áreas dos Ambientes',
        descricao: 'Indicação da área de cada ambiente em m²',
        obrigatorio: true,
        verificado: false
      }
    ]
  });
  
  const [resultadoParametros] = useState({
    categoriasAnalisadas: [
      {
        id: 'recuos',
        nome: 'Recuos',
        parametros: [
          {
            id: 'recuo_frontal',
            nome: 'Recuo Frontal',
            descricao: 'Distância mínima entre a edificação e o alinhamento frontal do terreno',
            unidade: 'm',
            valorProjeto: 3.5,
            valorReferencia: 3.0,
            tipoComparacao: 'minimo',
            conforme: true
          },
          {
            id: 'recuo_lateral',
            nome: 'Recuo Lateral',
            descricao: 'Distância mínima entre a edificação e as divisas laterais do terreno',
            unidade: 'm',
            valorProjeto: 1.2,
            valorReferencia: 1.5,
            tipoComparacao: 'minimo',
            conforme: false
          }
        ]
      },
      {
        id: 'ocupacao',
        nome: 'Ocupação',
        parametros: [
          {
            id: 'taxa_ocupacao',
            nome: 'Taxa de Ocupação',
            descricao: 'Percentual máximo da área do terreno que pode ser ocupada pela projeção da edificação',
            unidade: '%',
            valorProjeto: 55.0,
            valorReferencia: 60.0,
            tipoComparacao: 'maximo',
            conforme: true
          },
          {
            id: 'taxa_permeabilidade',
            nome: 'Taxa de Permeabilidade',
            descricao: 'Percentual mínimo da área do terreno que deve ser mantida permeável',
            unidade: '%',
            valorProjeto: 22.0,
            valorReferencia: 20.0,
            tipoComparacao: 'minimo',
            conforme: true
          }
        ]
      }
    ],
    conformidade: 75.0,
    parametrosNaoConformes: [
      {
        id: 'recuo_lateral',
        nome: 'Recuos - Recuo Lateral',
        descricao: 'Distância mínima entre a edificação e as divisas laterais do terreno',
        unidade: 'm',
        valorProjeto: 1.2,
        valorReferencia: 1.5,
        tipoComparacao: 'minimo',
        conforme: false
      }
    ]
  });
  
  // Hooks para exportação do relatório
  const { exportToPDF, printReport } = useReportExport({
    reportRef,
    projectName: projeto.nome
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage="projetos" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.push('/projetos')}
            className="text-blue-600 hover:text-blue-500 flex items-center"
          >
            ← Voltar para Projetos
          </button>
        </div>
        
        <div ref={reportRef}>
          <RelatorioAnalise
            projeto={projeto}
            resultadoRepresentacao={resultadoRepresentacao}
            resultadoParametros={resultadoParametros}
            onExportPDF={exportToPDF}
            onPrint={printReport}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RelatorioPage;
