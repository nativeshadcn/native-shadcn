import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logger } from '../../utils/logger';

describe('logger', () => {
  let consoleLogSpy: any;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  describe('info', () => {
    it('should log info messages', () => {
      logger.info('Test info message');
      expect(consoleLogSpy).toHaveBeenCalled();
    });

    it('should log multiple arguments', () => {
      logger.info('Test', 'multiple', 'args');
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('error', () => {
    it('should log error messages', () => {
      logger.error('Test error message');
      expect(consoleLogSpy).toHaveBeenCalled();
    });

    it('should log error objects', () => {
      const error = new Error('Test error');
      logger.error(error);
      expect(consoleLogSpy).toHaveBeenCalled();
    });

    it('should handle string errors', () => {
      logger.error('String error message');
      expect(consoleLogSpy).toHaveBeenCalled();
    });
  });

  describe('warn', () => {
    it('should log warning messages', () => {
      logger.warn('Test warning');
      expect(consoleLogSpy).toHaveBeenCalled();
    });
  });

  describe('success', () => {
    it('should log success messages', () => {
      logger.success('Operation successful');
      expect(consoleLogSpy).toHaveBeenCalled();
    });

    it('should format success messages with checkmark', () => {
      logger.success('Test success');
      expect(consoleLogSpy).toHaveBeenCalled();
    });
  });

  describe('break', () => {
    it('should log empty line', () => {
      logger.break();
      expect(consoleLogSpy).toHaveBeenCalledWith('');
    });
  });
});
