const materiasRegulares = [
    'Arte', 'Educação Física', 'Língua Inglesa', 'Língua Portuguesa',
    'Biologia', 'Física', 'Química', 'Matemática',
    'Filosofia', 'História', 'Sociologia'
];

const itinerarios = {
    'itinerario1': ['Esportes de Rede', 'Esportes de Invasão', 'Atividades Aquáticas', 'Análise do Movimento Humano', 'Ginástica, Dança e Lutas', 'Projeto de Vida', 'Metodologia Científica'],
    'itinerario2': ['Bioquímica e Biofísica', 'Anatomofisiologia', 'Evolução Humana', 'Comportamento e Relações Sociais', 'Projeto de Vida', 'Metodologia Científica'],
    'itinerario3': ['História da Arte e do Design', 'Criatividade e Inovação', 'Ateliê de Criação', 'Design e Suas Linguagens', 'Projeto de Vida', 'Metodologia Científica'],
    'itinerario4': ['Antropologia Sociocultural', 'Cidadania e Sociologia da Atualidade', 'Ciências Políticas e Cidadania', 'Processos Socioterritoriais', 'Políticas Públicas', 'Projeto de Vida', 'Metodologia Científica'],
    'itinerario5': ['Modelos Matemáticos', 'Química e Física dos Materiais', 'Física Aplicada', 'Lógica de Programação e Robótica', 'Desenho Técnico e Projeto', 'Projeto de Vida', 'Metodologia Científica'],
    'itinerario6': ['Introdução à Economia', 'Mercado Financeiro e Investimentos', 'Finanças Pessoais', 'Empreendedorismo e Sustentabilidade', 'Comunicação em Negócios', 'Projeto de Vida', 'Metodologia Científica']
};

function criarCampoNota(materia, container) {
    const div = document.createElement('div');
    div.classList.add('materia');

    div.innerHTML = `
        <label>${materia}</label>
        <input type="number" id="${materia}-1" placeholder="Nota 1" step="0.01" min="0" max="10">
        <input type="number" id="${materia}-2" placeholder="Nota 2" step="0.01" min="0" max="10">
    `;

    container.appendChild(div);
}

function mostrarMaterias() {
    const itinerario = document.getElementById('itinerario').value;
    const containerItinerario = document.getElementById('disciplinas-itinerario');
    const containerRegulares = document.getElementById('disciplinas-regulares');

    containerRegulares.innerHTML = '';
    containerItinerario.innerHTML = '';

    materiasRegulares.forEach(materia => criarCampoNota(materia, containerRegulares));

    if (itinerario) {
        itinerarios[itinerario].forEach(materia => criarCampoNota(materia, containerItinerario));
    }
}

function calcularNotas() {
    let resultado = '';

    materiasRegulares.forEach(materia => {
        const nota1 = parseFloat(document.getElementById(`${materia}-1`).value) || 0;
        const nota2 = parseFloat(document.getElementById(`${materia}-2`).value) || 0;

        const notaMinima = (7 - 0.3 * (nota1 + nota2)) / 0.4;

        if (nota1 || nota2) {
            resultado += `${materia}: Nota mínima para passar: ${notaMinima.toFixed(2)}<br>`;
        }
    });

    const itinerario = document.getElementById('itinerario').value;
    if (itinerario) {
        itinerarios[itinerario].forEach(materia => {
            const nota1 = parseFloat(document.getElementById(`${materia}-1`).value) || 0;
            const nota2 = parseFloat(document.getElementById(`${materia}-2`).value) || 0;

            const notaMinima = (7 - 0.3 * (nota1 + nota2)) / 0.4;

            if (nota1 || nota2) {
                resultado += `${materia}: Nota mínima para passar: ${notaMinima.toFixed(2)}<br>`;
            }
        });
    }

    document.getElementById('resultado').innerHTML = resultado || 'Por favor, insira as notas.';
}

function salvarNotas() {
    const notas = {};

    materiasRegulares.forEach(materia => {
        const nota1 = document.getElementById(`${materia}-1`).value;
        const nota2 = document.getElementById(`${materia}-2`).value;
        if (nota1 || nota2) {
            notas[materia] = {
                nota1: nota1,
                nota2: nota2
            };
        }
    });

    const itinerario = document.getElementById('itinerario').value;
    if (itinerario) {
        itinerarios[itinerario].forEach(materia => {
            const nota1 = document.getElementById(`${materia}-1`).value;
            const nota2 = document.getElementById(`${materia}-2`).value;
            if (nota1 || nota2) {
                notas[materia] = {
                    nota1: nota1,
                    nota2: nota2
                };
            }
        });
    }

    localStorage.setItem('notas', JSON.stringify(notas));
    alert('Notas salvas com sucesso!');
}

function carregarNotas() {
    const notasSalvas = JSON.parse(localStorage.getItem('notas'));

    if (notasSalvas) {
        materiasRegulares.forEach(materia => {
            if (notasSalvas[materia]) {
                document.getElementById(`${materia}-1`).value = notasSalvas[materia].nota1;
                document.getElementById(`${materia}-2`).value = notasSalvas[materia].nota2;
            }
        });

        const itinerario = document.getElementById('itinerario').value;
        if (itinerario) {
            itinerarios[itinerario].forEach(materia => {
                if (notasSalvas[materia]) {
                    document.getElementById(`${materia}-1`).value = notasSalvas[materia].nota1;
                    document.getElementById(`${materia}-2`).value = notasSalvas[materia].nota2;
                }
            });
        }

        alert('Notas carregadas com sucesso!');
    } else {
        alert('Nenhuma nota salva encontrada.');
    }
}
