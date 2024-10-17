export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatToBRL(value: string): string {
  const numericString = Number(value).toFixed(2);
  // Substituir o ponto por vírgula
  let stringValue = numericString.replace(".", ",");

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

export function formatToAmount(value: number): string {
  if (value >= 10) return value.toString();
  return `0${value.toString()}`;
}

export function cleanPrice(value: string): string {
  // Remove o prefixo "R$", espaços em branco e caracteres não numéricos, exceto a vírgula
  const cleanedValue = value
    .replace(/R\$\s*/g, "")
    .replace(/\s+/g, "")
    .replace(",", ".");

  // Verifica se a string resultante não está vazia e retorna
  return cleanedValue.length > 0 ? cleanedValue : "";
}
