'use client';

import createCache, { type EmotionCache, type Options as OptionsOfCreateCache } from '@emotion/cache';
import { CacheProvider as DefaultCacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { useState, type ReactNode } from 'react';

type Registry = {
  cache: EmotionCache;
  flush: () => { name: string; isGlobal: boolean }[];
};

type EmotionRegistryProps = {
  options: Omit<OptionsOfCreateCache, 'insertionPoint'>;
  children: ReactNode;
};

export default function EmotionRegistry({ options, children }: EmotionRegistryProps) {
  const [registry] = useState<Registry>(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: { name: string; isGlobal: boolean }[] = [];
    cache.insert = (...args) => {
      const [selector, serialized] = args;
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({ name: serialized.name, isGlobal: !selector });
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prev = inserted;
      inserted = [];
      return prev;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = registry.flush();
    if (names.length === 0) return null;
    let styles = '';
    let dataEmotionAttribute = registry.cache.key;
    const globals: { name: string; style: string }[] = [];
    names.forEach(({ name, isGlobal }) => {
      const style = registry.cache.inserted[name];
      if (typeof style === 'string') {
        if (isGlobal) {
          globals.push({ name, style });
        } else {
          styles += style;
          dataEmotionAttribute += ` ${name}`;
        }
      }
    });
    return (
      <>
        {globals.map(({ name, style }) => (
          <style
            key={name}
            data-emotion={`${registry.cache.key}-global ${name}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style }}
          />
        ))}
        {styles && (
          <style
            data-emotion={dataEmotionAttribute}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: styles }}
          />
        )}
      </>
    );
  });

  return <DefaultCacheProvider value={registry.cache}>{children}</DefaultCacheProvider>;
}
