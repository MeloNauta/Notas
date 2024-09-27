const materiasRegulares = [
    'Arte', 'Educação Física', 'Língua Inglesa', 'Língua Portuguesa', 'Literatura',
    'Biologia', 'Física', 'Química', 'Matemática', 'Filosofia', 'Geografia', 'História'
];

const itinerario = ['Experimentação em Ciências', 'Expressão, Criação e Vivências', 'Lógica e Análise de Dados', 'Projeto de Vida', 'Sociedade Economia e Cultura'];
const itinerario1 = ['Gestão Empresarial', 'Informática Básica', 'Metodologia Científica e Português Instrumental'];

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
    const containerItinerario1 = document.getElementById('disciplinas-itinerario1');

    containerRegulares.innerHTML = '';
    containerItinerario.innerHTML = '';
    containerItinerario1.innerHTML = '';

    materiasRegulares.forEach(materia => criarCampoNota(materia, containerRegulares));

    itinerario.forEach(materia => criarCampoNota(materia, containerItinerario));

    itinerario1.forEach(materia => criarCampoNota(materia, containerItinerario1));
}

function calcularNotas() {
    let resultado = ''; 

    const calcularNotaMinima = (nota1, nota2) => {
        return (7 - 0.3 * (nota1 + nota2)) / 0.4;
    };

    materiasRegulares.forEach(materia => {
        const nota1 = parseFloat(document.getElementById(`${materia}-1`).value) || 0;
        const nota2 = parseFloat(document.getElementById(`${materia}-2`).value) || 0;
        const notaMinima = calcularNotaMinima(nota1, nota2);

        if (nota1 || nota2) {
            resultado += `<p>${materia}: Nota mínima para passar: ${notaMinima.toFixed(2)}</p>`;
        }
    });

    itinerario.forEach(materia => {
        const nota1 = parseFloat(document.getElementById(`${materia}-1`).value) || 0;
        const nota2 = parseFloat(document.getElementById(`${materia}-2`).value) || 0;
        const notaMinima = calcularNotaMinima(nota1, nota2);

        if (nota1 || nota2) {
            resultado += `<p>${materia}: Nota mínima para passar: ${notaMinima.toFixed(2)}</p>`;
        }
    });

    itinerario1.forEach(materia => {
        const nota1 = parseFloat(document.getElementById(`${materia}-1`).value) || 0;
        const nota2 = parseFloat(document.getElementById(`${materia}-2`).value) || 0;
        const notaMinima = calcularNotaMinima(nota1, nota2);

        if (nota1 || nota2) {
            resultado += `<p>${materia}: Nota mínima para passar: ${notaMinima.toFixed(2)}</p>`;
        }
    });

    if (!resultado) {
        resultado = 'Por favor, insira as notas.';
    }

    document.getElementById('resultado').innerHTML = resultado;
}

function salvarNotas() {
    const notas = {};

    materiasRegulares.concat(itinerario, itinerario1).forEach(materia => {
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
        materiasRegulares.concat(itinerario, itinerario1).forEach(materia => {
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
