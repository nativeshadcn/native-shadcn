#!/usr/bin/env node

import { Command } from 'commander';
import { init } from './commands/init';
import { add } from './commands/add';
import { list } from './commands/list';

const program = new Command();

program
  .name('native-shadcn')
  .description('Add beautiful React Native components to your project')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize native-shadcn in your project')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('-c, --cwd <path>', 'Set the working directory', process.cwd())
  .action(init);

program
  .command('add')
  .description('Add components to your project')
  .argument('[components...]', 'Components to add')
  .option('-a, --all', 'Add all components')
  .option('-o, --overwrite', 'Overwrite existing files')
  .option('-c, --cwd <path>', 'Set the working directory', process.cwd())
  .action(add);

program
  .command('list')
  .description('List all available components')
  .option('-c, --cwd <path>', 'Set the working directory', process.cwd())
  .action(list);

program.parse();
