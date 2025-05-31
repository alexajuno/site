import type { MDXComponents } from 'mdx/types'
 
/**
 * A utility function to provide MDX components.
 * 
 * This function currently returns the provided components without modification.
 * It is designed to allow future extensibility, where additional processing or
 * default components can be added as needed.
 *
 * @param components - The MDX components to use.
 * @returns The provided components, spread into a new object.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}