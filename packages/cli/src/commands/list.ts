import { logger } from '../utils/logger';
import { getAllComponents } from '../registry';

interface ListOptions {
  cwd: string;
}

export async function list(options: ListOptions) {
  const components = await getAllComponents();

  logger.info(`Available components: (${components.length})`);
  logger.break();

  logger.info('📦 COMPONENTS');
  components.forEach((component) => {
    logger.info('  • ' + component.name.padEnd(15) + ' - ' + component.description);
  });
  logger.break();

  logger.info('Usage:');
  logger.info('  npx native-shadcn add <component>');
  logger.info('  npx native-shadcn add button card input');
  logger.info('  npx native-shadcn add --all');
  logger.break();
}
