import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #c0c0c0;
  font-family: 'MS Sans Serif', Tahoma, sans-serif;
  height: 100%;
  display: flex;
  flex-direction: column;
  user-select: none;
`;

const AddressBar = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px;
  border-bottom: 1px solid #808080;
  background: #c0c0c0;
`;

const AddressLabel = styled.span`
  font-size: 11px;
  color: #000;
  white-space: nowrap;
`;

const AddressInput = styled.div`
  flex: 1;
  padding: 2px 4px;
  background: #fff;
  border-top: 2px inset #808080;
  border-left: 2px inset #808080;
  border-bottom: 2px inset #fff;
  border-right: 2px inset #fff;
  font-size: 11px;
  color: #000;
`;

const MainArea = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
`;

const TreePanel = styled.div`
  width: 170px;
  background: #fff;
  border: 2px inset #808080;
  margin: 2px;
  overflow-y: auto;
  flex-shrink: 0;
`;

const TreeNode = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 4px;
  padding-left: ${p => p.$indent * 16 + 4}px;
  font-size: 11px;
  color: #000;
  cursor: pointer;
  white-space: nowrap;

  background: ${p => p.$selected ? '#000080' : 'transparent'};
  color: ${p => p.$selected ? '#fff' : '#000'};

  &:hover {
    background: ${p => p.$selected ? '#000080' : '#e0e0e0'};
  }
`;

const FilePanel = styled.div`
  flex: 1;
  background: #fff;
  border: 2px inset #808080;
  margin: 2px;
  overflow-y: auto;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 8px;
  font-size: 11px;
  color: #000;
  cursor: pointer;

  background: ${p => p.$selected ? '#000080' : 'transparent'};
  color: ${p => p.$selected ? '#fff' : '#000'};

  &:hover {
    background: ${p => p.$selected ? '#000080' : '#e0e0e0'};
  }
`;

const FileIcon = styled.span`
  font-size: 14px;
  width: 18px;
  text-align: center;
`;

const FileName = styled.span`
  flex: 1;
`;

const FileSize = styled.span`
  font-size: 10px;
  color: ${p => p.$selected ? '#ccc' : '#808080'};
  min-width: 60px;
  text-align: right;
`;

const StatusBar = styled.div`
  padding: 2px 8px;
  font-size: 10px;
  color: #000;
  border-top: 1px solid #808080;
`;

const fileSystem = {
  'Root': {
    folders: ['gui', 'screenshots', 'UUIDs'],
    files: [],
  },
  'gui': {
    folders: [],
    files: [
      { name: 'desktop_screenshot.png', size: '2.4 MB', icon: '🖼️' },
      { name: 'config.json', size: '1.2 KB', icon: '📄' },
    ],
  },
  'screenshots': {
    folders: [],
    files: [
      { name: 'desktop_screenshot.png', size: '3.1 MB', icon: '🖼️' },
      { name: 'old_resume.doc', size: '156 KB', icon: '📝' },
    ],
  },
  'UUIDs': {
    folders: [],
    files: [
      { name: 'notes.txt', size: '452 B', icon: '📄' },
      { name: 'config.json', size: '891 B', icon: '📄' },
    ],
  },
};

const treeData = [
  { name: 'Root', indent: 0, path: 'Root' },
  { name: 'gui', indent: 1, path: 'gui', isFolder: true },
  { name: 'screenshots', indent: 1, path: 'screenshots', isFolder: true },
  { name: 'UUIDs', indent: 1, path: 'UUIDs', isFolder: true },
];

function RecycleBinApp({ onClose }) {
  const [selectedFolder, setSelectedFolder] = useState('Root');
  const [selectedFile, setSelectedFile] = useState(null);

  const current = fileSystem[selectedFolder] || { folders: [], files: [] };

  return (
    <Container>
      <AddressBar>
        <AddressLabel>Address:</AddressLabel>
        <AddressInput>📁 C:\RecycleBin\{selectedFolder}</AddressInput>
      </AddressBar>
      <MainArea>
        <TreePanel>
          {treeData.map(node => (
            <TreeNode
              key={node.path}
              $indent={node.indent}
              $selected={selectedFolder === node.path}
              onClick={() => { setSelectedFolder(node.path); setSelectedFile(null); }}
            >
              <span>{node.isFolder ? '📁' : '🗂️'}</span>
              {node.name}
            </TreeNode>
          ))}
        </TreePanel>
        <FilePanel>
          {current.folders.map(f => (
            <FileItem
              key={f}
              $selected={false}
              onClick={() => { setSelectedFolder(f); setSelectedFile(null); }}
            >
              <FileIcon>📁</FileIcon>
              <FileName>{f}</FileName>
              <FileSize>Folder</FileSize>
            </FileItem>
          ))}
          {current.files.map(f => (
            <FileItem
              key={f.name}
              $selected={selectedFile === f.name}
              onClick={() => setSelectedFile(f.name)}
            >
              <FileIcon>{f.icon}</FileIcon>
              <FileName>{f.name}</FileName>
              <FileSize $selected={selectedFile === f.name}>{f.size}</FileSize>
            </FileItem>
          ))}
          {current.folders.length === 0 && current.files.length === 0 && (
            <FileItem $selected={false} style={{ color: '#808080' }}>
              This folder is empty
            </FileItem>
          )}
        </FilePanel>
      </MainArea>
      <StatusBar>
        {current.files.length + current.folders.length} object(s)
        {selectedFile && ` — ${selectedFile}`}
      </StatusBar>
    </Container>
  );
}

export default RecycleBinApp;
