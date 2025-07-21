import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { AlertTriangle, TrendingUp, Shield, FileText, Users, Settings } from 'lucide-react';

// Mock portfolio data - simulating what Aladdin would show
const portfolioPositions = [
  { symbol: 'AAPL', name: 'Apple Inc', type: 'Equity', value: 2500000, weight: 12.5, sector: 'Technology', risk: 'Medium' },
  { symbol: 'GOOGL', name: 'Google', type: 'Equity', value: 2000000, weight: 10.0, sector: 'Technology', risk: 'Medium' },
  { symbol: 'JPM', name: 'JPMorgan Chase', type: 'Equity', value: 1800000, weight: 9.0, sector: 'Financials', risk: 'High' },
  { symbol: 'US10Y', name: 'US 10Y Treasury', type: 'Fixed Income', value: 3000000, weight: 15.0, sector: 'Government', risk: 'Low' },
  { symbol: 'CORP_BD', name: 'Corporate Bonds', type: 'Fixed Income', value: 2200000, weight: 11.0, sector: 'Corporate', risk: 'Medium' },
  { symbol: 'SPY_OPT', name: 'SPY Options', type: 'Derivatives', value: 1500000, weight: 7.5, sector: 'Derivatives', risk: 'High' },
];

const sectorExposure = [
  { sector: 'Technology', exposure: 22.5, limit: 25.0, status: 'OK' },
  { sector: 'Financials', exposure: 9.0, limit: 15.0, status: 'OK' },
  { sector: 'Government', exposure: 15.0, limit: 20.0, status: 'OK' },
  { sector: 'Corporate', exposure: 11.0, limit: 12.0, status: 'Warning' },
  { sector: 'Derivatives', exposure: 7.5, limit: 10.0, status: 'OK' },
];

const riskMetrics = [
  { metric: 'Portfolio VaR (1-day)', value: '$450,000', status: 'Normal', threshold: '$500,000' },
  { metric: 'Duration Risk', value: '4.2 years', status: 'Normal', threshold: '5.0 years' },
  { metric: 'Beta to S&P 500', value: '0.85', status: 'Normal', threshold: '1.2' },
  { metric: 'Credit Risk', value: 'A+ Average', status: 'Good', threshold: 'A-' },
];

const complianceChecks = [
  { rule: 'Single Name Concentration', status: 'PASS', detail: 'Max position: 12.5% (Limit: 15%)' },
  { rule: 'Sector Concentration', status: 'WARNING', detail: 'Corporate bonds at 92% of limit' },
  { rule: 'Liquidity Requirements', status: 'PASS', detail: 'Daily liquidity: 85% (Required: 70%)' },
  { rule: 'Derivative Exposure', status: 'PASS', detail: 'Notional: 7.5% (Limit: 10%)' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function PortfolioRiskDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  const totalAUM = portfolioPositions.reduce((sum, pos) => sum + pos.value, 0);
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Portfolio Risk Management</h1>
            <p className="text-gray-600 mt-1">Institutional Client Dashboard - Powered by Aladdin Technology</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">${(totalAUM/1000000).toFixed(1)}M</div>
            <div className="text-sm text-gray-500">Total AUM</div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mt-6 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'overview', label: 'Portfolio Overview', icon: TrendingUp },
            { id: 'risk', label: 'Risk Analytics', icon: Shield },
            { id: 'compliance', label: 'Compliance', icon: AlertTriangle },
            { id: 'reporting', label: 'Client Reporting', icon: FileText }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                selectedTab === tab.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Asset Allocation */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Asset Allocation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={portfolioPositions}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="weight"
                  label={({name, weight}) => `${name}: ${weight}%`}
                >
                  {portfolioPositions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Holdings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Top Holdings</h3>
            <div className="space-y-3">
              {portfolioPositions.slice(0, 6).map((position, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{position.symbol}</div>
                    <div className="text-sm text-gray-600">{position.type} • {position.sector}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${(position.value/1000000).toFixed(1)}M</div>
                    <div className="text-sm text-gray-600">{position.weight}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Exposure */}
          <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Sector Exposure vs Limits</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sectorExposure}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sector" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="exposure" fill="#3B82F6" name="Current Exposure" />
                <Bar dataKey="limit" fill="#E5E7EB" name="Limit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {selectedTab === 'risk' && (
        <div className="space-y-6">
          {/* Risk Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {riskMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <Shield className={`w-8 h-8 ${
                    metric.status === 'Good' ? 'text-green-500' : 
                    metric.status === 'Normal' ? 'text-blue-500' : 'text-yellow-500'
                  }`} />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    metric.status === 'Good' ? 'bg-green-100 text-green-800' : 
                    metric.status === 'Normal' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {metric.status}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mt-4">{metric.metric}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <p className="text-xs text-gray-500 mt-1">Threshold: {metric.threshold}</p>
              </div>
            ))}
          </div>

          {/* Risk Decomposition */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Risk Decomposition by Asset Class</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { name: 'Equities', contribution: 65, var: 290000 },
                { name: 'Fixed Income', contribution: 20, var: 90000 },
                { name: 'Derivatives', contribution: 15, var: 70000 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name) => 
                  name === 'contribution' ? `${value}%` : `$${value.toLocaleString()}`
                } />
                <Bar dataKey="contribution" fill="#3B82F6" name="Risk Contribution %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {selectedTab === 'compliance' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-6">Compliance Monitoring</h3>
          <div className="space-y-4">
            {complianceChecks.map((check, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {check.status === 'PASS' ? (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  )}
                  <div>
                    <div className="font-medium">{check.rule}</div>
                    <div className="text-sm text-gray-600">{check.detail}</div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  check.status === 'PASS' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {check.status}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Regulatory Updates</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• New SEC reporting requirements effective Q3 2025</li>
              <li>• Updated liquidity risk management rules coming in Q4</li>
              <li>• Enhanced derivative reporting thresholds updated</li>
            </ul>
          </div>
        </div>
      )}

      {selectedTab === 'reporting' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Executive Summary Report</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Export PDF
              </button>
            </div>
            
            <div className="prose max-w-none">
              <h4 className="text-base font-semibold text-gray-900 mb-3">Portfolio Performance Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Total Assets</div>
                  <div className="text-xl font-bold">${(totalAUM/1000000).toFixed(1)}M</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Risk-Adjusted Return</div>
                  <div className="text-xl font-bold">1.24</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Compliance Status</div>
                  <div className="text-xl font-bold text-green-600">PASS</div>
                </div>
              </div>
              
              <h4 className="text-base font-semibold text-gray-900 mb-3">Key Observations</h4>
              <ul className="space-y-2 text-sm">
                <li>• Portfolio maintains conservative risk profile with VaR below institutional limits</li>
                <li>• Technology sector allocation approaching maximum threshold - recommend monitoring</li>
                <li>• Fixed income duration risk well within acceptable parameters</li>
                <li>• All regulatory compliance checks passed with minor corporate bond concentration warning</li>
                <li>• Liquidity position exceeds minimum requirements by 15%</li>
              </ul>
              
              <h4 className="text-base font-semibold text-gray-900 mb-3 mt-6">Recommended Actions</h4>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400">
                  <div className="text-sm font-medium text-yellow-800">Monitor Corporate Bond Exposure</div>
                  <div className="text-sm text-yellow-700">Corporate bond sector at 92% of limit - consider rebalancing</div>
                </div>
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400">
                  <div className="text-sm font-medium text-blue-800">Technology Sector Review</div>
                  <div className="text-sm text-blue-700">Tech allocation healthy but approaching limits - prepare for potential rebalancing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioRiskDashboard;