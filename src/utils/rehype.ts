import { toString } from 'hast-util-to-string';
import css from 'refractor/lang/css.js';
import jsx from 'refractor/lang/jsx.js';
import md from 'refractor/lang/markdown.js';
import shell from 'refractor/lang/shell-session.js';
import tsx from 'refractor/lang/tsx.js';
import { visit } from 'unist-util-visit';

import { refractor } from 'refractor';

refractor.register(tsx);
refractor.register(md);
refractor.register(css);
refractor.register(jsx);
refractor.register(shell);

const highlight = () => {
  return (tree: any) => {
    visit(tree, 'element', visitor);
  };

  function visitor(node: any, _index: any, parentNode: any) {
    if (parentNode.tagName === 'pre' && node.tagName === 'code') {
      try {
        // syntax highlight
        let lang = node.properties.className
          ? node.properties.className[0].split('-')[1]
          : 'md';

        if (lang.includes(':')) {
          lang = lang.split(':')[0];
        }

        let result = refractor.highlight(toString(node), lang);

        node.children = result.children;
      } catch (error) {
        console.error(error)
      }
    }
  }
};

const re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g;

const meta = () => {
  return (tree: any) => {
    visit(tree, 'element', visitor);
  };

  function visitor(node: any, index: any, parentNode: any) {
    let match: any[] | null;

    if (node.tagName === 'code' && node.data && node.data.meta) {
      re.lastIndex = 0; // Reset regex.

      while ((match = re.exec(node.data.meta))) {
        node.properties[match[1]] = match[2] || match[3] || match[4] || '';
        parentNode.properties[match[1]] =
          match[2] || match[3] || match[4] || '';
      }
    }
  }
};

export { highlight, meta };
