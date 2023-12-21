export const formatNumber = (value: number | string): string => {
  return new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(Number(value))
}
