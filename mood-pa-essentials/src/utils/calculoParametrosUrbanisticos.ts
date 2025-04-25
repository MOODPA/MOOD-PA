// Tipos para parâmetros urbanísticos
export interface ParametroUrbanistico {
  id: string;
  nome: string;
  descricao: string;
  unidade: string;
  valorProjeto: number | null;
  valorReferencia: number;
  tipoComparacao: 'minimo' | 'maximo';
  conforme: boolean | null;
}

export interface CategoriaParametros {
  id: string;
  nome: string;
  parametros: ParametroUrbanistico[];
}

// Parâmetros urbanísticos por tipo de projeto
const parametrosResidencialUnifamiliar: CategoriaParametros[] = [
  {
    id: 'recuos',
    nome: 'Recuos',
    parametros: [
      {
        id: 'recuo_frontal',
        nome: 'Recuo Frontal',
        descricao: 'Distância mínima entre a edificação e o alinhamento frontal do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 3.0,
        tipoComparacao: 'minimo',
        conforme: null
      },
      {
        id: 'recuo_lateral',
        nome: 'Recuo Lateral',
        descricao: 'Distância mínima entre a edificação e as divisas laterais do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 1.5,
        tipoComparacao: 'minimo',
        conforme: null
      },
      {
        id: 'recuo_fundos',
        nome: 'Recuo de Fundos',
        descricao: 'Distância mínima entre a edificação e a divisa de fundos do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 2.0,
        tipoComparacao: 'minimo',
        conforme: null
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
        valorProjeto: null,
        valorReferencia: 60.0,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'coef_aproveitamento',
        nome: 'Coeficiente de Aproveitamento',
        descricao: 'Relação entre a área construída total e a área do terreno',
        unidade: '',
        valorProjeto: null,
        valorReferencia: 1.2,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'taxa_permeabilidade',
        nome: 'Taxa de Permeabilidade',
        descricao: 'Percentual mínimo da área do terreno que deve ser mantida permeável',
        unidade: '%',
        valorProjeto: null,
        valorReferencia: 20.0,
        tipoComparacao: 'minimo',
        conforme: null
      }
    ]
  },
  {
    id: 'volumetria',
    nome: 'Volumetria',
    parametros: [
      {
        id: 'altura_edificacao',
        nome: 'Altura da Edificação',
        descricao: 'Altura máxima permitida para a edificação, medida a partir do nível do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 10.0,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'num_pavimentos',
        nome: 'Número de Pavimentos',
        descricao: 'Quantidade máxima de pavimentos permitida',
        unidade: '',
        valorProjeto: null,
        valorReferencia: 2.0,
        tipoComparacao: 'maximo',
        conforme: null
      }
    ]
  },
  {
    id: 'acessos',
    nome: 'Acessos',
    parametros: [
      {
        id: 'largura_acesso_veiculos',
        nome: 'Largura do Acesso de Veículos',
        descricao: 'Largura máxima permitida para o acesso de veículos',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 6.0,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'inclinacao_rampa',
        nome: 'Inclinação da Rampa',
        descricao: 'Inclinação máxima permitida para rampas de acesso',
        unidade: '%',
        valorProjeto: null,
        valorReferencia: 20.0,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'largura_acesso_pedestres',
        nome: 'Largura do Acesso de Pedestres',
        descricao: 'Largura mínima exigida para o acesso de pedestres',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 1.2,
        tipoComparacao: 'minimo',
        conforme: null
      }
    ]
  }
];

const parametrosResidencialMultifamiliar: CategoriaParametros[] = [
  {
    id: 'recuos',
    nome: 'Recuos',
    parametros: [
      {
        id: 'recuo_frontal',
        nome: 'Recuo Frontal',
        descricao: 'Distância mínima entre a edificação e o alinhamento frontal do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 5.0,
        tipoComparacao: 'minimo',
        conforme: null
      },
      {
        id: 'recuo_lateral',
        nome: 'Recuo Lateral',
        descricao: 'Distância mínima entre a edificação e as divisas laterais do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 2.0,
        tipoComparacao: 'minimo',
        conforme: null
      },
      {
        id: 'recuo_fundos',
        nome: 'Recuo de Fundos',
        descricao: 'Distância mínima entre a edificação e a divisa de fundos do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 3.0,
        tipoComparacao: 'minimo',
        conforme: null
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
        valorProjeto: null,
        valorReferencia: 50.0,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'coef_aproveitamento',
        nome: 'Coeficiente de Aproveitamento',
        descricao: 'Relação entre a área construída total e a área do terreno',
        unidade: '',
        valorProjeto: null,
        valorReferencia: 2.0,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'taxa_permeabilidade',
        nome: 'Taxa de Permeabilidade',
        descricao: 'Percentual mínimo da área do terreno que deve ser mantida permeável',
        unidade: '%',
        valorProjeto: null,
        valorReferencia: 25.0,
        tipoComparacao: 'minimo',
        conforme: null
      }
    ]
  },
  {
    id: 'volumetria',
    nome: 'Volumetria',
    parametros: [
      {
        id: 'altura_edificacao',
        nome: 'Altura da Edificação',
        descricao: 'Altura máxima permitida para a edificação, medida a partir do nível do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 15.0,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'num_pavimentos',
        nome: 'Número de Pavimentos',
        descricao: 'Quantidade máxima de pavimentos permitida',
        unidade: '',
        valorProjeto: null,
        valorReferencia: 5.0,
        tipoComparacao: 'maximo',
        conforme: null
      }
    ]
  },
  {
    id: 'acessos',
    nome: 'Acessos',
    parametros: [
      {
        id: 'largura_acesso_veiculos',
        nome: 'Largura do Acesso de Veículos',
        descricao: 'Largura máxima permitida para o acesso de veículos',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 6.0,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'inclinacao_rampa',
        nome: 'Inclinação da Rampa',
        descricao: 'Inclinação máxima permitida para rampas de acesso',
        unidade: '%',
        valorProjeto: null,
        valorReferencia: 16.7,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'largura_acesso_pedestres',
        nome: 'Largura do Acesso de Pedestres',
        descricao: 'Largura mínima exigida para o acesso de pedestres',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 1.5,
        tipoComparacao: 'minimo',
        conforme: null
      }
    ]
  }
];

const parametrosComercial: CategoriaParametros[] = [
  {
    id: 'recuos',
    nome: 'Recuos',
    parametros: [
      {
        id: 'recuo_frontal',
        nome: 'Recuo Frontal',
        descricao: 'Distância mínima entre a edificação e o alinhamento frontal do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 3.0,
        tipoComparacao: 'minimo',
        conforme: null
      },
      {
        id: 'recuo_lateral',
        nome: 'Recuo Lateral',
        descricao: 'Distância mínima entre a edificação e as divisas laterais do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 2.0,
        tipoComparacao: 'minimo',
        conforme: null
      },
      {
        id: 'recuo_fundos',
        nome: 'Recuo de Fundos',
        descricao: 'Distância mínima entre a edificação e a divisa de fundos do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 2.0,
        tipoComparacao: 'minimo',
        conforme: null
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
        valorProjeto: null,
        valorReferencia: 70.0,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'coef_aproveitamento',
        nome: 'Coeficiente de Aproveitamento',
        descricao: 'Relação entre a área construída total e a área do terreno',
        unidade: '',
        valorProjeto: null,
        valorReferencia: 2.5,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'taxa_permeabilidade',
        nome: 'Taxa de Permeabilidade',
        descricao: 'Percentual mínimo da área do terreno que deve ser mantida permeável',
        unidade: '%',
        valorProjeto: null,
        valorReferencia: 15.0,
        tipoComparacao: 'minimo',
        conforme: null
      }
    ]
  },
  {
    id: 'volumetria',
    nome: 'Volumetria',
    parametros: [
      {
        id: 'altura_edificacao',
        nome: 'Altura da Edificação',
        descricao: 'Altura máxima permitida para a edificação, medida a partir do nível do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 12.0,
        tipoComparacao: 'maximo',
        conforme: null
      }
    ]
  },
  {
    id: 'acessos',
    nome: 'Acessos',
    parametros: [
      {
        id: 'largura_acesso_veiculos',
        nome: 'Largura do Acesso de Veículos',
        descricao: 'Largura máxima permitida para o acesso de veículos',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 6.0,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'inclinacao_rampa',
        nome: 'Inclinação da Rampa',
        descricao: 'Inclinação máxima permitida para rampas de acesso',
        unidade: '%',
        valorProjeto: null,
        valorReferencia: 16.7,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'largura_acesso_pedestres',
        nome: 'Largura do Acesso de Pedestres',
        descricao: 'Largura mínima exigida para o acesso de pedestres',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 2.0,
        tipoComparacao: 'minimo',
        conforme: null
      }
    ]
  }
];

const parametrosMisto: CategoriaParametros[] = [
  {
    id: 'recuos',
    nome: 'Recuos',
    parametros: [
      {
        id: 'recuo_frontal',
        nome: 'Recuo Frontal',
        descricao: 'Distância mínima entre a edificação e o alinhamento frontal do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 4.0,
        tipoComparacao: 'minimo',
        conforme: null
      },
      {
        id: 'recuo_lateral',
        nome: 'Recuo Lateral',
        descricao: 'Distância mínima entre a edificação e as divisas laterais do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 2.0,
        tipoComparacao: 'minimo',
        conforme: null
      },
      {
        id: 'recuo_fundos',
        nome: 'Recuo de Fundos',
        descricao: 'Distância mínima entre a edificação e a divisa de fundos do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 2.5,
        tipoComparacao: 'minimo',
        conforme: null
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
        valorProjeto: null,
        valorReferencia: 60.0,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'coef_aproveitamento',
        nome: 'Coeficiente de Aproveitamento',
        descricao: 'Relação entre a área construída total e a área do terreno',
        unidade: '',
        valorProjeto: null,
        valorReferencia: 2.0,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'taxa_permeabilidade',
        nome: 'Taxa de Permeabilidade',
        descricao: 'Percentual mínimo da área do terreno que deve ser mantida permeável',
        unidade: '%',
        valorProjeto: null,
        valorReferencia: 20.0,
        tipoComparacao: 'minimo',
        conforme: null
      }
    ]
  },
  {
    id: 'volumetria',
    nome: 'Volumetria',
    parametros: [
      {
        id: 'altura_edificacao',
        nome: 'Altura da Edificação',
        descricao: 'Altura máxima permitida para a edificação, medida a partir do nível do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 15.0,
        tipoComparacao: 'maximo',
        conforme: null
      }
    ]
  },
  {
    id: 'acessos',
    nome: 'Acessos',
    parametros: [
      {
        id: 'largura_acesso_veiculos',
        nome: 'Largura do Acesso de Veículos',
        descricao: 'Largura máxima permitida para o acesso de veículos',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 6.0,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'inclinacao_rampa',
        nome: 'Inclinação da Rampa',
        descricao: 'Inclinação máxima permitida para rampas de acesso',
        unidade: '%',
        valorProjeto: null,
        valorReferencia: 16.7,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'largura_acesso_pedestres',
        nome: 'Largura do Acesso de Pedestres',
        descricao: 'Largura mínima exigida para o acesso de pedestres',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 2.0,
        tipoComparacao: 'minimo',
        conforme: null
      }
    ]
  }
];

const parametrosIndustrial: CategoriaParametros[] = [
  {
    id: 'recuos',
    nome: 'Recuos',
    parametros: [
      {
        id: 'recuo_frontal',
        nome: 'Recuo Frontal',
        descricao: 'Distância mínima entre a edificação e o alinhamento frontal do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 5.0,
        tipoComparacao: 'minimo',
        conforme: null
      },
      {
        id: 'recuo_lateral',
        nome: 'Recuo Lateral',
        descricao: 'Distância mínima entre a edificação e as divisas laterais do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 3.0,
        tipoComparacao: 'minimo',
        conforme: null
      },
      {
        id: 'recuo_fundos',
        nome: 'Recuo de Fundos',
        descricao: 'Distância mínima entre a edificação e a divisa de fundos do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 3.0,
        tipoComparacao: 'minimo',
        conforme: null
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
        valorProjeto: null,
        valorReferencia: 50.0,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'coef_aproveitamento',
        nome: 'Coeficiente de Aproveitamento',
        descricao: 'Relação entre a área construída total e a área do terreno',
        unidade: '',
        valorProjeto: null,
        valorReferencia: 1.0,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'taxa_permeabilidade',
        nome: 'Taxa de Permeabilidade',
        descricao: 'Percentual mínimo da área do terreno que deve ser mantida permeável',
        unidade: '%',
        valorProjeto: null,
        valorReferencia: 30.0,
        tipoComparacao: 'minimo',
        conforme: null
      }
    ]
  },
  {
    id: 'volumetria',
    nome: 'Volumetria',
    parametros: [
      {
        id: 'altura_edificacao',
        nome: 'Altura da Edificação',
        descricao: 'Altura máxima permitida para a edificação, medida a partir do nível do terreno',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 12.0,
        tipoComparacao: 'maximo',
        conforme: null
      }
    ]
  },
  {
    id: 'acessos',
    nome: 'Acessos',
    parametros: [
      {
        id: 'largura_acesso_veiculos',
        nome: 'Largura do Acesso de Veículos',
        descricao: 'Largura máxima permitida para o acesso de veículos',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 8.0,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'inclinacao_rampa',
        nome: 'Inclinação da Rampa',
        descricao: 'Inclinação máxima permitida para rampas de acesso',
        unidade: '%',
        valorProjeto: null,
        valorReferencia: 12.5,
        tipoComparacao: 'maximo',
        conforme: null
      },
      {
        id: 'largura_acesso_pedestres',
        nome: 'Largura do Acesso de Pedestres',
        descricao: 'Largura mínima exigida para o acesso de pedestres',
        unidade: 'm',
        valorProjeto: null,
        valorReferencia: 2.0,
        tipoComparacao: 'minimo',
        conforme: null
      }
    ]
  }
];

// Função para obter os parâmetros urbanísticos com base no tipo de projeto
export function obterParametrosUrbanisticos(tipoProjeto: string): CategoriaParametros[] {
  switch (tipoProjeto) {
    case 'residencial-unifamiliar':
      return JSON.parse(JSON.stringify(parametrosResidencialUnifamiliar));
    case 'residencial-multifamiliar':
      return JSON.parse(JSON.stringify(parametrosResidencialMultifamiliar));
    case 'comercial':
      return JSON.parse(JSON.stringify(parametrosComercial));
    case 'misto':
      return JSON.parse(JSON.stringify(parametrosMisto));
    case 'industrial':
      return JSON.parse(JSON.stringify(parametrosIndustrial));
    default:
      return JSON.parse(JSON.stringify(parametrosResidencialUnifamiliar));
  }
}

// Função para calcular a conformidade de um parâmetro
export function calcularConformidade(parametro: ParametroUrbanistico): boolean {
  if (parametro.valorProjeto === null) {
    return false;
  }
  
  if (parametro.tipoComparacao === 'minimo') {
    return parametro.valorProjeto >= parametro.valorReferencia;
  } else {
    return parametro.valorProjeto <= parametro.valorReferencia;
  }
}

// Função para analisar os parâmetros urbanísticos
export function analisarParametrosUrbanisticos(
  categorias: CategoriaParametros[]
): {
  categoriasAnalisadas: CategoriaParametros[];
  conformidade: number;
  parametrosNaoConformes: ParametroUrbanistico[];
} {
  let totalParametros = 0;
  let parametrosConformes = 0;
  const parametrosNaoConformes: ParametroUrbanistico[] = [];
  
  // Clonar as categorias para não modificar o original
  const categoriasClone = JSON.parse(JSON.stringify(categorias));
  
  // Analisar cada parâmetro
  categoriasClone.forEach(categoria => {
    categoria.parametros.forEach(parametro => {
      if (parametro.valorProjeto !== null) {
        totalParametros++;
        parametro.conforme = calcularConformidade(parametro);
        
        if (parametro.conforme) {
          parametrosConformes++;
        } else {
          parametrosNaoConformes.push({
            ...parametro,
            nome: `${categoria.nome} - ${parametro.nome}`
          });
        }
      }
    });
  });
  
  // Calcular taxa de conformidade
  const conformidade = totalParametros > 0
    ? (parametrosConformes / totalParametros) * 100
    : 0;
  
  return {
    categoriasAnalisadas: categoriasClone,
    conformidade,
    parametrosNaoConformes
  };
}

// Função para simular extração de parâmetros urbanísticos de arquivos
export function simularExtracaoParametros(
  arquivos: File[],
  tipoProjeto: string
): Promise<CategoriaParametros[]> {
  return new Promise((resolve) => {
    // Obter os parâmetros para o tipo de projeto
    const parametros = obterParametrosUrbanisticos(tipoProjeto);
    
    // Simulação de processamento
    setTimeout(() => {
      // Em um sistema real, isso seria feito por análise de imagem/PDF
      // Aqui, vamos simular valores aleatórios para os parâmetros
      parametros.forEach(categoria => {
        categoria.parametros.forEach(parametro => {
          // Gerar um valor aleatório próximo ao valor de referência
          let valorBase = parametro.valorReferencia;
          let variacao = valorBase * 0.2; // 20% de variação
          
          // Adicionar ou subtrair a variação aleatoriamente
          let valorAleatorio = valorBase + (Math.random() * 2 - 1) * variacao;
          
          // Garantir que o valor seja positivo
          valorAleatorio = Math.max(0, valorAleatorio);
          
          // Arredondar para uma casa decimal
          valorAleatorio = Math.round(valorAleatorio * 10) / 10;
          
          parametro.valorProjeto = valorAleatorio;
        });
      });
      
      resolve(parametros);
    }, 2000); // Simular tempo de processamento
  });
}
