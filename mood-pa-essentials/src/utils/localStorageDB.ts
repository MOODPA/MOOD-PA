// Definição dos tipos de dados
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string; // Será armazenada com hash
  tipo: 'profissional' | 'administrador';
  dataCriacao: string;
}

export interface Projeto {
  id: string;
  usuarioId: string;
  nome: string;
  tipo: string;
  area: string;
  status: 'pendente' | 'analisado' | 'aprovado' | 'reprovado' | 'aprovado_com_ressalvas';
  dataEnvio: string;
  dataAnalise?: string;
  arquivos: ArquivoProjeto[];
}

export interface ArquivoProjeto {
  id: string;
  projetoId: string;
  nome: string;
  tipo: string;
  tamanho: number;
  caminho: string;
}

export interface ResultadoAnalise {
  id: string;
  projetoId: string;
  dataAnalise: string;
  conformidadeGeral: number;
  status: 'aprovado' | 'reprovado' | 'aprovado_com_ressalvas';
  resultadoRepresentacao?: ResultadoRepresentacaoGrafica;
  resultadoParametros?: ResultadoParametrosUrbanisticos;
}

export interface ResultadoRepresentacaoGrafica {
  conformidade: number;
  elementosVerificados: any[];
  elementosFaltantes: any[];
}

export interface ResultadoParametrosUrbanisticos {
  conformidade: number;
  categoriasAnalisadas: any[];
  parametrosNaoConformes: any[];
}

// Classe para gerenciar o armazenamento local
export class LocalStorageDB {
  private prefix: string;

  constructor(prefix: string = 'mood_pa_') {
    this.prefix = prefix;
  }

  // Métodos para usuários
  async getUsuarios(): Promise<Usuario[]> {
    const usuarios = localStorage.getItem(`${this.prefix}usuarios`);
    return usuarios ? JSON.parse(usuarios) : [];
  }

  async getUsuarioPorId(id: string): Promise<Usuario | null> {
    const usuarios = await this.getUsuarios();
    return usuarios.find(u => u.id === id) || null;
  }

  async getUsuarioPorEmail(email: string): Promise<Usuario | null> {
    const usuarios = await this.getUsuarios();
    return usuarios.find(u => u.email === email) || null;
  }

  async salvarUsuario(usuario: Usuario): Promise<Usuario> {
    const usuarios = await this.getUsuarios();
    const index = usuarios.findIndex(u => u.id === usuario.id);
    
    if (index >= 0) {
      usuarios[index] = usuario;
    } else {
      usuarios.push(usuario);
    }
    
    localStorage.setItem(`${this.prefix}usuarios`, JSON.stringify(usuarios));
    return usuario;
  }

  async removerUsuario(id: string): Promise<boolean> {
    const usuarios = await this.getUsuarios();
    const novaLista = usuarios.filter(u => u.id !== id);
    
    if (novaLista.length < usuarios.length) {
      localStorage.setItem(`${this.prefix}usuarios`, JSON.stringify(novaLista));
      return true;
    }
    
    return false;
  }

  // Métodos para projetos
  async getProjetos(): Promise<Projeto[]> {
    const projetos = localStorage.getItem(`${this.prefix}projetos`);
    return projetos ? JSON.parse(projetos) : [];
  }

  async getProjetosPorUsuario(usuarioId: string): Promise<Projeto[]> {
    const projetos = await this.getProjetos();
    return projetos.filter(p => p.usuarioId === usuarioId);
  }

  async getProjetoPorId(id: string): Promise<Projeto | null> {
    const projetos = await this.getProjetos();
    return projetos.find(p => p.id === id) || null;
  }

  async salvarProjeto(projeto: Projeto): Promise<Projeto> {
    const projetos = await this.getProjetos();
    const index = projetos.findIndex(p => p.id === projeto.id);
    
    if (index >= 0) {
      projetos[index] = projeto;
    } else {
      projetos.push(projeto);
    }
    
    localStorage.setItem(`${this.prefix}projetos`, JSON.stringify(projetos));
    return projeto;
  }

  async removerProjeto(id: string): Promise<boolean> {
    const projetos = await this.getProjetos();
    const novaLista = projetos.filter(p => p.id !== id);
    
    if (novaLista.length < projetos.length) {
      localStorage.setItem(`${this.prefix}projetos`, JSON.stringify(novaLista));
      
      // Remover também os resultados de análise associados
      await this.removerResultadoAnalise(id);
      
      return true;
    }
    
    return false;
  }

  // Métodos para resultados de análise
  async getResultadosAnalise(): Promise<ResultadoAnalise[]> {
    const resultados = localStorage.getItem(`${this.prefix}resultados_analise`);
    return resultados ? JSON.parse(resultados) : [];
  }

  async getResultadoAnalisePorProjetoId(projetoId: string): Promise<ResultadoAnalise | null> {
    const resultados = await this.getResultadosAnalise();
    return resultados.find(r => r.projetoId === projetoId) || null;
  }

  async salvarResultadoAnalise(resultado: ResultadoAnalise): Promise<ResultadoAnalise> {
    const resultados = await this.getResultadosAnalise();
    const index = resultados.findIndex(r => r.id === resultado.id);
    
    if (index >= 0) {
      resultados[index] = resultado;
    } else {
      resultados.push(resultado);
    }
    
    localStorage.setItem(`${this.prefix}resultados_analise`, JSON.stringify(resultados));
    
    // Atualizar também o status do projeto
    const projeto = await this.getProjetoPorId(resultado.projetoId);
    if (projeto) {
      projeto.status = resultado.status;
      projeto.dataAnalise = resultado.dataAnalise;
      await this.salvarProjeto(projeto);
    }
    
    return resultado;
  }

  async removerResultadoAnalise(projetoId: string): Promise<boolean> {
    const resultados = await this.getResultadosAnalise();
    const novaLista = resultados.filter(r => r.projetoId !== projetoId);
    
    if (novaLista.length < resultados.length) {
      localStorage.setItem(`${this.prefix}resultados_analise`, JSON.stringify(novaLista));
      return true;
    }
    
    return false;
  }

  // Método para inicializar o banco de dados com dados de exemplo
  async inicializarComDadosExemplo(): Promise<void> {
    // Verificar se já existem dados
    const usuarios = await this.getUsuarios();
    if (usuarios.length > 0) return;
    
    // Criar usuário administrador
    const adminUsuario: Usuario = {
      id: 'admin-1',
      nome: 'Administrador',
      email: 'admin@mood-pa.com',
      senha: 'admin123', // Em produção, usar bcrypt para hash
      tipo: 'administrador',
      dataCriacao: new Date().toISOString()
    };
    
    // Criar usuário profissional
    const profissionalUsuario: Usuario = {
      id: 'prof-1',
      nome: 'João Silva',
      email: 'joao@exemplo.com',
      senha: 'senha123', // Em produção, usar bcrypt para hash
      tipo: 'profissional',
      dataCriacao: new Date().toISOString()
    };
    
    // Salvar usuários
    await this.salvarUsuario(adminUsuario);
    await this.salvarUsuario(profissionalUsuario);
    
    // Criar projeto de exemplo
    const projetoExemplo: Projeto = {
      id: 'proj-1',
      usuarioId: 'prof-1',
      nome: 'Residência Unifamiliar Silva',
      tipo: 'residencial-unifamiliar',
      area: '120',
      status: 'analisado',
      dataEnvio: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 dias atrás
      dataAnalise: new Date().toISOString(),
      arquivos: [
        {
          id: 'arq-1',
          projetoId: 'proj-1',
          nome: 'planta_baixa.pdf',
          tipo: 'application/pdf',
          tamanho: 1024 * 1024 * 2.5, // 2.5 MB
          caminho: '/uploads/proj-1/planta_baixa.pdf'
        },
        {
          id: 'arq-2',
          projetoId: 'proj-1',
          nome: 'cortes.pdf',
          tipo: 'application/pdf',
          tamanho: 1024 * 1024 * 1.8, // 1.8 MB
          caminho: '/uploads/proj-1/cortes.pdf'
        }
      ]
    };
    
    // Salvar projeto
    await this.salvarProjeto(projetoExemplo);
    
    // Criar resultado de análise
    const resultadoAnaliseExemplo: ResultadoAnalise = {
      id: 'res-1',
      projetoId: 'proj-1',
      dataAnalise: new Date().toISOString(),
      conformidadeGeral: 80.0,
      status: 'aprovado_com_ressalvas',
      resultadoRepresentacao: {
        conformidade: 85.7,
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
          }
        ],
        elementosFaltantes: [
          {
            id: 'pb_areas',
            nome: 'Planta Baixa - Áreas dos Ambientes',
            descricao: 'Indicação da área de cada ambiente em m²',
            obrigatorio: true,
            verificado: false
          }
        ]
      },
      resultadoParametros: {
        conformidade: 75.0,
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
          }
        ],
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
      }
    };
    
    // Salvar resultado de análise
    await this.salvarResultadoAnalise(resultadoAnaliseExemplo);
  }
}

// Instância global do banco de dados
export const db = new LocalStorageDB();
