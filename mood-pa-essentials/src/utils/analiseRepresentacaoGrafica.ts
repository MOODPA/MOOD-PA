// Tipos para representação gráfica
export interface ElementoGrafico {
  id: string;
  nome: string;
  descricao: string;
  obrigatorio: boolean;
  verificado: boolean;
}

export interface CategoriaElementos {
  id: string;
  nome: string;
  elementos: ElementoGrafico[];
}

// Checklist de elementos obrigatórios para representação gráfica
export const checklistRepresentacaoGrafica: CategoriaElementos[] = [
  {
    id: 'planta_baixa',
    nome: 'Planta Baixa',
    elementos: [
      {
        id: 'pb_cotas',
        nome: 'Cotas',
        descricao: 'Dimensões dos ambientes, paredes e aberturas',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'pb_norte',
        nome: 'Indicação do Norte',
        descricao: 'Orientação do projeto em relação ao norte geográfico',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'pb_ambientes',
        nome: 'Nomenclatura dos Ambientes',
        descricao: 'Identificação de todos os ambientes do projeto',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'pb_areas',
        nome: 'Áreas dos Ambientes',
        descricao: 'Indicação da área de cada ambiente em m²',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'pb_esquadrias',
        nome: 'Esquadrias',
        descricao: 'Representação e identificação das esquadrias',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'pb_projecoes',
        nome: 'Projeções',
        descricao: 'Linhas tracejadas indicando projeções de elementos superiores',
        obrigatorio: false,
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
        verificado: false
      },
      {
        id: 'corte_niveis',
        nome: 'Níveis',
        descricao: 'Indicação dos diferentes níveis do projeto',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'corte_terreno_natural',
        nome: 'Perfil do Terreno Natural',
        descricao: 'Representação do perfil original do terreno',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'corte_altura_edificacao',
        nome: 'Altura Total da Edificação',
        descricao: 'Cota da altura máxima da edificação',
        obrigatorio: true,
        verificado: false
      }
    ]
  },
  {
    id: 'fachadas',
    nome: 'Fachadas',
    elementos: [
      {
        id: 'fachada_niveis',
        nome: 'Níveis',
        descricao: 'Indicação dos diferentes níveis da fachada',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'fachada_altura_total',
        nome: 'Altura Total',
        descricao: 'Cota da altura máxima da edificação na fachada',
        obrigatorio: true,
        verificado: false
      }
    ]
  },
  {
    id: 'implantacao',
    nome: 'Implantação/Situação',
    elementos: [
      {
        id: 'impl_recuos',
        nome: 'Recuos',
        descricao: 'Cotas dos recuos frontal, laterais e fundos',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'impl_norte',
        nome: 'Indicação do Norte',
        descricao: 'Orientação do projeto em relação ao norte geográfico',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'impl_dimensoes_terreno',
        nome: 'Dimensões do Terreno',
        descricao: 'Cotas das dimensões do terreno',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'impl_area_permeavel',
        nome: 'Área Permeável',
        descricao: 'Indicação e hachura da área permeável',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'impl_acessos',
        nome: 'Acessos',
        descricao: 'Indicação dos acessos de pedestres e veículos',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'impl_passeio',
        nome: 'Passeio Público',
        descricao: 'Representação do passeio público com dimensões',
        obrigatorio: true,
        verificado: false
      }
    ]
  },
  {
    id: 'quadro_areas',
    nome: 'Quadro de Áreas',
    elementos: [
      {
        id: 'qa_area_terreno',
        nome: 'Área do Terreno',
        descricao: 'Indicação da área total do terreno em m²',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'qa_area_construida',
        nome: 'Área Construída',
        descricao: 'Área construída total e por pavimento em m²',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'qa_area_permeavel',
        nome: 'Área Permeável',
        descricao: 'Área permeável em m² e porcentagem',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'qa_taxa_ocupacao',
        nome: 'Taxa de Ocupação',
        descricao: 'Porcentagem de ocupação do terreno',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'qa_coef_aproveitamento',
        nome: 'Coeficiente de Aproveitamento',
        descricao: 'Relação entre área construída e área do terreno',
        obrigatorio: true,
        verificado: false
      }
    ]
  },
  {
    id: 'carimbo',
    nome: 'Carimbo/Selo',
    elementos: [
      {
        id: 'carimbo_titulo',
        nome: 'Título do Projeto',
        descricao: 'Nome do projeto',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'carimbo_proprietario',
        nome: 'Proprietário',
        descricao: 'Nome do proprietário',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'carimbo_responsavel',
        nome: 'Responsável Técnico',
        descricao: 'Nome e registro profissional do responsável técnico',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'carimbo_escala',
        nome: 'Escala',
        descricao: 'Escala do desenho',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'carimbo_data',
        nome: 'Data',
        descricao: 'Data de elaboração do projeto',
        obrigatorio: true,
        verificado: false
      },
      {
        id: 'carimbo_folha',
        nome: 'Identificação da Folha',
        descricao: 'Número da folha e quantidade total',
        obrigatorio: true,
        verificado: false
      }
    ]
  }
];

// Função para analisar a representação gráfica
export function analisarRepresentacaoGrafica(
  elementosDetectados: string[],
  tiposProjeto: string[]
): {
  elementosVerificados: CategoriaElementos[];
  conformidade: number;
  elementosFaltantes: ElementoGrafico[];
} {
  // Clonar o checklist para não modificar o original
  const checklistClone: CategoriaElementos[] = JSON.parse(
    JSON.stringify(checklistRepresentacaoGrafica)
  );
  
  // Marcar elementos detectados como verificados
  let totalElementosObrigatorios = 0;
  let elementosObrigatoriosVerificados = 0;
  
  checklistClone.forEach(categoria => {
    categoria.elementos.forEach(elemento => {
      // Verificar se o elemento foi detectado
      if (elementosDetectados.includes(elemento.id)) {
        elemento.verificado = true;
      }
      
      // Contar elementos obrigatórios
      if (elemento.obrigatorio) {
        totalElementosObrigatorios++;
        if (elemento.verificado) {
          elementosObrigatoriosVerificados++;
        }
      }
    });
  });
  
  // Calcular taxa de conformidade
  const conformidade = totalElementosObrigatorios > 0
    ? (elementosObrigatoriosVerificados / totalElementosObrigatorios) * 100
    : 0;
  
  // Listar elementos obrigatórios faltantes
  const elementosFaltantes: ElementoGrafico[] = [];
  checklistClone.forEach(categoria => {
    categoria.elementos.forEach(elemento => {
      if (elemento.obrigatorio && !elemento.verificado) {
        elementosFaltantes.push({
          ...elemento,
          nome: `${categoria.nome} - ${elemento.nome}`
        });
      }
    });
  });
  
  return {
    elementosVerificados: checklistClone,
    conformidade,
    elementosFaltantes
  };
}

// Função para simular detecção de elementos em arquivos
export function simularDeteccaoElementos(
  arquivos: File[],
  tiposProjeto: string[]
): Promise<string[]> {
  return new Promise((resolve) => {
    // Simulação de processamento
    setTimeout(() => {
      // Lista de elementos que seriam detectados em um sistema real
      // Em um sistema real, isso seria feito por análise de imagem/PDF
      const elementosDetectados: string[] = [
        'pb_cotas',
        'pb_norte',
        'pb_ambientes',
        'pb_areas',
        'pb_esquadrias',
        'corte_cotas_verticais',
        'corte_niveis',
        'corte_altura_edificacao',
        'fachada_niveis',
        'fachada_altura_total',
        'impl_recuos',
        'impl_norte',
        'impl_dimensoes_terreno',
        'impl_area_permeavel',
        'qa_area_terreno',
        'qa_area_construida',
        'qa_area_permeavel',
        'qa_taxa_ocupacao',
        'qa_coef_aproveitamento',
        'carimbo_titulo',
        'carimbo_proprietario',
        'carimbo_responsavel',
        'carimbo_escala',
        'carimbo_data'
      ];
      
      // Simular falha aleatória na detecção de alguns elementos
      const elementosAleatorios = elementosDetectados.filter(() => Math.random() > 0.3);
      
      resolve(elementosAleatorios);
    }, 2000); // Simular tempo de processamento
  });
}
