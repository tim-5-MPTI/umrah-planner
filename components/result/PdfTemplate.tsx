'use client'

import { formatIDR } from '@/utils/formatCurrency'
import { formatDate } from '@/lib/utils'
import { TRANSPORT_OPTIONS, MEAL_OPTIONS } from '@/constants/budgetPresets'
import type { PlannerFormData, CostBreakdown } from '@/lib/types'

interface Props {
  form: PlannerFormData
  breakdown: CostBreakdown | null
}

export default function PdfTemplate({ form, breakdown }: Props) {
  const totalPax = form.adult_count + form.child_count
  const totalNights = form.nights_makkah + form.nights_madinah
  const transportLabel = TRANSPORT_OPTIONS.find(t => t.value === form.selected_transport)?.label ?? '-'
  const mealLabel = MEAL_OPTIONS.find(m => m.value === form.selected_meal)?.label ?? '-'
  const sarRate = 4300
  const isOverBudget = breakdown?.is_sufficient === false

  const costItems = [
    {
      icon: '✈',
      label: form.selected_flight?.airlines ?? 'Belum dipilih',
      sub: form.selected_flight
        ? `${form.origin_airport} (${form.origin_airport}) → ${form.destination_airport} (${form.destination_airport})`
        : '-',
      amount: breakdown?.fixed.flight ?? 0,
    },
    {
      icon: '🏨',
      label: form.selected_hotel_makkah?.name ?? 'Belum dipilih',
      sub: form.selected_hotel_makkah
        ? `${form.nights_makkah} Malam · ${form.selected_hotel_makkah.distance_to_masjid_m}m ke Masjidil Haram`
        : '-',
      amount: breakdown ? breakdown.dynamic.hotel_makkah + breakdown.dynamic.hotel_madinah : 0,
    },
    {
      icon: '🚌',
      label: transportLabel,
      sub: 'Jeddah → Makkah → Madinah',
      amount: breakdown?.fixed.transport ?? 0,
    },
    {
      icon: '🍽',
      label: mealLabel,
      sub: 'Jeddah · Makkah · Madinah',
      amount: breakdown?.fixed.meal ?? 0,
    },
    {
      icon: '🪪',
      label: 'Visa & Vaksin Meningitis',
      sub: `Total Biaya Vaksin + Visa`,
      amount: breakdown ? breakdown.fixed.visa + breakdown.fixed.meningitis : 0,
    },
  ]

  const ringkasanItems = [
    { label: 'Penerbangan', amount: breakdown?.fixed.flight ?? 0 },
    { label: 'Hotel', amount: breakdown ? breakdown.dynamic.hotel_makkah + breakdown.dynamic.hotel_madinah : 0 },
    { label: 'Transportasi', amount: breakdown?.fixed.transport ?? 0 },
    { label: 'Konsumsi', amount: breakdown?.fixed.meal ?? 0 },
    { label: 'Dokumen', amount: breakdown ? breakdown.fixed.visa + breakdown.fixed.meningitis : 0 },
  ]

  return (
    <div id="pdf-template"
      style={{
        width: '210mm',
        minHeight: '297mm',
        fontFamily: 'Arial, sans-serif',
        background: '#FDFBF7',
        color: '#26170C',
      }}>

      {/* Header */}
      <div style={{
        background: '#26170C',
        padding: '24px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px', height: '32px',
            background: '#FFE088',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px',
          }}>🕌</div>
          <span style={{ color: '#FDFBF7', fontWeight: 'bold', fontSize: '18px' }}>
            umra<span style={{ color: '#FFE088' }}>tee</span>
          </span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: '#D4CCB0', fontSize: '10px', margin: 0 }}>ESTIMASI TOTAL</p>
          <p style={{ color: '#FDFBF7', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {breakdown ? formatIDR(breakdown.total) : 'Rp 0'}
          </p>
          <p style={{ color: '#D4CCB0', fontSize: '10px', margin: 0 }}>
            Termasuk pajak & biaya layanan
          </p>
        </div>
      </div>

      {/* Document label */}
      <div style={{ padding: '16px 32px 0' }}>
        <div style={{
          display: 'inline-block',
          border: '1px solid #C5A059',
          borderRadius: '6px',
          padding: '4px 12px',
          fontSize: '10px',
          fontWeight: 'bold',
          letterSpacing: '1px',
          color: '#735C00',
        }}>
          DOKUMEN PERJALANAN UMROH
        </div>
      </div>

      {/* Trip meta */}
      <div style={{
        padding: '16px 32px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: '16px',
        borderBottom: '1px solid #D4CCB0',
        marginBottom: '16px',
      }}>
        {[
          { label: 'KEBERANGKATAN', value: form.departure_date ? formatDate(form.departure_date) : '-' },
          { label: 'KEPULANGAN', value: form.return_date ? formatDate(form.return_date) : '-' },
          { label: 'DURASI', value: `${totalNights} Hari` },
          { label: 'JAMAAH', value: `${totalPax} Orang` },
        ].map((item, i) => (
          <div key={i}>
            <p style={{ fontSize: '9px', color: '#735C00', margin: '0 0 4px', letterSpacing: '0.5px' }}>
              {item.label}
            </p>
            <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#26170C', margin: 0 }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Route visualization */}
      <div style={{ padding: '0 32px 16px', borderBottom: '1px solid #D4CCB0' }}>
        <p style={{ fontSize: '9px', color: '#735C00', letterSpacing: '0.5px', margin: '0 0 12px' }}>
          RUTE PERJALANAN
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          {[
            { city: 'Jakarta', sub: 'BERANGKAT' },
            null,
            { city: 'Jeddah', sub: 'TRANSIT' },
            null,
            { city: 'Makkah', sub: `${form.nights_makkah} HARI` },
            null,
            { city: 'Madinah', sub: `${form.nights_madinah} HARI` },
            null,
            { city: 'Jakarta', sub: 'PULANG' },
          ].map((item, i) => item === null ? (
            <div key={i} style={{
              flex: 1,
              height: '2px',
              background: '#C5A059',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '6px',
                height: '6px',
                background: '#C5A059',
                borderRadius: '50%',
              }} />
            </div>
          ) : (
            <div key={i} style={{ textAlign: 'center', minWidth: '60px' }}>
              <div style={{
                width: '12px', height: '12px',
                background: '#C5A059',
                borderRadius: '50%',
                margin: '0 auto 4px',
              }} />
              <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#26170C', margin: 0 }}>
                {item.city}
              </p>
              <p style={{ fontSize: '8px', color: '#735C00', margin: 0 }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '24px', padding: '16px 32px' }}>

        {/* Left - Rincian */}
        <div>
          <p style={{ fontSize: '9px', color: '#735C00', letterSpacing: '0.5px', margin: '0 0 12px' }}>
            RINCIAN KOMPONEN
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {costItems.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                background: '#F9F6F0',
                borderRadius: '8px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px', height: '32px',
                    background: '#EAEAD1',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                  }}>{item.icon}</div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#26170C', margin: 0 }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: '9px', color: '#735C00', margin: 0 }}>{item.sub}</p>
                  </div>
                </div>
                <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#26170C', margin: 0 }}>
                  {formatIDR(item.amount)}
                </p>
              </div>
            ))}
          </div>

          {/* Dokumen & Visa */}
          <div style={{ marginTop: '16px' }}>
            <p style={{ fontSize: '9px', color: '#735C00', letterSpacing: '0.5px', margin: '0 0 8px' }}>
              DOKUMEN & VISA
            </p>
            {[
              'Paspor berlaku min. 6 bulan',
              'Sertifikat vaksin Meningitis',
              'Foto 4×6 background putih',
              'Biaya visa sudah termasuk',
            ].map((doc, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <div style={{
                  width: '14px', height: '14px',
                  background: 'rgba(145,247,142,0.1)',
                  border: '1px solid #91F78E',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '8px', color: '#41A356', flexShrink: 0,
                }}>✓</div>
                <p style={{ fontSize: '10px', color: '#735C00', margin: 0 }}>{doc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Ringkasan */}
        <div>
          <div style={{
            background: '#26170C',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '12px',
          }}>
            <p style={{ fontSize: '9px', color: '#D4CCB0', letterSpacing: '0.5px', margin: '0 0 4px' }}>
              BUDGET DITETAPKAN
            </p>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#FDFBF7', margin: '0 0 12px' }}>
              {form.is_no_limit ? 'Tanpa Limit' : formatIDR(form.budget_amount ?? 0)}
            </p>

            {ringkasanItems.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '6px',
              }}>
                <span style={{ fontSize: '10px', color: '#D4CCB0' }}>{item.label}</span>
                <span style={{ fontSize: '10px', color: '#FDFBF7', fontWeight: 'bold' }}>
                  {formatIDR(item.amount)}
                </span>
              </div>
            ))}

            <div style={{
              borderTop: '1px solid #3D2B1F',
              paddingTop: '8px',
              marginTop: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: '10px', color: '#D4CCB0' }}>Sisa Dana</span>
              <span style={{
                fontSize: '13px',
                fontWeight: 'bold',
                color: isOverBudget ? '#FFDAD6' : '#91F78E',
              }}>
                {form.is_no_limit
                  ? 'N/A'
                  : breakdown?.remaining_budget !== null && breakdown?.remaining_budget !== undefined
                    ? formatIDR(breakdown.remaining_budget)
                    : '-'
                }
              </span>
            </div>
          </div>

          {/* Over budget warning */}
          {isOverBudget && (
            <div style={{
              background: 'rgba(255,218,214,0.2)',
              border: '1px solid #FFDAD6',
              borderRadius: '8px',
              padding: '10px 12px',
            }}>
              <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#BA1A2C', margin: '0 0 4px' }}>
                ⚠ Melebihi Budget ({breakdown ? Math.round(Math.abs(breakdown.remaining_budget ?? 0) / (form.budget_amount ?? 1) * 100) : 0}%)
              </p>
              <p style={{ fontSize: '9px', color: '#BA1A2C', margin: 0 }}>
                Estimasi biaya melampaui target. Pertimbangkan penyesuaian hotel atau jadwal.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: '#26170C',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '16px',
      }}>
        <div>
          <p style={{
            fontFamily: 'serif',
            fontSize: '14px',
            color: '#FFE088',
            margin: '0 0 2px',
          }}>
            تَقَبَّلَ اللّٰهُ مِنَّا وَمِنْكُمْ
          </p>
          <p style={{ fontSize: '8px', color: '#D4CCB0', margin: 0, letterSpacing: '0.5px' }}>
            TAQABBALALLAHU MINNA WA MINKUM
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#FDFBF7', margin: '0 0 2px' }}>
            umratee.id
          </p>
          <p style={{ fontSize: '8px', color: '#D4CCB0', margin: 0 }}>
            © 2024 UMRAH PLANNER
          </p>
        </div>
      </div>
    </div>
  )
}