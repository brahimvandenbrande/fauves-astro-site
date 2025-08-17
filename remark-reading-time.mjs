import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
  return function (tree, { data }) {
    try {
      const textOnPage = toString(tree);
      const readingTime = getReadingTime(textOnPage);
      
      // For MDX
      if (data?.astro?.frontmatter) {
        data.astro.frontmatter.minutesRead = readingTime.text;
      }
      
      // For regular markdown
      if (data?.frontmatter) {
        data.frontmatter.minutesRead = readingTime.text;
      }
    } catch (error) {
      console.error('Error in remark-reading-time plugin:', error);
    }
  };
}