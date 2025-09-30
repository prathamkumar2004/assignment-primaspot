import { useEffect, useRef } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { BarChart, TrendingUp, PieChart } from 'lucide-react'

// Register Chart.js components
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

  // Prepare engagement comparison data
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
          'rgba(239, 68, 68, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)'
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)'
        ],
        borderWidth: 2
      }
    ]
  }

  // Posts vs Reels comparison
  const postsVsReelsData = {
    labels: ['Posts', 'Reels'],
    datasets: [
      {
        data: [
          media?.posts?.length || 0,
          media?.reels?.length || 0
        ],
        backgroundColor: [
          'rgba(147, 51, 234, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ],
        borderColor: [
          'rgba(147, 51, 234, 1)',
          'rgba(236, 72, 153, 1)'
        ],
        borderWidth: 2
      }
    ]
  }

  // Post performance data
  const performanceData = (() => {
    const allMedia = [
      ...(media?.posts || []),
      ...(media?.reels || []),
    ].sort((a, b) => b.timestamp - a.timestamp)

    if (!allMedia.length) return null

    const recentMedia = allMedia.slice(0, 12).reverse() // Oldest to newest for trend line

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
          borderColor: 'rgba(239, 68, 68, 1)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Reel Views',
          data: recentMedia.map((item) =>
            item.isVideo ? item.viewCount : null
          ),
          borderColor: 'rgba(147, 51, 234, 1)',
          backgroundColor: 'rgba(147, 51, 234, 0.1)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Comments',
          data: recentMedia.map((item) => item.comments),
          borderColor: 'rgba(34, 197, 94, 1)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
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
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        }
      },
      x: {
        grid: {
          display: false,
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
      },
      tooltip: {
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
      <div className="flex items-center space-x-2 mb-6">
        <BarChart className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Average Engagement Chart */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Average Engagement</h3>
          </div>
          <div className="h-64">
            <Bar data={engagementData} options={chartOptions} />
          </div>
        </div>

        {/* Content Distribution */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <PieChart className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Content Distribution</h3>
          </div>
          <div className="h-64">
            <Doughnut data={postsVsReelsData} options={doughnutOptions} />
          </div>
        </div>

        {/* Engagement Rate Indicator */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Engagement Rate</h3>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">
                {profile.avgER ? (profile.avgER * 100).toFixed(1) : '0.0'}%
              </div>
              <p className="text-gray-600 text-lg">Average Engagement Rate</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Excellent: </span>
                  <span className="text-green-600">6%+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Good: </span>
                  <span className="text-blue-600">3-6%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Average: </span>
                  <span className="text-yellow-600">1-3%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Low: </span>
                  <span className="text-red-600">&lt;1%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Performance Trend */}
      {performanceData && (
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
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