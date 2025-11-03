import { useState } from 'react'
import { Row, Col, Card, Spinner } from 'react-bootstrap'
import InputForm from '../components/InputForm'
import MapView from '../components/MapView'
import * as routeApi from '../api/routeApi'
import EldLogSheet from '../components/EldLogSheet'
import { useTranslation } from 'react-i18next'

const Dashboard = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)

  const handleSubmit = async (driverObj: any) => {
    setLoading(true)
    routeApi
      .handleSubmit(driverObj)
      .then((result: any) => {
        console.log('reponse api/route => ', result)
        setData(result)
      })
      .catch((err) => {
        console.error(err)
        alert(t('DASHBOARD.ERROR'))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Row>
      {/* === Left Column: sticky form === */}
      <Col md={4}>
        <div
          style={{
            position: 'sticky',
            top: '80px',
            zIndex: 10,
          }}
        >
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">{t('DASHBOARD.FORM_TITLE')}</h5>
              <InputForm onSubmit={handleSubmit} />
            </Card.Body>
          </Card>
        </div>
      </Col>

      {/* === Right Column: map + results === */}
      <Col md={8}>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <Spinner animation="border" />
            <span className="ms-2">{t('DASHBOARD.LOADING')}</span>
          </div>
        ) : data ? (
          <>
            <h5 className="mt-3">{t('DASHBOARD.TRIP_MAP')}</h5>
            <MapView geojson={data.geojson_route} summary={data.route_summary} />

            <h5 className="mt-4">{t('DASHBOARD.ELD_LOGS')}</h5>
            <EldLogSheet logs={data.eld_records} />
          </>
        ) : (
          <Card className="text-center p-5 text-muted">
            <p>{t('DASHBOARD.EMPTY_MESSAGE')}</p>
          </Card>
        )}
      </Col>
    </Row>
  )
}

export default Dashboard
