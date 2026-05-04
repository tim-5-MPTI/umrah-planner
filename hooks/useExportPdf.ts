// hooks/useExportPdf.ts

import { useCallback, useState } from 'react'
import type { PlannerResult } from '@/lib/types'

export const useExportPdf = () => {
  const [loading, setLoading] = useState(false)

  const exportPdf = useCallback(async (result: PlannerResult) => {
    setLoading(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default

      const element = document.getElementById('pdf-content')
      if (!element) throw new Error('PDF content element not found')

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `umratee-rencana-${result.generated_at}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }

      await html2pdf().set(opt).from(element).save()
    } catch (err) {
      console.error('Export PDF error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  return { exportPdf, loading }
}