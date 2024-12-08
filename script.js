document.getElementById("geneticForm").addEventListener("submit", function (event) {
    // Impedir o envio padrão do formulário (evitar que a página seja recarregada)
    event.preventDefault();

    const gene1A = document.getElementById("gene1A").value;
    const gene1B = document.getElementById("gene1B").value;
    const gene2A = document.getElementById("gene2A").value;
    const gene2B = document.getElementById("gene2B").value;

    // Validar entrada para garantir que apenas A/a, B/b sejam inseridos
    if (!["A", "a"].includes(gene1A) || !["A", "a"].includes(gene2A) ||
        !["B", "b"].includes(gene1B) || !["B", "b"].includes(gene2B)) {
        document.getElementById("resultado").innerHTML = "<p>Por favor, insira valores válidos (A/a, B/b).</p>";
        return;
    }

    // Gerar cruzamentos possíveis para ambos os genes
    const offspring = [];

    // Combinar os alelos possíveis de A/a com A/a
    const gene1ACombinations = [gene1A, gene2A];
    const gene2ACombinations = [gene1A, gene2A];

    // Combinar os alelos possíveis de B/b com B/b
    const gene1BCombinations = [gene1B, gene2B];
    const gene2BCombinations = [gene1B, gene2B];

    // Gerar as 16 combinações possíveis
    gene1ACombinations.forEach(a1 => {
        gene2ACombinations.forEach(a2 => {
            gene1BCombinations.forEach(b1 => {
                gene2BCombinations.forEach(b2 => {
                    offspring.push(a1 + a2 + b1 + b2);
                });
            });
        });
    });

    // Organizar os alelos em ordem alfabética para uniformizar a exibição
    const sortedOffspring = offspring.map(function (genotype) {
        return genotype.split("").sort().join("");
    });

    // Contar a frequência de cada genótipo
    const genotypeCounts = {};
    sortedOffspring.forEach(genotype => {
        genotypeCounts[genotype] = (genotypeCounts[genotype] || 0) + 1;
    });

    // Calcular dominância e recessividade
    let dominante = 0, recessivo = 0;
    for (const genotype in genotypeCounts) {
        // Características dominantes (contém A ou B)
        if (genotype.includes("A") || genotype.includes("B")) {
            dominante += genotypeCounts[genotype];
        } else {
            recessivo += genotypeCounts[genotype];
        }
    }

    // Exibir resultados
    document.getElementById("resultado").innerHTML = `
        <h3>Resultados</h3>
        <p>Genótipos possíveis e frequências:</p>
        <ul>
            ${Object.entries(genotypeCounts).map(([genotype, count]) =>
        `<li>${genotype}: ${count} (${(count / 16) * 100}%)</li>`).join("")}
        </ul>
        <p>Probabilidade de característica dominante (A ou B): ${(dominante / 16) * 100}%</p>
        <p>Probabilidade de característica recessiva (a e b): ${(recessivo / 16) * 100}%</p>
    `;
});
