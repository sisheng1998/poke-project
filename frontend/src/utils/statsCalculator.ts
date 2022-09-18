const CalculateHP = (base: number, level: number) =>
	Math.round(base + ((2 * base * level) / 100 + level + 10))

const CalculateStats = (base: number, level: number) =>
	Math.round(base + ((2 * base * level) / 100 + 5))

export { CalculateHP, CalculateStats }
