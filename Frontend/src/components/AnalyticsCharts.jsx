import { useEffect, useRef } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { BarChart, TrendingUp, PieChart } from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const AnalyticsCharts = ({ profile, media }) => {
  if (!profile) return null

  const engagementData = {
    labels: ['Likes', 'Comments', 'Total Interactions'],
    datasets: [
      {
        label: 'Average Engagement',
        data: [
          profile.avgLikes || 0,
          profile.avgComments || 0,
          (profile.avgLikes || 0) + (profile.avgComments || 0)
        ],
        backgroundColor: [
          'rgba(239, 68, 68, 0.9)',
          'rgba(34, 197, 94, 0.9)',
          'rgba(99, 102, 241, 0.9)'
        ],
        borderColor: [
          'rgba(248, 113, 113, 1)',
          'rgba(74, 222, 128, 1)',
          'rgba(129, 140, 248, 1)'
        ],
        borderWidth: 2
      }
    ]
  }

  const postsVsReelsData = {
    labels: ['Posts', 'Reels'],
    datasets: [
      {
        data: [
          media?.posts?.length || 0,
          media?.reels?.length || 0
        ],
        backgroundColor: [
          'rgba(139, 92, 246, 0.9)',
          'rgba(236, 72, 153, 0.9)'
        ],
        borderColor: [
          'rgba(167, 139, 250, 1)',
          'rgba(244, 114, 182, 1)'
        ],
        borderWidth: 2
      }
    ]
  }

  const performanceData = (() => {
    const allMedia = [
      ...(media?.posts || []),
      ...(media?.reels || []),
    ].sort((a, b) => b.timestamp - a.timestamp)

    if (!allMedia.length) return null

    const recentMedia = allMedia.slice(0, 12).reverse()

    return {
      labels: recentMedia.map((item) =>
        new Date(item.timestamp * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
      ),
      datasets: [
        {
          label: 'Post Likes',
          data: recentMedia.map((item) =>
            !item.isVideo ? item.likes : null
          ),
          borderColor: 'rgba(248, 113, 113, 1)',
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Reel Views',
          data: recentMedia.map((item) =>
            item.isVideo ? item.viewCount : null
          ),
          borderColor: 'rgba(167, 139, 250, 1)',
          backgroundColor: 'rgba(139, 92, 246, 0.2)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Comments',
          data: recentMedia.map((item) => item.comments),
          borderColor: 'rgba(74, 222, 128, 1)',
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    }
  })()

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12,
            weight: 'bold'
          },
          padding: 15
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#e2e8f0',
        bodyColor: '#cbd5e1',
        borderColor: '#475569',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.08)',
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 11
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    }
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12,
            weight: 'bold'
          },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#e2e8f0',
        bodyColor: '#cbd5e1',
        borderColor: '#475569',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            const label = context.label || ''
            const value = context.parsed || 0
            return `${label}: ${value}`
          }
        }
      }
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg border border-indigo-500/30">
          <BarChart className="h-6 w-6 text-indigo-400" />
        </div>
        <h2 className="section-title mb-0">Analytics Overview</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Average Engagement Chart */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Average Engagement</h3>
          </div>
          <div className="h-64">
            <Bar data={engagementData} options={chartOptions} />
          </div>
        </div>

        {/* Content Distribution */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <PieChart className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white">Content Distribution</h3>
          </div>
          <div className="h-64">
            <Doughnut data={postsVsReelsData} options={doughnutOptions} />
          </div>
        </div>

        {/* Engagement Rate Indicator */}
        <div className="card relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-green-600/10"></div>
          <div className="relative">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Engagement Rate</h3>
            </div>
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 mb-3">
                    {profile.avgER ? (profile.avgER * 100).toFixed(1) : '0.0'}%
                  </div>
                </div>
                <p className="text-slate-400 text-lg mb-6">Average Engagement Rate</p>
                <div className="space-y-2 bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Excellent:</span>
                    <span className="text-emerald-400 font-bold">6%+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Good:</span>
                    <span className="text-blue-400 font-bold">3-6%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Average:</span>
                    <span className="text-yellow-400 font-bold">1-3%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Low:</span>
                    <span className="text-red-400 font-bold">&lt;1%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Performance Trend */}
      {performanceData && (
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="h-5 w-5 text-indigo-400" />
            <h3 className="text-xl font-bold text-white">
              Recent Media Performance
            </h3>
          </div>
          <div className="h-80">
            <Line data={performanceData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  )
}

export default AnalyticsCharts
