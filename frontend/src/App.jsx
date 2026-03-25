import { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import { Routes, Route, Link } from 'react-router-dom';
import '@xyflow/react/dist/style.css';
import axios from 'axios';
import { Aperture, Database, Play, Save } from 'lucide-react';

import InputNode from './components/InputNode';
import ResultNode from './components/ResultNode';
import HistoryPanel from './components/HistoryPanel';
import LandingPage from './pages/LandingPage';
import './App.css';

// const API_BASE_URL = 'http://127.0.0.1:5001';
const API_BASE_URL = 'https://mern-app-37rz.onrender.com';

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

const initialNodes = [
  {
    id: 'input-1',
    type: 'inputNode',
    position: { x: 100, y: 150 },
    data: { prompt: '', onPromptChange: () => {} },
  },
  {
    id: 'result-1',
    type: 'resultNode',
    position: { x: 600, y: 150 },
    data: { response: '', loading: false },
  },
];

const initialEdges = [
  {
    id: 'edge-1',
    source: 'input-1',
    target: 'result-1',
    animated: true,
    style: { stroke: 'var(--neon-cyan)', strokeWidth: 2 },
  },
];

function Dashboard() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [saveStatus, setSaveStatus] = useState('');
  const [historyRefresh, setHistoryRefresh] = useState(0);
  const promptRef = useRef('');

  const handlePromptChange = useCallback(
    (value) => {
      promptRef.current = value;
      setNodes((nds) =>
        nds.map((n) =>
          n.id === 'input-1'
            ? { ...n, data: { ...n.data, prompt: value } }
            : n
        )
      );
    },
    [setNodes]
  );

  const nodesWithCallback = nodes.map((n) =>
    n.id === 'input-1'
      ? { ...n, data: { ...n.data, onPromptChange: handlePromptChange } }
      : n
  );

  const setResultLoading = (loading) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === 'result-1'
          ? { ...n, data: { ...n.data, loading } }
          : n
      )
    );
  };

  const setResultResponse = (response) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === 'result-1'
          ? { ...n, data: { ...n.data, response, loading: false } }
          : n
      )
    );
  };

  const handleRunFlow = async () => {
    const prompt = promptRef.current.trim();
    if (!prompt) {
      alert('Please enter a prompt!');
      return;
    }
    setResultLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/ask-ai`, { prompt });
      setResultResponse(data.response);
    } catch (err) {
      setResultResponse('ERROR: ' + (err.response?.data?.error || 'Connection failed'));
    }
  };

  const handleSave = async () => {
    const prompt = promptRef.current.trim();
    const resultNode = nodes.find((n) => n.id === 'result-1');
    const response = resultNode?.data?.response;

    if (!prompt || !response) {
      alert('Run the flow first!');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/save`, { prompt, response });
      setSaveStatus('COMMITTED');
      setHistoryRefresh((r) => r + 1);
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      setSaveStatus('FAILED');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: 'var(--neon-cyan)', strokeWidth: 2 } }, eds)),
    [setEdges]
  );

  return (
    <div className="app-wrapper">
      <header className="app-header surface-noir">
        <div className="header-left">
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Aperture size={24} color="var(--neon-cyan)" />
            <h1 className="app-title">AI Flow Visualizer</h1>
          </Link>
        </div>
        <div className="header-right" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {saveStatus && <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neon-emerald)', letterSpacing: '0.15em' }}>{saveStatus}</span>}
          {/* <HistoryPanel refreshFlag={historyRefresh} /> */}
          <HistoryPanel refreshFlag={historyRefresh} apiBaseUrl={API_BASE_URL} />
          <button className="btn-quant" onClick={handleSave}>
            <Save size={18} /> <span style={{ textTransform: 'uppercase' }}>Save</span>
          </button>
          <button className="btn-quant emerald" onClick={handleRunFlow}>
            <Play size={18} style={{ fill: 'currentColor' }} /> <span style={{ textTransform: 'uppercase' }}>Run Flow</span>
          </button>
        </div>
      </header>

      <div className="dashboard-content" style={{ position: 'relative', zIndex: 1 }}>
        <div className="canvas-area">
          <ReactFlow
            nodes={nodesWithCallback}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.3 }}
          >
            <Background variant="dots" color="var(--text-tertiary)" gap={16} size={1} />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<Dashboard />} />
    </Routes>
  );
}
