const materiasRegulares = [
    'Inglês',                // inglês
    'Língua Portuguesa e Literatura',     // língua portuguesa e literatura
    'Arte',                  // arte
    'Educação Física',       // educação física
    'Biologia',              // biologia
    'Física',                // física
    'Química',               // química
    'Matemática',            // matemática
    'Filosofia',             // filosofia
    'Geografia',             // geografia
    'História',              // história
    'Sociologia'             // sociologia
];

const itinerario = ['Iniciação Científica', 'Projeto de Vida', 'Gestão Empresarial','Metodologia Científica e Português Instrumental', 'Tecnologia da Informação e Comunicação'];

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
    const containerRegulares = document.getElementById('disciplinas-regulares');
    const containerItinerario = document.getElementById('disciplinas-itinerario');

    containerRegulares.innerHTML = '';
    containerItinerario.innerHTML = '';

    materiasRegulares.forEach(materia => criarCampoNota(materia, containerRegulares));

    itinerario.forEach(materia => criarCampoNota(materia, containerItinerario));

}

function calcularNotas() {
    const resultadoContainer = document.getElementById('resultado');
    const resultadoTitulo = document.getElementById('resultado-titulo');

    // Exibe o container e o título
    resultadoContainer.style.display = 'block';
    resultadoTitulo.style.display = 'block';

    let resultado = '';

    const calcularNotaMinima = (nota1, nota2) => {
        return (7 - 0.3 * (nota1 + nota2)) / 0.4;
    };

    // Função auxiliar para criar tabela
    let temResultados = false; // movida para escopo de calcularNotas
    const criarTabela = (materias, titulo) => {
        let tabela = `<h3>${titulo}</h3>
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

        let algumaNota = false;

        materias.forEach(materia => {
            const nota1 = parseFloat(document.getElementById(`${materia}-1`).value) || 0;
            const nota2 = parseFloat(document.getElementById(`${materia}-2`).value) || 0;
            const notaMinima = calcularNotaMinima(nota1, nota2);

            if (nota1 || nota2) {
                algumaNota = true;
                tabela += `<tr>
                              <td>${materia}</td>
                              <td>${nota1.toFixed(2)}</td>
                              <td>${nota2.toFixed(2)}</td>
                              <td class="${notaMinima > 10 ? 'nota-alta' : ''}">${notaMinima.toFixed(2)}</td>
                          </tr>`;
            }
        });

        tabela += '</tbody></table>';
        if (algumaNota) temResultados = true;
        return algumaNota ? tabela : '';
    };

    // Disciplinas regulares
    resultado += criarTabela(materiasRegulares, 'Disciplinas Regulares');
    // Itinerários
    resultado += criarTabela(itinerario, 'Itinerário');

    if (!resultado) {
        resultado = '<p style="color: red; font-weight: bold;">Por favor, insira as notas.</p>';
    }

    resultadoContainer.innerHTML = resultado;
    const botaoBaixar = document.getElementById('botao-baixar');
    if (temResultados) {
        botaoBaixar.style.display = 'inline-block';
    } else {
        botaoBaixar.style.display = 'none';
    }
}

function baixarResultado() {
    const container = document.getElementById('resultado');

    // Criar clone do container
    const clone = container.cloneNode(true);

    // Estilizar o clone para caber todo o conteúdo
    clone.style.height = 'auto';
    clone.style.overflow = 'visible';
    clone.style.position = 'absolute';
    clone.style.left = '-9999px'; // tira da tela
    clone.style.top = '0';

    document.body.appendChild(clone);

    // Captura o clone
    html2canvas(clone).then(canvas => {
        const link = document.createElement('a');
        link.download = 'nota_minima_3tri.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        // Remove o clone depois
        document.body.removeChild(clone);
    });
}

function salvarNotas() {
    const notas = {};

    materiasRegulares.concat(itinerario).forEach(materia => {
        notas[materia] = [
            document.getElementById(`${materia}-1`).value,
            document.getElementById(`${materia}-2`).value
        ];
    });

    localStorage.setItem('notas', JSON.stringify(notas));
    alert('Notas salvas com sucesso!');
}

function carregarNotas() {
    const notas = JSON.parse(localStorage.getItem('notas'));

    if (notas) {
        materiasRegulares.concat(itinerario).forEach(materia => {
            if (notas[materia]) {
                document.getElementById(`${materia}-1`).value = notas[materia][0];
                document.getElementById(`${materia}-2`).value = notas[materia][1];
            }
        });
        alert('Notas carregadas com sucesso!');
    } else {
        alert('Nenhuma nota salva encontrada.');
    }
}

document.addEventListener('DOMContentLoaded', mostrarMaterias);
