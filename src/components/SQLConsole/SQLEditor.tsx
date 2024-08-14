import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

interface SQLEditorProps {
  query: string;
  onChange: (value: string) => void;
}

const myDarkTheme = createTheme({
  theme: 'dark',
  settings: {
    background: '#2d2e42',
    foreground: '#f0f0f0',
    caret: '#ff9800',
    selection: '#ff980033',
    selectionMatch: '#ff980033',
    gutterBackground: '#2d2e42',
    gutterForeground: '#8b8b8b',
    fontSize: '16px',
    lineHighlight: 'rgba(70,71,102,0.5)',
  },
  styles: [
    { tag: t.keyword, color: '#ff9800', fontWeight: 'bold' },
    { tag: [t.name, t.deleted, t.character, t.macroName], color: '#40c4ff' },
    { tag: [t.function(t.variableName), t.labelName], color: '#ff6e40', fontStyle: 'italic' },
    { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: '#ffab40' },
    { tag: [t.definition(t.name), t.separator], color: '#f0f0f0' },
    { tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: '#64ffda' },
    { tag: [t.operator, t.operatorKeyword], color: '#ff5252', fontWeight: 'bold' },
    { tag: [t.url, t.escape, t.regexp, t.link], color: '#e9c46a' },
    { tag: [t.meta, t.comment], color: '#78909c', fontStyle: 'italic' },
    { tag: t.strong, fontWeight: 'bold', color: '#ff9800' },
    { tag: t.emphasis, fontStyle: 'italic', color: '#40c4ff' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.link, color: '#e9c46a', textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: '#ff9800' },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#ffab40' },
    { tag: [t.processingInstruction, t.string, t.inserted], color: '#9ccc65' },
    { tag: t.invalid, color: '#ffffff', backgroundColor: '#ff5252' },
  ],
});

const SQLEditor: React.FC<SQLEditorProps> = ({ query, onChange }) => (
  <div>
    <label htmlFor="sql-queries" className="mb-3 block text-sm font-medium text-gray-700">
      SQL Queries
    </label>
    <CodeMirror
      id="sql-queries"
      value={query}
      height="350px"
      extensions={[sql()]}
      onChange={onChange}
      theme={myDarkTheme}
    />
  </div>
);

export default SQLEditor;