import React, { useEffect, useRef } from 'react'
import { Card } from 'react-bootstrap'

interface EldLogsProps {
  logs: any[]
}

const EldLogs: React.FC<EldLogsProps> = ({ logs }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!logs || logs.length === 0) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // dimensions
    const width = canvas.width
    const height = canvas.height
    ctx.clearRect(0, 0, width, height)

    // grille horizontale = 24 heures
    const hours = 24
    const hourWidth = width / hours

    // lignes principales
    ctx.strokeStyle = '#ddd'
    for (let i = 0; i <= hours; i++) {
      const x = i * hourWidth
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    // labels heure
    ctx.fillStyle = '#888'
    ctx.font = '10px sans-serif'
    for (let i = 0; i <= hours; i += 2) {
      const label = i.toString().padStart(2, '0') + ':00'
      ctx.fillText(label, i * hourWidth + 2, 10)
    }

    // ligne médiane “repos / conduite”
    const midY = height / 2
    ctx.strokeStyle = '#aaa'
    ctx.beginPath()
    ctx.moveTo(0, midY)
    ctx.lineTo(width, midY)
    ctx.stroke()

    // dessin du segment de conduite
    const driveSeconds = logs[0]?.drive_seconds ?? 0
    const driveHours = driveSeconds / 3600
    const driveWidth = driveHours * hourWidth

    ctx.strokeStyle = '#007bff'
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.moveTo(hourWidth, midY) // start driving à 1h pour exemple
    ctx.lineTo(hourWidth + driveWidth, midY)
    ctx.stroke()

    // texte descriptif
    ctx.fillStyle = '#007bff'
    ctx.font = '12px sans-serif'
    ctx.fillText(
      `Driving: ${driveHours.toFixed(2)} hrs`,
      hourWidth + 5,
      midY - 10
    )
  }, [logs])

  return (
    <Card className="shadow-sm">
      <Card.Header>ELD Daily Log Sheet</Card.Header>
      <Card.Body>
        {logs && logs.length > 0 ? (
          <>
            <canvas
              ref={canvasRef}
              width={600}
              height={200}
              style={{ border: '1px solid #ccc', width: '100%', borderRadius: 8 }}
            />
            <div className="mt-2 text-muted small">
              <strong>Day {logs[0].day}</strong> — Start:{' '}
              {new Date(logs[0].start_time_utc).toLocaleString()}
            </div>
          </>
        ) : (
          <p>No ELD data yet.</p>
        )}
      </Card.Body>
    </Card>
  )
}

export default EldLogs
