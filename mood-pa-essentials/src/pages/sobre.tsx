import { FC } from 'react';

interface SobreProps {}

const Sobre: FC<SobreProps> = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Sobre o MOOD.PA</h1>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">O Projeto</h2>
          <p className="mb-4">
            O MOOD.PA é uma plataforma web desenvolvida para auxiliar profissionais de arquitetura e engenharia 
            na verificação prévia de conformidade de seus projetos com a legislação municipal, antes da 
            submissão formal às prefeituras.
          </p>
          <p className="mb-4">
            Esta ferramenta analisa automaticamente os parâmetros urbanísticos exigidos pela legislação municipal, 
            como recuos, altura da edificação, taxa de permeabilidade, coeficiente de aproveitamento, entre outros, 
            gerando relatórios detalhados que apontam conformidades e não conformidades.
          </p>
          <p>
            O objetivo é reduzir o tempo de aprovação de projetos, minimizar erros e retrabalhos, e aumentar a 
            transparência do processo, beneficiando tanto os profissionais quanto a administração pública.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Funcionalidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border dark:border-gray-700 rounded-md p-4">
              <h3 className="font-medium mb-2">Análise Automatizada</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Verificação automática de conformidade com a legislação municipal, incluindo parâmetros 
                urbanísticos como recuos, altura, taxa de permeabilidade e coeficiente de aproveitamento.
              </p>
            </div>
            <div className="border dark:border-gray-700 rounded-md p-4">
              <h3 className="font-medium mb-2">Relatórios Detalhados</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Geração de relatórios completos com itens conformes e não conformes, incluindo recomendações 
                para adequação do projeto às normas vigentes.
              </p>
            </div>
            <div className="border dark:border-gray-700 rounded-md p-4">
              <h3 className="font-medium mb-2">Exportação de Resultados</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Possibilidade de exportar os relatórios em formato PDF ou imprimir diretamente do navegador 
                para facilitar o compartilhamento e documentação.
              </p>
            </div>
            <div className="border dark:border-gray-700 rounded-md p-4">
              <h3 className="font-medium mb-2">Histórico de Projetos</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Armazenamento e organização de todos os projetos submetidos, permitindo acompanhar o histórico 
                de análises e comparar diferentes versões.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Legislação Municipal</h2>
          <p className="mb-4">
            O MOOD.PA baseia-se nas seguintes legislações municipais:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Lei Complementar nº 172/2022 - Plano Diretor do Município de Itaúna</li>
            <li>Lei nº 2.197 - Código de Obras de Itaúna</li>
            <li>Lei nº 2.198 - Lei de Uso e Ocupação do Solo Urbano</li>
            <li>Lei nº 1.967 - Código de Parcelamento do Solo Urbano</li>
            <li>Cartilha de Regulamentação de Passeios e Acessos Veiculares</li>
          </ul>
          <p>
            A plataforma é atualizada regularmente para refletir as mudanças na legislação municipal, 
            garantindo que as análises estejam sempre em conformidade com as normas vigentes.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Contato</h2>
          <p className="mb-4">
            Para mais informações sobre o MOOD.PA, entre em contato:
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
            <p className="mb-2"><strong>Desenvolvedor:</strong> Caique Tavares Silva, Arquiteto e Urbanista</p>
            <p className="mb-2"><strong>Endereço:</strong> Rua Silviano Brandão, n° 17 - Cerqueira Lima</p>
            <p className="mb-2"><strong>E-mail:</strong> arquitetocaiquetavares@gmail.com</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Sobre;
