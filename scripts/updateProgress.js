import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Lê os dados dos estudos
const estudos = JSON.parse(fs.readFileSync('./data/estudos.json', 'utf-8'));
const exercicios = JSON.parse(fs.readFileSync('./data/exercicios.json', 'utf-8'));

// Calcula o progresso
const modulosCompletos = estudos.modulos.filter(m => m.concluido).length;
const exerciciosResolvidos = exercicios.exercicios.filter(e => e.resolvido).length;

// Lê o package.json
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Atualiza os dados de progresso
packageJson.projectConfig.progresso = {
  modulosCompletos,
  exerciciosResolvidos,
  totalModulos: packageJson.projectConfig.progresso.totalModulos,
  totalExercicios: packageJson.projectConfig.progresso.totalExercicios,
  porcentagemConclusao: Math.round((modulosCompletos / packageJson.projectConfig.progresso.totalModulos) * 100)
};

// Salva as alterações
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('✅ Progresso atualizado no package.json');