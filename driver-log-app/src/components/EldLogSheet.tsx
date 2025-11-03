import React from "react";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface EldRecord {
  day: number;
  start_time_utc: string;
  drive_hours: number;
  drive_seconds: number;
}

interface EldLogSheetProps {
  logs: EldRecord[];
}

const EldLogSheet: React.FC<EldLogSheetProps> = ({ logs }) => {
  const { t } = useTranslation();

  if (!logs || logs.length === 0) return null;

  const STATUS_LABELS = [
    t("ELD_LOG_SHEET.STATUS.OFF_DUTY"),
    t("ELD_LOG_SHEET.STATUS.SLEEPER"),
    t("ELD_LOG_SHEET.STATUS.DRIVING"),
    t("ELD_LOG_SHEET.STATUS.ON_DUTY")
  ];

  const HEIGHT = 200;
  const WIDTH = 720; // 30 px par heure

  return (
    <div className="mt-4">
      <h5 className="text-primary mb-3">{t("ELD_LOG_SHEET.TITLE")}</h5>

      <div className="d-flex flex-wrap gap-4">
        {logs.map((log) => {
          const start = new Date(log.start_time_utc);
          const totalHours = log.drive_hours;

          const startHour = 8;
          const driveEnd = startHour + totalHours;
          const hourToX = (h: number) => (h / 24) * WIDTH;

          return (
            <Card key={log.day} style={{ width: WIDTH + 40 }} className="shadow-sm">
              <Card.Header className="bg-dark text-white">
                {t("APP.DASHBOARD")} Day {log.day}
              </Card.Header>
              <Card.Body>
                <div className="border border-secondary rounded position-relative p-2">
                  <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
                    {[...Array(25)].map((_, i) => (
                      <line key={`v-${i}`} x1={hourToX(i)} y1={0} x2={hourToX(i)} y2={HEIGHT} stroke="#e0e0e0" strokeWidth="0.5" />
                    ))}
                    {STATUS_LABELS.map((_, i) => (
                      <line key={`h-${i}`} x1={0} y1={(i * HEIGHT) / 4} x2={WIDTH} y2={(i * HEIGHT) / 4} stroke="#ccc" strokeWidth="0.8" />
                    ))}
                    {STATUS_LABELS.map((label, i) => (
                      <text key={`label-${i}`} x={5} y={(i * HEIGHT) / 4 + 25} fontSize="12" fontWeight="bold" fill="#555">
                        {label}
                      </text>
                    ))}
                    {[...Array(25)].map((_, i) => (
                      <text key={`hour-${i}`} x={hourToX(i)} y={HEIGHT - 5} fontSize="10" textAnchor="middle" fill="#888">
                        {i}
                      </text>
                    ))}
                    <polyline fill="none" stroke="blue" strokeWidth="3" points={`${hourToX(startHour)},${(2 * HEIGHT) / 4} ${hourToX(driveEnd)},${(2 * HEIGHT) / 4}`} />
                    <polyline fill="none" stroke="#999" strokeDasharray="4" strokeWidth="2" points={`0,${(0 * HEIGHT) / 4} ${hourToX(startHour)},${(0 * HEIGHT) / 4}`} />
                    <polyline fill="none" stroke="#999" strokeDasharray="4" strokeWidth="2" points={`${hourToX(driveEnd)},${(0 * HEIGHT) / 4} ${WIDTH},${(0 * HEIGHT) / 4}`} />
                  </svg>
                </div>

                <p className="mt-3 mb-0">
                  <strong>{t("ELD_LOG_SHEET.START")}</strong>{" "}
                  {start.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                </p>
                <p>
                  <strong>{t("ELD_LOG_SHEET.DRIVING_TIME")}</strong> {log.drive_hours.toFixed(2)} hrs
                </p>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EldLogSheet;