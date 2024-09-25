const materiasRegulares = [
    'Arte', 'Educação Física', 'Língua Inglesa', 'Língua Portuguesa', 'Literatura',
    'Biologia', 'Física', 'Química', 'Matemática', 'Filosofia', 'Geografia', 'História', 'Português Instrumental'
];

const itinerario = ['Experimentação em Ciências', 'Expressão, Criação e Vivênicas', 'Lógica e Análise de Dados', 'Projeto de Vida','Sociedade Economia e Cultura'];

// Função para criar campos de notas
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

// Exibe as matérias regulares e do itinerário
function mostrarMaterias() {
    const containerRegulares = document.getElementById('disciplinas-regulares');
    const containerItinerario = document.getElementById('disciplinas-itinerario');

    containerRegulares.innerHTML = '';
    containerItinerario.innerHTML = '';

    materiasRegulares.forEach(materia => criarCampoNota(materia, containerRegulares));
    itinerario.forEach(materia => criarCampoNota(materia, containerItinerario));
}

// Calcula a nota mínima para passar
function calcularNotas() {
    let resultado = '';

    const calcularNotaMinima = (nota1, nota2) => (7 - 0.3 * (nota1 + nota2)) / 0.4;

    materiasRegulares.forEach(materia => {
        const nota1 = parseFloat(document.getElementById(`${materia}-1`).value) || 0;
        const nota2 = parseFloat(document.getElementById(`${materia}-2`).value) || 0;
        const notaMinima = calcularNotaMinima(nota1, nota2);

        if (nota1 || nota2) {
            resultado += `${materia}: Nota mínima para passar: ${notaMinima.toFixed(2)}<br>`;
        }
    });

    itinerario.forEach(materia => {
        const nota1 = parseFloat(document.getElementById(`${materia}-1`).value) || 0;
        const nota2 = parseFloat(document.getElementById(`${materia}-2`).value) || 0;
        const notaMinima = calcularNotaMinima(nota1, nota2);

        if (nota1 || nota2) {
            resultado += `${materia}: Nota mínima para passar: ${notaMinima.toFixed(2)}<br>`;
        }
    });

    document.getElementById('resultado').innerHTML = resultado || 'Por favor, insira as notas.';
}

// Salva as notas no localStorage
function salvarNotas() {
    const notas = {};

    materiasRegulares.concat(itinerario).forEach(materia => {
        notas[materia] = [
            document.getElementById(`${materia}-1`).value,
            document.getElementById(`${materia}-2`).value
        ];
    });

    localStorage.setItem('notas', JSON.stringify(notas));
}

// Carrega as notas do localStorage
function carregarNotas() {
    const notas = JSON.parse(localStorage.getItem('notas'));

    if (notas) {
        materiasRegulares.concat(itinerario).forEach(materia => {
            if (notas[materia]) {
                document.getElementById(`${materia}-1`).value = notas[materia][0];
                document.getElementById(`${materia}-2`).value = notas[materia][1];
            }
        });
    }
}

// Inicializa as matérias ao carregar a página
document.addEventListener('DOMContentLoaded', mostrarMaterias);