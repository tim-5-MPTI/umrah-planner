'use client'

import { useCallback, useState } from 'react'
import type { PlannerFormData, CostBreakdown } from '@/lib/types'
import { formatIDR } from '@/utils/formatCurrency'
import { formatDate } from '@/lib/utils'
import { TRANSPORT_OPTIONS, MEAL_OPTIONS } from '@/constants/budgetPresets'

interface ExportInput {
  form: PlannerFormData
  breakdown: CostBreakdown | null
  generated_at: string
}

export const useExportPdf = () => {
  const [loading, setLoading] = useState(false)

  const exportPdf = useCallback(async ({ form, breakdown }: ExportInput) => {
    setLoading(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default

      const totalPax = form.adult_count + form.child_count
      const transportLabel = TRANSPORT_OPTIONS.find(t => t.value === form.selected_transport)?.label ?? '-'
      const mealLabel = MEAL_OPTIONS.find(m => m.value === form.selected_meal)?.label ?? '-'
      const isOverBudget = breakdown?.is_sufficient === false
      const sarRate = 4300

      const costItems = [
        { icon: '✈', label: form.selected_flight?.airlines ?? '-', sub: `${form.origin_airport} → ${form.destination_airport}`, amount: breakdown?.fixed.flight ?? 0 },
        { icon: '🏨', label: form.selected_hotel_makkah?.name ?? '-', sub: `${form.nights_makkah} Malam Makkah + ${form.nights_madinah} Malam Madinah`, amount: breakdown ? breakdown.dynamic.hotel_makkah + breakdown.dynamic.hotel_madinah : 0 },
        { icon: '🚌', label: transportLabel, sub: 'Jeddah → Makkah → Madinah', amount: breakdown?.fixed.transport ?? 0 },
        { icon: '🍽', label: mealLabel, sub: 'Makkah • Madinah', amount: breakdown?.fixed.meal ?? 0 },
        { icon: '🪪', label: 'Visa & Vaksin Meningitis', sub: `Total ${totalPax} Orang`, amount: breakdown ? breakdown.fixed.visa + breakdown.fixed.meningitis : 0 },
      ]

      const html = `
       <div style="width:794px;min-height:1123px;font-family:Arial,sans-serif;background:#FDFBF7;color:#26170C;">

          <div style="background:#26170C;padding:24px 32px;display:flex;align-items:center;justify-content:space-between;">
            <span style="color:#FDFBF7;font-weight:bold;font-size:20px;">umra<span style="color:#FFE088;">tee</span></span>
            <div style="text-align:right;">
              <p style="color:#D4CCB0;font-size:10px;margin:0;">ESTIMASI TOTAL</p>
              <p style="color:#FDFBF7;font-size:26px;font-weight:bold;margin:4px 0;">${breakdown ? formatIDR(breakdown.total) : 'Rp 0'}</p>
              <p style="color:#D4CCB0;font-size:10px;margin:0;">Termasuk pajak & biaya layanan</p>
            </div>
          </div>

          <div style="padding:16px 32px 0;">
            <div style="display:inline-block;border:1px solid #C5A059;border-radius:6px;padding:4px 12px;font-size:10px;font-weight:bold;letter-spacing:1px;color:#735C00;">
              DOKUMEN PERJALANAN UMROH
            </div>
          </div>

          <div style="padding:16px 32px;display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:16px;border-bottom:1px solid #D4CCB0;">
            <div>
              <p style="font-size:9px;color:#735C00;margin:0 0 4px;letter-spacing:0.5px;">KEBERANGKATAN</p>
              <p style="font-size:13px;font-weight:bold;color:#26170C;margin:0;">${form.departure_date ? formatDate(form.departure_date) : '-'}</p>
            </div>
            <div>
              <p style="font-size:9px;color:#735C00;margin:0 0 4px;letter-spacing:0.5px;">KEPULANGAN</p>
              <p style="font-size:13px;font-weight:bold;color:#26170C;margin:0;">${form.return_date ? formatDate(form.return_date) : '-'}</p>
            </div>
            <div>
              <p style="font-size:9px;color:#735C00;margin:0 0 4px;letter-spacing:0.5px;">DURASI</p>
              <p style="font-size:13px;font-weight:bold;color:#26170C;margin:0;">${form.nights_makkah + form.nights_madinah} Hari</p>
            </div>
            <div>
              <p style="font-size:9px;color:#735C00;margin:0 0 4px;letter-spacing:0.5px;">JAMAAH</p>
              <p style="font-size:13px;font-weight:bold;color:#26170C;margin:0;">${totalPax} Orang</p>
            </div>
          </div>

          <div style="padding:16px 32px;border-bottom:1px solid #D4CCB0;">
  <p style="font-size:9px;color:#735C00;letter-spacing:0.5px;margin:0 0 16px;">RUTE PERJALANAN</p>
  <div style="display:flex;align-items:center;">

    ${[
      { city: 'Jakarta', sub: 'BERANGKAT' },
      null,
      { city: 'Jeddah', sub: 'TRANSIT' },
      null,
      { city: 'Makkah', sub: `${form.nights_makkah} HARI` },
      null,
      { city: 'Madinah', sub: `${form.nights_madinah} HARI` },
      null,
      { city: 'Jakarta', sub: 'PULANG' },
    ].map((item) => item === null ? `
      <div style="flex:1;display:flex;align-items:center;justify-content:center;">
        <div style="width:100%;height:2px;border-top:2px dashed #C5A059;position:relative;">
        </div>
      </div>
    ` : `
      <div style="text-align:center;min-width:70px;">
        <div style="width:20px;height:20px;border-radius:50%;border:2px solid #C5A059;background:#FDFBF7;margin:0 auto 8px;display:flex;align-items:center;justify-content:center;">
          <div style="width:8px;height:8px;border-radius:50%;background:#C5A059;"></div>
        </div>
        <p style="font-size:12px;font-weight:bold;color:#26170C;margin:0 0 2px;">${item.city}</p>
        <p style="font-size:8px;color:#735C00;margin:0;letter-spacing:0.5px;">${item.sub}</p>
      </div>
    `).join('')}

  </div>
</div>
          <div style="padding:16px 32px;display:grid;grid-template-columns:1fr 220px;gap:24px;">

            <div>
              <p style="font-size:9px;color:#735C00;letter-spacing:0.5px;margin:0 0 12px;">RINCIAN KOMPONEN</p>
              ${costItems.map(item => `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:#F9F6F0;border-radius:8px;margin-bottom:8px;">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <div style="width:32px;height:32px;background:#EAEAD1;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;">${item.icon}</div>
                    <div>
                      <p style="font-size:11px;font-weight:bold;color:#26170C;margin:0;">${item.label}</p>
                      <p style="font-size:9px;color:#735C00;margin:0;">${item.sub}</p>
                    </div>
                  </div>
                  <p style="font-size:11px;font-weight:bold;color:#26170C;margin:0;">${formatIDR(item.amount)}</p>
                </div>
              `).join('')}

              <div style="margin-top:16px;">
                <p style="font-size:9px;color:#735C00;letter-spacing:0.5px;margin:0 0 8px;">DOKUMEN & VISA</p>
                ${['Paspor berlaku min. 6 bulan', 'Sertifikat vaksin Meningitis', 'Foto 4x6 background putih', 'Biaya visa sudah termasuk'].map(doc => `
                  <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                    <div style="width:14px;height:14px;background:rgba(145,247,142,0.1);border:1px solid #91F78E;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:8px;color:#41A356;flex-shrink:0;">✓</div>
                    <p style="font-size:10px;color:#735C00;margin:0;">${doc}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <div>
              <div style="background:#26170C;border-radius:12px;padding:16px;margin-bottom:12px;">
                <p style="font-size:9px;color:#D4CCB0;letter-spacing:0.5px;margin:0 0 4px;">BUDGET DITETAPKAN</p>
                <p style="font-size:18px;font-weight:bold;color:#FDFBF7;margin:0 0 12px;">${form.is_no_limit ? 'Tanpa Limit' : formatIDR(form.budget_amount ?? 0)}</p>
                ${[
                  { label: 'Penerbangan', amount: breakdown?.fixed.flight ?? 0 },
                  { label: 'Hotel', amount: breakdown ? breakdown.dynamic.hotel_makkah + breakdown.dynamic.hotel_madinah : 0 },
                  { label: 'Transportasi', amount: breakdown?.fixed.transport ?? 0 },
                  { label: 'Konsumsi', amount: breakdown?.fixed.meal ?? 0 },
                  { label: 'Dokumen', amount: breakdown ? breakdown.fixed.visa + breakdown.fixed.meningitis : 0 },
                ].map(item => `
                  <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                    <span style="font-size:10px;color:#D4CCB0;">${item.label}</span>
                    <span style="font-size:10px;color:#FDFBF7;font-weight:bold;">${formatIDR(item.amount)}</span>
                  </div>
                `).join('')}
                <div style="border-top:1px solid #3D2B1F;padding-top:8px;margin-top:8px;display:flex;justify-content:space-between;align-items:center;">
                  <span style="font-size:10px;color:#D4CCB0;">Sisa Dana</span>
                  <span style="font-size:13px;font-weight:bold;color:${isOverBudget ? '#FFDAD6' : '#91F78E'};">
                    ${form.is_no_limit ? 'N/A' : breakdown?.remaining_budget !== null && breakdown?.remaining_budget !== undefined ? formatIDR(breakdown.remaining_budget) : '-'}
                  </span>
                </div>
              </div>
              ${isOverBudget ? `
                <div style="background:rgba(255,218,214,0.2);border:1px solid #FFDAD6;border-radius:8px;padding:10px 12px;">
                  <p style="font-size:10px;font-weight:bold;color:#BA1A2C;margin:0 0 4px;">⚠ Melebihi Budget</p>
                  <p style="font-size:9px;color:#BA1A2C;margin:0;">Estimasi biaya melampaui target. Pertimbangkan penyesuaian hotel atau jadwal.</p>
                </div>
              ` : ''}
            </div>
          </div>

          <div style="background:#26170C;padding:16px 32px;display:flex;align-items:center;justify-content:space-between;margin-top:16px;">
            <div>
              <p style="font-family:serif;font-size:14px;color:#FFE088;margin:0 0 2px;">تَقَبَّلَ اللّٰهُ مِنَّا وَمِنْكُمْ</p>
              <p style="font-size:8px;color:#D4CCB0;margin:0;letter-spacing:0.5px;">TAQABBALALLAHU MINNA WA MINKUM</p>
            </div>
            <div style="text-align:right;">
              <p style="font-size:11px;font-weight:bold;color:#FDFBF7;margin:0 0 2px;">umratee.id</p>
              <p style="font-size:8px;color:#D4CCB0;margin:0;">© 2024 UMRAH PLANNER</p>
            </div>
          </div>
        </div>
      `

      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = html
      tempDiv.style.position = 'fixed'
      tempDiv.style.top = '0'
      tempDiv.style.left = '0'
      tempDiv.style.zIndex = '-9999'
      tempDiv.style.opacity = '0.01'
      tempDiv.style.width = '794px'
      tempDiv.style.overflow = 'hidden'
      document.body.appendChild(tempDiv)

      const opt = {
  margin: 0,
  filename: 'umratee-rencana-umrah.pdf',
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: {
    scale: 2,
    useCORS: true,
    logging: false,
    width: 794,
    windowWidth: 794,
  },
  jsPDF: {
    unit: 'mm',
    format: 'a4',
    orientation: 'portrait',
  },
}

      await html2pdf().set(opt).from(tempDiv.firstElementChild as HTMLElement).save()
      document.body.removeChild(tempDiv)

    } catch (err) {
      console.error('Export PDF error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  return { exportPdf, loading }
}