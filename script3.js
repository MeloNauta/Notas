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
        <input type="number" id="${materia}-1" placeholder="Nota 1° Trimestre" step="0.01" min="0" max="10">
        <input type="number" id="${materia}-2" placeholder="Nota 2° Trimestre" step="0.01" min="0" max="10">
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
    let resultadoHTML = '';

    const calcularNotaMinima = (nota1, nota2) => {
        return (7 - 0.3 * (nota1 + nota2)) / 0.4;
    };

    const criarTabela = (materias, titulo) => {
        let tabela = '';
        let algumaNota = false;

        materias.forEach(materia => {
            const nota1 = parseFloat(document.getElementById(`${materia}-1`).value) || 0;
            const nota2 = parseFloat(document.getElementById(`${materia}-2`).value) || 0;
            const notaMinima = calcularNotaMinima(nota1, nota2);

            if (nota1 || nota2) {
                if (!algumaNota) {
                    // Cabeçalho só é criado se houver alguma nota
                    tabela += `<h3>${titulo}</h3>
                               <table>
                                 <thead>
                                   <tr>
                                     <th>Matéria</th>
                                     <th>Nota 1</th>
                                     <th>Nota 2</th>
                                     <th>Nota Mínima</th>
                                   </tr>
                                 </thead>
                                 <tbody>`;
                    algumaNota = true;
                }

                tabela += `<tr>
                              <td>${materia}</td>
                              <td>${nota1.toFixed(2)}</td>
                              <td>${nota2.toFixed(2)}</td>
                              <td class="${notaMinima > 10 ? 'nota-alta' : ''}">${notaMinima.toFixed(2)}</td>
                          </tr>`;
            }
        });

        if (algumaNota) {
            tabela += '</tbody></table>';
            return tabela;
        } else {
            return ''; // Retorna vazio se nenhuma nota
        }
    };

    // Disciplinas regulares
    resultadoHTML += criarTabela(materiasRegulares, 'Disciplinas Regulares');

    // Itinerários (se houver)
    const itinerarioSelecionado = document.getElementById('itinerario')?.value;
    if (itinerarioSelecionado && itinerarios[itinerarioSelecionado]) {
        resultadoHTML += criarTabela(itinerarios[itinerarioSelecionado], 'Itinerário');
    }

    // Exibe resultado
    const resultadoContainer = document.getElementById('resultado');
    const resultadoTitulo = document.getElementById('resultado-titulo');

    if (!resultadoHTML) {
        resultadoContainer.innerHTML = '<p style="color: red; font-weight: bold;">Por favor, insira as notas.</p>';
    } else {
        resultadoContainer.innerHTML = resultadoHTML;
    }

    resultadoContainer.style.display = 'block';
    resultadoTitulo.style.display = 'block';
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
