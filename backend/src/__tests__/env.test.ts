import { describe, expect, it } from 'vitest';

import { env } from '../config/env.js';

describe('env configuration', () => {
  it('should expose mandatory fields', () => {
    expect(env).toHaveProperty('MONGODB_URI');
    expect(env).toHaveProperty('JWT_ACCESS_PUBLIC_KEY');
    expect(env).toHaveProperty('JWT_REFRESH_PUBLIC_KEY');
  });
});
