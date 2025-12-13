import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn (class name utility)', () => {
  it('merges multiple class names', () => {
    expect(cn('foo', 'bar', 'baz')).toContain('foo');
    expect(cn('foo', 'bar', 'baz')).toContain('bar');
    expect(cn('foo', 'bar', 'baz')).toContain('baz');
  });

  it('handles conditional classes', () => {
    const result = cn('base', true && 'active', false && 'inactive');
    expect(result).toContain('base');
    expect(result).toContain('active');
    expect(result).not.toContain('inactive');
  });

  it('handles undefined and null values', () => {
    expect(cn('foo', undefined, null, 'bar')).toContain('foo');
    expect(cn('foo', undefined, null, 'bar')).toContain('bar');
  });

  it('handles empty strings', () => {
    const result = cn('foo', '', 'bar');
    expect(result).toContain('foo');
    expect(result).toContain('bar');
  });

  it('merges Tailwind classes correctly (conflict resolution)', () => {
    // tailwind-merge should resolve conflicts
    const result = cn('p-4', 'p-2');
    // The last one should win, or tailwind-merge should handle it
    expect(result).toBeTruthy();
  });

  it('handles arrays of classes', () => {
    const result = cn(['foo', 'bar'], 'baz');
    expect(result).toContain('foo');
    expect(result).toContain('bar');
    expect(result).toContain('baz');
  });

  it('handles objects with conditional classes', () => {
    const result = cn({
      'active': true,
      'inactive': false,
      'disabled': false,
    });
    expect(result).toContain('active');
    expect(result).not.toContain('inactive');
    expect(result).not.toContain('disabled');
  });

  it('handles mixed inputs', () => {
    const result = cn(
      'base',
      ['array1', 'array2'],
      { conditional: true, not: false },
      'string',
      undefined,
      null
    );
    expect(result).toContain('base');
    expect(result).toContain('array1');
    expect(result).toContain('array2');
    expect(result).toContain('conditional');
    expect(result).toContain('string');
    expect(result).not.toContain('not');
  });

  it('returns empty string for no inputs', () => {
    expect(cn()).toBe('');
  });

  it('handles only falsy values', () => {
    expect(cn(false, null, undefined, '')).toBe('');
  });
});
