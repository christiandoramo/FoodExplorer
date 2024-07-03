export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatToBRL(value: number): string {
  // Converter o número para uma string com duas casas decimais
  let stringValue = value.toFixed(2);

  // Substituir o ponto por vírgula
  stringValue = stringValue.replace(".", ",");

  // Garantir que a string tenha pelo menos um dígito antes da vírgula
  const parts = stringValue.split(",");
  let integerPart = parts[0];
  const decimalPart = parts[1];

  if (integerPart.length < 1) {
    integerPart = "0" + integerPart;
  }

  // Retornar no formato "R$ X,XX"
  return `R$ ${integerPart},${decimalPart}`;
}
