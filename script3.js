const materiasRegulares = [
    'Arte', 'Língua Inglesa', 'Língua Portuguesa', 'Literatura',
    'Biologia', 'Física', 'Química', 'Matemática',
    'Geografia', 'História', 'Sociologia'
];

const itinerarios = {
    'itinerario1': ['Musculação e Treinamento Funcional', 'Atletismo', 'Práticas de Aventura', 'Esportes e jogos variados ', 'Exercício e Saúde: base em evidências', 'Projeto de Vida'],
    'itinerario2': ['Fisiologia Animal Comparada', 'Genética e Biotecnologia', 'Citologia e Histologia', 'Farmacologia', 'Projeto de Vida', 'Português Instrumental'],
    'itinerario3': ['Iluminação e Fotografia ', 'Roteiro', 'Edição de Áudio e Vídeo', 'Atuação e Direção', 'Projeto de Vida', 'Português Instrumental'],
    'itinerario4': ['Atualidades', 'História Oriental', 'Cultura e Identidade', 'Debate e Argumentação', 'Projeto de Vida', 'Português Instrumental'],
    'itinerario5': ['Astronomia e Astrofísica', 'Geometria', 'Trigonometria', 'Cálculo Diferencial e Integral', 'Projeto de Vida', 'Português Instrumental'],
    'itinerario6': ['Tópicos em Linguagens e Redação', 'Tópicos em Ciências Humanas', 'Tópicos em Matemática', 'Tópicos em Ciências da Natureza', 'Projeto de Vida', 'Português Instrumental']
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
