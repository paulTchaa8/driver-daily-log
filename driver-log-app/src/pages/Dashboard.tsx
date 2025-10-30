import { useState } from 'react'
import { Row, Col, Card, Spinner } from 'react-bootstrap'
import InputForm from '../components/InputForm'
import MapView from '../components/MapView'
import * as routeApi from '../api/routeApi'
import EldLogSheet from '../components/EldLogSheet'

const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)

  const handleSubmit = async (driverObj: any) => {
    setLoading(true)
    routeApi.handleSubmit(driverObj).then((result: any) => {
      console.log('reponse api/route => ', result)
      setData(result)
    }).catch(err => {
      console.error(err)
      alert('Error fetching route')
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <Row>
      <Col md={4}>
        <Card className="shadow-sm">
          <Card.Body>
            <InputForm onSubmit={handleSubmit} />
          </Card.Body>
        </Card>
      </Col>

      <Col md={8}>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <Spinner animation="border" />
          </div>
        ) : data ? (
          <>
            <MapView geojson={data.geojson_route} summary={data.route_summary} />
            {/* <EldLogs logs={data.eld_records} /> */}
            <EldLogSheet logs={data.eld_records} />
          </>
        ) : (
          <Card className="text-center p-5 text-muted">
            <p>Fill the form to generate the trip details 🚛</p>
          </Card>
        )}
      </Col>
    </Row>
  )
}

export default Dashboard